<template>
  <div class="form-add-list"  v-if="linkItems!==null && linkItems.length>0">
    <div class="add-item">
      <div class="add-item-top">
        <p class="add-item-tit">{{getTitle()}}</p>
        <div class="add-item-btn">
          <a href="" class="txt-btn" @click.prevent="modify">수정</a>
        </div>
      </div>


      <div class="add-item-cnt"  v-show="linkItems.length>0">
        <div class="add-link" v-for="(item, index) in linkItems" :key="`link-${index}`" style="margin-bottom:10px;">
          <div class="add-link-cnt d-inline-block">
            <!--<p class="add-link-tit"><a href="">{{item.url}}</a></p>
            <p class="add-link-txt">
              <a href="">자연사랑 어린이 미술대회는 지난 2016년부터 개최해 온 전통 있는 미술대회 입니다. 아이들에게 환경보호…</a>
            </p>-->
            <span class="add-link-url"><a :href="item.url" target="_blank"><!-- 웹 프론트에선 opengraph 이미지를 크롤링 할 수 없음.<img :src="require('@/assets/images/pic9.png')" class="link-logo" alt="">-->{{ item.url }}</a></span>
          </div>
<!--          <div class="add-link-thumb"><img src="assets/images/pic.png" alt=""></div>-->
          <a href="#" class="add-file-delete d-inline-block" @click.prevent.stop="removeFile( index )"><img :src="require('@/assets/images/delete.svg')" alt=""></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
// import {request} from '@/api/service/AxiosService';

@Component
export default class LinkPreview extends Vue{

  @Prop(Array)
  private linkItems!: Array<{index: number, url: string}>;

  @Prop(String)
  private title!: string;

  private metaData: any = {};
  private makeMeta: any[]=[];


  @Emit()
  private removeFile( idx: number ) {
    this.$emit('remove', idx);
  }

  @Emit()
  private modify() {
    this.$emit('modify');
  }


  private mounted() {
    if (this.linkItems !== null) {
      this.linkItems.forEach( (item)=>{
        this.makeLinkMeta(item.url);
      });
    }

  }

  private getTitle() {
    return (!this.linkItems)? '' : `${this.title} 링크 ${this.linkItems.length}`;
  }


  private makeLinkMeta( injectURL: string ) {

    console.log(injectURL);

    /*const fetchHTML = async (link: string) => {
      return await request('get', link);
    };

    const parseHtml = (html: string) => {
      const properties = ['title', 'description', 'image', 'url'];
      const meta: any = {};

      const $ = cheerio.load(html);
      properties.forEach((p) => {
        const content = $(`meta[property="og:${p}"]`).attr('content');
        if (content) {
          meta[p] = content;
        }
      });
      return meta;
    };

    const findOGTags = async (link: string) => {
      try {
        const {data} = await fetchHTML(link);
        this.metaData = await parseHtml(data);

        console.log(this.metaData);
      } catch (e) {
        console.log(e);
      }
    };

    findOGTags(injectURL);*/
  }


}
</script>

<style scoped>

</style>
