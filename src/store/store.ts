import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* Task interface */
interface Task{
  name: string,
  description: string,
  deadline: string
}

/* Function for creating task object */
function createTaskObj(name:string, description:string, deadline:string): Task {
  return { name, description, deadline };
}

/* Create task objects */
const tasks = [
  createTaskObj('Breakfast', 'Have breakfast', '17.11, 9:00 am'),
  createTaskObj('Vue-programming', 'Do some programming in Vue.js', '17.11, 11:00 am'),
  createTaskObj('Shopping', 'Go shopping with my wife', '17.11, 13:00 am'),
  createTaskObj('Vue-programming', 'Continue programming process', '17.11, 15:00 am'),
  createTaskObj('Dinner', 'Eat,eat,eat....', '17.11, 17:00 am'),
  createTaskObj('Sleep', 'Go sleep until 4 a.m.', '17.11, 19:00 am'),
  createTaskObj('Test1', 'Description test1', '17.11, 19:00 am'),
];

export default new Vuex.Store({
  state: {
    clickedImg: 0,
    tasks,
  },
  getters: {
    getClickedImg: state => state.clickedImg,
    getTasks: state => state.tasks,
    getTasksLength: state => state.tasks.length,
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
