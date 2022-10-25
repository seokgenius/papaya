import {Vue, Component } from 'vue-property-decorator';
// import AppHeader from '@/components/header/header.vue';
// import AppFooter from '@/components/footer/footer.vue';
import WithRender from './App.html';

@WithRender
@Component
export  default class App extends Vue {
  public mounted() {
    document.addEventListener('backbutton', this.callBackButtonClick, false);
  }

  public callBackButtonClick() {
    this.$router.go(-1);
    console.log(this.$router);
  }
  private getPageStatus( item: any ) {
    console.log(item);
  }
}

