import {request} from '@/api/service/AxiosService';
import {CLASS_BASE_URL} from '@/api/base';
import {IClassMemberInfo} from '@/views/model/my-class.model';

class ClassMemberService {
  /**
   * 클래스 멤버 답변생성
   * @param classId
   * @param memberId
   * @param payload
   */
  public setClassMemberAnswer(classId: number, memberId: number, payload: {question: string, answer: string}): Promise<any> {
    return request('post', `${CLASS_BASE_URL}/${classId}/members/${memberId}/answer`, payload);
  }
  /**
   * 클래스 멤버 답변 전체 조회
   * @param classId
   * @param memberId
   */
  public getMemberClassQnA(classId: string | number, memberId: number): Promise<any> {
    return request('get', `${CLASS_BASE_URL}/${classId}/members/${memberId}/answer`);
  }

  /**
   * 클래스 맴버 생성 - 클래스 가입 시키기
   * @param classId
   */
  public setClassMember(classId: number, data: any): Promise<any> {
    /* "user_id": 250, - user_id 넘버 값
       "nickname": "test-for클래스1",
       "open_level_id": 1,
       "open_level_mobileno": 1,
       "open_level_email": 1*/
    return request('post', `${CLASS_BASE_URL}/${classId}/members`, data);
  }

  /**
   * 클래스 멤버 전체 조회
   * @param classId
   */
  public getAllClassMembers(classId: string | number): Promise<any> {
    return request('get', `${CLASS_BASE_URL}/${classId}/members`);
  }

  /**
   * 클래스 차단 멤버 전체 조회
   * @param classId
   */
  public getBlockedClassMembers(classId: string | number): Promise<any> {
    return request('get', `${CLASS_BASE_URL}/${classId}/members/blocked`);
  }

  /**
   * 클래스 멤버 검색
   * @param classId
   * @param searchWord
   */
  public searchMembers( classId: string | number, searchWord: string): Promise<any> {
    return request('get', `${CLASS_BASE_URL}/${classId}/members/search/${searchWord}`);
  }

  /**
   * 클래스 멤버 정보 조회
   * @param classId
   * @param memberId
   */
  public getClassMemberInfo(classId: string | number, memberId: number): Promise<IClassMemberInfo> {
    return request('get', `${CLASS_BASE_URL}/${classId}/members/${memberId}`);
  }

  /**
   * 클래스에서 멤버 탈퇴
   * @param classId
   * @param memberId
   */
  public deleteClassMemberByUser(classId: string | number, memberId: number): Promise<any> {
    return request('delete', `${CLASS_BASE_URL}/${classId}/members/${memberId}`);
  }

  /**
   * 클래스 멤버 정보 수정
   * @param classId
   * @param memberId
   * @param info
   */
  public setClassMemberInfo(classId: number, memberId: number, info: any): Promise<any> {
    return request('put', `${CLASS_BASE_URL}/${classId}/members/${memberId}`, info);
  }

  /**
   * 클래스 멤버 닉네임 조회
   * 중복확인시 사용
   * @param classId
   * @param nickname
   */
  public searchNickname(classId: string | number, nickname: string): Promise<any> {
    return request('get', `${CLASS_BASE_URL}/${classId}/members/bynickname/${nickname}`);
  }

  /**
   * 클래스 멤버 차단
   * @param classId
   * @param memberId
   */
  public setBlockClassMember(classId: string | number, memberId: number): Promise<any> {
    return request('put', `${CLASS_BASE_URL}/${classId}/members/${memberId}/block`);
  }

  /**
   * 클래스 멤버 차단 해제
   * @param classId
   * @param memberId
   */
  public setUnBlockClassMember(classId: string | number, memberId: number): Promise<any> {
    return request('put', `${CLASS_BASE_URL}/${classId}/members/${memberId}/unblock`);
  }

  /**
   * 클래스 멤버 강제 탈퇴
   * @param classId
   * @param memberId
   */
  public deleteClassMemberByAdmin(classId: string | number, memberId: number): Promise<any> {
    return request('put', `${CLASS_BASE_URL}/${classId}/members/${memberId}/ban`);
  }

  /**
   * 클래스 멤버 권한조회
   * @param classId
   * @param memberId
   */
  public getClassAuth(classId: string | number, memberId: string | number): Promise<any> {
    return request('get', `${CLASS_BASE_URL}/${classId}/members/${memberId}/auth`);
  }
}

export default new ClassMemberService();