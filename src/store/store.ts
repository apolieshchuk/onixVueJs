import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import { Component } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';
import {
  createModule, mutation, action, extractVuexModule,
} from 'vuex-class-component';
import { Status, Task } from '@/interfaces';

Vue.use(Vuex);

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt',
});

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

export class MyStore extends VuexModule {
  private firstname = "Michael";
  private lastname = "Olofinjana";
  specialty = "JavaScript";

  @mutation clearName() {
    this.firstname = "";
    this.lastname = "";
  }

  @action async doSomethingAsync() { return 20 }

  @action async doAnotherAsyncStuff(payload) {
    const number = await this.doSomethingAsyc();
    this.changeName({ firstname: "John", lastname: "Doe" });
    return payload + this.fullName;
  }

  // Explicitly define a vuex getter using class getters.
  get fullname() {
    return this.firstname + " " + this.lastname;
  }

  // Define a mutation for the vuex getter.
  // NOTE this only works for getters.
  set fullname( name :string ) {
    const names = name.split( " " );
    this.firstname = names[ 0 ];
    this.lastname = names[ 1 ];
  }

  get bio() {
    return `Name: ${this.fullname} Specialty: ${this.specialty}`;
  }
}

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

// export default new Vuex.Store({
//   plugins: [vuexPersist.plugin],
//   state: {
//     clickedImg: 0,
//     tasks,
//     lastTaskId,
//   },
//   getters: {
//     CLICKED_IMG: (state: any) => state.clickedImg,
//     TASKS: (state: any) => state.tasks,
//     TASKS_LENGTH: (state: any) => state.tasks.length,
//     TASK_ID: (state: any) => state.lastTaskId,
//     TASK_BY_ID: (state: any) => (id:number) => state.tasks.find((task: Task) => task.id === id),
//   },
//   // actions: {
//   //   SET_CLICKED_IMG(context: any, imgIndex: number) {
//   //     context.commit('SET_CLICKED_IMG', imgIndex);
//   //   },
//   //   ADD_TASK(context: any, task: Task) {
//   //     context.commit('ADD_TASK', task);
//   //   },
//   //   DELETE_TASK(context: any, taskIndex:number) {
//   //     context.commit('DELETE_TASK', taskIndex);
//   //   },
//   //   UPDATE_TASK_STATUS(context: any, { id, status }) {
//   //     context.commit('UPDATE_TASK_STATUS', { id, status });
//   //   },
//   // },
//   mutations: {
//     SET_CLICKED_IMG(state: any, index: number) {
//       state.clickedImg = index;
//     },
//     ADD_TASK(state: any, task:Task) {
//       state.tasks.splice(0, 0, task);
//       state.lastTaskId += 1;
//     },
//     DELETE_TASK(state: any, taskIndex: number) {
//       state.tasks.splice(taskIndex, 1);
//     },
//     UPDATE_TASK_STATUS(state: any, { id, status }) {
//       for (let i = 0; i < state.tasks.length; i += 1) {
//         // eslint-disable-next-line eqeqeq
//         if (id == tasks[i].id) {
//           state.tasks[i].status = status;
//           break;
//         }
//       }
//     },
//   },
// });
