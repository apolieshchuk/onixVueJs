/* Task interface */
export interface Task{
  id: number,
  name: string,
  status: Status,
  description: string,
  added: Date,
  deadline: Date,
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

/* Calendar event interface */
export interface CalendarEvent{
  title: string,
  start: string,
  end: string
}

/* Enum */
export enum Status {
  todo = 'todo',
  done = 'done',
  inprogress = 'in progress',
}

export default Status;
