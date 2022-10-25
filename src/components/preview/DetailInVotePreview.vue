<template>
  <div class="fd-inner" v-if="items!==null">
    <p class="fd-inner-txt fc-red">{{ isVote(items[finishAt]) ? '투표 중' : '투표마감' }}
      <span class="vote-count"><span class="count-num">0</span>/233명 응답</span>
    </p>

    <div class="vote-area none">
      <div class="vote-top">
        <p class="vote-tit">{{ items[title] }}</p>
        <ul class="vote-option clearfix">
          <li>{{ (items[choice]) ? '복수선택' : '단일선택' }}</li>
          <li>{{ (items[mode]) ? '익명투표' : '공개투표' }}</li>
          <li>{{ (items[finishAt]) ? items[finishAt] + ' 마감' : '종료일자없음' }}</li>
        </ul>
      </div>
      <div class="vote-checkbox" v-if="items[choicesList]!==null">
        <div class="vote-select" v-for="(choiceItem, index) in items[choicesList]" :key="`choiceItem-${index}`">
          <!--<div class="btn-radio">
            <input type="radio" name="email" id="radio1">
            <label for="radio1">경주<br><span><em class="vote-current">0</em>명</span></label>
          </div>-->

          <check-button :btn-id="`check-${index}`"
                        :check-name="`check-${index}`"
                        type="round"
                        :checked="getChoiceCheck( choiceItem )"
                        :btn-value="choiceItem.id"
                        @click="optionFindChange">{{ choiceItem.text }}<br><span><em class="vote-current">{{ choiceItem[userChoices].length }}</em>명</span></check-button>

          <!--<radio-button :btn-id="`radio-${index}`"
                        radio-name="radio"
                        :btn-value="item.text"
                        :active-value="radioValue"
                        v-model="radioValue"
                        @click="optionFindChange">{{ item.text }}<br><span><em class="vote-current">0</em>명</span></radio-button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop } from 'vue-property-decorator';
import {IReadAbleVoteList, IVoteUserChoice} from '@/views/model/post.model';
import CheckButton from '@/components/check/CheckButton.vue';
import RadioButton from '@/components/radio/RadioButton.vue';

@Component({
  components: {
    RadioButton,
    CheckButton
  }
})
export default class DetailInVotePreview extends Vue{

  @Prop(Object)
  private items!: any;
/*
  vote_choices: [
    {
       createdAt: "2021-05-30 17:50:55"
      id: 341
      image_url: null
      index: 3
      text: "fasdfsadfasdf"
      updatedAt: "2021-05-30 17:50:55"
      user_choices: []
       vote_id: 191
    }
  ]
  */
  @Prop([String, Number])
  private memberId!: string | number;

  @Prop(String)
  private choicesList!: string;

  @Prop(String)
  private userChoices!: string;

  @Prop(String)
  private finishAt!: string; //finishAt

  @Prop(String)
  private title!: string; //title

  @Prop(String)
  private choice!: string;  //multi_choice

  @Prop(String)
  private mode!: string;  //anonymous_mode


  public getChoiceCheck( choiceItem: any ) {
    const findItem=choiceItem[this.userChoices].filter( (item: any)=>{
      return item.member_id === Number( this.memberId );
    } );
    return findItem.length>0;
  }

  // private radioValue: string = '';

  public isVote(item: Date | null): boolean {
    if (item === null) {return true;}
    const finishTime = new Date(item).getTime();
    const currentTime = new Date().getTime();
    return (finishTime > currentTime);
  }
  //class - 724 / postid - 1302 /  vote - 206 ( 369, 370, 371 )
  public optionFindChange(value: string | number | boolean, checked: boolean) {

    this.$emit('checked', value, checked );
  }

}
</script>

<style scoped>

</style>
