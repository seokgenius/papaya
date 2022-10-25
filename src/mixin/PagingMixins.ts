import {Component, Vue} from 'vue-property-decorator';

@Component
export default class PagingMixins extends Vue {
  /**
   *
   * 총 페이지 카운트 구하기
   * @param paging
   * @private
   */
  public getTotalPageCount( paging: {total: number, numOfPage: number}): number {
    const { total, numOfPage } = paging;
    const reminderValue=( total%numOfPage === 0)? 0 : 1;
    return parseInt(`${total / numOfPage}`, 10)+reminderValue;
  }

  /**
   * 페이징 범위에 맞게 각 페이지 넘버 생성 배열 구하기
   * @param paging
   * @private
   */
  public getPageNum(  paging: { totalPageCount: number, pageSize: number, curPageNum: number} ): number[] {
    const { start, end }=this.getPageRange( paging );
    const pageNumItems: number[] = [];
    for (let i = start+1; i < end+1; i++) {
      pageNumItems.push(i);
    }
    return pageNumItems;
  }

  /**
   * 페이징 범위 구하기
   * @param paging
   * @private
   */
  public getPageRange( paging: { totalPageCount: number, pageSize: number, curPageNum: number} ): {start: number, end: number}{
    //total - 전체 개수
    //numOfPage - 페이지 당 개수
    //pageSize - 화면에 표시할 페이징 범위
    // curPageNum - 현재 페이지
    const { pageSize, curPageNum, totalPageCount} = paging;
    const reminderValChk = (curPageNum % pageSize === 0) ? -1 : 0;
    const curCountByPageSize: number = parseInt(`${curPageNum / pageSize}`, 10)+reminderValChk;

    const startPage=curCountByPageSize*pageSize;
    const endCalc= (curCountByPageSize + 1) * pageSize;
    const endPage = ( endCalc >= totalPageCount) ? totalPageCount : (curCountByPageSize + 1) * pageSize;
    // console.log('현재페이지 번호='+curPageNum, 'startPage=' + startPage, 'pageRange='+endPage, this.totalPageCount);
    return {
      start: startPage,
      end: endPage
    };
  }
}
