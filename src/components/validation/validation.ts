import {Vue} from 'vue-property-decorator';
import {ValidationProvider, ValidationObserver, extend} from 'vee-validate';
import {required} from 'vee-validate/dist/rules';
import {Utils} from '@/utils/utils';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

/* vee-validate rules
alpha, alpha_dash, alpha_num, alpha_spaces,
between, confirmed, digits, dimensions, email,
excluded, ext, image, oneOf, integer, is, is_not, length, max,
max_value, mimes, min, min_value, numeric,
regex, required, required_if, size, double,
* */

/*
ts tip
Record<Keys,Type>
속성 키가 Keys이고 속성 값이 인 객체 유형을 생성합니다 Type.
이 유틸리티는 유형의 속성을 다른 유형에 매핑하는 데 사용할 수 있습니다.

Record<string, any> 와 비슷한 맥락은 { [key: string]: any}
*/

extend('required', {
  ...required,
  //placeholder 는 object 이며  _field_ , _rule_, _value_ 등을 가지고 있다.
  message: ( fieldName: string, placeholder: Record<string, any>) => {
    return `${fieldName} 기입 필요.`;
  }
});
// validate(value, { min, max } 에서 {min,max}는
//<ValidationProvider> 태그에서 속성  rules="minmax:3,8" 의 전달인자인 3,8 부분이다.
//아래 _field_  는 지정된 앨리먼트의 name 값을 의미한다.
extend('minmax', {
  // @ts-ignore
  validate(value: string, {min, max}: Record<number, []>): boolean{
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message: '{_field_}는 최소 {min}자 이상 최대 {max}자 이하 이여야 합니다.',
});

extend('confirmed', {
  //해당 부분은 html 에서 @name 을 의미 / 즉 name=first 이면 @first 를 의미.
  params: ['target'],
  validate( value: string | number, {target}: Record<string | number, any>): boolean {
    return value === target;
  },
  message: ( fieldName: string, placeholder: Record<string, any>) => {
    return `${fieldName}(이)가 일치하지 않습니다.`;
  }
});

extend('mobile', (value: string ) => {
  const mobileRegx = Utils.getMobileRegx();
  if ( mobileRegx.test( value ) ) {
    return true;
  }
  return '유효하지 않은 번호입니다.';
});

extend('email', (value: string ) => {
  /////^[a-z0-9!#$%&'*+\\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/ig;
  const emailRegx = Utils.getEmailRegx();
  if ( emailRegx.test( value ) ) {
    return true;
  }
  return '유효하지 않은 이메일입니다.';
});

extend('word', (value: string ) => {
  const userIDRegx = Utils.getEnWordRegx();
  if ( userIDRegx.test( value ) ) {
    return true;
  }
  return '한글/특수문자 불가능. 영문, 숫자만 기입 가능';
});

extend('pwd', (value: string ) => {
  const userPWRegx =Utils.getPwdRegx(5, 16);
  if ( userPWRegx.test( value ) ) {
    return true;
  }
  return '16자 이하 / 특수문자 가능 / 영문, 숫자 혼합 필수';
});

extend('url', (value: string ) => {
  const urlRegx = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  if ( urlRegx.test( value ) ) {
    return true;
  }
  return '올바른 링크가 아닙니다.';
});

/*
//start: 기본  =====================
extend('positive', value => {
  if (value >= 0) {
    return true;
  }
  return 'This field must be a positive number';
});

<ValidationProvider rules="positive" v-slot="{ errors }">
  <input v-model="value" type="text">
  <span>{{ errors[0] }}</span>
</ValidationProvider>
//end: 기본 =====================

//start: 인자값을 파라미터 전달 하는 방식으로 할때 =====================
extend('min', {
  validate(value, args) {
    return value.length >= args.length;
  },
  params: ['length']
});
---> html
<ValidationProvider rules="min:3" v-slot="{ errors }">
  <input v-model="value" type="text">
  <span>{{ errors[0] }}</span>
</ValidationProvider>
//end: 인자값을 파라미터 전달 하는 방식으로 할때 =====================


전달인자 무한으로 받기
아래 코드처럼 2번째 매개변수부분에 리턴 arrow 함수로 대입하면된다.
extend('one_of', (value, values) => {
  return values.indexOf(value) !== -1;
});

//html
<ValidationProvider rules="one_of:1,2,3,4,5,6,7,8,9" v-slot="{ errors }">
  <input v-model="value" type="text">
  <span>{{ errors[0] }}</span>
</ValidationProvider>
*/
