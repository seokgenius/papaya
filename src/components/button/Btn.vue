<template>
  <button type="button"
          :id="id"
          :style="`width:${width}px`"
          class="btn"
          :disabled="disabled"
          :class="buttonType"
          @click.stop="buttonClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class Btn extends Vue{

  @Prop([Number, String])
  private readonly width: number | string | undefined;

  @Prop(String)
  private readonly type: string | undefined;

  @Prop(String)
  private readonly size: string | undefined;

  //부모 태그에서는 -> v-bind 축약형 (:)
  // :disabled="!userMobileState"
  @Prop(Boolean)
  private disabled!: boolean;

  @Prop(String)
  private full!: string;

  @Prop(String)
  private id!: string;

  get buttonType(): object{
    return {
      'primary': this.type===undefined || this.type === 'primary',
      'outline': this.type ==='outline',
      'grey': this.type ==='grey',
      'navi': this.type ==='navi',
      'sm': this.size ==='small' || this.size ==='sm',
      'lg': this.size ==='large' || this.size ==='big' || this.size ==='lg',
      'btn-block': this.size === 'full',
      'lg btn-block': this.size === 'wide',
    };
  }

  public buttonClick() {
    this.$emit('btnClick');
  }

}
</script>

<style scoped>

</style>
