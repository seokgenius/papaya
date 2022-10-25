import {request} from '@/api/service/AxiosService';
import {CLASS_BASE_URL} from '@/api/base';

export class SearchApiService{
  /**
   * search 랜딩 페이지
   */
  public static getSearchHome(): Promise<any> {
    return request('get', `${CLASS_BASE_URL}/search/home`);
  }

  /**
   * 클래스 검색
   * @param searchTxt
   * @param paging
   */
  public static getSearchResult( searchTxt: string, paging: {page_no: number, count: number}={page_no:1, count:10}): Promise<any> {
    //paging: {page_no: number, count: number}={page_no:1, count:10}
    return request('get', `${CLASS_BASE_URL}/search/all/${searchTxt}`, paging);
  }

  /**
   * 태그 및 키워드 검
   * @param searchTxt
   * @param paging
   */
  public static getTagSearchResult( searchTxt: string, paging: {page_no: number, count: number}={page_no:1, count:10} ): Promise<any> {
    return request('get', `tag/search/${searchTxt}`, paging );
  }

}
