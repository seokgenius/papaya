<template>
 <div>
   <nav id="gnb" class="pd-desc">
     <ul class="menu">
       <li><router-link :to="{path:'/'}" @click="closeListMenu">홈</router-link></li>
       <li><router-link :to="{path:'/all/notify'}">모든 알림</router-link></li>
       <li><router-link :to="{path:'/all/schedule'}">모든 일정</router-link></li>
<!--       <li><a href="">자료실</a></li>-->
       <li><a href="#" class="top-search" :class="{'active': isSearchChk}" @click.prevent.stop="onSearch"></a></li>
       <li><a href="#" class="top-alert"></a></li>
       <li>
         <div class="list-popup" v-click-outside="closeListMenu">
           <!-- sub-menu-btn 에 active 추가 시 arrow 버튼 활성화 -->
           <button type="button" class="list-popup-btn sub-menu-btn" :class="{'active': isActive}" @click.stop.prevent="subMenuToggle">
             <!--           <img :src="replaceUserMenuImg()? require('@/assets/images/mypage-white.svg' ) : require('@/assets/images/mypage.svg' )" alt="" />-->
           </button>
           <div class="list-popup-menu" :class="{'active': isActive}" >
             <template v-if="isMyInfo">
               <router-link :to="{path:'/myProfile'}" class="list-popup-item" @click.native="leftMenuActive(0)">MY프로필</router-link>
               <router-link :to="{path:'/bookmark'}" class="list-popup-item" @click.native="leftMenuActive(1)">보관함</router-link>
               <div class="line"></div>
             </template>
             <router-link :to="{path:'/noticeBoard'}" class="list-popup-item" @click.native="leftMenuActive(0)">공지사항</router-link>
             <router-link :to="{path:'/customerCenter'}" class="list-popup-item" @click.native="leftMenuActive(1)">고객센터</router-link>
             <router-link :to="{path:'/termsOfService'}" class="list-popup-item" @click.native="leftMenuActive(2)">이용약관</router-link>
             <div class="line"></div>
             <template v-if="isMyInfo">
               <a href="" class="list-popup-item" @click.prevent="isLogout">로그아웃</a>
             </template>
             <template v-else>
               <a href="" class="list-popup-item" @click.prevent="gotoSignUpPage">회원가입</a>
             </template>

           </div>
         </div>
       </li>
     </ul>
   </nav>

   <!--  <ul class="sub-menu">

   <li><a href="#"><img src="../../assets/images/mypage-white.svg" alt="" /></a></li>-->
     <!--<li>
       <a v-click-outside="onClickOutside"
          href="#" class="arrow-down"
          :class="{'active': isActive}"
          @click.stop.prevent="subMenuToggle">
         <img src="../../assets/images/a-down.png" alt="" />
       </a>
       <ul class="depth-2" :class="{'active': isActive}">
         <li><router-link :to="{path:'/myProfile'}">MY프로필</router-link></li>
         <li><router-link :to="{path:'/bookmark'}">보관함</router-link></li>
         <li class="bd-btm"><a href="#">활동내역</a></li>
         <li><a href="#">공지사항</a></li>
         <li><a href="#">고객센터</a></li>
         <li class="bd-btm"><a href="#">이용약관</a></li>
         <li><a href="#" @click="isLogout">로그아웃</a></li>
       </ul>
     </li>
   </ul>-->
 </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {IUserMe} from '@/api/model/user.model';
import EventBus from '@/store/EventBus';
import {LoginMutationType} from '@/store/mutation-auth-types';

const Auth = namespace('Auth');
const MyClass = namespace('MyClass');
const SearchStatus = namespace('SearchStatus');

@Component
export default class HeaderMenuView extends Vue {
  private isActive: boolean = false;
  private isSearch: boolean= false;
  private isUser: boolean = false;

  @Auth.Getter
  private userInfo!: IUserMe;

  @Auth.Mutation
  private [LoginMutationType.LOGOUT]!: () => void;

  @MyClass.Mutation
  private REMOVE_CLASS_DATA!: () => void;

  @SearchStatus.Getter
  private isSearchChk!: boolean;

  @SearchStatus.Mutation
  private SEARCHING!: ( chk: boolean )=>void;

  //로그인한 회원인지 아닌지 체크
  get isMyInfo() {
    return !!this.userInfo;
  }

  private isLogout(): void {
    this[LoginMutationType.LOGOUT]();
    this.REMOVE_CLASS_DATA();
    this.$router.push({path:'/login'});
  }

  /**
   * 우측 화살표 버튼 클릭시 하위 메뉴 노출
   * @private
   */
  private subMenuToggle(): void {
    this.isActive = !this.isActive;
  }

  /**
   * 바깥 영역 클릭하거나 링크 자신 클릭시
   * subMenuToggle 닫기
   * @private
   */
  private closeListMenu(): void {
    this.isActive = false;
  }

  /**
   * EventBus를 이용한 마이페이지 좌측 메뉴 활성화 값 전달
   * @param idx
   * @private
   */
  private leftMenuActive(idx: number): void {
    this.closeListMenu();
    EventBus.$emit('activeLeftMenu', idx);
  }

  private onSearch(): void {
    if( this.isSearchChk !== this.isSearch){
      this.isSearch=this.isSearchChk;
    }
    this.isSearch=!this.isSearch;
    this.SEARCHING(this.isSearch);
    // console.log('search 클릭');
  }


  private gotoSignUpPage(): void {
    this.$router.push('/signup');
  }

}
</script>

<style>
</style>
