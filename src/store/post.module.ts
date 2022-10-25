import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {
  SET_POST_IN_BOOKMARK,
  SET_RESERVED_LIST,
  SET_RESERVED_TOTAL,
  SET_POST_DETAIL,
  SET_COMMENTS,
  SET_REPLY,
  SET_VOTE,
  EDIT_POST,
  DELETE_POST,
  SET_ALL_MY_CLASS_POST,
  SET_POST_TOTAL,
  RESET_POST_LIST
} from '@/store/mutation-class-types';
import {
  GET_POST_LIST_ACTION,
  ADD_POST_ACTION,
  GET_RESERVED_LIST_ACTION,
  DELETE_POST_ACTION,
  POST_TYPE_CHANGE_ACTION,
  GET_POST_DETAIL_ACTION,
  GET_POST_COMMENTS_ACTION,
  ADD_POST_COMMENT_ACTION,
  ADD_POST_REPLY_ACTION,
  SELECT_VOTE_ACTION,
  EDIT_POST_ACTION,
  EDIT_POST_TXT_ACTION,
  DELETE_POST_FILE_ACTION,
  ADD_VOTE_ACTION,
  DELETE_VOTE_ACTION,
  GET_ALL_MY_CLASS_POST_LIST_ACTION,
  GET_ALL_MY_CLASS_RESERVED_LIST_ACTION
} from '@/store/action-class-types';
import {IPostInLinkModel, IPostModel, IReadAbleVote, IVoteModel} from '@/views/model/post.model';
import {ICommentModel, IReplyModel} from '@/views/model/comment.model';
import {PostService} from '@/api/service/PostService';
import {CommentService} from '@/api/service/CommentService';
import {getAllPromise} from '@/types/types';

@Module({
  namespaced: true,
})
export default class PostModule extends VuexModule {

  private openAddPopup: boolean= false;
  private postListData: IPostModel[]= [];
  private reservedTotal: number=0;
  private reservedData: IPostModel[]= [];
  private postDetailData: IPostModel={
    attachment: [],
    class_id: 0,
    count: 0,
    createdAt: '',
    endAt: '',
    expiredAt:  '',
    id: 0,
    owner: {
      class_id: 0,
      createdAt: '',
      id: 0,
      is_bookmarked: 0,
      joinedAt: '',
      level: 0,
      nickname: '',
      onoff_comment_noti:  0,
      onoff_post_noti: 0,
      onoff_push_noti: 0,
      onoff_schedule_noti:  0,
      open_level_email: 0,
      open_level_id:  0,
      open_level_mobileno:  0,
      profile_image: '',
      schedule_color:  0,
      schedule_noti_intime:  0,
      status:  0,
      updatedAt: '',
      user_id:  0,
      visited: 0,
    },
    param1: 0,
    post_type: 0,
    startAt:  '',
    text: '',
    title: '',
    type: 0,
    updatedAt: '',
    user_id: 0,
    user_keep_class_posts: [],
    user_member_id: 0,
    vote: {
      anonymous_mode: false, // 익명 모드
      createdAt: '',
      finishAt: '',
      id: 0,
      multi_choice: false,
      open_progress_level: 0,
      open_result_level: 0,
      parent_id: 0,
      title: '',
      type: 0,
      updatedAt: '',
      vote_choices: []
    },
    isBookmark: false,
    link: {
      createdAt:'',
      id: 0,
      parent_id: 0,
      title: '',
      type: 0,
      updatedAt: '',
      link_items: []
    },
  };
  private commentData: ICommentModel[] = [];
  private replyData: IReplyModel[]=[];
  private voteData!: IReadAbleVote;
  private allMyClassPosts: IPostModel[]= [];
  private postItemTotal: number=0;


  /* Getters */
  get postTotal(): number{
    return this.postItemTotal;
  }

  get isOpenAddPopup(): boolean{
    return this.openAddPopup;
  }

  get postListItems(): IPostModel[] {
    return this.postListData;
  }

  get reservedItems(): IPostModel[]{
    return this.reservedData;
  }

  get reservedTotalItem(): number{
    return this.reservedTotal;
  }

  get postDetailItem(): IPostModel{
    return this.postDetailData;
  }

  get postCommentItems(): ICommentModel[] {
    return this.commentData;
  }

  get postReplyItems(): IReplyModel[] {
    return this.replyData;
  }

  get voteItems(): IReadAbleVote {
    return this.voteData;
  }

  get allMyClassPostsItems(): IPostModel[]{
    return this.allMyClassPosts;
  }


  @Mutation
  public [SET_POST_TOTAL]( total: number ): void{
    this.postItemTotal=total;
  }

  @Mutation
  public [SET_ALL_MY_CLASS_POST](  items: IPostModel[] ): void{
    this.allMyClassPosts=items;
  }

  /**
   * 알림 리스트 reverse 및 북마크 초기 상태 지정
   * @param items
   */
  @Mutation
  public [SET_POST_IN_BOOKMARK](  items: IPostModel[] ): void{
    //기존에 IPostModel[] & IPostInLinkModel[] 타입이였다.
    //인터섹션 ( & ) 타입으로 지정된 데이터에 아래와 같이 전개연산자로(...)합칠때 에러 발생하니 유의~
    this.postListData = [...this.postListData, ...items];
    //
    // this.postListData.reverse();
    // console.log(this.postListData);
    this.postListData.forEach(( item: any, index: number ) => {
      let {isBookmark}=item;

      // console.log(item.user_keep_class_posts);
      //
      if (item.user_keep_class_posts) {
        if( item.user_keep_class_posts.length > 0){
          isBookmark=!isBookmark;
          this.postListData.splice(index, 1, {...item, isBookmark} );
        }
      }
    });
  }

  @Mutation
  public [RESET_POST_LIST](): void{
    this.postListData = [];
  }

  /**
   * 예약 알림 글 데이터 저장
   * @param items
   */
  @Mutation
  public [SET_RESERVED_LIST](items: any[]){
    this.reservedData=items;
  }

  /**
   * 예약 알림 총 개수 지정
   * @param total
   */
  @Mutation
  public [SET_RESERVED_TOTAL]( total: number ){
    this.reservedTotal=total;
  }

  @Mutation
  public [SET_POST_DETAIL]( data: IPostModel ){
    this.postDetailData=data;
  }

  @Mutation
  public [SET_COMMENTS](data: any){
    this.commentData=data;
  }

  @Mutation
  public [SET_REPLY](data: any){
    this.replyData=data;
  }

  @Mutation
  public [SET_VOTE](data: IReadAbleVote): void{
    this.voteData=data;
  }

  @Mutation
  public [EDIT_POST]( info: { postId: number, editInfo: any }){
    const {postId, editInfo} = info;
    const findIdx=this.postListData.findIndex((item) => item.id === postId );
    this.postListData.splice(findIdx, 1, {...this.postListData[findIdx],  ...editInfo});
  }

  @Mutation
  public [DELETE_POST](info: { postId: number }){
    const {postId} = info;
    const findIdx=this.postListData.findIndex((item) => item.id === postId );
    this.postListData.splice(findIdx, 1);
  }


  @Action({rawError: true})
  public [GET_ALL_MY_CLASS_POST_LIST_ACTION]( paging: {page_no: number, count: number } ): Promise<IPostModel[]>{
    return PostService.getAllMyClassPosts( paging )
      .then((data) => {
        // console.log(data);
        // this.postListItems = data.post_list;
        // console.log('noticeListItems=', this.postListData);
        this.context.commit(SET_POST_IN_BOOKMARK, data.post_list);

        return Promise.resolve(data.post_list);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }

  /**
   * 알림글 리스트 조회
   * @param payload
   */
  @Action({rawError: true})
  public [GET_POST_LIST_ACTION]( payload: { classId: number,  paging: {page_no: number, count: number } }  ): Promise<IPostModel[]>{
    return PostService.getAllPostsByClassId( payload.classId, payload.paging)
      .then((data) => {
        // console.log(data);
        // this.postListItems = data.post_list;
        console.log('noticeListItems=', this.postListData);

        this.context.commit(SET_POST_IN_BOOKMARK, data.post_list);
        this.context.commit(SET_POST_TOTAL, data.total_count );

        return Promise.resolve( data.post_list );
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }

  /**
   * 알림 글 생성
   * @param payload
   */
  @Action({rawError: true})
  public [ADD_POST_ACTION](payload: { classId: number, formData: FormData  }): Promise<any> {
    return PostService.setAddPost( payload.classId, payload.formData )
      .then(( data )=>{
        console.log( data );
        let addPostData=data.post;
        if( addPostData.user_keep_class_posts.length > 0){
          let isBookmark: boolean=false;
          isBookmark=!isBookmark;
          addPostData = {...addPostData, ...{isBookmark}};
        }
        this.postListData.unshift(addPostData);

        // this.$emit('submit', false);
        // voteData 는 알림의 id 값을 알아야 하기에 먼저 알림을 생성/등록>완료 후 해당 알림의 id 을 가져와서 voteData 를 생성한다.
        /*if ( payload.voteData ) {
          let { parent_id } = payload.voteData;
          parent_id=data.post.id;
          PostService.setAddVote(payload.classId, {...payload.voteData, parent_id})
            .then(( voteData: any)=>{
              console.log(voteData);

             /!* *!/
            });
        }*/

        // this.imgFilesAllClear();
        // this.attachFilesAllClear();
        // this.postData={ title: '', text: ''};
      }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }





  /**
   * 알림글 삭제
   * @param payload
   */
  @Action({rawError: true})
  public [DELETE_POST_ACTION](payload: { classId: string | number, postId: number }): Promise<any>{
    return PostService.deletePostById( payload.classId, payload.postId )
      .then((data)=>{
        // console.log(this.postListItems);
        /*const findIdx=this.postListItems.findIndex((item) => item.id === payload.postId);
        this.postListItems.splice(findIdx, 1);*/
        const {postId} = payload;
        this.context.commit(DELETE_POST, {postId});

        return Promise.resolve(data);
      }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }


  /**
   *  알림글을 공지 혹은 일반 글로 등록
   * @param payload
   */
  @Action({rawError: true})
  public [POST_TYPE_CHANGE_ACTION](payload: { classId: string | number, postId: number } ): Promise<any>{
    const { classId, postId }=payload;

    const findIdx=this.postListItems.findIndex((item) => item.id === postId);
    const targetItem = this.postListItems[findIdx];
    let { type }=targetItem;
    const { title, text }=targetItem;
    type=( type===0 )? 1 : 0;

    return PostService.setPostById( classId, postId, {type, title, text} )
      .then( (data)=>{
        this.postListItems.splice(findIdx, 1, {...targetItem, type, title, text});
        return Promise.resolve(data);
      }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }

  @Action({rawError: true})
  public [GET_ALL_MY_CLASS_RESERVED_LIST_ACTION]( paging: {page_no: number, count: number }): Promise<IPostModel[]>{
    return PostService.getALLMyClassReservedPost( paging )
      .then((data)=>{
        // console.log(data);
        this.context.commit(SET_RESERVED_TOTAL, data.post_listcount);
        this.context.commit(SET_RESERVED_LIST, data.post_list);
        return Promise.resolve(this.reservedData);
      }).catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
  }


  @Action({rawError: true})
  public [GET_RESERVED_LIST_ACTION](classId: number ) {
    PostService.getReservedPost( classId )
      .then((data)=>{

        // console.log(data);
        this.context.commit(SET_RESERVED_TOTAL, data.post_listcount);
        this.context.commit(SET_RESERVED_LIST, data.post_list);

        return Promise.resolve(this.reservedData);
      }).catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
  }

  @Action({rawError: true})
  public [GET_POST_DETAIL_ACTION](payload: { classId: number, postId: number }): Promise<any>{
    const {classId, postId}=payload;

    return PostService.getPostsById(classId, postId)
      .then((data) => {
        const vote_choices=data.post.vote.vote_choices;
        // sort 하는 이유는 투표를 선택시 선택된 항목이 데이터 배열 내에서 순서가 바뀌어서 전달 될 때가 있기 때문..
        vote_choices.sort( (a: any, b: any )=>{
          return a.index-b.index;
        });
        // this.postDetailData = data.post;
        this.context.commit(SET_POST_DETAIL, {...data.post, ...{ vote_choices } } );

        return Promise.resolve(data.post);
      }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }
  @Action({rawError: true})
  public [EDIT_POST_ACTION](payload: {  classId: number, postId: number, promise: Array<Promise<any>> }): Promise<any>{
    const {classId, postId, promise} = payload;

    return getAllPromise(promise)
      .then((data)=>{

        console.log(data);

        PostService.getPostsById(classId, postId)
          .then((readData) => {
            this.context.commit( EDIT_POST, { postId, editInfo: readData.post} );
            //리스트에서 알림 수정은 데이터 갱신이 이루어지지만
            //상세에서 알림 수정은 데이터 갱신이 이루어 지지 않는다. -- > 수정
            this.context.commit( SET_POST_DETAIL, readData.post );

          });

        return Promise.resolve(data);
      }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }


  @Action({rawError: true})
  public [EDIT_POST_TXT_ACTION]( payload: { classId: string | number, postId: number, tit: string, txt: string } ): Promise<any>{

    const {classId, postId, tit, txt}=payload;
    const findIdx=this.postListData.findIndex((item) => item.id === postId);
    const targetItem = this.postListData[findIdx];
    const {type}=targetItem;

    return PostService.setPostById(classId, postId, {type, title: tit, text:txt })
      .then((data) => {
        const {title, text} = data;
        this.postListData.splice(findIdx, 1, {...targetItem, title, text});
        return Promise.resolve(data);
      }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }


  @Action({rawError: true})
  public [DELETE_POST_FILE_ACTION](payload: { classId: string | number, postId: number, ids: number[] }): Promise<any> {
    const {classId, postId, ids} = payload;
    return PostService.deletePostFileById(classId, postId, {ids})
      .then((data) => {
       /* const findIdx=this.postListData.findIndex((item) => item.id === postId );
        const { attachment } = this.postListData[findIdx];
        const removedAttachItems=attachment.filter((item: any) => !ids.includes(item.id) );
        console.log(removedAttachItems, data);

        const bindData={
          attachment: removedAttachItems
        };

        this.context.commit(EDIT_POST, {postId, editInfo: bindData});
*/
        return Promise.resolve( this.postListItems );
      }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }

  @Action({rawError: true})
  public [DELETE_VOTE_ACTION](payload: {  postId: number, voteId: number}): Promise<any>{
    const { postId, voteId}=payload;

    return PostService.deleteVote( voteId )
      .then((deleteVoteResult)=>{
        console.log(deleteVoteResult);

        // this.context.commit(EDIT_POST, {postId, editInfo: {vote: null} });

        return Promise.resolve( this.postListItems );
      }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }

/*  */

  @Action({rawError: true})
  public [ADD_VOTE_ACTION](payload: { classId: number, postId: number, voteData: IVoteModel}): Promise<any>{
    const {classId, postId, voteData}=payload;

    const {vote, vote_choice_list} = voteData;

    return PostService.setAddVote( classId,  {...vote, vote_choice_list} )
      .then((data)=>{
        // this.context.commit(SET_VOTE, )
        const {
          parent_id,
          type,
          title,
          multi_choice,
          anonymous_mode,
          open_progress_level,
          open_result_level,
          finishAt,
        } = data;

        const definedVoteData={
          vote:{
            parent_id,
            type,
            title,
            multi_choice,
            anonymous_mode,
            open_progress_level,
            open_result_level,
            finishAt
          },
          vote_choice_list
        };

        this.context.commit(EDIT_POST, {postId, editInfo: definedVoteData});

        return Promise.resolve( this.postListItems );
      }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }


  /**
   * 멤버가 투표 선택~( 현재 선택한 데이터가 어디에도 표시 되지 않고 있음)
   * @param payload
   */
  @Action({rawError: true})
  public [SELECT_VOTE_ACTION](payload: {voteId: number, memberId: number, vote_choice_ids: number[] }){
    const {vote_choice_ids}=payload;
    return PostService.setUserVoteSelect( payload.voteId, payload.memberId, {vote_choice_ids} )
      .then((data)=>{
        //
      });
  }

  @Action({rawError: true})
  public [GET_POST_COMMENTS_ACTION]( postId: number): Promise<any> {
    return CommentService.getCommentsByPostId(postId)
      .then((data) => {
        // console.log(data);

        // this.commentItems = data.comment_list;
        // this.context.commit(SET_COMMENTS, data.comment_list);

        // 댓글 삭제를 해도 완전히 제거가 안되고 deleteYN: true 로 변경만 되므로 filter 로 걸러준다.
        const notDeletedComments = data.comment_list.filter((item: any) => item.deletedYN === false);
        this.context.commit(SET_COMMENTS, notDeletedComments);

        //대댓글 정보 가져오기 - commentItems 에 맞는 대댓정보를 가져오기 위해 2차 반복문을 실행.
        const replyIdPromiseItems=this.commentData.map((item: any)=>{
          return CommentService.getReplysByCommentId( item.id );
        });

        // console.log(replyIdItems);
        getAllPromise( replyIdPromiseItems )
          .then(( replyData: any[] )=>{
            console.log(replyData);
            // this.replyData = replyData;
            this.context.commit(SET_REPLY, replyData);

            // const notDeletedReplys = replyData.map((item) => item.comment_list.filter((reply: any) => reply.deletedYN===false));
            // console.log(notDeletedReplys);
            // this.context.commit(SET_REPLY, notDeletedReplys);
          });
      });
  }


  /**
   * 댓글 추가
   * parent_type: 댓글이 달린 원글 타입. 0 - 알림글 , 1 - 일정글
   * @param payload
   */
  @Action({rawError: true})
  public [ADD_POST_COMMENT_ACTION](payload: {parent_id: number, parent_type: number, member_id: number, comment: string}): Promise<any> {
    return CommentService.setAddComment(payload)
      .then((data) => {
        console.log(data.comment);
        return Promise.resolve(this.commentData);
      });
  }

  @Action({rawError: true})
  public [ADD_POST_REPLY_ACTION](payload: {comment_id: number, member_id: number, comment: string}): Promise<any> {
    return CommentService.setAddReply(payload)
      .then((data) => {
        console.log(data.commentreply);
        return Promise.resolve(this.replyData);
      });
  }



}
