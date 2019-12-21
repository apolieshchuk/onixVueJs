import Vue from 'vue';
import Vuex from 'vuex';
import { Task } from '@/interfaces';

Vue.use(Vuex);

let taskId = 0;

/* Function for creating task object */
function createTaskObj(name:string, description:string, deadline:string): Task {
  taskId += 1;
  return {
    id: taskId,
    name,
    description,
    deadline,
  };
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
  createTaskObj('Test2', 'Description test2', '17.11, 19:00 am'),
  createTaskObj('Test3', 'Description test3', '17.11, 19:00 am'),
  createTaskObj('Test4', 'Description test4', '17.11, 19:00 am'),
  createTaskObj('Test5', 'Description test6', '17.11, 19:00 am'),
  createTaskObj('Test7', 'Description test7', '17.11, 19:00 am'),
];

export default new Vuex.Store({
  state: {
    clickedImg: 0,
    tasks,
    taskId,
  },
  getters: {
    getClickedImg: state => state.clickedImg,
    getTasks: state => state.tasks,
    getTasksLength: state => state.tasks.length,
    getTaskId: state => state.taskId,
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
  },
  mutations: {
    changeClickedImg(state, index: number) {
      state.clickedImg = index;
    },
    addTask(state, task:Task) {
      state.tasks.splice(0, 0, task);
    },
    deleteTask(state, taskIndex: number) {
      state.tasks.splice(taskIndex, 1);
    },
  },
});
