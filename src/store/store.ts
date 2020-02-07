import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import { Status, Task } from '@/interfaces';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  storage: window.localStorage,
});

let lastTaskId = 0;

/* Function for creating task object */
function createTaskObj(name:string, description:string,
  deadline: Date, added: Date, status:Status): Task {
  lastTaskId += 1;
  return {
    id: lastTaskId,
    status,
    deadline,
    name,
    added,
    description,
  };
}

/* Create task objects */
const tasks = [
  createTaskObj('Breakfast', 'Have breakfast',
    new Date(2020, 0, 31), new Date(), Status.todo),
  createTaskObj('Vue-programming', 'Do some programming in Vue.js',
    new Date(2020, 1, 2), new Date(), Status.inprogress),
  createTaskObj('Shopping', 'Go shopping with my wife',
    new Date(2020, 1, 25), new Date(), Status.todo),
  createTaskObj('Vue-programming', 'Continue programming process',
    new Date(2020, 1, 25), new Date(), Status.inprogress),
  createTaskObj('Dinner', 'Eat,eat,eat....',
    new Date(2020, 0, 29), new Date(), Status.todo),
  createTaskObj('Sleep', 'Go sleep until 4 a.m.',
    new Date(2020, 1, 1), new Date(), Status.todo),
  createTaskObj('Test1', 'Description test1',
    new Date(2020, 1, 2), new Date(), Status.done),
  createTaskObj('Test2', 'Description test2',
    new Date(2020, 1, 23), new Date(), Status.inprogress),
  createTaskObj('Test3', 'Description test3',
    new Date(2020, 2, 23), new Date(), Status.todo),
  createTaskObj('Test4', 'Description test4',
    new Date(2020, 0, 22), new Date(), Status.done),
  createTaskObj('Test5', 'Description test6',
    new Date(2020, 1, 30), new Date(), Status.inprogress),
  createTaskObj('Test7', 'Description test7',
    new Date(2020, 1, 3), new Date(), Status.inprogress),
];

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    clickedImg: 0,
    tasks,
    lastTaskId,
  },
  getters: {
    getClickedImg: (state: any) => state.clickedImg,
    getTasks: (state: any) => state.tasks,
    getTasksLength: (state: any) => state.tasks.length,
    getLastTaskId: (state: any) => state.lastTaskId,
    getTaskById: (state: any) => (id:number) => state.tasks.find((task: Task) => task.id === id),
  },
  actions: {
    changeClickedImg(context: any, imgIndex: number) {
      context.commit('changeClickedImg', imgIndex);
    },
    addTask(context: any, task: Task) {
      context.commit('addTask', task);
    },
    deleteTask(context: any, taskIndex:number) {
      context.commit('deleteTask', taskIndex);
    },
    updateTaskStatus(context: any, { id, status }) {
      context.commit('updateTaskStatus', { id, status });
    },
  },
  mutations: {
    changeClickedImg(state: any, index: number) {
      state.clickedImg = index;
    },
    addTask(state: any, task:Task) {
      state.tasks.splice(0, 0, task);
      state.lastTaskId += 1;
    },
    deleteTask(state: any, taskIndex: number) {
      state.tasks.splice(taskIndex, 1);
    },
    updateTaskStatus(state: any, { id, status }) {
      for (let i = 0; i < this.tasks.length; i += 1) {
        // eslint-disable-next-line eqeqeq
        if (id == this.tasks[i].id) {
          this.tasks[i].status = status;
          break;
        }
      }
    },
  },
});
