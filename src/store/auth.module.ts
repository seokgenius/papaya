import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {IUser, IUserMe} from '@/api/model/user.model';
import AuthService from '@/api/service/AuthService';
import UserService from '@/api/service/UserService';
import {
  // LOGIN,
  // LOGOUT,
  // GET_TOKEN,
  // USER_ID, USER_EMAIL,
  // VERIFY_BY_MOBILE,
  // SIGN_UP,
  // SIGN_UP_MOVE,
  // SET_MY_INFO,
  // GET_REFRESH_TOKEN,
  // SET_PAGE_TITLE,
  UserInfoMutationType,
  LoginMutationType,
  TokenMutationType,
  SingUpMutationType,
  VerifyMutationType, PageInfoMutationType
} from '@/store/mutation-auth-types';
import {
  // LOGIN_ACTION,
  FindWayActionTypes,
  // FIND_ID_BY_MOBILE,
  // FIND_ID_BY_EMAIL,
  AuthWayActionTypes,
  // AUTH_BY_MOBILE,
  // SIGN_UP_ACTION,
  // SIGNIN_BY_TOKEN,
  // USER_ME_ACTION,
  LoginActionTypes
} from '@/store/action-auth-types';

@Module({
  namespaced: true,
})
export default class AuthModule extends VuexModule {
  public token?: string | null = null; //멤버 변수는 state 로 이용된다.
  public findId: string = '';
  public user: IUser[] =[];
  public me: IUserMe | null =null;
  public count: number = 0;
  public inputUserEmail: string = '';
  public signupName: string = '';
  public resetPwByVerifyInfo: object = {};
  private refreshToken: string | null= null;
  private signupPageTitle: string = '회원가입';
  private mobile: string='00';

  get isAuth(): boolean {
    return !!this.token;
  }

  get isRefreshAuth(): boolean{
    return !!this.refreshToken;
  }

  get findUserId(): string {
    return this.findId;
  }

  get findInputUserEmail(): string {
    return this.inputUserEmail;
  }

  get resetPwVerifyInfo(): object {
    return this.resetPwByVerifyInfo;
  }

  get userName(): string{
    return this.signupName;
  }

  get userInfo(): IUserMe | null{
    return this.me;
  }

  get pageTitle(): string {
    return this.signupPageTitle;
  }

  get mobileNum(): string{
    return this.mobile;
  }

  @Mutation
  public [UserInfoMutationType.USER_EMAIL](value: string): void {
    this.inputUserEmail = value;
  }

  @Mutation
  public [UserInfoMutationType.USER_ID](userId: string): void {
    this.findId = userId;
  }

  @Mutation
  public [LoginMutationType.LOGIN](userData: IUser[]): void {
    this.user = userData;
    // console.log('this.token=', JSON.stringify(this.user) );
    localStorage.setItem('user', JSON.stringify(this.user));
    // console.log( localStorage.getItem('user') );
    this.count++;
  }

  @Mutation
  public [UserInfoMutationType.SET_MY_INFO]( me: IUserMe ): void{
    this.me = me;
    localStorage.setItem('me', JSON.stringify(this.me));
  }

  @Mutation
  public [VerifyMutationType.VERIFY_BY_MOBILE](payload: { userId: string, key: string, mobile: string }): void {
    this.resetPwByVerifyInfo = {
      userId: payload.userId,
      key: payload.key,
      mobile: payload.mobile,
    };
  }

  @Mutation
  public [TokenMutationType.GET_TOKEN](token: string | null): void {

    if (token !== null) {
      this.token = token;
      AuthService.setAuthToken(this.token);
      // localStorage.setItem('token', this.token);
      localStorage.setItem('token', this.token);
    }
  }

  @Mutation
  public [TokenMutationType.GET_REFRESH_TOKEN]( refreshToken: string | null ): void{
    if (refreshToken !== null) {
      this.refreshToken=refreshToken;
      localStorage.setItem('refresh_token', this.refreshToken);
    }
  }


  @Mutation
  public [LoginMutationType.LOGOUT](): void {
    console.log('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('me');
    localStorage.removeItem('refresh_token' );
    this.token = null;
    this.me=null;
  }

  @Mutation
  public [SingUpMutationType.SIGN_UP]( name: string ): void{
    this.signupName=name;
    localStorage.setItem('signupName', this.signupName );
  }

  @Mutation
  public [SingUpMutationType.SIGN_UP_MOVE](): void{
    this.signupName= '';
    delete localStorage.signupName;
  }

  @Mutation
  public [PageInfoMutationType.SET_PAGE_TITLE](title: string): void {
    this.signupPageTitle = title;
  }

  @Mutation
  public [VerifyMutationType.USER_MOBILE]( mobile: string): void {
    this.mobile = mobile;
  }

  //localstorage 에 있는 token 값 존재 확인하여 데이터를
  @Action({rawError: true})
  public [AuthWayActionTypes.SIGNIN_BY_TOKEN](token: string ){

    // console.log('store=', this.context.getters.isAuth );

    this.context.commit(TokenMutationType.GET_TOKEN, token);

    /*if( store.getters['Auth/isAuth'] ){
      this.context.commit(GET_TOKEN, token);
    }else{
      if (token !== null) {
        const {refresh_token}=localStorage;
        AuthService.sendRefreshToken( refresh_token ).then( (data)=>{
          console.log('access_token='+data.access_token, 'refresh_token='+data.refresh_token);
          store.commit( `Auth/${GET_TOKEN}`, data.access_token );
          store.commit( `Auth/${GET_REFRESH_TOKEN}`, data.refresh_token );
        }).catch((error)=>{
          // alert('사용자 세션이 만료되었습니다. 다시 로그인 해주세요~');
          router.push({path: '/login'});
          console.log('사용자 세션이 만료되었습니다. 다시 로그인 해주세요~');
        });
      }
    }*/


    return UserService.getUserMe()
      .then( ( data: any )=>{
        // console.log('UserMe=', data.user );
        this.context.commit(UserInfoMutationType.SET_MY_INFO, data.user );
        return Promise.resolve('signin status');
      });
  }


  /**
   * 로그인~
   * @param payload
   */
  @Action({rawError: true})
  public [LoginActionTypes.LOGIN_ACTION]( payload: { uid: string, password: string }): Promise<any> {
    //LOGIN_ACTION
    return AuthService.login(payload.uid, payload.password)
      .then((data: any) => {
        // console.log(data);
        /* jbc2119 로 접속 성공시~
        email: "jbc2119@gmail.com"
        fullname: "전봉철"
        id: 250
        mobile_no: "01031992443"
        schedule_color: 0
        user_id: "jbc2119"
        */
        // console.log(data.user, data.access_token);
        // mutation( type, payload, option ) 이렇게 매개변수가 지정되어 있다.

        // console.log(data.access_token, data.refresh_token);

        this.context.commit(TokenMutationType.GET_TOKEN, data.access_token );
        this.context.commit(TokenMutationType.GET_REFRESH_TOKEN, data.refresh_token );

        return UserService.getUserMe().then( ( userMe: any)=>{
            this.context.commit(UserInfoMutationType.SET_MY_INFO, userMe.user);
            return Promise.resolve( userMe.user);
          });// 왜인지는 모르겠으나 여기서 promise 를 리턴해주어야 함.
      }).catch((error) => {
        return Promise.reject(error);
      });
  }

  /**
   * 마이프로필에서 수정 적용시
   */
  @Action({rawError: true})
  public [AuthWayActionTypes.USER_ME_ACTION](): Promise<IUserMe>{
    return UserService.getUserMe().then( ( userMe: any)=>{
      this.context.commit(UserInfoMutationType.SET_MY_INFO, userMe.user);
      return Promise.resolve( userMe.user);
    }).catch( (error: any)=>{
      return Promise.reject(error);
    });
  }

  @Action({rawError: true})
  public [FindWayActionTypes.FIND_ID_BY_MOBILE](mobile: string): Promise<any> {
    return UserService.getUserIdByMobile(mobile)
      .then((data: any) => {
        /*{
          "mobile_no": "01031992443",
          "user_id": "jbc2119",
          "message": "아이디 조회 성공."
        }*/
        // console.log('모바일번호로 아이디조회=', data );
        this.context.commit(UserInfoMutationType.USER_ID, data.user_id); //찾은 아이디 값을 store 에 기록
        return Promise.resolve(data);
      }).catch((error: any) => {
        return Promise.reject(error);
      });
  }

  @Action({rawError: true})
  public [FindWayActionTypes.FIND_ID_BY_EMAIL](email: string): Promise<any> {
    return UserService.getUserIdByEmail(email)
      .then((data: any) => {
        this.context.commit(UserInfoMutationType.USER_ID, data.user_id);
        this.context.commit(UserInfoMutationType.USER_EMAIL, email);
        return Promise.resolve(data);
      }).catch((error: any) => {
        return Promise.reject(error);
      });
  }

  //this.formData.userId, this.formData.mobile
  //getAuthByMobileNum
  @Action({rawError: true})
  public [AuthWayActionTypes.AUTH_BY_MOBILE](payload: { userId: string, mobile: string }): Promise<any> {
    return AuthService.getAuthByMobileNum(payload.userId, payload.mobile)
      .then((data: any) => {
        // console.log('핸폰번호와 아이디로 인증=', data);
        //{verification_key: "3091612168945547", message: "sms 로 인증번호 발송 성공"}
        this.context.commit(VerifyMutationType.VERIFY_BY_MOBILE, {
          userId: payload.userId,
          mobile: payload.mobile,
          key: data.verification_key,
        });
        return Promise.resolve(data);
      }).catch((error: any) => {
        console.log('error', error);
        return Promise.reject(error);
      });
  }

  @Action( {rawError: true})
  public [AuthWayActionTypes.SIGN_UP_ACTION](payload: {
    user_id: string,
    user_password: string,
    fullname: string,
    mobile_no: string,
    email: string,
    agree_marketing: boolean,
    agree_email: boolean,
  }): Promise<any>{
    return UserService.signUp( payload )
      .then( (data: any)=>{
        // console.log('payload.fullname=', payload.fullname, data.user.fullname );
        this.context.commit(SingUpMutationType.SIGN_UP, payload.fullname );
        /*
        {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......"
        message: "회원가입 성공"
        refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......"
        user:{
            agree_email: false
            agree_marketing: false
            createdAt: "2021-03-06 08:12:50"
            deletedYN: false
            email: ""
            fullname: "전봉철"
            lastloginAt: "2021-03-06 08:12:50"
            marketingAgreeAt: null
            mobile_no: "01031992443"
            nickname: null
            push_onoff: true
            push_token: null
            schedule_color: 0
            updatedAt: "2021-03-06 08:12:50"
            user_id: "jbc103"
             }
         }*/

        return Promise.resolve( data );
    }).catch( (error: any)=>{
      return Promise.reject(error);
    });

  }


}
