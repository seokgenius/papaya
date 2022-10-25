import {request} from '@/api/service/AxiosService';
import {CLASS_BASE_URL, USER_BASE_URL} from '@/api/base';
import {IKeepPostList} from '@/views/model/my-class.model';
import {IAddVoteModel, IPostInLinkModel, IPostModel, IVoteModel} from '@/views/model/post.model';

export class PostService{

  /**
   * 내가 가입한 클래스의 모든 알림 조회 (최신 위쪽에 )
   * @param classId
   * @param payload
   */
  public static getAllMyClassPosts( payload: {page_no: number | undefined, count: number | undefined} ): Promise<any>{
    return request('get', `${CLASS_BASE_URL}/me/all/posts`, payload );
  }


  /**
   * 클래스 알림 전체 조회 (최신 위쪽에 )
   * @param classId
   * @param payload
   */
  public static getPosts(classId: number, payload: {page_no: number, count: number} ): Promise<any>{
    return request('get', `${CLASS_BASE_URL}/${classId}/posts`, payload );
  }

  /**
   * 게시글 개별 정보 조회
   * @param classId
   * @param postId
   */
  public static getPostsById(classId: number | string, postId: number): Promise<any> {
    return request('get', `${CLASS_BASE_URL}/${classId}/posts/${postId}`);
  }


  /**
   * 내가 가입한 클래스에 모든 예약된 알림(게시글) 전체 조회
   * @param payload
   */
  public static getALLMyClassReservedPost( payload: {page_no: number, count: number}={page_no:1, count:100} ): Promise<any>{
    return  request('get', `${CLASS_BASE_URL}/me/all/posts/reserved`, payload);
  }

  /**
   * 클래스 예약된 알림(게시글) 전체 조회
   * @param classId
   * @param payload
   */
  public static getReservedPost(classId: number | string, payload: {page_no: number, count: number}={page_no:1, count:100} ): Promise<any>{
    return  request('get', `${CLASS_BASE_URL}/${classId}/posts/reserved`, payload);
  }


  /**
   * 모든 알림
   * @param classId
   * @param paging
   */
  public static getAllPostsByClassId(classId: string | number,  paging: {page_no: number, count: number}={page_no:1, count:10}): Promise<any>{
    return request('get', `${CLASS_BASE_URL}/${classId}/posts`, paging);
  }

  public static setAddPost(classId: string | number, formData: FormData) {
    return request('post', `${CLASS_BASE_URL}/${classId}/posts`, formData );
  }


  public static setAddVote(classId: string | number, vote: IAddVoteModel ): Promise<any>{
    return request('post', '/vote', vote );
  }

  public static deleteVote( voteId: number): Promise<any>{
    return request('delete', `/vote/${voteId}`);
  }

  public static setUserVoteSelect( voteId: string | number, memberId: number, payload: { vote_choice_ids: number[] }): Promise<any>{
    return request('post', `/vote/${voteId}/member/${memberId}/select`, payload);
  }
  public static setUserVoteCancel( voteId: string | number, memberId: number, payload: { vote_choice_ids: number[] }): Promise<any>{
    return request('delete', `/vote/${voteId}/member/${memberId}/select`, payload);
  }
  /**
   * 게시글 수정 - 공지/일반으로 변경 혹은 게시글( 제목/내용 수정  )
   * @param classId
   * @param postId
   * @param payload
   */
  public static setPostById( classId: string | number, postId: number, payload: {type: number, title: string, text: string}): Promise<any>{
    return request('put', `${CLASS_BASE_URL}/${classId}/posts/${postId}`, payload);
  }

  /**
   * 알림 게시글 내용( 투표/링크/이미지/파일 등 ) 전부 수정하기
   * @param classId
   * @param postId
   * @param formData
   */
  public static setPostInfoAllById(classId: string | number, postId: number, formData: FormData): Promise<any> {
    return request('put', `${CLASS_BASE_URL}/${classId}/posts/${postId}/all`, formData);
  }

  public static deletePostById(classId: string | number, postId: number): Promise<any> {
    ///class/{class_id}/posts/{post_id}
    return request('delete', `${CLASS_BASE_URL}/${classId}/posts/${postId}`);
  }

  public static deletePostFileById(classId: string | number, postId: number, payload: { ids: number[] }): Promise<any>  {
    return request('delete', `${CLASS_BASE_URL}/${classId}/posts/${postId}/attachments`, payload );
  }


  /**
   * 내가 가입한 클래스 알림글 북마크한 글조회
   */
  public static getMyKeepPosts(): Promise<IKeepPostList> {
    return request('get', `${CLASS_BASE_URL}/me/keep/posts`);
  }

  public static setKeepPost(payload: { class_id: number, post_id: number }): Promise<any> {
    return request('post', `${USER_BASE_URL}/me/keep/class/post`, payload );
  }
  public static deleteKeepPost( postId: number ): Promise<any> {
    return request('delete', `${USER_BASE_URL}/me/keep/class/post/${postId}` );
  }


}



