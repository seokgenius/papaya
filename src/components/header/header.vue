<template>
  <!-- start: header -->
  <header class="dark">
    <div class="header-container">
      <h1 class="logo">
        <router-link :to="{path:'/'}"><img :src="require('@/assets/images/logo-logotype-white.png')" alt="papaya" /></router-link>
      </h1>
      <header-menu-view></header-menu-view>
    </div>
    <search v-if="isSearchChk"></search>
  </header>
  <!-- //end: header -->

</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import HeaderMenuView from '@/components/header/headerMenuView.vue';
import Search from '@/components/header/search.vue';

const SearchStatus = namespace('SearchStatus');

@Component({
  components:{
    HeaderMenuView,
    Search
  }
})
export default class AppHeader extends Vue {

  @SearchStatus.Getter
  private isSearchChk!: boolean;

}
</script>

<style>
</style>
