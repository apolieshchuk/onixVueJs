import Vuex from 'vuex';
import Vue from 'vue';
import {
  createModule, createProxy, extractVuexModule, mutation,
} from 'vuex-class-component/js';
import { Status, Task } from '@/interfaces';
import VuexPersist from 'vuex-persist';

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt',
});

const vuexPersist = new VuexPersist({
  storage: window.localStorage,
});

Vue.use(Vuex);

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

export class MyStore extends VuexModule {
  private tasks: Task[] = tasks;

  private clickedImg: number = 0;

  private lastTaskId = lastTaskId;

  get CLICKED_IMG() {
    return this.clickedImg;
  }

  get TASKS() {
    return this.tasks;
  }

  get TASKS_LENGTH() {
    return this.tasks.length;
  }

  get TASK_ID() {
    return this.lastTaskId;
  }

  // Define a mutation for the vuex getter.
  // NOTE this only works for getters.
  get TASK_BY_ID() {
    return (id:number) => this.tasks.find((task: Task) => task.id === id);
  }

  @mutation SET_CLICKED_IMG(index: number) {
    this.clickedImg = index;
  }

  @mutation ADD_TASK(task:Task) {
    this.tasks.splice(0, 0, task);
    this.lastTaskId += 1;
  }

  @mutation DELETE_TASK(index: number) {
    this.tasks.splice(index, 1);
  }

  @mutation UPDATE_TASK_STATUS(id: number, status: Status) {
    for (let i = 0; i < this.tasks.length; i += 1) {
      // eslint-disable-next-line eqeqeq
      if (id == tasks[i].id) {
        this.tasks[i].status = status;
        break;
      }
    }
  }
}

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(MyStore),
  },
  plugins: [vuexPersist.plugin],
});

// Creating proxies.
const vxm = {
  user: createProxy(store, MyStore),
};


// @Component
// export default class MyComp extends Vue {
//   @State tasks: Task[] = tasks;
//
//   @State clickedImg = 0;
//
//   @State lastTaskId = lastTaskId;
//
//   @Getter('CLICKED_IMG');
// }
