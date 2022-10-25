<template>
  <!-- start: header -->
  <header class="dark">
    <div class="header-container">
      <h1 class="logo"><a href="" @click.prevent.stop="gotoLogin"><img src="../../assets/images/logo-logotype-white.png" alt="papaya"/></a></h1>
      <nav id="gnb">
        <ul class="menu">
          <li>
            <router-link to="/signup">회원가입</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <!-- //end: header -->
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {REMOVE_CLASS_DATA} from '@/store/mutation-class-types';

const Auth = namespace('Auth');
const MyClass = namespace('Auth');

@Component
export default class SignInHeader extends Vue {

  @Auth.Getter
  private isAuth!: boolean;

  @MyClass.Mutation
  private REMOVE_CLASS_DATA!: ()=>void;


  private gotoSignUpPage(): void {
    // this.HISTORY_PAGE({history:'signup'});
    // this.$router.push(RestApi.SIGN_UP_URL);
  }

  private gotoLogin(): void {
    // this.HISTORY_PAGE({history:'login'});
    this.$router.push('/login');
  }
}
</script>

<style scoped>

</style>
