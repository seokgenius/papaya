import MyPage2 from '@/views/mypage/MyPage2';
import AppHeader from '@/components/header/header.vue';
import AppFooter from '@/components/footer/footer.vue';

const FooterBoardRouter=[
  {
    path: '/',
    name: 'footerBoards',
    components: { default: MyPage2, header: AppHeader, footer: AppFooter},
    children: [
      { path: 'noticeBoard', name: 'noticeBoard', component: () =>import('../views/mypage/noticeBoard/NoticeBoard') }, // 공지사항-상세 (W7.1.5)
      { path: 'customerCenter', name: 'customerCenter', component: () =>import('../views/mypage/customerCenter/CustomerCenter') }, // 고객센터-상세 (W7.1.6)
      { path: 'termsOfService', name: 'termsOfService', component: () =>import('../views/mypage/termsOfService/TermsOfService') }, // 이용약관-상세 (W7.1.7)
    ],
  },
];
export {FooterBoardRouter};
