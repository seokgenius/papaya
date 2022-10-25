<template>
  <!--
  <select-box
  id="startYear"
  size="390"
  :items="startYears"
  @change="updateYears"
  :selected-value="selectDataModel"></select-box>-->
  <select :style="{width:size+'px'}"
          class="form-control"
          :value="selectedValue"
          :id="id"
          :class="selectBoxType"
          @change="updateValue($event.target.value)">
    <option v-for="item in items" :value="item">{{ item }}</option>
  </select>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class SelectBox extends Vue{

  @Prop(String)
  private readonly id: string | undefined;

  @Prop(String)
  private size: string | undefined;

  @Prop(String)
  private addClass!: string;

  @Prop(Array)
  private items: string[] | undefined;

  @Prop([String, Number, Date])
  private selectedValue!: string | number | Date;

  get selectBoxType(): string{
    return this.addClass;
  }

  private updateValue( value: string | number ): void {
    this.$emit('change', value);
  }
}
</script>

<style scoped>

</style>
