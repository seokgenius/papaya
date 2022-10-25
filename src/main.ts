// import 'babel-polyfill';
// import 'es6-promise/auto'; //적어도 Vuex 나 axios 를 사용하는 시점보다는 빨리 불러와야 정상 동작한다

import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import vuetify from '@/plugins/vuetify';
import './filters/index';
import './components/validation/validation';
// import Rx from 'rxjs';
// import VueRx from 'vue-rx';

/* //공통 이벤트에 대한 후크를 사용하여 서비스 작업자 등록을 단순화한다.*/
import './registerServiceWorker';
//사스 파일은 하나로 통일시키는 것이 좋다 여러개를 여기서 로드 시키면 여러번 호출된다.
import './assets/scss/common.scss';

// Vue.use(VueRx, Rx);
//false로 설정하면 배포에 대한 팁을 출력하지 않습니다.
Vue.config.productionTip = false;

/**
 * 공통 에러 이벤트 핸들러
 * @param err
 * @param vm
 * @param info
 */
Vue.config.errorHandler = (err: Error, vm: Vue, info: string) => {
  console.log(`Error ${err.toString()}\n info: ${info}`, err, '에러난 해당 component=', vm.$vnode.tag );
};

new Vue({
  router,
  store,
  render: (h) => h(App),
  vuetify
}).$mount('#app');

/*function init(){
  const {token} = localStorage;
  if( token ){
    // console.log( '여기는 init()/  token 존재하는 경우 ', token);
    //토큰이 존재하면 UserService.getUserMe() api 호출해서 userMe 데이터를 갱신한다.
    return store.dispatch(`Auth/${SIGNIN_BY_TOKEN}`, token);
  }else{
    // console.log( '여기는 init()/ token 없는 경우 ', token);
    return Promise.resolve();
  }
}

init().then((res) => {
  //token 이 존재하지 않을 경우 vue 를 초기화 시킨다.
  console.log('여기는 main.ts =', res);
  new Vue({
    router,
    store,
    render: (h) => h(App),
    vuetify
  }).$mount('#app');
});*/


/*
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
*/
