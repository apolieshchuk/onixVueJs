import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import '@/assets/css/variables.scss';
Vue.config.productionTip = false;
/* Create $eventBus */
const eventBus = new Vue();
export default eventBus;
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
//# sourceMappingURL=main.js.map