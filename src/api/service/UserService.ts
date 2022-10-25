import {request} from '@/api/service/AxiosService';
import {USER_BASE_URL} from '@/api/base';

class UserService {

  public getUserURLById(id: string): string {
    return `${USER_BASE_URL}/${id}`;
  }

  /**
   * 사용자 ID가 존재하는지 체크한다.
   * @param id
   */
  public getIDCheck(id: string): Promise<any> {
    return request('get', `${this.getUserURLById(id)}/check`);
  }


  public getEmailCheck(email: string): Promise<any> {
    return request('get', `${USER_BASE_URL}/byemail/${email}/check`);
  }

  /**
   * 회원가입
   * @param info
   */
  public signUp(info: {
    user_id: string,
    user_password: string,
    fullname: string,
    mobile_no: string,
    email: string,
    agree_marketing: boolean,
    agree_email: boolean,
  }): Promise<any> {
    /*{
      "user_id": "testuser1",
      "user_password": "12341234",
      "fullname": "testuser1",
      "mobile_no": "01012341111",
      "email": "dev@inition.kr",
      "agree_marketing": false,
      "agree_email": true
    }*/
    return request('post', `${USER_BASE_URL}`, info);
  }

  /**
   * 사용자 리스트
   * @param offset
   * @param limit
   */
  public getUsers(offset: number, limit: number): Promise<any> {
    return request('get', USER_BASE_URL, {offset, limit});
  }

  /**
   * 사용자 핸폰 번호로 아이디 찾기
   * @param mobile
   */
  public getUserIdByMobile(mobile: string): Promise<any> {
    return request('get', `${USER_BASE_URL}/bymobile/${mobile}`);
  }

  /**
   * 사용자 이메일로 아이디 찾기
   * @param email
   */
  public getUserIdByEmail(email: string): Promise<any> {
    return request('get', `${USER_BASE_URL}/byemail/${email}/check`);
  }

  /**
   * id 로 사용자 정보 조회
   * @param id
   */
  public getFindUser(id: string): Promise<any> {
    return request('get', this.getUserURLById(id));
  }

  /**
   * 사용자 정보 수정.
   * @param id
   * @param data
   */
  public setUserInfo(id: string, data: any): Promise<any> {
    return request('put', this.getUserURLById(id), data);
  }

  /**
   * 비밀번호 변경 - 로그인 된 상태
   * @param payload
   */
  public pwdChange(payload: { userId: string, old_pw: string, new_pw: string } ): Promise<any> {
    return request('put', `${USER_BASE_URL}/${payload.userId}/change-password`, {
      old_password: payload.old_pw,
      new_password: payload.new_pw,
    });
  }

  /**
   *
   * @param id
   */
  public deleteUser(id: string): Promise<any> {
    return request('delete', this.getUserURLById(id), {user_id: id});
  }

  public getUserMe(): Promise<any> {
    return request('get', `${USER_BASE_URL}/me/info`);
  }

  /**
   * 사용자 서비스 탈퇴
   */
  public serviceWithdraw(): Promise<any> {
    return request('delete', `${USER_BASE_URL}/me`);
  }

  /**
   * 사용자 정보 고유번호로 조회하기
   * @param userId
   */
  public getUserInfo(userId: number): Promise<any> {
    return request('get', `${USER_BASE_URL}/${userId}/info`);
  }
}


export default new UserService();
