import {request, setAuthorization} from '@/api/service/AxiosService';
import {AUTH_BASE_URL, USER_BASE_URL} from '@/api/base';

class AuthService {

  public login(uid: string, password: string): Promise<any> {
    return request('post', `${AUTH_BASE_URL}/login`, {
      user_id: uid,
      user_password: password,
    });
  }

  public setAuthToken(token: string): void {
    setAuthorization(token);
  }


  /**
   * 핸드폰 번호로 인증번호 전송
   * @param mobile
   */
  public getAuthNumByMobile(mobile: string): Promise<any> {
    return request('get', `${AUTH_BASE_URL}/sms/${mobile}`);
  }

  /**
   * 메일 주소로 인증 번호 전송
   * @param email
   */
  public getAuthEmail(email: string): Promise<any> {
    return request('get', `${AUTH_BASE_URL}/email/${email}`);
  }

  /**
   * 인증하기
   * @param verify
   */
  public getVerification(verify: { key: string, num: string }): Promise<any> {
    return request('post', '/verifications', {
      verification_key: verify.key,
      auth_number: verify.num,
    });
  }

  public getUserId(mobile: string): Promise<any> {
    return request('get', `/users/bymobile/${mobile}`);
  }

  /**
   * 로그인 안된 상태에서 비번 재설정을 위한 모바일번호로 인증
   */
  public getAuthByMobileNum(userId: string, mobile: string): Promise<any> {
    return request('get', `${USER_BASE_URL}/${userId}/${mobile}/authnumber`);
  }

  public pwdChange(payload: { userId: string, mobile: string,  key: string, pwd: string }): Promise<any> {
    return request('put', `${USER_BASE_URL}/${payload.userId}/change-password/${payload.mobile}`, {
      verification_key: payload.key,
      new_password: payload.pwd,
    });
  }

  /**
   * 리프레시 토큰 전송
   * @param token
   */
  public sendRefreshToken(token: string | null): Promise<any>{
    return request('get', `${AUTH_BASE_URL}/accesstoken/${token}`);
  }

}


export default new AuthService();
