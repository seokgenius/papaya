<template>
  <div class="fd-inner" v-if="fileItems!==null && length>0">
    <p class="fd-inner-txt fc-red">{{ isVote(fileItems[finishAt]) ? '투표 중' : '투표마감' }}</p>
    <div class="vote-area">
      <p class="vote-tit">{{ fileItems[title] }}</p>
      <ul class="vote-option clearfix">
        <li>{{ (fileItems[choice]) ? '복수선택' : '단일선택' }}</li>
        <li>{{ (fileItems[mode]) ? '익명투표' : '공개투표' }}</li>
        <li>{{ (fileItems[finishAt]) ? fileItems[finishAt] + ' 마감' : '종료일자없음' }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

@Component
export default class ListInVotePreview extends Vue{

  @Prop(Object)
  private fileItems!: any;

  @Prop(Number)
  private length!: number;

  @Prop(String)
  private finishAt!: string; //finishAt

  @Prop(String)
  private title!: string; //title

  @Prop(String)
  private choice!: string;  //multi_choice

  @Prop(String)
  private mode!: string;  //anonymous_mode


  private isVote(item: Date | null): boolean {
    if (item === null) {return true;}
    const finishTime = new Date(item).getTime();
    const currentTime = new Date().getTime();
    return (finishTime > currentTime);
  }

}
</script>

<style scoped>

</style>
