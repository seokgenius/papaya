import {request} from '@/api/service/AxiosService';
import {CLASS_BASE_URL, SCHOOL_URL} from '@/api/base';
import {
    IMyClassList,
    IMakeClassInfo,
    ClassEachInfo, IMakeEducation, IModifyCurriculum,
} from '@/views/model/my-class.model';


class MyClassService {
    /**
     * 내가 가입한 클래스 전체 조회
     */
    public getAllMyClass(): Promise<IMyClassList> {
        return request('get', `${CLASS_BASE_URL}/me/all`);
    }

    /**
     * 내가 가입한 클래스 전체 조회
     * @param no
     * @param limit
     */
    public getAllMyClassPaging(no: number, limit: number=10): Promise<IMyClassList> {
        return request('get', `${CLASS_BASE_URL}/me/all/${limit}/${no}`);
    }

    public getClassInfoById( id: number | string ): Promise<any>{
        return request('get', `${CLASS_BASE_URL}/${id}`);
    }

    public setClassInfoById(id: number, data: any): Promise<any>{
        return request('put', `${CLASS_BASE_URL}/${id}`, data);
    }

    /**
     * 해당 클래스의 내 정보 조회
     * @param id
     */
    public getMyInfoInThisClass(id: number): Promise<any> {
        return request('get', `${CLASS_BASE_URL}/${id}/me`);
    }



    public setClassBookmark(classId: number, memberId: number, payload: { is_bookmarked: number; nickname: string | undefined }): Promise<ClassEachInfo>{
        return request('put', `${CLASS_BASE_URL}/${classId}/members/${memberId}`, payload);
    }

    public getClassBookmark(classId: number, memberId: number): Promise<ClassEachInfo>{
        return request('put', `${CLASS_BASE_URL}/${classId}/members/${memberId}`);
    }

    public getSearchSchool(name: string): Promise<any> {
        return request('get', `${SCHOOL_URL}/searchbyname/${name}`);
    }
    public setMakeClass( info: IMakeClassInfo ): Promise<any>{
        return request('post', `${CLASS_BASE_URL}`, info );
    }

    /**
     * profile image 등록
     * @param classId
     * @param file
     */
    public setUploadProfileImg( classId: string | number, file: any ): Promise<any>{
        return request('upload', `/upload/class/${classId}/banner`, file );
    }

    /**
     * 모든 커리큘럼
     * @param classId
     * @param paging
     */
    public getAllCurriculumByClassId(classId: string | number,  paging: {page_no: number, count: number}={page_no:1, count:10}): Promise<any>{
        return request('get', `${CLASS_BASE_URL}/${classId}/curriculum`, paging );
    }

    /**
     * 클래스 가입 질문 전체 조회
     * @param classId
     */
    public getClassQuestion(classId: number): Promise<any> {
        return request('get', `${CLASS_BASE_URL}/${classId}/question`);
    }

    public setClassQuestion(classId: number, questionId: number, payload: {new_question: string}): Promise<any> {
        return request('put', `${CLASS_BASE_URL}/${classId}/question/${questionId}`, payload);
    }

    public deleteClassQuestion(classId: number, questionId: number): Promise<any> {
        return request('delete', `${CLASS_BASE_URL}/${classId}/question/${questionId}`);
    }

    public makeClassQuestion(classId: number, payload: {question: string}): Promise<any> {
        return request('post', `${CLASS_BASE_URL}/${classId}/question`, payload);
    }

    /**
     * 클래스 태그 조회
     * @param classId
     */
    public getClassTags(classId: number): Promise<any> {
        return request('get', `${CLASS_BASE_URL}/${classId}/tags`);
    }

    /**
     * 클래스 태그 삭제
     * @param classId
     * @param tagId
     */
    public deleteTag(classId: number, tagId: number): Promise<any> {
        return request('delete', `${CLASS_BASE_URL}/${classId}/tags/${tagId}`);
    }

    /**
     * 태그 검색
     * @param keyword
     * @param paging
     */
    public searchTag(keyword: string, paging: {page_no: number, count: number}): Promise<any> {
        return request('get', `tag/search/${keyword}`, paging);
    }

    /**
     * 클래스 태그 추가
     * @param classId
     * @param payload
     */
    public addClassTag(classId: number, payload: {keyword: string}): Promise<any> {
        return request('post', `${CLASS_BASE_URL}/${classId}/tags`, payload);
    }

    /**
     * 클래스 알림 전체 조회 (최신 위쪽에 )
     * @param classId
     * @param payload
     */
    public getPosts(classId: number, payload: {page_no: number, count: number}): Promise<any>{
        return request('get', `${CLASS_BASE_URL}/${classId}/posts`, payload );
    }

    /**
     * 클래스 예약된 알림(게시글) 전체 조회
     * @param classId
     * @param payload
     */
    public getReservedPost(classId: number | string, payload: {page_no: number, count: number}={page_no:1, count:10}): Promise<any>{
        return request('get', `${CLASS_BASE_URL}/${classId}/posts/reserved`, payload);
    }

    /**
     * 클래스 교육과정
     * @param classId
     */
    public getCurriculumList(classId: number): Promise<any>{
        return request('get', `${CLASS_BASE_URL}/${classId}/curriculum` );
    }

    /**
     * 클래스 교육과정 생성
     * @param classId
     * @param curriculumItems
     */
    public setCurriculumList(classId: number, formData: FormData) {
        return request('post', `${CLASS_BASE_URL}/${classId}/curriculum`, formData );
    }

    /**
     * 클래스 교육과정 수정
     * @param classId
     * @param curriculumId
     * @param modifyItems
     */
    public setCurriculumModify(classId: number, curriculumId: number, modifyItems: any): Promise<any>{
        return request('put', `${CLASS_BASE_URL}/${classId}/curriculum/${curriculumId}`, modifyItems );
    }

    /**
     * 클래스 교육과정 삭제
     * @param classId
     * @param curriculumId
     */
    public deleteEducationList(classId: number, curriculumId: number): Promise<any>{
        return request('delete', `${CLASS_BASE_URL}/${classId}/curriculum/${curriculumId}` );
    }


    /**
     * 클래스 교육과정 정보 조회
     * @param classId
     * @param curriculumId
     */
    public getEduCurList(classId: number, curriculumId: number): Promise<any>{
        return request('get', `${CLASS_BASE_URL}/${classId}/curriculum/${curriculumId}` );
    }

    /**
     * 클래스 교육과정 개별코스 전체 조회
     * @param classId
     * @param curriculumId
     */
    public getEduCourseList(classId: number, curriculumId: number): Promise<any>{
        return request('get', `${CLASS_BASE_URL}/${classId}/curriculum/${curriculumId}/course`);
    }

    /**
     * 클래스 교육과정 개별코스 정보 조회
     * @param classId
     * @param curriculumId
     * @param courseId
     */
    public getEduCourseDetail(classId: number, curriculumId: number, courseId: number): Promise<any>{
        return request('get', `${CLASS_BASE_URL}/${classId}/curriculum/${curriculumId}/course/${courseId}` );
    }


    /**
     * 클래스 교육과정 개별코스 생성
     * @param classId
     * @param curriculumId
     */
    public setEduCourseList(classId: number, curriculumId: number): Promise<any>{
        return request('post', `${CLASS_BASE_URL}/${classId}/curriculum/${curriculumId}/course` );
    }

    /**
     * 클래스 교육과정 개별코스 정보 수정
     * @param classId
     * @param curriculumId
     * @param courseId
     * @param data
     */
    public setEduCourseModify(classId: number, curriculumId: number, courseId: number, data: any): Promise<any>{
        return request('put', `${CLASS_BASE_URL}/${classId}/curriculum/${curriculumId}/course/${courseId}`, data);
    }

    /**
     * 클래스 교육과정 개별코스 삭제
     * @param classId
     * @param curriculumId
     * @param courseId
     */
    public deleteEduCourse(classId: number, curriculumId: number, courseId: number): Promise<any> {
        return request('delete', `${CLASS_BASE_URL}/${classId}/curriculum/${curriculumId}/course/${courseId}`);
    }

}

export default new MyClassService();
