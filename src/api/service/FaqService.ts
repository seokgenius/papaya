import {FAQ_BASE_URL} from '@/api/base';
import {request} from '@/api/service/AxiosService';

class FaqService {

  /**
   * 자주 묻는 질문 생성
   */
  public makeFaq(): Promise<any> {
    return request('post', `${FAQ_BASE_URL}`);
  }

  /**
   * 자주 묻는 질문 전체 조회
   */
  public getAllFaqs(): Promise<any> {
    return request('get', `${FAQ_BASE_URL}`);
  }

  /**
   * 자주 묻는 질문 검색 조회
   * @param searchText
   */
  public searchFaq(searchText: string): Promise<any> {
    return request('get', `${FAQ_BASE_URL}/search/${searchText}`);
  }

  /**
   * 자주 묻는 질문 개별 조회
   * @param id
   */
  public getFaqById(id: string | number): Promise<any> {
    return request('get', `${FAQ_BASE_URL}/${id}`);
  }

  /**
   * 자주 묻는 질문 개별 삭제
   * @param id
   */
  public deleteFaq(id: string | number): Promise<any> {
    return request('delete', `${FAQ_BASE_URL}/${id}`);
  }

  /**
   * 자주 묻는 질문 개별 수정
   * @param id
   */
  public modifyFaq(id: string | number): Promise<any> {
    return request('put', `${FAQ_BASE_URL}/${id}`);
  }
}

export default new FaqService();