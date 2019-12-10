import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clickedImg: 0,
    tasks: [],
  },
  getters: {
    getClickedImg: state => state.clickedImg,
  },
  actions: {
    changeClickedImg(context, imgIndex) {
      context.commit('changeClickedImg', imgIndex);
    },
  },
  mutations: {
    changeClickedImg(state, index) {
      state.clickedImg = index;
    },
    initTasks(state, payload) {
      state.tasks = payload;
    },
  },
});
