import {request} from '@/api/service/AxiosService';

export class CommentService {

  /**
   * 댓글 생성
   * parent_id: postId , parent_type: postType
   * @param payload
   */
  public static setAddComment(payload: {parent_id: number, parent_type: number, member_id: number, comment: string}) {
    return request('post', '/comment', payload);
  }

  /**
   * 댓글 수정
   * @param commentId
   * @param payload
   */
  public static setCommentModify(commentId: number, payload: { comment: string }): Promise<any> {
    return request('put', `/comment/${commentId}`, payload);
  }

  /**
   * 댓글 삭제
   * @param commentId
   */
  public static deleteComment(commentId: number): Promise<any> {
    return request('delete', `/comment/${commentId}`);
  }

  /**
   * 하나의 알림에 댓글 전체 조회.
   * @param postId
   */
  public static getCommentsByPostId(postId: number): Promise<any> {
    return request('get', `/comment/type/post/${postId}`);
  }

  /**
   * 하나의 일정에 달린 댓글 조회
   * @param scheduleId
   */
  public static getCommentsByScheduleId(scheduleId: number) {
    return request('get', `comment/type/schedule/${scheduleId}`);
  }

  /**
   * 대댓글 생성
   * @param payload
   */
  public static setAddReply(payload: {comment_id: number, member_id: number, comment: string}) {
    return request('post', '/comment-reply', payload);
  }

  /**
   * 대댓글 수정
   * @param replyId
   * @param payload
   */
  public static setReply(replyId: number, payload: {comment: string}): Promise<any> {
    return request('put', `comment-reply/${replyId}`, payload);
  }

  /**
   * 대댓글 삭제
   * @param replyId
   */
  public static deleteReply(replyId: number): Promise<any> {
    return request('delete', `comment-reply/${replyId}`);
  }

  /**
   * 하나의 댓글에 달린 답글 전체 조회
   * @param commentId
   */
  public static getReplysByCommentId(commentId: number): Promise<any> {
    return request('get', `comment-reply/on/${commentId}`);
  }

}