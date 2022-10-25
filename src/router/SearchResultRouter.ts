import AppHeader from '@/components/header/header.vue';
import AppFooter from '@/components/footer/footer.vue';
import {getIsAuth} from '@/router/AuthGuard';
import {Route} from 'vue-router';

const SearchResultRouter = [
  {
    path: '/search/result',
    name:'SearchResultPage',
    beforeEnter: getIsAuth,
    props: (route: Route) => ({ query: route.query.q }),
    components: {default: () => import('@/views/search/SearchResultPage'), header: AppHeader, footer: AppFooter},
  }
];

export {SearchResultRouter};
