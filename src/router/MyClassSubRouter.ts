import {getIsAuth} from '@/router/AuthGuard';
import AppHeader from '@/components/header/header.vue';
import AppFooter from '@/components/footer/footer.vue';
import MyClassHeader from '@/components/header/myClassHeader.vue';

const MyClassSubRouter=[
  {path: 'setting', name: 'classSettingMain', component: () => import('../views/class/setting/ClassSettingMain')}, // 클래스 페이지-설정 (W.4.5.7)
  {path: 'setting/classProfile', name: 'classProfile', component: () => import('../views/class/setting/classProfile/ClassProfile')}, // 클래스 페이지-설정-이 클래스 프로필 설정 (W4.5.7.2)
  {path: 'setting/classBasicInfo', name: 'classBasicInfo', component: () => import('../views/class/setting/classBasicInfo/ClassBasicInfo')}, // 클래스 페이지-설정-클래스 기본 정보 관리 (W4.5.7.3)
  {path: 'setting/classTagManage', name: 'classTagManage', component: () => import('../views/class/setting/classTagManage/ClassTagManage')}, // 클래스 페이지-설정-클래스 태그 관리 (W4.5.7.4)
  {path: 'setting/classJoinStatus', name: 'classJoinStatus', component: () => import('../views/class/setting/classJoinStatus/ClassJoinStatus')}, // 클래스 페이지-설정-가입 현황 관리 (W4.5.7.7)
  {path: 'setting/classMemberManage', name: 'classMemberManage', component: () => import('../views/class/setting/classMemberManage/ClassMemberManage'),}, // 클래스 페이지-설정-멤버 활동 관리 (W.4.5.7.8)
  {path: 'setting/blockedMemberList', name: 'blockedMemberList', component: () => import('../views/class/setting/classMemberManage/blockedMemberList/BlockedMemberList')}, // 클래스 페이지-설정-멤버 활동 관리-차단목록 (W.4.5.7.8.3.1)
  {path: 'setting/classStaffManage', name: 'classStaffManage', component: () => import('../views/class/setting/classStaffManage/ClassStaffManage')}, // 클래스 페이지-설정-스탭 관리 (W.4.5.7.9)
  {path: 'setting/classStaffAdd', name: 'classStaffAdd', component: () => import('../views/class/setting/classStaffManage/classStaffAdd/ClassStaffAdd')}, // 클래스 페이지-설정-스탭 관리-스탭 추가 (W.4.5.7.9.1)
  {path: 'setting/classAdminDelegate', name: 'classAdminDelegate', component: () => import('../views/class/setting/classAdminDelegate/ClassAdminDelegate')}, // 클래스 페이지-설정-운영자 위임 신청 (W4.5.7.10)
  {path: 'fileBox', name: 'fileBox', beforeEnter: getIsAuth, components: {default: () => import('../views/class/fileBox/FileListView'), header: AppHeader, footer: AppFooter}, /* W.4.5.4*/},
  {
    path: 'curriculum',
    name:'curriculumPage',
    component: () => import('../views/class/curriculum/CurriculumPage'),
    children: [
      {path: '', name: 'curriculumListView', component: () => import('../views/class/curriculum/CurriculumListView') }, // 클래스 페이지-교육과정 (W4.5.5)
    ]
  },
  {
    path: '/fileBox',
    name: 'fileBox',
    beforeEnter: getIsAuth,
    components: {default: () => import('@/views/class/fileBox/FileListView'), header: AppHeader, footer: AppFooter}, // W.4.5.4
  },
];
export {MyClassSubRouter};
