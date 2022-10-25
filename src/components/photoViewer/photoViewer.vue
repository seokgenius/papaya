<template>
  <div v-if="isPhotoViewer" class="popup photo-viewer" style="z-index:11">
    <div class="viewer-inner">
      <div class="viewer-close">
        <button class="close" @click="closePhotoViewer"><img :src="require('@/assets/images/close-white.svg')" alt=""></button>
      </div>
      <ul class="viewer-list">
        <li class="viewer-item active"><img :src="imgData[activeNum].location" alt="" style="width:540px;max-height:calc(100vh - 140px)"></li>
      </ul>

      <div class="viewer-control">
        <a href="" class="control prev" @click.prevent="showPrevImage"><img :src="require('@/assets/images/left-white.svg')" alt="" class="float-lt"></a>
        <a href="" class="control next" @click.prevent="showNextImage"><img :src="require('@/assets/images/right-white.svg')" alt="" class="float-rt"></a>
      </div>

      <div class="viewer-page">
        <span class="current-page">{{ activeNum+1 }}</span> / <span class="all-page">{{ imgData.length }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {IAttachFileModel} from '@/views/model/post.model';
import {Utils} from '@/utils/utils';

@Component
export default class PhotoViewer extends Vue {

  @Prop(Boolean)
  private isPhotoViewer!: boolean;

  @Prop(Array)
  private imgData!: IAttachFileModel[];

  private activeNum: number = 0;

  public created() {
    // window.addEventListener('resize', this.resizeViewerControl);
  }

  private showPrevImage(): void {
    if (this.activeNum === 0) {
      this.activeNum = this.imgData.length-1; // 현재 첫번째 이미지일 경우 마지막 이미지 노출
    } else {
      this.activeNum--;
    }
  }

  private showNextImage(): void {
    if (this.activeNum+1 < this.imgData.length) {
      this.activeNum++;
    } else {
      this.activeNum = 0; // 현재 마지막 이미지일 경우 첫번째로 돌아감
    }
  }

  private closePhotoViewer(): void {
    //this.isPhotoViewer = false;
    this.$emit('change', false);
  }

  private resizeViewerControl(): void {
    const currentImg = document.querySelector('.viewer-item.active img');
    const imgWidth = 540;
    const windowWidth = Utils.getWindowWidth();
    const windowHeight = Utils.getWindowHeight();
    console.log(`current window width = ${windowWidth} / current window height = ${windowHeight}`);

    const control = document.querySelectorAll('.control');
    const controlWidth = (windowWidth - imgWidth - 160) / 2;
    // @ts-ignore
    control.forEach((item) => item.setAttribute('style', `width:${controlWidth}px`));
  }

}
</script>

<style scoped>

</style>