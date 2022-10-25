<template>
  <div>
    <div class="loader-container">
      <div class="hollow-dots-spinner">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
    <button class="loader-checker" style="visibility: hidden;">loader checker</button>
  </div>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class ScrollObserver extends Vue{

  @Prop(Boolean)
  private isLoader!: boolean;

  public mounted() {
    // options 설정
    const options = {
      root: null, // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
      rootMargin: '10px', // rootMargin을 '10px 10px 10px 10px'로 설정
      threshold: [0, 0.5, 1] // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
    };
    // IntersectionObserver 를 등록한다.
    const io = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      //viewport 에 해당 엘리먼트가 진입시
      if (entries[0].isIntersecting) {
        this.$emit('update', true);
        this.loaderView( this.isLoader );
      }else{
        this.$emit('update', false);
        this.loaderView( this.isLoader );
      }
    }, options );

    //컨텐츠가 화면에 렌더링 되기까지 시간이 걸리기에 setTimeout 을 써서 딜레이를 준다.
    setTimeout(() => {
      const checker = this.getElement('.loader-checker');
      // console.log(moreBtn);
      if (checker) {
        // 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
        io.observe( checker );
      }
    }, 300 );
  }

  public getElement( selector: string ) {
    return document.querySelector(selector) as Element;
  }

  public loaderView( isLoading: boolean= true) {
    const loader=this.getElement('.hollow-dots-spinner');
    // console.log(loader);
    if (isLoading) {
      if (loader.classList.contains('disabled')) {
        loader.classList.remove('disabled');
      }
    }else{
      loader.classList.add('disabled');
    }
  }
}
</script>
