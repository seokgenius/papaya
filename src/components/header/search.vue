<template>
  <div class="search-page" style="">
    <div class="search-top">
      <div class="search-inner">
        <div class="search-bar clearfix">
          <div class="tb-style full">
            <div class="tb-cell" style="width:80%;">
              <!--                          <input type="text" class="form-search" placeholder="검색어를 입력해 주세요." v-model="searchValue" @input="watchBySearchModel( $event.target.value )">-->
              <txt-field id="searchInput"
                         placeholder="검색어를 입력해 주세요."
                         add-class="form-search no-border"
                         v-model="searchValue"
                         @input="watchBySearchModel"
                         :key-enter="moveToSearchResult"></txt-field>
            </div>
            <div class="tb-cell rt"><button type="button" class="btn primary red" @click.prevent.stop="moveToSearchResult( searchValue )">검색</button></div>
          </div>
        </div>
      </div>

      <!-- autocomplete 부분 -->
      <div class="search-word" v-if="isSearch">
        <div class="search-inner">
          <ul class="search-word-list">
            <li v-for="(item, index) in searchItems" :key="`searchItems-${index}`">
              <a href="" class="result-link" @click.prevent.stop="moveToSearchResult( item.name )">
                <div class="tb-cell result-tit" v-html="boldSearchResult( item.name )"></div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>


    <!-- start: 검색 랜딩  -->
    <div class="search-cnt" v-if="isLandingPage">
      <div class="recommend">
        <p class="recommend-tit">#추천 키워드</p>
        <div class="keyword">
          <div class="search-inner">
            <transition-group class="keyword-list clearfix" tag="ul" name="slideY" @before-enter="beforeEnterKeywords" @after-enter="afterEnter">
              <li v-for="(item, index) in recommandItems" :key="`hashtag-${index}`" :data-index="index">
                <a href="#" @click.prevent="gotoTagKeyword( item.keyword )">{{ item.keyword }}</a></li>
            </transition-group>
            <!--<ul class="keyword-list clearfix">
                <li v-for="recommandItem in recommandItems"><a href="">{{ recommandItem.keyword }}</a></li>
                &lt;!&ndash;<li><a href="">온라인스터디</a></li>
                <li><a href="">중국어조기교육</a></li>
                <li><a href="">코딩교육</a></li>
                <li><a href="">영어학원</a></li>
                <li><a href="">파파야</a></li>&ndash;&gt;
            </ul>-->
          </div>
        </div>
      </div>

      <div class="search-classes">
        <div class="search-inner">
          <div class="tb-cnt">
            <table class="tb tb-search">
              <colgroup>
                <col style="width:380px">
                <col style="width:180px">
                <col style="width:470px">
              </colgroup>
              <thead>
              <tr>
                <th><strong>TOP 5 인기 클래스</strong></th>
                <th>운영자</th>
                <th>태그</th>
              </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>

      <div class="search-classes bg-white">
        <div class="search-inner">
          <div class="tb-cnt">
            <table class="tb tb-search">
              <colgroup>
                <col style="width:380px">
                <col style="width:180px">
                <col style="width:470px">
              </colgroup>
              <transition-group tag="tbody" name="slideY" @before-enter="beforeEnterBestItem" @after-enter="afterEnter">
                <tr v-for="( bestItem, index ) in bestItems" :key="`cell-${index}`" :data-index="index">
                  <td>
                    <a href="#" @click.prevent.stop="gotoLink( bestItem )">
                      <div class="tb-style">
                        <div class="tb-cell wd-30">{{ bestItem.rank }}</div>
                        <div class="tb-cell">
                          <img v-once :src="getProfileImg(  bestItem.class.image_url )" alt="" style="width:32px; height:32px;border-radius:50%;">
                        </div>
                        <div class="tb-cell pdl-10">
                          <span class="group-tit">{{ bestItem.class.g_name }}</span>
                          <p class="class-tit">{{ bestItem.class.name }}</p>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td>
                    <p class="class-admin">{{ getNickname( bestItem) }}</p>
                  </td>
                  <td>
                    <div class="class-tag">
                      <a href="#" @click.prevent.stop="gotoLink( bestItem )">
                        <p>{{ getHashTag(bestItem.class.class_tags) }}</p>
                        <span class="search-more"><img :src="require('@/assets/images/arrow-right.svg')" alt=""></span>
                      </a>
                    </div>
                  </td>
                </tr>
              </transition-group>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- end: 검색 랜딩  -->

  </div>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import TxtField from '@/components/form/txtField.vue';
import ImageSettingService from '@/views/service/profileImg/ImageSettingService';
import {
  resetSearchInput,
  searchKeyEventObservable,
  searchUserKeyValueObservable
} from '@/views/service/search/SearchService';
import {Log} from '@/decorators';
import {CLASS_BASE_URL} from '@/api/base';
import {SearchApiService} from '@/api/service/SearchApiService';


const MyClass = namespace('MyClass');
const SearchStatus = namespace('SearchStatus');

const SEARCH_TYPE={
  HOME:'home',
  INPUT:'input',
  RESULT:'result'
};

@Component({
  components:{
    TxtField
  }
})
export default class Search extends Vue {

  public isLoading: boolean= false;
  private recommandItems: any[] = [];
  private bestItems: any[] = [];
  private searchValue: string = '';
  private searchItems: any[]=[];
  private searchType: string = 'home';

  @MyClass.Getter
  private classID!: string | number;

  @MyClass.Action
  private MYCLASS_HOME!: (id: string | number) => Promise<any>;


  @SearchStatus.Mutation
  private SEARCHING!: ( chk: boolean )=>void;

  @SearchStatus.Action
  private SEARCH_RESULT_ACTION!: ( payload: { keyword: string, page_no: number, count: number} )=>Promise<any>;

  @SearchStatus.Action
  private SEARCH_TAG_RESULT_ACTION!: (payload: { keyword: string, page_no: number, count: number } )=>Promise<any>;

  get bestItemsModel() {
    return this.bestItems;
  }

  get isLandingPage() {
    return this.searchType === SEARCH_TYPE.HOME;
  }

  get isSearch() {
    return this.searchType === SEARCH_TYPE.INPUT;
  }

  get isSearchResult() {
    return this.searchType === SEARCH_TYPE.RESULT;
  }

  @Log('search')
   public value() {
    const test = 'test';
  }

  public created() {
    this.getSearchHome();
  }

  public mounted() {
    setTimeout(() => {
      const searchInput=document.querySelector('#searchInput');
      if ( searchInput !== null ) {
        ( searchInput as HTMLInputElement ).focus();
      }
    }, 1000);
  }

  public getNickname( bestItem: any ) {
    return bestItem.class.is_private || bestItem.class.owner === null ? '비공개' : bestItem.class.owner.nickname;
  }

  private getSearchHome() {
    SearchApiService.getSearchHome()
        .then( (data)=>{
          // console.log(data);
          this.bestItems=data.best_classlist;
          this.recommandItems=data.recommended_keywords;

          // console.log(this.bestItems );
        });
  }

  private getProfileImg(imgUrl: string | null | undefined ): string{
    return ImageSettingService.getProfileImg( imgUrl );
  }

  private getHashTag( items: string[] ): string | undefined {
    if( !items ){ return; }
    // console.log(' items=',  items)
    if( items.length === 0 ){ return; }
    const keywords= items.map( ( prop: any ) => '#' + prop.keyword) ;
    return keywords.join(' ');
  }

  private gotoLink( item: any ): void {
    console.log(item);
    this.searchType = SEARCH_TYPE.RESULT;

    // console.log('item.class.me=', item.class.me);

    // const shortcutURL = (item.class.me !== null) ? `${CLASS_BASE_URL}/${item.class_id}` : `${CLASS_BASE_URL}/${item.class_id}/enrollClass`;

    //클래스 멤버일때
    if (item.class.me !== null) {
      this.MYCLASS_HOME(item.class_id).then(()=>{
        this.$router.push({path: `${CLASS_BASE_URL}/${item.class_id}`})
            .then(( )=>{
              console.log(item.class_id, ':: 해당 클래스 홈 이동');
            });
      });
    }else{
      //path: `${CLASS_BASE_URL}/enrollClass`, query:{ classIdx:idx }  //item.class_id
      this.$router.push({path: `${CLASS_BASE_URL}/enrollClass`, query:{ classIdx:item.class_id }}).then(()=>{
        location.reload();
      });
    }

    this.SEARCHING(false);

  }



  // 트랜지션을 시작할 때 인덱스 * 100 ms 만큼의 딜레이를 적용합니다.
  private beforeEnterBestItem(el: HTMLElement): void {
    if(el.dataset.index !=='0'){
      // el.classList.add('skeleton-inner');
      // console.log(this.startNum, this.endNum);
      this.isLoading=true;
      el.style.transitionDelay =this.delayTime(150, String( el.dataset.index ), this.recommandItems.length);
    }
  }

  // 트랜지션을 시작할 때 인덱스 * 100 ms 만큼의 딜레이를 적용합니다.
  private beforeEnterKeywords(el: HTMLElement): void {
    if(el.dataset.index !=='0'){
      // el.classList.add('skeleton-inner');
      // console.log(this.startNum, this.endNum);
      // this.isLoading=true;
      el.style.transitionDelay = this.delayTime(120, String( el.dataset.index ), this.recommandItems.length);
    }
  }

  private afterEnter(el: HTMLElement): void {
    this.isLoading=false;
    el.style.transitionDelay = '';
  }

  private delayTime(speed: number, idx: string | number, len: number): string {
    const delay = (typeof idx === 'string') ? parseInt(idx as string, 10) : idx;
    return speed * (delay % len) + 'ms';
  }


  private watchBySearchModel(val: string) {
    this.searchValue = val;

    this.searchType = (this.searchValue !== '') ? SEARCH_TYPE.INPUT : SEARCH_TYPE.HOME;
    if (this.searchType === SEARCH_TYPE.INPUT) {
      this.search();
    }
  }



  /**
   * 검색어와 매칭되는 키워드만 볼드 처리
   * @param word
   * @private
   */
  private search() {
    this.searchItems = [];

    //$nextTick - 해당하는 엘리먼트가 화면에 렌더링이 되고 난 후
    this.$nextTick(() => {
      const searchClassInput = document.querySelector('#searchInput');
      if (searchClassInput !== null) {
        (searchClassInput as HTMLInputElement) .focus();
      }


      //키가 눌렸을 때 체크 Observable
      // targetInputSelector: string
      const key$ = searchKeyEventObservable('#searchInput');
      const userInter$ = searchUserKeyValueObservable(key$, this.changeLoaded, {
        fn: SearchApiService.getSearchResult,
        args: null
      }, this.isLoading);
      userInter$.subscribe({
        next: (data: any) => {
          // console.log( data.classlist );
          this.searchItems = data.classlist
              .map((item: any) => item)
              .filter((item: any) => {
                return item.name.match(this.searchValue) !== null;
              });
        },
      });

      //검색어 없을 시 리셋 Observable
      //obv$: Observable<any>, reset: ()=>void
      const reset$ = resetSearchInput(key$, () => {
        this.isLoading = false;
        this.searchItems = [];
      });
      reset$.subscribe();
    });
  }

  /**
   * 검색어와 매칭되는 키워드만 볼드 처리
   * @param word
   * @private
   */
  private boldSearchResult( word: string): string{
    const startIndex=word.indexOf(this.searchValue);
    const endIndex=startIndex+this.searchValue.length;
    const searchResultWord=word.substr(startIndex, this.searchValue.length);
    return [word.slice(0, startIndex), `<strong>${searchResultWord}</strong>`, word.slice(endIndex, word.length)].join('');
  }

  /**
   * 태그 검색
   * @param keyword
   * @private
   */
  private gotoTagKeyword(keyword: string) {
    this.searchType = SEARCH_TYPE.RESULT;
    this.SEARCHING(false);

    this.getSearchResultData(keyword);
  }


  /**
   *  키워드 검색 결과 api 통신 후 결과 페이지 이동
   * @param keyword
   * @private
   */
  private getSearchResultData( keyword: string ) {
    console.log('keyword=', keyword);
    this.SEARCH_RESULT_ACTION({keyword, page_no:1, count:10})
        .then((data) => {
          console.log(data);
          // , query: { timeStamp: `${new Date().getTime()}` } 처럼 query 값을 같이 주는 이유는 새로고침 후
          // 검색결과  router 주소값이 매번 /search/result 와 같이 똑같은 url 값으로 라우터 이동이 이루어지기 때문에
          //주소값을 매번 검색시 갱신해 줄 필요가 있다.
          //, query: { q: `${new Date().getTime()}` }
          this.$router.push({ path: '/search/result' }).then(() => {
            console.log(`SearchResultPage` + '으로 이동');
          }).catch((error)=>{
            console.log(error);
          });
        });
  }



  /**
   *
   * @param keyword
   * @private
   */
  private moveToSearchResult( keyword: string='' ): void {
    this.searchType=SEARCH_TYPE.RESULT;
    this.SEARCHING(false);
    const schKeyword = (keyword === '') ? this.searchValue : keyword;
    this.getSearchResultData(schKeyword);
  }

  /**
   *  isLoading change
   * @private
   */
  private changeLoaded(): void{
    this.isLoading=!this.isLoading;
  }




}
</script>

<style scoped>

</style>
