import AppHeader from '@/components/header/header.vue';
import AppFooter from '@/components/footer/footer.vue';
import {getIsAuth} from '@/router/AuthGuard';
import {MyClassSubRouter} from '@/router/MyClassSubRouter';
import MyClassHeader from '@/components/header/myClassHeader.vue';

const MyClassRouter=[
  {
    path: '/',
    name: 'myClassList',
    beforeEnter: getIsAuth,
    components: { default: () => import('@/views/class/classList/MyClassListPage'), header: AppHeader, footer: AppFooter },  // 가입리스트
  },
  {
    path: '/class/:classId',
    name: 'myClassListDetailPage',
    beforeEnter: getIsAuth,
    components: { default: () => import('@/views/class/home/MyClassListDetailPage'), header: MyClassHeader, footer: AppFooter},
    children: [
      {path: '', name: 'myClassListDetailView', component: () => import('../views/class/home/MyClassListDetailView')}, //가입리스트 중 하나 클릭시-> 클래스 홈( 상세 )
      {path: 'notification', name: 'NotificationView', component: () => import('../views/class/notification/NotificationPage')},  // 상세 -> 클래스 멤버
      {path: 'schedule', name: 'scheduleView', component: () => import('../views/class/schedule/ScheduleView')}, //상세 -> 클래스 일정
      {path: 'member', name: 'classMember', component: () => import('../views/class/member/ClassMember')},  // 상세 -> 클래스 멤버
      ...MyClassSubRouter
    ]
  },
  {
    path: '/make-class',
    name: 'makeClass',
    components: {default: () => import('@/views/class/make/MakeClassPage'), header: AppHeader, footer: AppFooter},  // 클래스 만들기 컨테이너
    beforeEnter: getIsAuth,
    children: [
      {path: 'step1', name: 'makeClassOption', component: () => import('../views/class/make/step1/MakeClassOption')}, //클래스 만들기 step 1 ( 학교 검색 포함 )
      {path: 'step2', name: 'makeClassForm', component: () => import('../views/class/make/step2/MakeClassForm')},//클래스 만들기 step 2
      {path: 'step3', name: 'makeClassComplete', component: () => import('../views/class/make/step3/MakeClassComplete')}, //클래스 만들기 step 3
    ]
  },

];

export {MyClassRouter};
