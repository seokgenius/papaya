<template>
  <div class="comment-btm">
    <button type="button" class="btn only-ico-btn"><img :src="require('@/assets/images/image.svg')" alt=""></button>
    <input style="width:466px;" type="text" class="form-control popup-type sm" v-model="comment" placeholder="댓글을 작성해 주세요." @keyup.self.enter="addComment">
    <a href="" class="txt-btn ft-14" :class="{'disabled': comment===''}" @click.prevent="addComment">등록</a>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {IPostModel} from '@/views/model/post.model';
import {IScheduleTotal} from '@/views/model/schedule.model';

const Post = namespace('Post');
const Schedule = namespace('Schedule');

@Component
export default class CommentBtm extends Vue {

  @Prop(Object)
  private parentItem!: Pick<IPostModel | IScheduleTotal, 'post_type' | 'id'> ;

  @Prop(Number)
  private memberId!: number;

  @Post.Action
  private ADD_POST_COMMENT_ACTION!: (payload: {parent_id: number, parent_type: number, member_id: number, comment: string}) => Promise<any>;

  @Schedule.Action
  private ADD_SCHEDULE_COMMENT_ACTION!: (payload: {parent_id: number, parent_type: number, member_id: number, comment: string}) => Promise<any>;

  @Post.Action
  private GET_POST_COMMENTS_ACTION!: (postId: number) => Promise<any>;

  @Schedule.Action
  private GET_SCHEDULE_COMMENTS_ACTION!: (scheduleId: number) => Promise<any>;

  private comment: string = '';

  private addCommentType(): any {
    const commentData = {
      parent_id: this.parentItem.id,
      parent_type: this.parentItem.post_type,
      member_id: this.memberId,
      comment: this.comment
    };
    if (this.parentItem.post_type === 0) {
      return this.ADD_POST_COMMENT_ACTION(commentData);
    } else {
      return this.ADD_SCHEDULE_COMMENT_ACTION(commentData);
    }
  }

  private getCommentsType(): any {
    if (this.parentItem.post_type === 0) {
      return this.GET_POST_COMMENTS_ACTION(this.parentItem.id);
    } else {
      return this.GET_SCHEDULE_COMMENTS_ACTION(this.parentItem.id);
    }
  }

  /**
   * 댓글 등록
   * @private
   */
  private async addComment() {
    if (this.comment !== '') {
      await this.addCommentType()
          .then(() => {
            console.log(`member_id: ${this.memberId} 댓글 추가 완료`);
          });
      await this.getCommentsType()
          .then(() => {
            console.log('댓글 갱신');
          });
      this.comment = '';
    }
  }
}
</script>
