import ClassMemberService from '@/api/service/ClassMemberService';
import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {INullable} from '@/types/types';
import {
    IMyClassList,
    IMakeClassInfo,
    IMakeClassInfoBase,
    IClassInfo,
    ICurriculumList,
    IClassMemberInfo, IKeepPostList, ICurriculumDetailList, ICurriculumCourseData, IMakeEducation,
} from '@/views/model/my-class.model';
import MyClassService from '@/api/service/MyClassService';
import {
    // MYCLASS_LIST,
    KEEP_POST_LIST,
    CREATE_CLASS_LIST,
    SET_CLASS_ID,
    // SET_MYCLASS_HOME_DATA,
    REMOVE_CLASS_DATA,
    SET_CLASS_MEMBER_INFO,
    SET_MEMBER_ID,
    UPDATE_SIDE_NUM,
    SET_CURRICULUM_LIST,
    SET_CURRICULUM_DETAIL,
    SET_COURSE_DETAIL,
    MyClassMutation
} from '@/store/mutation-class-types';
import {
    MYCLASS_LIST_ACTION,
    KEEP_POST_LIST_ACTION,
    MAKE_CLASS,
    MYCLASS_HOME,
    GET_CLASS_MEMBER_INFO,
    MODIFY_CLASS_MEMBER_INFO,
    GET_CURRICULUM_LIST_ACTION,
    GET_CURRICULUM_DETAIL_ACTION,
    GET_COURSE_DETAIL_ACTION,
    ADD_CURRICULUM_ACTION,
    DELETE_CURRICULUM_ACTION,
    MODIFY_CURRICULUM_ACTION,
    MODIFY_COURSE_ACTION,
} from '@/store/action-class-types';
import {PostService} from '@/api/service/PostService';
import router from '@/router';
import {Route} from 'vue-router';

@Module({
    namespaced: true,
})
export default class ClassModule extends VuexModule {
    /* State */
    private classData: IMyClassList[]=[];
    private keepPostItems: IKeepPostList[]=[];
    private memberInfo: IClassMemberInfo = {
        joinedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        id: 0,
        class_id: 0,
        user_id: 0,
        nickname: '',
        profile_image: '',
        is_bookmarked: 0,
        schedule_color: 0,
        level: 0,
        status: 0,
        open_level_id: 0,
        open_level_mobileno: 0,
        open_level_email: 0,
        onoff_push_noti: 0,
        onoff_post_noti: 0,
        onoff_comment_noti: 0,
        onoff_schedule_noti: 0,
        schedule_noti_intime: 0,
        visited: 0,
        class_member_auths: [],
    };
    private count: number = 0;
    private classIdx: number = -1;
    private sideMenuNum: number=0;
    private courseIdx: number = 0;
    private memberId: string | number = 0;
    private myClassHomeData: IClassInfo={
        contents_updatedAt:new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        id:0,
        code: '',
        name:  '',
        owner_id: 0,
        owner_member_id:0,
        board_id:0,
        is_private: false,
        image_url: '',
        description: '',
        startday:0,
        endday:0,
        g_type:0,
        g_name:  '',
        g_code:  '',
        member_count: 0,
        question_showYN: false,
        deletedYN: false,
        contents_updated_type: 0,
        class_tags: [],
        class_link:  '',
        me: {
            class_id: 744,
            createdAt: new Date(),
            id: 825,
            is_bookmarked: 0,
            joinedAt: new Date(),
            level: 1,
            nickname: '홍길동1',
            onoff_comment_noti: 1,
            onoff_post_noti: 1,
            onoff_push_noti: 0,
            onoff_schedule_noti: 1,
            open_level_email: 2,
            open_level_id: 1,
            open_level_mobileno: 0,
            profile_image: null,
            schedule_color: 0,
            schedule_noti_intime: 10,
            status: 1,
            updatedAt: new Date(),
            user_id: 45,
            visited: 0
        },
        owner: {
            class_id: 0,
            createdAt: '',
            id: 0,
            is_bookmarked: 0,
            joinedAt: '',
            level: 1,
            nickname: '',
            onoff_comment_noti: 0,
            onoff_post_noti: 0,
            onoff_push_noti: 0,
            onoff_schedule_noti: 0,
            open_level_email: 0,
            open_level_id: 0,
            open_level_mobileno: 0,
            profile_image: '',
            schedule_color: 0,
            schedule_noti_intime:  0,
            status:  0,
            updatedAt: '',
            user_id:  0,
            visited:  0
        }
    };
    private curriculumListData: ICurriculumList={
        total: 0,
        page_no: null,
        pages: null,
        item_count: 0,
        curriculum_list: [
            {
                startAt: '2021-06-01 09:00:00',
                endAt: '2021-06-03 09:00:00',
                expiredAt: '9999-12-31 23:59:59',
                createdAt: '2021-05-25 14:10:06',
                updatedAt: '2021-06-03 01:21:50',
                id: 0,
                class_id: 0,
                board_id: null,
                post_type: 0,
                type: 0,
                user_id: 0,
                user_member_id: 0,
                title: '',
                text: '',
                count: 0,
                param1: 0,
                deletedYN: false,
                owner: {
                    joinedAt: '2020-02-03 15:35:28',
                    createdAt: '2020-02-03 15:35:28',
                    updatedAt: '2021-06-15 11:28:07',
                    id: 0,
                    class_id: 0,
                    user_id: 0,
                    nickname: '',
                    profile_image: '',
                    is_bookmarked: 0,
                    schedule_color: 0,
                    level: 0,
                    status: 0,
                    open_level_id: 0,
                    open_level_mobileno: 0,
                    open_level_email: 0,
                    onoff_push_noti: 0,
                    onoff_post_noti: 0,
                    onoff_comment_noti: 0,
                    onoff_schedule_noti: 0,
                    schedule_noti_intime: 0,
                    visited: 0,
                },
                course_list: [
                    {
                        startDay: '2021-06-03',
                        createdAt: '2021-05-25 14:10:06',
                        updatedAt: '2021-06-03 01:21:50',
                        id: 0,
                        curriculum_id: 0,
                        class_id: 0,
                        index: 0,
                        title: '',
                        contents: '',
                        startTime: '16:30:00',
                        endTime: '19:30:00',
                        deletedYN: false,
                    }
                ]
            }
        ],
        message: '',
    };
    private curriculumDetailData: ICurriculumDetailList={
        startAt: '2019-11-17 10:00:00',
        endAt: '2019-11-17 10:00:00',
        expiredAt: '2019-11-17 10:00:00',
        createdAt: '2019-11-17 10:00:00',
        updatedAt: '2019-11-17 10:00:00',
        id: 0,
        class_id: 0,
        board_id: 0,
        post_type: 0,
        type: 0,
        user_id: 0,
        user_member_id: 0,
        title: '',
        text: '',
        count: 0,
        param1: 0,
        deletedYN: false,
        owner: {
            nickname: '',
            level: 0,
        },
        course_list: [
            {
                startDay: '2019-11-17',
                createdAt: '2019-11-17',
                updatedAt: '2019-11-17',
                id: 0,
                curriculum_id: 0,
                class_id: 0,
                index: 0,
                title: '',
                contents: '',
                startTime: '2019-11-17',
                endTime: '2019-11-17',
                deletedYN: false,
                attachment: [],
            },
        ],
    };
    private courseDetailData: ICurriculumCourseData = {
        startDay: '2019-11-17 10:00:00',
        createdAt: '2019-11-17 10:00:00',
        updatedAt: '2019-11-17 10:00:00',
        id: 0,
        curriculum_id: 0,
        class_id: 0,
        index: 0,
        title: '',
        contents: '',
        startTime: '10:00:00',
        endTime: '10:00:00',
    };
    private makeClassInfo: IMakeClassInfo={
        name:'',
        g_type:'',
        g_name: '',
        is_private: false,
        image_url:''
    };
    private myClassListLen: number=0;

    /* Getters */
    get myClassLists():  IMyClassList[]{
        return this.classData;
    }

    get myClassListLength(): number{
        return this.myClassListLen;
    }

    get createdClassInfo(): IMakeClassInfo {
        return this.makeClassInfo;
    }

    get classID(): number {
        return this.classIdx;
    }

    get courseIndex(): number {
        return this.courseIdx;
    }

    get curriculumListItems(): ICurriculumList{
        return this.curriculumListData;
    }

    get curriculumDetailItem(): ICurriculumDetailList{
        return this.curriculumDetailData;
    }

    get courseDetailItem(): ICurriculumCourseData {
        return this.courseDetailData;
    }

    /**
     * 클래스 홈 ( 클래스 리스트 상세 내역 ) 데이터
     */
    get myClassHomeModel(): IClassInfo {
        return this.myClassHomeData;
    }

    get sideNumModel(): number {
        return this.sideMenuNum;
    }

    get memberInfoModel(): IClassMemberInfo {
        return this.memberInfo;
    }

    /* Mutations */
    @Mutation
    public [MyClassMutation.SET_MY_CLASS_TOTAL](num: number): void{
        this.myClassListLen=num;
    }

    @Mutation
    public [UPDATE_SIDE_NUM](num: number): void{
        this.sideMenuNum=num;
    }

    @Mutation
    public [SET_CURRICULUM_LIST](data: ICurriculumList): void{
        this.curriculumListData=data;
    }

    @Mutation
    public [MyClassMutation.SET_MYCLASS_HOME_DATA]( info: IClassInfo ): void{
        this.myClassHomeData=info;
        localStorage.setItem('homeData', JSON.stringify(this.myClassHomeData) );
    }

    @Mutation
    public [SET_CURRICULUM_DETAIL]( data: any ){
        this.curriculumDetailData=data;
    }

    @Mutation
    public [SET_COURSE_DETAIL]( data: any ){
        this.courseDetailData=data;
    }

    /**
     * classId  변경 시킴
     * @param id
     */
    @Mutation
    public [SET_CLASS_ID]( id: number  ): void {
        this.classIdx=Number( id );
        // console.log('this.classIdx', this.classIdx );
        localStorage.setItem('classId', String( this.classIdx ) );
    }

    @Mutation
    public [CREATE_CLASS_LIST]( infos: IMakeClassInfo ): void {
        this.makeClassInfo = {...this.makeClassInfo, ...infos};
    }

    @Mutation
    public [MyClassMutation.MYCLASS_LIST](classData: IMyClassList[] ): void {
        this.classData = classData;

        // console.log(this.classData);
        // localStorage.setItem('classData', JSON.stringify(this.classData) );
        this.count++;
    }

    @Mutation
    public [KEEP_POST_LIST](postData: IKeepPostList[] ): void {
        this.keepPostItems =postData;
        // localStorage.setItem('postData', JSON.stringify(this.postData) );
        // this.count++;
    }

    @Mutation
    public [SET_MEMBER_ID](memberId: number): void {
        this.memberId = memberId;
    }

    @Mutation
    public [SET_CLASS_MEMBER_INFO](memberInfo: IClassMemberInfo): void {
        this.memberInfo = memberInfo;
        //localStorage.setItem('memberInfo', JSON.stringify(this.memberInfo) );
    }

    /**
     * 클래스 데이터 제거
     */
    @Mutation
    public [REMOVE_CLASS_DATA](): void{
        // console.log('클래스 데이터 제거');
        localStorage.removeItem('homeData');
        // localStorage.removeItem('classData');
        localStorage.removeItem('classId');
        this.classData=[];
        this.keepPostItems=[];
        this.classIdx=-1;
    }

    /* Actions */
    @Action({rawError: true})
    public [MYCLASS_LIST_ACTION]( payload?: { no: number, limit: number } ): Promise<IMyClassList[]> {

        // const fetchMyClassList=( payload )? MyClassService.getAllMyClassPaging : MyClassService.getAllMyClass;

        // console.log('MYCLASS_LIST_ACTION, no=', no, '::limit=', limit);

        const func = (...args: any[]) => {
            console.log(args[0]);
            return (args[0]) ? MyClassService.getAllMyClassPaging(args[0].no, args[0].limit) : MyClassService.getAllMyClass();
        };

        return func(payload)
            .then((data: any) => {

                // console.log(router.currentRoute);
                if (router.currentRoute.name === 'myClassList') {
                    // console.log('현재 route name=', router.currentRoute);
                    this.context.commit(SET_CLASS_ID, -1);
                }

                this.context.commit(MyClassMutation.MYCLASS_LIST, data.myclass_list);
                this.context.commit(MyClassMutation.SET_MY_CLASS_TOTAL, data.total_count);

                return Promise.resolve(data.myclass_list);
            }).catch((error: any) => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    @Action({rawError: true})
    public [KEEP_POST_LIST_ACTION](): Promise<IKeepPostList[]> {
        return PostService.getMyKeepPosts()
            .then((data: any) => {
                this.context.commit(KEEP_POST_LIST, data.post_list);
                return Promise.resolve(data.post_list);
            }).catch((error: any) => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    @Action({rawError: true})
    public [MAKE_CLASS]( infos: IMakeClassInfoBase ): Promise<IMakeClassInfo>{
        this.context.commit( CREATE_CLASS_LIST, infos );

        console.log(this.makeClassInfo);
        return MyClassService.setMakeClass( this.makeClassInfo )
          .then( (data: any)=>{
              // console.log(data.classinfo);
              this.context.commit( CREATE_CLASS_LIST, this.makeClassInfo );
              return Promise.resolve(this.makeClassInfo);
          }).catch((error: any)=>{
              console.log(error);
              return Promise.reject(error);
          });
    }

    /**
     * 클래스 상세 내역 가져오기
     * @param id
     */
    @Action({rawError: true})
    public [MYCLASS_HOME]( id: string | number ): Promise<any>{
        //
        this.context.commit(SET_CLASS_ID, id);

        return MyClassService.getClassInfoById( id )
          .then( (data)=>{
              this.context.commit(MyClassMutation.SET_MYCLASS_HOME_DATA, data.classinfo );
              // console.log('통신 후 vuex MYCLASS_HOME=', this.classID, '::리스트 클릭 id=', id, this.classIdx );
              return Promise.resolve( this.myClassHomeData );
          }).catch((error)=>{
              console.log(error);
              return Promise.reject(error);
          });


        // return this.$routers
    }

    @Action({rawError: true})
    public [GET_CLASS_MEMBER_INFO](payload: { classId: number, memberId: number }): Promise<IClassMemberInfo>{
        return ClassMemberService.getClassMemberInfo(payload.classId, payload.memberId)
          .then((data) => {
              this.context.commit(SET_CLASS_MEMBER_INFO, data);
              // console.log(this.memberInfo);
              return Promise.resolve(this.memberInfo);
          })
          .catch((error) => {
              console.log(error);
              return Promise.reject(error);
          });
    }

    @Action({rawError: true})
    public [MODIFY_CLASS_MEMBER_INFO](payload: {classId: number, memberId: number}, data: any): Promise<any>{
        return ClassMemberService.setClassMemberInfo(payload.classId, payload.memberId, data)
          .then(() => {
              this.context.commit(SET_CLASS_MEMBER_INFO, data);
              console.log('수정한 내용 = ', data);
              return Promise.resolve(this.memberInfo);
          })
          .catch((error) => {
              console.log(error);
              return Promise.reject(error);
          });
    }

    @Action
    public [GET_CURRICULUM_LIST_ACTION]( payload: { classId: number}  ): Promise<any>{
        return MyClassService.getCurriculumList( payload.classId )
            .then((data) => {
                console.log(data);
                this.context.commit(SET_CURRICULUM_LIST, data);
                console.log('curriculumListData=', this.curriculumListData);
                return Promise.resolve(this.curriculumListData);
            }).catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    @Action
    public [GET_CURRICULUM_DETAIL_ACTION](payload: { classId: number, curriculumId: number}): Promise<any>{
        return MyClassService.getEduCurList(payload.classId, payload.curriculumId )
            .then((data) => {
                this.context.commit(SET_CURRICULUM_DETAIL, data.curriculum);
                // console.log('curriculumDetailData=', data.curriculum);
                return Promise.resolve(this.curriculumDetailData);
            }).catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    @Action
    public [GET_COURSE_DETAIL_ACTION](payload: { classId: number, curriculumId: number, courseId: number }): Promise<any>{
        return MyClassService.getEduCourseDetail(payload.classId, payload.curriculumId, payload.courseId )
            .then((data) => {
                this.context.commit(SET_COURSE_DETAIL, data.course);
                console.log('courseDetailData=', this.courseDetailData);
                return Promise.resolve(this.courseDetailData);
            }).catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    @Action
    public [DELETE_CURRICULUM_ACTION](payload: { classId: number, curriculumId: number }): Promise<any>{
        return MyClassService.deleteEducationList( payload.classId, payload.curriculumId )
            .then((data)=>{
                console.log(this.curriculumListItems);
                const findIdx=this.curriculumListItems.curriculum_list.findIndex((item) => item.id === payload.curriculumId);

                this.curriculumListItems.curriculum_list.splice(findIdx, 1);
                return Promise.resolve(data);
            }).catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    @Action
    public [ADD_CURRICULUM_ACTION](payload: { classId: number, formData: FormData }): Promise<any> {
        return MyClassService.setCurriculumList( payload.classId, payload.formData )
            .then(( data )=>{
                // console.log(data);
                this.curriculumListData.curriculum_list.push( data.curriculum );
                return Promise.resolve(data);
            }).catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    @Action
    public [MODIFY_CURRICULUM_ACTION](classId: number, curriculumId: number, formData: FormData): Promise<any> {
        return MyClassService.setCurriculumModify(classId, curriculumId, formData)
            .then((data) => {
                console.log('modified curriculum data=', data.curriculum);
                this.context.commit(SET_CURRICULUM_DETAIL, data.curriculum);
                const findIdx = this.curriculumListItems.curriculum_list.findIndex((item) => item.id===curriculumId);
                this.curriculumListItems.curriculum_list.splice(findIdx, 1, data.curriculum);
                return Promise.resolve(this.curriculumDetailData);
            }).catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    @Action
    public [MODIFY_COURSE_ACTION](classId: number, curriculumId: number, courseId: number, formData: FormData): Promise<any> {
        return MyClassService.setEduCourseModify(classId, curriculumId, courseId, formData)
            .then((data) => {
               console.log('modified course data=', data.updated_course);
               this.context.commit(SET_COURSE_DETAIL, data.updated_course);
            });
    }
}
