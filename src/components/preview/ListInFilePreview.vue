<template>
  <div class="fd-inner" v-if="getFileDataSort(fileItems).length>0">
    <p class="fd-inner-txt">첨부 파일 {{ getFileDataSort(fileItems).length }}</p>
    <ul class="file-list clearfix">
      <li v-for="( fileItem, index ) in getFileDataSort(fileItems)" :key="`file-${index}`">
        <a :href="fileItem[location]" target="_blank">{{ fileItem[name] }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import {IAttachFileModel} from '@/views/model/post.model';

@Component
export default class ListInFilePreview extends Vue{

  @Prop(Array)
  private fileItems!: IAttachFileModel[];

  @Prop(String)
  private name!: string;

  @Prop(String)
  private location!: string;

  private getFileDataSort(fileData: IAttachFileModel[] ) {
    return fileData.filter( (item: IAttachFileModel) => item.contentType !== 'image/png' && item.contentType !== 'image/jpg' && item.contentType !== 'image/jpeg' && item.contentType !== 'image/gif');
  }

}
</script>

<style scoped>

</style>
