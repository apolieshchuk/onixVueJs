/* Task interface */
export interface Task{
  id: number,
  name: string,
  description: string,
  deadline: string,
  status: Status,
}

/* Message interface */
export interface Message{
  msg: string,
  date?: boolean; // date, sys, common
  user?: string,
  time?: string,
  ico?: string,
  photos?: any[],
}

/* Enum */
// eslint-disable-next-line import/prefer-default-export
export enum Status {
  todo = 'todo',
  inprogress = 'in progress',
  done = 'done',
}
