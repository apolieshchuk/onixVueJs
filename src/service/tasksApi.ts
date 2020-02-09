import * as API from '@/service/api';
import { Status, Task } from '@/interfaces';

export const getTasks = () => {
  let tasks;
  API.getTasks()
    .then((res: any) => {
      tasks = res;
      console.log('tasksApi');
      console.log(res);
      return tasks;
    })
    .catch(error => error);
  return tasks;
};

export const getTaskById = (id: number) => {
  API.getTaskById(id)
    .then((res: any) => res)
    .catch(error => error);
};

export const addTask = (task: Task) => {
  API.addTask(task)
    .then((res: any) => res)
    .catch(error => error);
};

export const deleteTask = (id: number) => {
  API.deleteTask(id)
    .then((res: any) => res)
    .catch(error => error);
};

export const changeTaskStatus = (id: number, status: Status) => {
  API.changeTaskStatus(id, status)
    .then((res: any) => res)
    .catch(error => error);
};
