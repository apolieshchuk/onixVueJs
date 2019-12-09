import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clickedImg: 0,
  },
  mutations: {
    changeClickedImg(state, index) {
      state.clickedImg = index;
    },
  },
});
