import Vue from 'vue';
import Vuex from 'vuex';
import { Status, Task } from '@/interfaces';

Vue.use(Vuex);

let lastTaskId = 0;

/* Function for creating task object */
function createTaskObj(name:string, description:string, deadline: Date, status:Status): Task {
  lastTaskId += 1;
  return {
    id: lastTaskId,
    status,
    deadline,
    name,
    description,
  };
}

/* Create task objects */
const tasks = [
  createTaskObj('Breakfast', 'Have breakfast',
    new Date(2020, 0, 27), Status.todo),
  createTaskObj('Vue-programming', 'Do some programming in Vue.js',
    new Date(2020, 0, 30), Status.inprogress),
  createTaskObj('Shopping', 'Go shopping with my wife',
    new Date(2020, 0, 25), Status.todo),
  createTaskObj('Vue-programming', 'Continue programming process',
    new Date(2020, 1, 25), Status.inprogress),
  createTaskObj('Dinner', 'Eat,eat,eat....',
    new Date(2020, 0, 23), Status.todo),
  createTaskObj('Sleep', 'Go sleep until 4 a.m.',
    new Date(2020, 0, 30), Status.todo),
  createTaskObj('Test1', 'Description test1',
    new Date(2020, 0, 27), Status.done),
  createTaskObj('Test2', 'Description test2',
    new Date(2020, 1, 23), Status.inprogress),
  createTaskObj('Test3', 'Description test3',
    new Date(2020, 2, 23), Status.todo),
  createTaskObj('Test4', 'Description test4',
    new Date(2020, 0, 22), Status.done),
  createTaskObj('Test5', 'Description test6',
    new Date(2020, 0, 26), Status.done),
  createTaskObj('Test7', 'Description test7',
    new Date(2020, 0, 30), Status.todo),
];

export default new Vuex.Store({
  state: {
    clickedImg: 0,
    tasks,
    lastTaskId,
  },
  getters: {
    getClickedImg: state => state.clickedImg,
    getTasks: state => state.tasks,
    getTasksLength: state => state.tasks.length,
    getLastTaskId: state => state.lastTaskId,
    getTaskById: state => (id:number) => state.tasks.find(task => task.id === id),
  },
  actions: {
    changeClickedImg(context, imgIndex: number) {
      context.commit('changeClickedImg', imgIndex);
    },
    addTask(context, task: Task) {
      context.commit('addTask', task);
    },
    deleteTask(context, taskIndex:number) {
      context.commit('deleteTask', taskIndex);
    },
    updateTaskStatus(context, { id, status }) {
      context.commit('updateTaskStatus', { id, status });
    },
  },
  mutations: {
    changeClickedImg(state, index: number) {
      state.clickedImg = index;
    },
    addTask(state, task:Task) {
      state.tasks.splice(0, 0, task);
      state.lastTaskId += 1;
    },
    deleteTask(state, taskIndex: number) {
      state.tasks.splice(taskIndex, 1);
    },
    updateTaskStatus(state, { id, status }) {
      for (let i = 0; i < tasks.length; i += 1) {
        // eslint-disable-next-line eqeqeq
        if (id == tasks[i].id) {
          tasks[i].status = status;
          break;
        }
      }
    },
  },
});
