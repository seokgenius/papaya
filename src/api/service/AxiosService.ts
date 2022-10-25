import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import router from '@/router';
import store from '@/store';
import {LoginMutationType, TokenMutationType} from '@/store/mutation-auth-types';
import {REMOVE_CLASS_DATA} from '@/store/mutation-class-types';
import AuthService from '@/api/service/AuthService';

//.env 파일 환경 변수는 무조건 VUE_APP_ 이라는 prefix 가 서두에 붙어야 한다.
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.timeout=1000;


console.log( process.env.VUE_APP_API_BASE_URL );
/**
 * 로그아웃 시키기
 */
const onUnauthorized = () => {
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
    .then(() => {
      // console.log( res );
      store.commit(`Auth/${[LoginMutationType.LOGOUT]}`);
      store.commit(`MyClass/${REMOVE_CLASS_DATA}`);
    });
};
const setAuthorization = (token: string) => {
  axios.defaults.headers.common.Authorization = (token) ? `Bearer ${token}` : null;
};

//대기요청 상태인지 체크 toggle 변수
let isTokenRefreshCheck: boolean = false;
//콜백함수 타입의 배열
let refreshSubscribers: Array<(token: string) => void> = [];

/**
 * 콜백함수 타입의 배열 초기화
 */
const removeRefreshSubscribers = () => refreshSubscribers = [];

/**
 * 실행 콜백함수 배열 대입.
 * @param callback
 */
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push( callback );
};

/**
 * 배열에 저장된 콜백함수( addRefreshSubscriber ) 실행.
 * @param token
 */
const getTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach( (callback: (token: string) => void) => callback(token) );
};
/**
 * 새로 발급 받는 token 재지정.
 * @param accessToken
 * @param refreshToken
 */
const setTokens=async ( accessToken: string, refreshToken: string ) => {
  // header 에 재발급된 token 을 심어놔야 한다. ---> TokenMutationType.GET_TOKEN 내부에  AuthService.setAuthToken(this.token) 가 그 역활을 하고 있다.
  await store.commit(`Auth/${TokenMutationType.GET_TOKEN}`, accessToken);
  await store.commit(`Auth/${TokenMutationType.GET_REFRESH_TOKEN}`, refreshToken);
};

/**
 *  token 요청 콜백함수( addRefreshSubscriber ) refreshSubscribers 에 저장
 * @param config
 */
const pendingForCallApi = (config: any) => {
  return new Promise((resolve) => {
    addRefreshSubscriber((token: string) => {
      config.headers.Authorization = `Bearer ${token}`;
      resolve( axios(config) );
    });
  });
};

const mismatchAccess=( config: any, data: any )=>{
  if( store.getters['Auth/isAuth'] ){
    console.log('접근 error / url =', config.url, ':: method=', config.method );

    alert('잘못된 접근입니다. 메인 페이지로 이동합니다.');
    router.push('/').then(() => {
      console.log('메인으로 이동');
    });
  }
};


//test userid - mobilej / pw - 0000
//test id - sstest07 / pw - 0000 ---> curriculum_list 있음 해당 클래스 아이디 : 724
/**
 * request interceptor
 */
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
}, (error: any) => {
  console.log('interceptors.request=' + error);
  return Promise.reject(error);
});

//expired token test --> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcl9pZCI6InRlc3QxMjM0IiwiZnVsbG5hbWUiOiLtmY0iLCJpYXQiOjE1Njg1OTY5NjEsImV4cCI6MTU2ODY4MzM2MX0.0EIZguQhhe3UUCXTX_UGAkAuf0bf18pqEyLTsoAU6mI
/**
 * response interceptor
 */
axios.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, async (error: any) => {
  const {status, data, config} = error.response;
  // let errorMsg: any = error;
  // console.log('error=', error);
  if (status === 401 && data.message==='TokenExpiredError') {
    if (!isTokenRefreshCheck) {
      // isTokenRefreshing 이 false 인 경우에만 token refresh 요청
      isTokenRefreshCheck = true;
      const refreshToken = await localStorage.getItem('refresh_token');
      const tokenData= await AuthService.sendRefreshToken( refreshToken );
      const {access_token, refresh_token} = tokenData;
      await setTokens(access_token, refresh_token);
      isTokenRefreshCheck = false;

      setTimeout(async () => {
        // 새로운 토큰으로 지연되었던 요청 진행
        await getTokenRefreshed(access_token);
        //저장 배열 초기화
        await removeRefreshSubscribers();
      }, 700);
    }
    //  token 이 재발급 되는 동안의 요청은 refreshSubscribers 에 저장
    return pendingForCallApi(config);
  }else if (status === 400) {
    mismatchAccess(config, data);
  }else{
    if( data.message !=='클래스에 해당 닉네임의 사용자 정보가 없습니다.'){
      mismatchAccess(config, data);
    }
  }
  // Do something with response error
  return Promise.reject(error);
});

type RequestAllKey='method' | 'url' | 'params' | 'headers' | 'data';
type AjaxType=Record<RequestAllKey, any>;
const request = (method: string, url: string, data: any | null = null ): Promise<any> => {
  let reqObj: Partial<AjaxType>;
  if (method === 'get') {
    reqObj = (data !== null)? {method, url, params: data} : {method, url};
  } else if(method === 'upload'){
    reqObj = { method:'post', url, data, headers: {'Content-Type': 'multipart/form-data;charset=utf-8;'} };
  }else{
    reqObj = {method, url, data };
  }
  return axios(reqObj).then((res: AxiosResponse) => {
    // console.log( res.data )
    return res.data;
  }).catch((error: any) => {
    console.log(error.response);
    //여기서 별도로 error.response 를 넘겨 줘야 각 api 호출시 catch 부분에서 error 의 인자값을 확인할 수 있다.
    // console.log(`error_code=${error.response.data.error_code}\n${error.response.data.message}\n url=${url}\n method=${method}`);
    throw error.response;
  });
};

export {request, setAuthorization};
