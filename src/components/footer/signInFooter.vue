<template>
  <!-- start: footer -->
  <footer class="dark">
    <div class="footer-inner clearfix">
      <div class="footer-logo"></div>

      <ul class="footer-address">
        <li class="items">
          <p class="item-txt-w">(주)이니션 대표이사 : 류동석<br />서울시 강남구 테헤란로26길 12<br />제일비전타워 10층</p>
        </li>
        <li class="items">
          <address class="item-txt-w">
            10F, 12, Teheran-ro 26-gil,<br />
            Gangnam-gu, Seoul, Republic of Korea
          </address>
        </li>
      </ul>

      <ul class="footer-menu">
        <li><router-link :to="{path:'/noticeBoard'}" class="item-txt-w" @click.native="leftMenuActive(0)">공지사항</router-link></li>
        <li><router-link :to="{path:'/customerCenter'}" class="item-txt-w" @click.native="leftMenuActive(1)">고객센터</router-link></li>
        <li><router-link :to="{path:'/termsOfService'}" class="item-txt-w" @click.native="leftMenuActive(2)">이용약관</router-link></li>
      </ul>
    </div>
  </footer>
  <!-- //end: footer -->
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import EventBus from '@/store/EventBus';

const History = namespace('History');

@Component
export default class SignInFooter extends Vue{

  @History.Getter
  private pageHistory!: string;

  public updated() {
    // this.currRouteName=this.$route.name;
    console.log(this.pageHistory);
  }

  /**
   * EventBus를 이용한 마이페이지 좌측 메뉴 활성화 값 전달
   * @param idx
   * @private
   */
  private leftMenuActive(idx: number): void {
    EventBus.$emit('activeLeftMenu', idx);
  }
}

</script>

<style scoped>

</style>
