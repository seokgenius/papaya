<template>
  <div class="fd-inner"  v-if="fileItems!==null && fileItems.length>0">
    <ul class="img-list clearfix">
      <li class="img-item"
          :class="cssClassName"
          v-for="( imgItem, imgIndex ) in getImgFileDataSort(fileItems)"
          :key="`img-${imgIndex}`" >
<!--        href=imgItem[location]-->
        <a href="javascript:void(0);"
           :data-count="imgFileMoreNum"
           :class="{'pseudo-del': imgTotalNum }">
          <img :src="imgItem[location]" alt="">
        </a>
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import {IAttachFileModel} from '@/views/model/post.model';

@Component
export default class ListInImgPreview extends Vue{

  @Prop(Array)
  private fileItems!: IAttachFileModel[];

  @Prop(String)
  private location!: string;

  @Prop(String)
  private readonly addClass: string | undefined;

  get cssClassName(): string{
    return (this.addClass !== undefined)? this.addClass : '';
  }

  get imgFileMoreNum() {
    return (this.fileItems)? ( this.getImgFileDataSort( this.fileItems ).length>3 )? `+${this.getImgFileDataSort( this.fileItems ).length - 3}` : '' : 0;
  }

  get imgTotalNum() {
    return (this.fileItems && this.getImgFileDataSort(this.fileItems).length <=3);
  }

  private getImgFileLen( items: IAttachFileModel[] ): number{
    return (items) ? this.getImgFileDataSort( items ).length : 0;
  }

  private getImgFileDataSort(fileData: IAttachFileModel[] ) {
    return fileData.filter((item: IAttachFileModel) => item.contentType === 'image/png' || item.contentType === 'image/jpg' || item.contentType === 'image/jpeg' || item.contentType === 'image/gif');
  }

  private getImgFileMoreCheck(  items: IAttachFileModel[] ) {
    return (items)? ( this.getImgFileDataSort( items ).length>3 )? `+${this.getImgFileDataSort( items ).length - 3}` : '' : 0;
  }

  private getImgTotalNum(  items: IAttachFileModel[]  ) {
    return (items && this.getImgFileDataSort(items).length <=3);
  }
}
</script>

<style scoped>

</style>
