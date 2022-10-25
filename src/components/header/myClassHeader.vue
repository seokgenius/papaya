<template>
  <!-- start: header -->
  <header class="white">
    <div class="header-container">

      <h1 class="logo">
        <router-link :to="{path:'/'}"><img :src="require('@/assets/images/logo-logotype-red.png')" alt="papaya" /></router-link>
      </h1>


      <!--  :items="startYears" @change="updateYears" :selected-value="selectDataModel" -->
      <!--<div class="class-select">
         <select-box id="startYear" size="390" ></select-box>
      </div>-->
      <div class="class-select">
        <!--<select class="form-select">
          <option value="" selected>꿈꾸는 5학년 1반</option>
        </select>
-->
        <select-box
            id="classNameSelectBox"
            size="266"
            add-class="form-select"
            :items="myClassNamesModel"
            :selected-value="selectMyClassModel"
            @change="onChangeMyClass"></select-box>
      </div>

      <header-menu-view></header-menu-view>
    </div>
    <search v-if="isSearchChk"></search>
  </header>
  <!-- //end: header -->

</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {IUserMe} from '@/api/model/user.model';
import Search from '@/components/header/search.vue';
import HeaderMenuView from '@/components/header/headerMenuView.vue';
import {IMyClassList} from '@/views/model/my-class.model';
import SelectBox from '@/components/selectbox/SelectBox.vue';
import {CLASS_BASE_URL} from '@/api/base';

const SearchStatus = namespace('SearchStatus');
const Auth = namespace('Auth');
const MyClass = namespace('MyClass');

@Component({
  components:{
    HeaderMenuView,
    Search,
    SelectBox
  }
})
export default class MyClassHeader extends Vue {


  @MyClass.Mutation
  private UPDATE_SIDE_NUM!: (num: number)=>void;


  @MyClass.Action
  private MYCLASS_HOME!: ( id: string | number )=> Promise<any>;

  @MyClass.Action
  private MYCLASS_LIST_ACTION!: () => Promise<IMyClassList[]>;


  @SearchStatus.Getter
  private isSearchChk!: boolean;

  @Auth.Getter
  private userInfo!: IUserMe | null;

  @Auth.Getter
  private isAuth!: boolean;

  @MyClass.Getter
  private myClassLists!:  IMyClassList[];

  private myClassNameItems: string[] = [];
  private myClassIdxItems: string[] | number[] = [];
  private selectMyClass: string = '';

  get selectMyClassModel(): string{
    return this.selectMyClass;
  }

  get myClassNamesModel(): string[]{
    return this.myClassNameItems;
  }

  public created(){

    // console.log('myClassLists=', this.myClassLists.length, this.userInfo, this.isAuth );

    //로그인한 상태이지만 현재 갱신된 상태이기에 데이터를 재지정 해줄 필요가 있다.
    if (this.isAuth && this.userInfo === null) {
      this.MYCLASS_LIST_ACTION()
          .then((data) => {

            // console.log(data);
            this.init();
            this.selectBoxCurrentStatus();
          });
    }else{
      if ( this.myClassLists ) {
        //
        this.init();
        this.selectBoxCurrentStatus();
      }
    }
  }

  private init() {
    this.myClassNameItems=this.myClassLists.map( (item) => item.name);
    this.myClassIdxItems=this.myClassLists.map( (item) => item.id);
  }

  private selectBoxCurrentStatus() {
    //클래스 홈(상세) 로 접근하면 route param 으로 classId 를 가져와서
    // 현재 접근한 클래스 목록 중 현재 어떤 클래스에 진입했는지 목록을 표시할 수 있게 한다.
    const classIdx=this.$route.params.classId;
    if( classIdx ){
      const findIdx=this.myClassIdxItems.findIndex( ( item: string | number ) => item === Number(classIdx));
      this.selectMyClass = this.myClassNameItems[findIdx];
    }else{
      this.selectMyClass = this.myClassNameItems[0];
    }

    // console.log(this.selectMyClass);
  }

  private onChangeMyClass( value: string | number ): void {
    this.selectMyClass=value as string;

    const findIdx=this.myClassNameItems.findIndex( (item)=> item === this.selectMyClass  );
    const selectClassID = this.myClassIdxItems[findIdx];

    this.MYCLASS_HOME(selectClassID).then((data)=>{
      // location.reload(); //, query: { q: `${new Date().getTime()}` }
      this.$router.push({path: `${CLASS_BASE_URL}/${selectClassID}` })
          .then(( )=>{
            this.UPDATE_SIDE_NUM(0);
            // console.log(selectClassID, ':: 해당 클래스 홈 이동');
            // console.log('MYCLASS_HOME 호출후 this.classID = ', this.classID, localStorage.getItem('classId'), this.classIdModel );
          });
    });

    /*this.$router.push({path:`${CLASS_BASE_URL}/${selectClassID}`,   query: { q: `${new Date().getTime()}` } })
    .then(()=>{
      location.reload();
    });*/

  }
}
</script>

<style>
</style>
