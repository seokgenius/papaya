<template>
  <!--

  설명
   <check-button :btn-id="체크박스 아이디"
                      :check-name="체크박스 네임"
                      :b-data="v-model 로 쓰여질 배열 데이터 혹은 boolean 값"
                      :btn-value="체크박스 value"
                      @click="클릭시 실행할 함수">라벨 텍스트</check-button>

  ex)

 public allCheckValue: string = 'all';
private allChecked: boolean = true;


<check-button :btn-id="`check${item.idx}`"
                          :check-name="`check${item.idx}`"
                          :b-data="checkData"
                          :btn-value="item.val"
                          @click="updateCheck">{{ item.tit }}</check-button>
  -->
  <div class="btn-checkbox" :class="buttonType">
    <input type="checkbox"
           :name="checkName"
           :id="btnId"
           :value="btnValue"
           :checked="checked"
           @change="update( $event.target.value, $event.target.checked )">
    <label :for="btnId">
      <slot></slot>
    </label>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

@Component
export default class CheckButton extends Vue{


  @Prop(String)
  public checkName!: string;

  @Prop(String)
  public btnId!: string;

  @Prop(String)
  public label!: string;

  @Prop([Boolean, String, Number])
  public btnValue!: string | boolean | number;

  @Prop( [ Array, Boolean, String ] )
  private bData!: string[] | boolean | string;

  @Prop(Boolean)
  private checked!: boolean;

  @Prop(String)
  private readonly type: string | undefined;

  get buttonType(): object{
    return {
      round: this.type !== undefined && this.type === 'round',
    };
  }

  @Emit()
  private update( value: string | number | boolean, checked: boolean ): void {
    // console.log( this.btnValue, value );
    this.$emit('click', value, checked );
  }



}
</script>

<style scoped>

</style>
