class Utils{

  /**
   * 모바일 번호 정규식
   */
  public static getMobileRegx(): RegExp{
    return  /^\d{3}\d{3,4}\d{4}$/;
  }

  /**
   * 특수문자 / 한글 제외 - 영문 / 숫자만 가능 문자 정규식
   */
  public static getEnWordRegx(): RegExp{
    //x(?=y) 오직 'y'가 뒤따라오는 'x' 에만 대응
    //x(?!y) - 'x' 뒤에 'y'가 없는 경우에만 'x' 일치.
    return /^(?=.*[a-zA-Z])(?!.*[^a-zA-Z0-9_])+[a-zA-Z0-9]/;
  }

  /**
   * 특수문자와 넘버를 포함시킨 영문 min 에서 max 까지 가능
   * @param min
   * @param max
   */
  public static getPwdRegx( min: number, max: number): RegExp{
    //x(?=y) 오직 'y'가 뒤따라오는 'x' 에만 대응
    return new RegExp(`(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9_])(?=.*[0-9]).{${min},${max}}$`);
  }

  /**
   * 특수문자를 제외하고 문자 시작하여 숫자 포함한  min 에서 max 까지 가능
   * @param min
   * @param max
   */
  public static getUserIdRegx( min: number, max: number ): RegExp{
    //x(?!y) - 'x' 뒤에 'y'가 없는 경우에만 'x' 일치.
    //정규표현식을 아래와 같이 변수를 연동하는 등의 동적 표현시엔 RegExp 생성자를 사용한다.
    return new RegExp( `^(?=.*[a-zA-Z])(?!.*[^a-zA-Z0-9_])+[a-zA-Z0-9]{${min},${max}}$`);
  }

  /**
   * email 체크
   */
  public static getEmailRegx(): RegExp{
    return /^[a-z0-9!#$%&'*+\\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/ig;
  }

  /**
   * 문자열 여러개 중 개별 1개 문자에 대한 바이트 계산
   * @param txt 문자
   * @returns {number}
   */
  public static getCharByteSize(txt: string): number {
    if (txt === null || txt.length === 0) {
      return 0;
    }
    //byte 는 -128 ~ 127 까지  0x00 ~ 0xFF (1 바이트)
    //2byte = 16bit = 2^16 = 65,536
    const charCode = txt.charCodeAt(0);
    if (charCode <= 127 ) {  //0x00007F
      return 1;
    } else if (charCode <= 2047 ) { //0x0007FF
      return 2;
    } else if (charCode <= 65535 ) {//0x00FFFF
      return 3;
    } else {
      return 4;
    }
  }

  /**
   * 여러 문자열 중 검색시 1개 문자에 대한 바이트 계산
   * @param txt 문자
   * @param idx 인덱스
   * @returns {*|number}
   */
  public static getCharIndexToBytes(txt: string, idx: number): number {
    return Utils.getCharByteSize( Utils.getCharByIndex(txt, idx) );
  }

  public static getCharByIndex(txt: string, idx: number): string {
    return txt.charAt(idx);
  }


  /**
   * 크로스브라우징 window.width
   * @returns {Number|number}
   */
  public static getWindowWidth(): number {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  /**
   * 크로스브라우징 window.height
   * @returns {Number|number}
   */
  public static getWindowHeight(): number {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }


  public static getDocHeight(): number{
    const doc = document;
    return Math.max(
      doc.body.scrollHeight, doc.documentElement.scrollHeight,
      doc.body.offsetHeight, doc.documentElement.offsetHeight,
      doc.body.clientHeight, doc.documentElement.clientHeight
    );
  }

  /**
   * 인수로 전달된 엘리먼트의 영역 범위( 위치 및 사이즈 ) 호출
   * @param ele
   * @returns {*}
   */
  public static getBoundingClientRect(ele: HTMLElement): object {
    const clientRect: DOMRect = ele.getBoundingClientRect();

    // ie8 에서 width/height 속성이 없다.
    if (typeof clientRect.height === 'undefined') {
      return {
        top: clientRect.top,
        bottom: clientRect.bottom,
        left: clientRect.left,
        right: clientRect.right,
        width: clientRect.right - clientRect.left,
        height: clientRect.bottom - clientRect.top
      };
    }
    return clientRect;
  }

  /**
   * 대시(-)가 붙은 날짜를 숫자타입으로 배열에 넣어 리턴 [ 년, 월, 일 ]
   * @param date
   * @returns {number[]}
   */
  public static dateDashFormatUndo( date: string ): number[] {
    const dateInfo: string[]=String( date ).split('-');
    // tslint:disable-next-line:radix
    return [ parseInt( dateInfo[0] ), parseInt( dateInfo[1] ), parseInt( dateInfo[2] ) ];
  }

  /**
   * 오늘을 기준으로 2020-07-11 처럼 대시(-)가 붙은 날짜로 변환
   * @param today
   * @returns {string}
   */
  public static  getTodayParseFormat( today: Date )  {
    const dateInfo: number[] =Utils.getTodayFullValue( today );
    return Utils.getDateDashFormat( dateInfo[0], dateInfo[1], dateInfo[2] );
  }

  /**
   * 년월일 표기
   * @example Utils.getCustomFormatDate( new Date(updateDate), '-', 0 )  updateDate 는 대입할 date 변수  ---> 2021-8-21
   * @param date
   * @param flag
   * @param type - 기본값 0 / 0-년월일 모두 표기 / 1 -년월만 표기 / 2 -월일만 표기
   */
  public static getCustomFormatDate(date: Date, flag: string, type: number=0 ) {
    const dateInfo: number[] =Utils.getTodayFullValue( date );
    let result: string = '';
    switch (type) {
      case 0 :
        result = `${dateInfo[0]}${flag}${dateInfo[1]}${flag}${dateInfo[2]}`; //년월일 모두 표기
        break;
      case 1:
        result = `${dateInfo[0]}${flag}${dateInfo[1]}`; //년월만 표기
        break;
      case 2:
        result = `${dateInfo[1]}${flag}${dateInfo[2]}`;//월일만 표기
        break;
    }
    return result;
  }

  /**
   *  윤년 체크
   * @param year
   * @returns {boolean}
   */
  public static  isLeapYear(year: number) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
  }

  /**
   * 지정한 월의 날짜 개수 구하기
   * @param year
   * @param month
   * @returns {number}
   */
  public static  getDaysInMonth(year: number, month: number): number {
    return [31, ( Utils.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }

  /**
   * 1970년 1월 1일 00:00:00 국제 표준시(UTC)와의 차이를 밀리초 수로 나타내 반환.
   * @returns {Date}
   * @constructor
   */
  public static UTCDate(...args: number[] ): Date{
    // @ts-ignore
    return new Date(Date.UTC.apply(Date, args) );
  }
  /**
   * 오늘을 기준으로 국제 표준시(UTC) 반환
   * @returns {Date}
   * @constructor
   */
  public static UTCToday(): Date{
    const today = new Date();
    return Utils.UTCDate( today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  }

  /**
   * 특정 날부터 지정한 기간의 날짜 구하기 -> 즉 2020-10-7 에서 1개월 후는 2020-11-23 이다. 여기서 23일 을 구하는 함수
   * @param year
   * @param month
   * @param day
   * @returns {number}
   */
  public static getRemainderFromToday( year: number, month: number, day: number ): number {
    return Utils.getDaysInMonth( year, month ) - day;
  }

  /**
   * 오늘을 기준으로 년,월,일 을 배열 타입 리턴
   * @param today
   * @returns {(number)[]}
   */
  public static  getTodayFullValue( today: Date ): number[] {
    return [ today.getFullYear(), today.getMonth() + 1,  today.getDate() ];
  }

  /**
   * 숫자로 되어 있는 년, 월, 일을 대시(-)가 붙은 날로 변환 즉 숫자  2020, 7, 11 을 --> 2020-07-11 로 변환
   * @param yyyy
   * @param mm
   * @param dd
   * @returns {string}
   */
  public static getDateDashFormat( yyyy: string | number, mm: string | number, dd: string | number ) {
    return yyyy+'-'+( mm<10 ? '0'+mm : mm )+'-'+( dd<10 ? '0'+dd : dd );
  }

  /**
   * 오늘 날짜 --> 요일로 표기.
   * @param date
   */
  public static dayToString( date: Date ): string{
    const dayNum: string[] = ['일', '월', '화', '수', '목', '금', '토'];
    return dayNum[date.getDay()]+'요일';
  }

  /**
   * 년 월 일 표시
   * @param date
   */
  public static getFullDay(date: Date): string{
    return Utils.getTodayParseFormat(date)+' '+Utils.dayToString( date )+' '+Utils.getFullTimes( date );
  }

  /**
   * 24시간 표시 - 시/분
   * @param date
   */
  public static getFullTimes( date: Date ): string{
    const hours=Utils.hoursConvertToApm( date.getHours() );
    const minutes =date.getMinutes();
    return hours + '시 ' + minutes + '분';
  }

  public static getHours( isTwentyFour: boolean, dateValue: Date | number ) {
    const hours=(typeof dateValue ==='number' )? dateValue : dateValue.getHours();
    if( isTwentyFour ){
      return hours;
    }else{
      return ( hours>12 )? hours-12 : hours;
    }
  }

  public static getMinutes(dateValue: Date | number): number {
    return (typeof dateValue ==='number' )? dateValue : dateValue.getMinutes();
  }


  /**
   * 오전 오후 표시해 주는 시간.
   * @param hours
   */
  public static hoursConvertToApm( hours: number ): string | number{
    const apm = Utils.getAmPm(hours);
    return String( apm+' '+Utils.getHours( false, hours ) );
  }

  public static getAmPm( hours: Date | number): string{
    const targetHours = (typeof hours === 'number') ? hours : hours.getHours();
    return (targetHours > 12) ? '오후' : '오전';
  }

  /**
   * 오늘을 기준으로 언제 업데이트 했는지 알아내기- 시/분 만 계산  ( 일주일 전까지만 체크 )
   * @param dateValue
   */
  public static calcDate(dateValue: Date): number[] {
    const today = Date.now();
    const updateDate = new Date(dateValue);
    const updateDateTime=updateDate.getTime();
    const calcDate=today - updateDateTime;
    const msOfDay = 24*60*60*1000;
    const msOfHour = 60*60*1000;
    const msOfMin = 60*1000;
    // console.log(new Date(dateValue));
    //, new Date(dateValue), calcDate/ 1000 / 60 / 60 / 24/365

    const calcDay: number = Math.floor( calcDate / msOfDay );
    const calcHour: number =( calcDay>7 )? Math.floor( calcDate / msOfHour ) : Math.floor((calcDate%msOfDay) / msOfHour );
    const calcMin: number =( calcDay>7 )? Math.floor( calcDate / msOfMin ) : Math.floor((calcDate %msOfHour) /msOfMin );

    // const calcMonth = Math.floor( calcDate / (msOfDay * 30) );
    // const calcYear = Math.floor( calcDate / (msOfDay * 30 * 12));
    // calcYear=(calcYear>0)? new Date(dateValue).getFullYear() : 0;
    // calcMonth=(calcMonth>12)? calcMonth-12 : calcMonth;
    // console.log(today, '일수 차이=', calcDay );
    return [ calcDay,  calcHour, calcMin ];
  }

  /**
   * 오늘을 기준으로 언제 업데이트 했는지 알아내기-( 일주일 전까지만 체크 )
   * 업데이트 한지 일주일이 넘는다면 년-월-일/ 표시 그렇지 않다면 시/분 표시
   * @param dateValue
   * @private
   */
  public static updatedDiffDate( dateValue: Date ): string{
    const resultDate=Utils.calcDate(dateValue);
    // console.log( resultDate[0], resultDate[1], resultDate[1]);
    return ( resultDate[0]>7 )? Utils.getTodayParseFormat( new Date(dateValue) ) : resultDate[1]+'시 '+resultDate[2]+'분 전';
  }

  /**
   * 오늘을 기준으로한 달의 모든 일자 개수 만큼 배열에 내제화시켜 반환
   */
  public static getDayItems() {
    const [year, month, ]= Utils.getTodayFullValue( new Date() );
    return Array.from({ length: Utils.getDaysInMonth(year, month) }, (v, i) => i);
  }

  /**
   * 주어진 범위내에 랜덤 수 얻기.
   * @param min
   * @param max
   */
  public static getRandomNum( min: number, max: number ): number {
    return Math.floor(Math.random()*(max-min+1)) + min;
  }

  /**
   * 브라우저 리로
   */
  public static getWindowReload(): void{
    window.location.reload();
  }

  /**
   * 마우스 이벤트 생성
   * @param eventName
   */
  public static createMouseEvent(eventName: string): MouseEvent{
    return new MouseEvent( eventName, {
      view: window,
      bubbles: false,
      cancelable: false
    });
  }

  /**
   * 파일 타입 체크 - resultByBytes 체크 값 수정 필요.
   * @param file
   */
  public static getFileType(file: File) {
    let fileVerifiedType: any = '';
    const slice = file.slice(0, 4);
    const reader = new FileReader();
    reader.readAsArrayBuffer(slice); // 파일 조각 읽어들임.
    reader.onload =  ( e: ProgressEvent<FileReader>) => {
      const buffer = reader.result as ArrayBuffer; // 결과 ArrayBuffer
      const view = new DataView( buffer ); // 결과 바이트의 접근 권한을 획득.
      const resultByBytes = view.getUint32(0, false);// 빅 엔디언으로  4바이트를 읽어 들인다.
      console.log('resultByBytes=', resultByBytes);
      switch (resultByBytes) {
        case 0x89504E47:
          fileVerifiedType = 'image/png';
          break;
        case 0x47494638:
          fileVerifiedType = 'image/gif';
          break;
        case 0x25504446:
          fileVerifiedType = 'application/pdf';
          break;
        case 0x504b0304:
          fileVerifiedType = 'application/zip';
          break;
      }
    };

    return fileVerifiedType;
  }

  /**
   * 배열 평탄화
   * @param items
   */
  public static getFlatten( items: any[] ): any[]{
      const stack = [...items];
      const res = [];
      while(stack.length) {
        // pop value from stack
        const next = stack.pop();
        if(Array.isArray(next)) {
          // push back array items, won't modify the original input
          stack.push(...next);
        } else {
          res.push(next);
        }
      }
      // reverse to restore input order
      return res.reverse();
  }

  /**
   *  textarea height 값 텍스트 라인 수에 맞추어 계산
   * @param value
   * @param fixH
   * @private
   */
  public static autoResizeTextArea( value: string, fixH: number=20 ): number{
    const numOfLine: number = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height
    return fixH + numOfLine* fixH;
  }

  /**
   * undefined 인지 체크
   * @param value
   */
  public static isUndefined( value: any ): boolean {
    return typeof value === 'undefined';
  }

  /**
   * empty 인지 체크
   * @param value
   */
  public static isEmpty( value: any ): boolean {
    return Utils.isUndefined(value) || value === '' || value === null || value !== value;
  }

  /**
   * 유효한 url 체크 - true 면 유효한 url
   * @param targetTxt: string
   */
  public static getIsValidLink( targetTxt: string ): boolean {
    const regx = /((((https?)?:\/\/)|(www\.)?|www\.))([a-z0-9.]+)(\.[a-z]{2,4})(\.[a-z]{1,2})?([^?\s]+(\?((\w+)(=[^&\s]+)?&?)+)?)?/g;
    return targetTxt.search(regx) !== -1;
  }


  /**
   * 배열 값 중 중복된 값 체크하여 카운트 지정시킴
   * @param arr
   */
  public static getDuplicateArrCount( arr: any[] ){
    const result: { [key: string]: number } = {};
    arr.forEach( (x: string) => {
      result[x]= (result[x] || 0)+1;
    });
    return result;
  }

  /**
   * getDuplicateArrayCount 함수로 중복값 체크된 object 를 배열로 변환
   * @param obj - { [key: string]: string | number}
   */
  public static getDuplicateObjToArr( obj: { [key: string]: string | number} ): Array<{result: string, count: string | number}>{
    const arr: Array<{result: string, count: string | number}>=[];
    for( const [key, value] of Object.entries(obj) ){
      // console.log(key, value);
      arr.push({ result: key, count: value });
    }
    return arr;
  }

  /**
   * 중복된 값 체크 하여 카운트 제공 ~
   * @param arr
   */
  public static getDuplicateArrayCheck(arr: any[]): Array<{result: string, count: string | number}> {
    return Utils.getDuplicateObjToArr(Utils.getDuplicateArrCount(arr));
  }

  /**
   * unique 한 배열 만들기 ( 중복값 제거 후 배열화 )
   * @param arr
   */
  public static uniqArray(arr: any[]){
    return [...new Set(arr)];
  }

  public static isArray( value: unknown ): boolean{
    return ({}).toString.call(value) === '[object Array]';
  }


  /*
  어떤 페이지를 로딩하는 데 필요한 전체 시간 계산하기.
  * var perfData = window.performance.timing;
var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

요청 응답 시간 계산하기.
var connectTime = perfData.responseEnd - perfData.requestStart;
  * */

}

export {Utils};
