import { Status, Task } from '@/interfaces';

let taskId = 0;

/* Function for creating task object */
function createTaskObj(name:string, description:string,
  deadline: Date, added: Date, status:Status): Task {
  taskId += 1;
  return {
    id: taskId,
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

export default tasks;
