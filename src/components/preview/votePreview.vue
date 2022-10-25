<template>
  <div class="form-add-list" v-if="fileItems!==null && length>0">
    <div class="add-item">
      <div class="add-item-top">
        <p class="add-item-tit">투표</p>
        <div class="add-item-btn">
          <a href="" class="txt-btn" @click.prevent="modify">수정</a>
          <a href="" class="txt-btn" @click.prevent="remove">삭제</a>
        </div>
      </div>

      <div class="add-item-cnt">
        <div class="add-vote">
          <p class="add-vote-tit">{{ fileItems[title] }}</p>
          <ul class="add-vote-type clearfix">
            <li>{{ (fileItems[choice]) ? '복수선택' : '단일선택' }}</li>
            <li>{{ (fileItems[mode]) ? '익명투표' : '공개투표' }}</li>
            <li>{{ (fileItems[finishAt]) ? fileItems[finishAt] + ' 마감' : '종료일자없음' }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

@Component
export default class VotePreview extends Vue{

  @Prop(Object)
  private fileItems!: string[];

  @Prop(String)
  private finishAt!: string; //finishAt

  @Prop(Number)
  private length!: number;

  @Prop(String)
  private title!: string; //title

  @Prop(String)
  private choice!: string;  //multi_choice

  @Prop(String)
  private mode!: string;  //anonymous_mode

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
