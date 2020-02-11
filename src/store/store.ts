import Vuex from 'vuex';
import Vue from 'vue';
import {
  action,
  createModule,
  createProxy,
  extractVuexModule,
  mutation,
} from 'vuex-class-component/js';
import { Message, Task } from '@/interfaces';
import * as api from '@/service/tasksApi';
import { activityPhotos as photos, messageObjects } from './activity';


export const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt',
});

Vue.use(Vuex);

export class MyStore extends VuexModule {
  private tasks: Task[] = [];

  private messageObjects: Message[] = messageObjects;

  private clickedImg = 0;

  private taskId = 0;

  private activityPhotos: File[] = photos;

  @action async FETCH_TASKS() {
    this.tasks = await api.getTasks();
    // It's only bc education and coming deadlines for complete assignment
    this.taskId = this.tasks.length;
  }

  get GET_TASKS(): Task[] {
    return this.tasks;
  }

  get MESSAGE_OBJECTS(): Message[] {
    return this.messageObjects;
  }

  get ACTIVITY_PHOTOS(): File[] {
    return this.activityPhotos;
  }

  get CLICKED_IMG(): number {
    return this.clickedImg;
  }

  set CLICKED_IMG(index: number) {
    this.clickedImg = index;
  }

  @mutation SET_TASKS(tasks: Task[]) {
    this.tasks = tasks;
  }

  get TASKS_LENGTH(): number {
    return this.tasks.length;
  }

  get TASK_ID(): number {
    return this.taskId;
  }

  get TASK_BY_ID(): (id: number) => Task | undefined {
    return (id: number) => this.tasks.find((task: Task) => task.id === id);
  }

  @mutation ADD_TASK(task: Task) {
    this.tasks.splice(0, 0, task);
    this.taskId += 1;
    api.pushTasks(this.tasks);
  }

  @mutation DELETE_TASK(id: number) {
    for (let i = 0; i < this.tasks.length; i += 1) {
      if (id === this.tasks[i].id) {
        this.tasks.splice(i, 1);
        break;
      }
    }
    api.pushTasks(this.tasks);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @mutation UPDATE_TASK_STATUS(payload: any) {
    for (let i = 0; i < this.tasks.length; i += 1) {
      if (Number(payload.id) === Number(this.tasks[i].id)) {
        this.tasks[i].status = payload.status;
        break;
      }
    }
    api.pushTasks(this.tasks);
  }
}

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(MyStore),
  },
});

// Creating proxies.
export const vxm = {
  myStore: createProxy(store, MyStore),
};
