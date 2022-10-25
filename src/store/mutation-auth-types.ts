export const HISTORY_PAGE: string = 'HISTORY_PAGE';

enum PageInfoMutationType{
  SET_PAGE_TITLE = 'SET_PAGE_TITLE'
}

enum VerifyMutationType{
  VERIFY_BY_MOBILE= 'VERIFY_BY_MOBILE',
  USER_MOBILE='USER_MOBILE'
}

enum SingUpMutationType{
  SIGN_UP_MOVE = 'SIGN_UP_MOVE',
  SIGN_UP = 'SIGN_UP'
}

enum UserInfoMutationType{
  USER_ID = 'USER_ID',
  USER_EMAIL = 'USER_EMAIL',
  GET_USER = 'GET_USER',
  SET_MY_INFO = 'SET_MY_INFO'
}

enum TokenMutationType{
  GET_TOKEN = 'GET_TOKEN',
  GET_REFRESH_TOKEN = 'GET_REFRESH_TOKEN'
}

enum LoginMutationType{
  LOGIN= 'LOGIN',
  LOGOUT= 'LOGOUT'
}

export {
  LoginMutationType,
  TokenMutationType,
  UserInfoMutationType,
  VerifyMutationType,
  SingUpMutationType,
  PageInfoMutationType
};
