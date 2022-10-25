import store from '@/store';
import {NavigationGuardNext, Route} from 'vue-router';

/**
 * 라우터 가드~ index.getters.isAuth 의 값에 따라 결정.
 * 즉 인증된 사용자이면 rqPath 로 지정된 경로로 접근되고 그렇지 않다면 루트경로(로그인)으로 이동시킨다.
 * @param to 대상 Route객체로 이동 ( to.path , to.name 등이 있다 )
 * @param from 현재 라우트로 오기전 라우트
 * @param next 파이프라인의 다음 훅으로 이동. 훅이 없는 경우 네비게이션은 승인.
 */
const getIsAuth = (to: Route, from: Route, next: NavigationGuardNext): void => {
  // console.log(to, from );
  const loginPath: string = `/login?rqPath=${encodeURIComponent(to.path)}`;
  // console.log('store.getters[\'Auth/isAuth\']', store.getters['Auth/isAuth']);
  if ( store.getters['Auth/isAuth']) {
    next();
  } else {
    //로그인 페이지라고 저장해둠.
    // store.commit('PageHistoryStatus/' + HISTORY_PAGE, {history: 'login'});
    next(loginPath);
  }
};

export {getIsAuth};
