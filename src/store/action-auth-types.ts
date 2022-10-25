// export const LOGIN_ACTION: string = 'LOGIN_ACTION';
// export const FIND_ID_BY_MOBILE: string = 'FIND_ID_BY_MOBILE';
// export const FIND_ID_BY_EMAIL: string = 'FIND_ID_BY_EMAIL';
// export const AUTH_BY_MOBILE: string = 'AUTH_BY_MOBILE';
// export const SIGN_UP_ACTION: string = 'SIGN_UP_ACTION';
// export const SIGNIN_BY_TOKEN: string = 'SIGNIN_BY_TOKEN';
// export const USER_ME_ACTION: string = 'USER_ME_ACTION';

enum AuthWayActionTypes{
  AUTH_BY_MOBILE = 'AUTH_BY_MOBILE',
  SIGN_UP_ACTION = 'SIGN_UP_ACTION',
  SIGNIN_BY_TOKEN = 'SIGNIN_BY_TOKEN',
  USER_ME_ACTION = 'USER_ME_ACTION'
}
enum FindWayActionTypes{
  FIND_ID_BY_MOBILE= 'FIND_ID_BY_MOBILE',
  FIND_ID_BY_EMAIL= 'FIND_ID_BY_EMAIL'
}
enum LoginActionTypes{
  LOGIN_ACTION='LOGIN_ACTION'
}

export {LoginActionTypes, FindWayActionTypes, AuthWayActionTypes};
