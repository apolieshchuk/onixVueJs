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

function todayPlus(days: number) {
  const date = new Date();
  return new Date(date.setDate(date.getDate() + days));
}

/* Create task objects */
const tasks = [
  createTaskObj('Breakfast', 'Have breakfast',
    todayPlus(1), new Date(), Status.todo),
  createTaskObj('Vue-programming', 'Do some programming in Vue.js',
    todayPlus(5), todayPlus(3), Status.inprogress),
  createTaskObj('Shopping', 'Go shopping with my wife',
    todayPlus(12), todayPlus(6), Status.todo),
  createTaskObj('Vue-programming', 'Continue programming process',
    todayPlus(7), todayPlus(3), Status.inprogress),
  createTaskObj('Dinner', 'Eat,eat,eat....',
    todayPlus(7), todayPlus(7), Status.todo),
  createTaskObj('Sleep', 'Go sleep until 4 a.m.',
    todayPlus(12), todayPlus(7), Status.todo),
  createTaskObj('Test1', 'Description test1',
    todayPlus(28), todayPlus(26), Status.done),
  createTaskObj('Test2', 'Description test2',
    todayPlus(33), todayPlus(30), Status.inprogress),
  createTaskObj('Test3', 'Description test3',
    todayPlus(15), todayPlus(12), Status.todo),
  createTaskObj('Test4', 'Description test4',
    todayPlus(23), todayPlus(20), Status.done),
  createTaskObj('Vue.js Graduation', 'Graduation from onix-vue',
    todayPlus(5), todayPlus(5), Status.inprogress),
  createTaskObj('NodeJs', 'Do first assignment on NOdeJs',
    todayPlus(15), todayPlus(12), Status.inprogress),
];

export default tasks;
