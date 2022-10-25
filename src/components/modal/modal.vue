<template>
    <div class="popup">
      <div class="modal-dim" @click.self="close"></div>
      <!-- popup-dialog : active 시 화면 노출 -->
      <div class="popup-dialog active" :style="{ width: size || '400px'}">
        <!-- popup header -->
        <div class="popup-header">
          <slot name="header">
            <!--<div class="popup-icon error"></div>
            <div class="popup-close">
              <button class="close"><img :src="require( '@/assets/images/close.svg')" alt=""></button>
            </div>-->
          </slot>
        </div>
        <!--// popup header -->

        <!-- popup body -->
        <div class="popup-body">
          <div class="popup-cnt" :style="{padding: bodyPadding }">
            <slot name="body"></slot>
            <!--<h2 class="popup-tit">만 14세 미만 회원입니다.</h2>
            <p class="popup-txt">만 14세 미만의 경우 회원가입 시 보호자(법정대리인)의 실명 인증을 통한 가입 동의가 필요합니다.</p>-->
          </div>
        </div>
        <!--// popup body -->

        <!-- popup footer -->
        <div class="popup-footer" :style="{padding: footerPadding }">
          <slot name="footer"></slot>
          <!--<div class="btn-group rt">
            <button type="button" class="btn outline">취소</button>
            <button type="button" class="btn primary navi">처음으로</button>
          </div>-->
        </div>
        <!--// popup footer -->
      </div>
    </div>
</template>
<!-- example
<modal v-if="showModal" @close="showModal = false">
  <h3 slot="header">custom header</h3>
  <div slot="body"> default body </div>
  <div slot="footer"> default body </div>
</modal>
-->
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class Modal extends Vue{

  @Prop(String)
  private size!: string;

  @Prop(String)
  private bodyPadding!: string;

  @Prop(String)
  private footerPadding!: string;

  public close(): void{
    console.log('클릭');
    this.$emit('modalClose');
  }
}
</script>

<style lang="scss" scoped>



/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

/*.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .popup-dialog,
.modal-leave-active .popup-dialog {
  transform: translate(-50%, -50%) scale(0.3);
}*/
</style>
