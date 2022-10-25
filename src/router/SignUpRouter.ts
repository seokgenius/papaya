import SignUp from '@/views/signup/SignUp';
import SignUpIntro from '@/views/signup/signUpIntro/SignUpIntro';
import SignUpHeader from '@/components/header/signupHeader.vue';
import AppFooter from '@/components/footer/footer.vue';
import SignUpComplete from '@/views/signup/complete/SignUpComplete';

const SignUpRouter=[
  {
    path: '/signup',
    components:{ default: SignUpIntro, header: SignUpHeader, footer: AppFooter },
  },
  {
    path: '/signForm',
    /*명명 된 경로 'signForm'에는 기본 자식 경로가 있습니다. 이 명명 된 경로
    (: to = "{name : 'signForm'")로 이동할 때 기본 자식 경로가 렌더링되지 않습니다.
     이 경로에서 이름을 제거하고 대신 명명 된 링크에 대한 기본 자식 경로의 이름을 사용합니다.- > 결론 자식 라우트가 있다면 name 은 생략하자. */
    // name: 'signForm',
    components: { default:SignUp, header: SignUpHeader, footer: AppFooter},
    children:[
      { path: '', name: 'termsCheck', component: () =>import('../views/signup/termsCheck/TermsCheck') },
      { path: 'verify', name: 'verify', component: () => import('../views/signup/verify/Verify'),},
      { path: 'signUpForm', name: 'signUpForm', component: () =>import('../views/signup/signUpForm/SignUpForm') },
    ]
  },
  {
    path: '/signup/complete',
    components:{ default: SignUpComplete, header: SignUpHeader, footer: AppFooter },
  },
];
export {SignUpRouter};
