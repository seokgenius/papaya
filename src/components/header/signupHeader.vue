<template>
  <header>
    <div class="header-container">
      <h1 class="logo"><a href="" @click.prevent.stop="gotoLogin"><img src="../../assets/images/logo-logotype-black.png" alt="papaya"/></a></h1>

      <nav id="gnb">
        <ul class="menu">
          <li><router-link :to="{path:'/signup'}">회원가입</router-link></li>
          <li><router-link :to="{path:'/login'}">로그인</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
  <!-- //end: header -->
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {namespace} from 'vuex-class';

const Auth = namespace('Auth');

@Component
export default class SignUpHeader extends Vue {
  private gotoLogin(): void{
    this.$router.push('/login');
  }
}
</script>

<style scoped>

</style>
