import {request} from '@/api/service/AxiosService';
import {NOTICE_BASE_URL} from '@/api/base';

class NoticeService {
  /**
   * 공지사항 생성
   */
  public makeNotice(): Promise<any> {
    return request('post', `${NOTICE_BASE_URL}`);
  }

  /**
   * 공지사항 전체 조회
   */
  public getAllNotice(): Promise<any> {
    return request('get', `${NOTICE_BASE_URL}`);
  }

  /**
   * 공지사항 개별 조회
   * @param id
   */
  public getNoticeById(id: string | number): Promise<any> {
    return request('get', `${NOTICE_BASE_URL}/${id}`);
  }

  /**
   * 공지사항 개별 삭제
   * @param id
   */
  public deleteNoticeById(id: string | number): Promise<any> {
    return request('delete', `${NOTICE_BASE_URL}/${id}`);
  }

  /**
   * 공지사항 개별 수정
   * @param id
   */
  public modifyNoticeById(id: string | number): Promise<any> {
    return request('put', `${NOTICE_BASE_URL}/${id}`);
  }

}

export default new NoticeService();