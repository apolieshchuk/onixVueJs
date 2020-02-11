import { Task } from '@/interfaces';
import axiosConfig from '@/service/api';

export const getTasks = async () => {
  const { data } = await axiosConfig({
    method: 'get',
    url: '/tasks-get',
    data: '',
  });
  return data;
};

export const pushTasks = async (tasks: Task[]) => {
  const { data } = await axiosConfig({
    method: 'post',
    url: '/tasks-push',
    data: JSON.stringify(tasks),
  });
  return data;
};

// export const deleteTask = async (id: number) => {
//   const { data } = await axios.delete(`https://tasker.getsandbox.com:443/task-delete?id=${id}`, {
//     headers: { 'Content-Type': 'application/json' },
//     data: {},
//   });
//   return data;
// };
//
// export const addTask = async (task: Task) => {
//   const { data } = await axios.post('https://tasker.getsandbox.com:443/task-add', task, {
//     headers: {},
//     data: {},
//   });
//   return data;
// };
//
// export const changeTaskStatus = async (id: number, status: Status) => {
//   const { data } = await axios.put('https://tasker.getsandbox.com:443/task-change-status', { id, status }, {
//     headers: {},
//     data: {},
//   });
//   return data;
// };
