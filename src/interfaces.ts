/* Task interface */
export interface Task{
  id: number,
  name: string,
  status: Status,
  description: string,
  deadline: string,
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
  done = 'done',
  inprogress = 'in progress',
}
