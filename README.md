# papaya-webapp (페이지 제외한 컴포넌트만 업로드)

## 구성 방식
- vue( ver : 2.6.11 ) 
- vuex ( ver: 3.4.0 ) 
- vue-router( ver: 3.2.0 )
- vue-class-component( ver : 7.2.3 )
- vue-property-decorator( ver : 8.4.2 )
- vuex-class( ver : 0.3.2 )
- vuex-module-decorators( ver : 1.0.1 )
- Typescript ( ver: 3.9.3 )
- vee-validate( ver : 3.4.5 )
- vuetify( ver : 2.4.9 ) / 
  vuetify 는 typescript / vue-template-compiler 가 먼저 깔려 있고 이미 프로젝트가 진행된 상태라면
  ```vue add vuetify``` 명령어가 아닌 npm install vuetify --save 로 직접 설치 하는 것이 바람직하다.

## Swagger api URL
- http://211.254.212.184:8089/api-docs/#/

## Web publishing  ( scss compile )
```
gulp dev 
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for build
```
npm run build
```


### Compiles and minifies for production
```
npm run prod
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```
https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations

### HTML5 History Mode 에서 Nginx 설정법
- https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations

**nginx**
```
location / {
  try_files $uri $uri/ /index.html;
}
```

### .env 파일 설정.
- .env 파일 환경 변수는 무조건 VUE_APP_ 이라는 prefix 가 서두에 붙어야 한다.



## 기능 별 화면 

### header / footer 

### search 
- 검색 결과 `src/views/search/SearchResultPage `
- 검색 호출 helper  `src/views/service/search/SearchService`
- 상단 gnb 서치 아이콘 `src/components/header/search.vue`

###  side menu 

###  api 호출 

### store   `src/store`

### 공통 컴포넌트 `src/components/`


### 공통 함수 `src/mixin/`  
- 사용된 곳 `src/views/class/notification/EditNotificationPopup.ts`
ex) 
```
import UtilsMixins from '@/mixin/UtilsMixins';

export default class 클래스이름 extends  Mixins(UtilsMixins){ 
   //여기서 mixin 함수 호출 가능 
}
```

### 화면 ID 가이드
> 
> - 페이지 성격 분류는 P 로 끝나면 된다. HP - 홈/메인, MP - 마이페이지,  LP - 각 카테고리 랜딩 페이지, SBP - 서브 하위페이지 
> - 기능 단위의 페이지 : SI - 로그인, SP - 회원가입, SC - 찾기(검색), PP - 팝업 
> - 타입 단위의 페이지 : LT - 리스트, CD - 카드, GD - 그리드, SKD - 스케쥴러/캘린더 
> - 하위표현은 점 ( . ) 기능과 타입끼리의 연결은 대시( - ) 로 표현한다.
> - 각 페이지별 ID 만들기 요약 -> 페이지.카테고리약어.기능-타입.순번 
> - ex) 4.5.2 클래스 홈 페이지 알림 -> LP.CLS.CD-LT.4.5.2  
> - ex) 4.3.1 클래스 만들기 분류 선택 -> SBP.CLSC.4.3.1
> - ex) 4.3.1.1.1 클래스 만들기-분류 선택-학교-검색창 Focus -> SBP.CLSC.SC-PP.4.3.1.1.1


###  typescript
- 에러 or tip
- 중첩된 Scope 에 기존의 변수 이름을 사용하는 것을 Shadow
- api 통신하는 객체는 interface 로 구조를 잡는다.
- let과 const중 어떤 것을 사용할지 스스로 선택. 
최소 권한의 원칙(Principle of least privilege)을 적용하면 수정하려는 모든 선언은 const 를 사용한다.

- Destructuring
- 함수
```
function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
f([1, 2]);
```

- 객체
```	
({ a, b } = { a: "baz", b: 101 });
//
let { a, b }: { a: string, b: number } = o;
```


--------- 

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
