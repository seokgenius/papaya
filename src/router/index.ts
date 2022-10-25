import Vue from 'vue';
import VueRouter, {RawLocation, RouteConfig} from 'vue-router';
import {getIsAuth} from '@/router/AuthGuard';
import {LoginRouter} from '@/router/LoginRouter';
import {SignUpRouter} from '@/router/SignUpRouter';
import {MyPageRouter} from '@/router/MyPageRouter';
import {MyClassRouter} from '@/router/MyClassRouter';
import MyClassHeader from '@/components/header/myClassHeader.vue';
import AppHeader from '@/components/header/header.vue';
import AppFooter from '@/components/footer/footer.vue';
import {SearchResultRouter} from '@/router/SearchResultRouter';
import {FooterBoardRouter} from '@/router/FooterRouter';
import {AllContentsRouter} from '@/router/AllContentsRouter';

Vue.use(VueRouter);

// @ts-ignore
const routes: RouteConfig[] = [
  ...LoginRouter,
  ...SignUpRouter,
  {
    path: '/class/enrollClass',
    name: 'EnrollClass',
    beforeEnter: getIsAuth,
    components: {default: () => import('@/views/class/enroll/EnrollClass'), header: MyClassHeader, footer: AppFooter}, // W.4.4.1.1
  },
  {
    path: '/class/withdrawComplete',
    name: 'classWithdrawComplete',
    beforeEnter: getIsAuth,
    components: {default: () => import('@/views/class/setting/ClassWithdrawComplete'), header: AppHeader, footer: AppFooter}, // W.4.5.7.11.1.1
  },
  ...MyClassRouter,
  ...MyPageRouter,
  ...SearchResultRouter,
  ...AllContentsRouter, // 모든 일정, 모든 알림
  ...FooterBoardRouter, // 공지사항 , 고객센터, 이용약관
  {
    path: '*',
    name: 'notfound',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = new VueRouter({
  base:process.env.VUE_APP_BASE_URL,
  mode: 'history',
  routes,
});


/*  main.ts  에서 token 체크를 하고 있는데 해당 부분이 비동기이기에 새로고침시 무한 루프에 빠진다. 아래 코드로 무한루프 방지*/
const originalPath = VueRouter.prototype.push;
VueRouter.prototype.push = function(url: RawLocation) {
  // @ts-ignore
  return originalPath.call(this, url).catch((error: any) => {
    if (error.name !== 'NavigationDuplicated') {
      //
     throw error;
    }
  });
};


export default router;
