<template>
  <!-- start: add-link list -->
  <div class="form-add-list" v-if="fileItems.length>0">
    <div class="add-item">
      <div class="add-item-top">
        <p class="add-item-tit">{{ getTitle() }}</p>
        <div class="add-item-btn">
          <a href="" class="txt-btn" @click.prevent="removeAll">전체삭제</a>
        </div>
      </div>

      <div class="add-item-cnt pdt-desc"  style="padding:0" >
        <div class="add-file">
          <ul class="add-file-list" style="padding:0;">
            <li v-for="(item, index) in fileItems" :key="`file-${index}`">
              <p>{{ (item[name])? item[name]: item.originalname }}</p>
              <a href="#" class="add-file-delete" @click.prevent.stop="removeFile( index )"><img :src="require('@/assets/images/delete.svg')" alt="" @load="loadedFile"></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- end: add-link list -->
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

@Component
export default class FilePreview extends Vue{

  @Prop(Array)
  private fileItems!: string[];

  @Prop(String)
  private name!: string;

  @Emit()
  private removeFile( idx: number ) {
    this.$emit('removeFile', idx);
  }

  @Emit()
  private loadedFile(){
    this.$emit('loadedFile');
  }

  @Emit()
  private removeAll(): void{
    this.$emit('removeAttachFileAll');
  }

  private getTitle() {
    return (!this.fileItems)? '' : `첨부 파일 ${this.fileItems.length}`;
  }


}
</script>

<style scoped>

</style>
