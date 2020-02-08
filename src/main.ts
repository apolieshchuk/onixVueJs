import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { store } from './store/store';

Vue.config.productionTip = false;

/* Create $eventBus */
const eventBus = new Vue();
export default eventBus;


Vue.filter('formattedDate', (dateRaw: Date) => {
  const date = new Date(dateRaw);
  const formattedDate: string[] = date.toJSON().slice(0, 10).split('-');
  const separator = '/';
  return formattedDate[2] + separator + formattedDate[1] + separator + formattedDate[0];
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
