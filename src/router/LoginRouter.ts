import Login from '@/views/login/Login';
import SignInHeader from '@/components/header/signinHeader.vue';
import SignInFooter from '@/components/footer/signInFooter.vue';

const LoginRouter=[
  {
    path: '/login',
    components: {default: Login, header: SignInHeader, footer: SignInFooter}, //로그인 랜딩 페이지
    children: [
      {path: '/', name: 'loginForm', component: () => import('../views/login/loginForm/LoginForm')}, //로그인
      {
        path: 'findId',
        component: () => import('../views/login/account/IdPwContainer'),  // 아이디찾기 및 비번찾기  컨테이너
        children: [
          {path: '', name: 'findIdForm', component: () => import('../views/login/findId/FindId')},  //아이디 찾기
          {path: 'resetPw', name: 'resetPw', component: () => import('../views/login/resetPw/ResetPassword')}, //비번 찾기
        ],
      },
    ],
  }
];
export {LoginRouter};
