<template>
  <div>
    <transition name="modal">
      <modal v-if="isOpen"  @modalClose="popupChange(false)">
        <div slot="header">
          <h3>{{ title }}</h3>
          <div class="popup-close" @click="popupChange(false)">
            <button type="button" class="close" ><img :src="require('@/assets/images/close.svg')" alt=""></button>
          </div>
        </div>
        <div slot="body"> {{ msg }}</div>
        <div slot="footer">
          <div class="btn-group ct">
            <btn @btnClick="popupChange(false)">확인</btn>
          </div>
        </div>
      </modal>
      <!-- end: 로그인 실패시 팝업 -->
    </transition>
  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop } from 'vue-property-decorator';
import Modal from './modal.vue';
import Btn from '../button/Btn.vue';

@Component({
  components:{
    Modal,
    Btn,
  }
})
export default class NoticePopup extends Vue{
  @Prop(Boolean)
  private isOpen!: boolean;

  @Prop(String)
  private title!: string;

  @Prop(String)
  private msg!: string;

  private popupChange( value: boolean ) {
    this.$emit('change', value);
  }
}
</script>

<style scoped>

</style>
