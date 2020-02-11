/* Task interface */
export interface Task{
  id?: number;
  name: string;
  status: Status;
  description: string;
  added: Date;
  deadline: Date;
}

/* Message interface */
export interface Message{
  msg: string;
  date?: boolean; // date, sys, common
  user?: string;
  time?: string;
  ico?: string;
  photos?: File[];
}

/* Calendar event interface */
export interface CalendarEvent{
  title: string;
  start: string;
  end: string;
  id: number;
}

/* Enum */
// eslint-disable-next-line import/prefer-default-export
export enum Status {
  todo = 'todo',
  done = 'done',
  inprogress = 'in progress',
}
