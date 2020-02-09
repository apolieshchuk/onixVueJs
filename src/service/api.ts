import { Status, Task } from '@/interfaces';

const axios = require('axios').default;

const API_URL: String = 'https://tasker.getsandbox.com:443';

export const getTasks = () => axios(`${API_URL}/tasks`, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  data: {},
})
  .then((response: any) => {
    console.log('api');
    console.log(response);
    return response.data;
  })
  .catch((error) => {
    throw error;
  });

export const getTaskById = (id: number) => axios(`${API_URL}/task-by-id`, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  data: {},
})
  .then((response: any) => response.data)
  .catch((error) => {
    throw error;
  });

export const addTask = (task: Task) => axios(`${API_URL}/task-add`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  data: { task },
})
  .then((response: any) => response.data)
  .catch((error) => {
    throw error;
  });

export const deleteTask = (id: number) => axios(`${API_URL}/task-delete`, {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  params: { id },
  data: { },
})
  .then((response: any) => response.data)
  .catch((error) => {
    throw error;
  });

export const changeTaskStatus = (id: number, status: Status) => axios(`${API_URL}/task-change-status`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  params: {},
  data: { id, status },
})
  .then((response: any) => response.data)
  .catch((error) => {
    throw error;
  });
