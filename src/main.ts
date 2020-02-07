import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from './store/store';

Vue.config.productionTip = false;

/* Create $eventBus */
const eventBus = new Vue();
export default eventBus;


Vue.filter('formattedDate', (dateStr: string) => {
  const date: Date = new Date(dateStr);
  const dayNum: number = date.getDate();
  const day: string = dayNum < 10 ? `0${dayNum}` : dayNum.toString();
  const monthNum: number = (date.getMonth() + 1);
  const month: string = monthNum < 10 ? `0${monthNum}` : monthNum.toString();
  return `${day}.${month}.${date.getFullYear()}`;
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
