import {getIsAuth} from '@/router/AuthGuard';
import AppHeader from '@/components/header/header.vue';
import AppFooter from '@/components/footer/footer.vue';

const AllContentsRouter=[
  {
    path: '/all/schedule',
    name: 'myAllSchedule',
    beforeEnter: getIsAuth,
    components: { default: () => import('@/views/allSchedule/AllSchedule'), header: AppHeader, footer: AppFooter },
  },
  {
    path: '/all/notify',
    name: 'myAllNotify',
    beforeEnter: getIsAuth,
    components: { default: () => import('@/views/allNotify/AllNotify'), header: AppHeader, footer: AppFooter },
  },
];
export {AllContentsRouter};
