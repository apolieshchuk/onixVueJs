import Vuex from 'vuex';
import Vue from 'vue';
import {
  action,
  createModule, createProxy, extractVuexModule, mutation,
} from 'vuex-class-component/js';
import { Message, Status, Task } from '@/interfaces';
import messageObjects, { activityPhotos as photos } from './activity';
import * as api from '@/service/tasksApi';

const axios = require('axios').default;

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt',
});

Vue.use(Vuex);

export class MyStore extends VuexModule {
  private tasks: any = [];

  private messageObjects: Message[] = messageObjects;

  private clickedImg: number = 0;

  private taskId = this.tasks.length + 1;

  private activityPhotos: any[] = photos;

  get MESSAGE_OBJECTS(): Message[] {
    return this.messageObjects;
  }

  get ACTIVITY_PHOTOS(): any[] {
    return this.activityPhotos;
  }

  get CLICKED_IMG(): number {
    return this.clickedImg;
  }

  set CLICKED_IMG(index: number) {
    this.clickedImg = index;
  }

  get TASKS(): Task[] {
    return this.tasks;
  }

  get TASKS_LENGTH(): number {
    return this.tasks.length;
  }

  get TASK_ID(): number {
    return this.taskId;
  }

  get TASK_BY_ID(): (id: number) => Task | undefined {
    return (id:number) => this.tasks.find((task: Task) => task.id === id);
  }

  // eslint-disable-next-line class-methods-use-this
  @action async ADD_TASK(task: Task) {
    console.log(await api.addTask(task));
    this.tasks = await api.getTasks();
  }

  @action async DELETE_TASK(id: number) {
    console.log(await api.deleteTask(id));
    this.tasks = await api.getTasks();
  }

  @action async UPDATE_TASK_STATUS(payload: any) {
    console.log(await api.changeTaskStatus(payload.id, payload.status));
    this.tasks = await api.getTasks();
  }

  // eslint-disable-next-line class-methods-use-this
  @action async doFirstInit() {
    console.log('vuex first init call');
    this.tasks = await api.getTasks();
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
