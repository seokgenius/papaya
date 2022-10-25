import Vue from 'vue';
import Vuetify, {
  VApp,
  VCalendar,
  VMenu,
  VList,
  VListItem,
  VListItemTitle,
  VBtn,
  VIcon,
  VToolbar,
  VToolbarTitle,
  VSheet,
  VSpacer,
  VTextField,
  VSelect,
  VDatePicker,
  VSnackbar
} from 'vuetify/lib';
import {Ripple, ClickOutside} from 'vuetify/lib/directives';
import '@mdi/font/css/materialdesignicons.css';
// import { VuetifyPreset } from 'vuetify/types';
// import 'vuetify/dist/vuetify.min.css';

Vue.use( Vuetify, {
  components:{
    VApp,
    VCalendar,
    VMenu,
    VList,
    VListItem,
    VListItemTitle,
    VBtn,
    VIcon,
    VToolbar,
    VToolbarTitle,
    VSheet,
    VSpacer,
    VTextField,
    VSelect,
    VDatePicker,
    VSnackbar
  },
  directives: {
    Ripple,
    ClickOutside
  },
});
export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
});
/*const opts = {};

export default new Vuetify(opts);*/
