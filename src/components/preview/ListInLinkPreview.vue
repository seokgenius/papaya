<template>
  <div class="fd-inner" v-if="fileItems!==null">
    <p class="fd-inner-txt">{{ fileItems[title] }} 관련 링크 {{ fileItems[children].length }}</p>

    <div class="link-area" v-for="(linkItem, index) in fileItems[children]" :key="`link-${index}`">
      <!--                <div class="link-thumb"><img :src="require('@/assets/images/pic4.png')" alt=""></div>-->
      <div class="link-cnt">
        <a :href="linkItem[url]" class="link-tit" target="_blank">{{ linkItem[url] }}</a>
        <!--                  <p class="link-txt">자연사랑 어린이 미술대회는 지난 2016년부터 개최해 온 전통 있는 미술대회 입니다. 아이들에게 환경보호…</p>-->
        <!--                  <p class="link-source"><img :src="require('@/assets/images/pic9.png')" class="link-logo" alt="">https://m.blog.naver.com/ccedulab/221457750462214577504622145775046</p>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class ListInLinkPreview extends Vue{


  @Prop(Object)
  private fileItems!: any;

  @Prop(String)
  private title!: string;

  @Prop(String)
  private url!: string;

  @Prop(String)
  private children!: string;

}
</script>

<style scoped>

</style>
