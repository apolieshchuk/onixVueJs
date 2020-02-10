import { Task, Status } from '@/interfaces';
import axios from '@/service/api';


export const getTasks = async () => {
  const { data } = await axios.get('https://tasker.getsandbox.com:443/tasks-get', {
    headers: { 'Content-Type': 'application/json' },
    data: {},
  });
  return data;
};

export const pushTasks = async (tasks: Task[]) => {
  const { data } = axios.post('https://tasker.getsandbox.com:443/tasks-push', tasks, {
    headers: {},
    data: {},
  });
  return data;
};

export const deleteTask = async (id: number) => {
  const { data } = await axios.delete(`https://tasker.getsandbox.com:443/task-delete?id=${id}`, {
    headers: { 'Content-Type': 'application/json' },
    data: {},
  });
  return data;
};

export const addTask = async (task: Task) => {
  const { data } = await axios.post('https://tasker.getsandbox.com:443/task-add', task, {
    headers: {},
    data: {},
  });
  return data;
};

export const changeTaskStatus = async (id: number, status: Status) => {
  const { data } = await axios.put('https://tasker.getsandbox.com:443/task-change-status', { id, status }, {
    headers: {},
    data: {},
  });
  return data;
};

// export const getTasksById = async (id: number) => {
//   const { data } = await axios.get(`https://tasker.getsandbox.com:443/task-by-id?id=${id}`, {
//     headers: { 'Content-Type': 'application/json' },
//     data: {},
//   });
//   return data;
// };
//
// import { Status, Task } from '@/interfaces';
//
// const axios = require('axios').default;
//
// const API_URL: String = 'https://tasker.getsandbox.com:443';
//
// export const getTasks = () => axios(`${API_URL}/tasks`, {
//   method: 'GET',
//   headers: { 'Content-Type': 'application/json' },
//   data: {},
// })
//   .then((response: any) => {
//     console.log('api');
//     console.log(response);
//     return response.data;
//   })
//   .catch((error) => {
//     throw error;
//   });
//
// export const getTaskById = (id: number) => axios(`${API_URL}/task-by-id`, {
//   method: 'GET',
//   headers: { 'Content-Type': 'application/json' },
//   data: {},
// })
//   .then((response: any) => response.data)
//   .catch((error) => {
//     throw error;
//   });
//
// export const addTask = (task: Task) => axios(`${API_URL}/task-add`, {
//   method: 'PUT',
//   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//   data: { task },
// })
//   .then((response: any) => response.data)
//   .catch((error) => {
//     throw error;
//   });
//
// export const deleteTask = (id: number) => axios(`${API_URL}/task-delete`, {
//   method: 'DELETE',
//   headers: { 'Content-Type': 'application/json' },
//   params: { id },
//   data: { },
// })
//   .then((response: any) => response.data)
//   .catch((error) => {
//     throw error;
//   });
//
// export const changeTaskStatus = (id: number, status: Status)
// => axios(`${API_URL}/task-change-status`, {
//   method: 'PUT',
//   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//   params: {},
//   data: { id, status },
// })
//   .then((response: any) => response.data)
//   .catch((error) => {
//     throw error;
//   });

// import * as API from '@/service/api';
// import { Status, Task } from '@/interfaces';
//
// export const getTasks = () => {
//   let tasks;
//   API.getTasks()
//     .then((res: any) => {
//       tasks = res;
//       console.log('tasksApi');
//       console.log(res);
//       return tasks;
//     })
//     .catch(error => error);
//   return tasks;
// };
//
// export const getTaskById = (id: number) => {
//   API.getTaskById(id)
//     .then((res: any) => res)
//     .catch(error => error);
// };
//
// export const addTask = (task: Task) => {
//   API.addTask(task)
//     .then((res: any) => res)
//     .catch(error => error);
// };
//
// export const deleteTask = (id: number) => {
//   API.deleteTask(id)
//     .then((res: any) => res)
//     .catch(error => error);
// };
//
// export const changeTaskStatus = (id: number, status: Status) => {
//   API.changeTaskStatus(id, status)
//     .then((res: any) => res)
//     .catch(error => error);
// };
