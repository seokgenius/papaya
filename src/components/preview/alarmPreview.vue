<template>
  <div class="form-add-list" v-if="alarmItem!==''">
    <div class="add-item">
      <div class="add-item-top">
        <p class="add-item-tit">예약 알림</p>
        <div class="add-item-btn">
          <a href="" class="txt-btn" @click.prevent="modify">수정</a>
          <a href="" class="txt-btn" @click.prevent="remove">삭제</a>
        </div>
      </div>

      <div class="add-item-cnt" style="padding:10px 0;">예약 설정된 일시 : <strong class="badge">{{ alarmItem }}</strong></div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

@Component
export default class AlarmPreview extends Vue{

  @Prop(String)
  private alarmItem!: string;

  @Emit()
  private remove(): void{
    this.$emit('remove');
  }

  @Emit()
  private modify(): void{
    this.$emit('modify');
  }

}
</script>

<style scoped>

</style>
