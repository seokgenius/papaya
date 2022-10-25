<template>
  <div class="popup-feed-comment">
    <div class="comment-top">
      <p>댓글 {{ commentItemsModel.length }}</p>
    </div>
    <div class="comment-cnt">
      <div v-for="(item, idx ) in commentItemsModel" class="comment pdt-0" :key="`comment-${idx}`">
        <div class="main-comment">
          <p class="comment-writer">{{ item.owner ? item.owner.nickname : '주인없음' }} <span class="wr-time">{{ updatedDiffDate(item.createdAt) }}</span></p>
          <p class="comment-txt">{{ item.comment }}</p>
          <div class="modify-comment">
            <input v-model="tempComment" type="text" class="form-control popup-type sm" placeholder="댓글을 작성해 주세요." style="width:466px;">
            <a href="" class="txt-btn ft-14" :class="{'disabled': item.comment===tempComment}" @click.prevent="submitCommentModify(item.id, tempComment)">등록</a>
          </div>
          <div class="reply-state">
            <a href="" class="txt-btn ft-14" @click.prevent style="cursor:default">답글 {{ item.reply_count }}</a>
            <a href="" class="txt-btn ft-14" @click.prevent="replyInputToggle(idx)">답글달기</a>
            <a href="" class="txt-btn ft-14 modify" @click.prevent="openCommentModify(item, idx)">수정</a>
            <a href="" class="txt-btn ft-14 delete" @click.prevent="deleteComment(item)">삭제</a>
          </div>
        </div>

        <template v-if="replyItemsModel[idx]!==undefined">
          <div v-for="( replyItem, jdx) in replyItemsModel[idx].comment_list" class="reply" :key="`reply-${jdx}`">
            <p class="comment-writer">{{ replyItem.owner.nickname }} <span class="wr-time">{{ updatedDiffDate(replyItem.createdAt) }}</span></p>
            <p class="comment-txt">{{ replyItem.comment }}</p>
            <div class="modify-reply">
              <input v-model="tempReply" type="text" class="form-control popup-type sm" placeholder="댓글을 작성해 주세요." style="width:466px;">
              <a href="" class="txt-btn ft-14" :class="{'disabled': replyItem.comment===tempReply}" @click.prevent="submitReplyModify(replyItem.id, tempReply)">등록</a>
            </div>

            <div class="reply-state">
              <a href="" class="txt-btn ft-14 modify" @click.prevent="openReplyModify(replyItem, jdx)">수정</a>
              <a href="" class="txt-btn ft-14 delete" @click.prevent="deleteReply(replyItem)">삭제</a>
            </div>
          </div>
        </template>

        <div class="comment-btm reply hide">
          <input v-model="reply" type="text" class="form-control popup-type sm" placeholder="댓글을 작성해 주세요." style="width:466px;" @keyup.self.enter="addReply(item.id)">
          <a href="" class="txt-btn ft-14" :class="{'disabled': reply===''}" @click.prevent="addReply(item.id)">등록</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {ICommentModel, IReplyModel} from '@/views/model/comment.model';
import {IPostModel} from '@/views/model/post.model';
import {IScheduleTotal} from '@/views/model/schedule.model';
import {CommentService} from '@/api/service/CommentService';
import {Utils} from '@/utils/utils';

const Post = namespace('Post');
const Schedule = namespace('Schedule');

@Component
export default class CommentArea extends Vue {

  @Prop(Object)
  private parentItem!: Pick<IPostModel | IScheduleTotal, 'post_type' | 'id'> ;

  @Prop(Number)
  private memberId!: number;

  @Post.Action
  private ADD_POST_REPLY_ACTION!: (payload: {comment_id: number, member_id: number, comment: string}) => Promise<any>;

  @Post.Action
  private GET_POST_COMMENTS_ACTION!: (postId: number) => Promise<any>;

  @Schedule.Action
  private GET_SCHEDULE_COMMENTS_ACTION!: (scheduleId: number) => Promise<any>;

  @Schedule.Action
  private ADD_SCHEDULE_REPLY_ACTION!: (payload: {comment_id: number, member_id: number, comment: string}) => Promise<any>;

  @Post.Getter
  private postCommentItems!: ICommentModel[];

  @Post.Getter
  private postReplyItems!: IReplyModel[];

  @Schedule.Getter
  private scheduleCommentItems!: ICommentModel[];

  @Schedule.Getter
  private scheduleReplyItems!: IReplyModel[];

  private comment: string = '';
  private reply: string = '';
  private tempComment: string = '';
  private tempReply: string = '';

  get commentItemsModel(): any {
    if (this.parentItem.post_type === 0) {
      return this.postCommentItems;
    } else {
      return this.scheduleCommentItems;
    }
  }

  get replyItemsModel(): any {
    if (this.parentItem.post_type === 0) {
      return this.postReplyItems;
    } else {
      return this.scheduleReplyItems;
    }
  }

  private getCommentsType(): any {
    if (this.parentItem.post_type === 0) {
      return this.GET_POST_COMMENTS_ACTION(this.parentItem.id);
    } else {
      return this.GET_SCHEDULE_COMMENTS_ACTION(this.parentItem.id);
    }
  }

  private addReplyType(id: number): any {
    const replyData = {
      comment_id: id,
      member_id: this.memberId,
      comment: this.reply
    };
    if (this.parentItem.post_type === 0) {
      return this.ADD_POST_REPLY_ACTION(replyData);
    } else {
      return this.ADD_SCHEDULE_REPLY_ACTION(replyData);
    }
  }

  private updatedDiffDate( dateValue: Date ): string{
    return Utils.updatedDiffDate(dateValue);
  }



  /**
   * 대댓글 입력란 toggle
   * @param idx
   * @private
   */
  private replyInputToggle(idx: number) {
    this.reply = '';
    const replyInput = document.querySelectorAll('.comment-btm.reply');
    replyInput.forEach((item, index) =>
        (idx!==index) ? item.classList.add('hide') : item.classList.toggle('hide'));
  }

  /**
   * 대댓글 등록
   * @param id
   * @private
   */
  private async addReply(id: number) {
    if (this.reply !== '') {
      await this.addReplyType(id);
      await this.getCommentsType()
          .then(() => {
            console.log('댓글 갱신');
          });
      this.reply = '';
    }
  }

  /**
   * 댓글 수정 input
   * @param data
   * @param idx
   * @private
   */
  private openCommentModify(data: ICommentModel, idx: number): void {
    if (data.owner.id === this.memberId) {
      const commentTxt = document.querySelectorAll('.main-comment .comment-txt');
      const modifyComment = document.querySelectorAll('.main-comment .modify-comment');
      commentTxt.forEach((item, index) =>
          (idx===index) ? item.classList.toggle('hide') : item.classList.remove('hide'));
      modifyComment.forEach((item, index) =>
          (idx===index) ? item.classList.toggle('active') : item.classList.remove('active'));
      this.tempComment = data.comment;
      // @ts-ignore
      modifyComment[idx].firstChild.focus();
    } else {
      alert('본인이 쓴 댓글만 수정 가능합니다.');
    }
  }

  /**
   * 등록 버튼 클릭 시 댓글 수정 입력란 숨김
   * @private
   */
  private closeCommentModify(): void {
    const commentTxt = document.querySelectorAll('.main-comment .comment-txt');
    const modifyComment = document.querySelectorAll('.main-comment .modify-comment');
    commentTxt.forEach((item) => item.classList.remove('hide'));
    modifyComment.forEach((item) => item.classList.remove('active'));
  }

  /**
   * 수정한 댓글 제출
   * @param id
   * @param newComment
   * @private
   */
  private async submitCommentModify(id: number, newComment: string) {
    await CommentService.setCommentModify(id,{comment: newComment});
    await this.getCommentsType()
        .then(() => this.closeCommentModify());
  }

  /**
   * 댓글 삭제
   * @private
   * @param data
   */
  private async deleteComment(data: ICommentModel) {
    if (data.owner.id === this.memberId) {
      await CommentService.deleteComment(data.id);
      await this.getCommentsType()
          .then(() => this.closeCommentModify());
    } else {
      alert('본인이 쓴 댓글만 삭제 가능합니다');
    }
  }

  /**
   * 대댓글 수정 input
   * @private
   * @param data
   * @param jdx
   */
  private openReplyModify(data: IReplyModel, jdx: number): void {
    if (data.owner.id === this.memberId) {
      const replyTxt = document.querySelectorAll('.reply .comment-txt');
      const modifyReply = document.querySelectorAll('.reply .modify-reply');
      replyTxt.forEach((item, index) =>
          (jdx===index) ? item.classList.toggle('hide') : item.classList.remove('hide'));
      modifyReply.forEach((item, index) =>
          (jdx===index) ? item.classList.toggle('active') : item.classList.remove('active'));
      this.tempReply = data.comment;
      // @ts-ignore
      modifyReply[jdx].firstChild.focus();
    } else {
      alert('본인이 쓴 대댓글만 수정 가능합니다.');
    }
  }

  /**
   * 등록 버튼 클릭 시 대댓글 수정 입력란 숨김
   * @private
   */
  private closeReplyModify(): void {
    const replyTxt = document.querySelectorAll('.reply .comment-txt');
    const modifyReply = document.querySelectorAll('.reply .modify-reply');
    replyTxt.forEach((item) => item.classList.remove('hide'));
    modifyReply.forEach((item) => item.classList.remove('active'));
  }


  /**
   * 대댓글 수정 제출
   * @param id
   * @param newReply
   * @private
   */
  private async submitReplyModify(id: number, newReply: string) {
    await CommentService.setReply(id, {comment: newReply})
        .then((data) => {
          console.log(data);
        });
    await this.getCommentsType()
        .then(() => this.closeReplyModify());
  }

  /**
   * 대댓글 삭제
   * @private
   * @param data
   */
  private async deleteReply(data: IReplyModel) {
    if (data.owner.id === this.memberId) {
      await CommentService.deleteReply(data.id)
          .then((result) => {
            console.log(result);
          });
      await this.getCommentsType();
      this.closeReplyModify();
    } else {
      alert('본인이 쓴 대댓글만 삭제 가능합니다');
    }
  }

}

</script>
