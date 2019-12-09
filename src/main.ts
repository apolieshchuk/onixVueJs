import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from './store/store';

Vue.config.productionTip = false;

/* Create $eventBus */
const eventBus = new Vue();
export default eventBus;


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
