import Vue from 'vue';
import Vuex from 'vuex';
import {SET_CLASS_ID, MyClassMutation} from '@/store/mutation-class-types';
import {AuthWayActionTypes} from '@/store/action-auth-types';
import AuthModule from '@/store/auth.module';
import ClassModule from '@/store/class.module';
import SearchModule from '@/store/search.module';
import PageHistoryStatus from '@/store/PageHistoryStatus';
import PostModule from '@/store/post.module';
import ScheduleModule from '@/store/schedule.module';

Vue.use(Vuex);

const store = new Vuex.Store({
  // state: {},
  modules: {
    Auth: AuthModule,
    History: PageHistoryStatus,
    MyClass: ClassModule,
    SearchStatus: SearchModule,
    Post: PostModule,
    Schedule: ScheduleModule,
  },
});

const { classId, homeData, token} = localStorage;
// console.log('vue store index.ts/ localStorage 추출값 classId=', classId);
// console.log('vue store index.ts/ localStorage 추출값 homeData=', homeData);
// const {token} = localStorage;
if( token ){
  // console.log( '여기는 init()/  token 존재하는 경우 ', token);
  //토큰이 존재하면 UserService.getUserMe() api 호출해서 userMe 데이터를 갱신한다.
  store.dispatch(`Auth/${[AuthWayActionTypes.SIGNIN_BY_TOKEN]}`, token).then( (res) => console.log('토큰 있음 > 적용') );
}
if ( classId ) {
  store.commit(`MyClass/${SET_CLASS_ID}`, localStorage.getItem('classId') );
}
if (homeData) {
  store.commit(`MyClass/${MyClassMutation.SET_MYCLASS_HOME_DATA}`, JSON.parse( localStorage.getItem('homeData') as string ) );
}
// store.commit(`Auth/${ACCESS_TOKEN}`, localStorage.getItem('user'));
export default store;
