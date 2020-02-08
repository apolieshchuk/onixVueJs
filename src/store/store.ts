import Vuex from 'vuex';
import Vue from 'vue';
import {
  createModule, createProxy, extractVuexModule, mutation,
} from 'vuex-class-component/js';
import VuexPersist from 'vuex-persist';
import { Message, Status, Task } from '@/interfaces';
import tasks from './tasks';
import messageObjects from './activity';

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt',
});

const vuexPersist = new VuexPersist({
  storage: window.localStorage,
});

export class MyStore extends VuexModule {
  private tasks: Task[] = tasks;

  private messageObjects: Message[] = messageObjects;

  private clickedImg: number = 0;

  private taskId = tasks.length + 1;

  get MESSAGE_OBJECTS(): Message[] {
    return this.messageObjects;
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

  @mutation ADD_TASK(task:Task) {
    this.tasks.splice(0, 0, task);
    this.taskId += 1;
  }

  @mutation DELETE_TASK(index: number) {
    this.tasks.splice(index, 1);
  }

  @mutation UPDATE_TASK_STATUS(payload: any) {
    for (let i = 0; i < this.tasks.length; i += 1) {
      // eslint-disable-next-line eqeqeq
      if (payload.id == this.tasks[i].id) {
        this.tasks[i].status = payload.status;
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
export const vxm = {
  myStore: createProxy(store, MyStore),
};
