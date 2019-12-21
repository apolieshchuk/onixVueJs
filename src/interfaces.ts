/* Task interface */
export interface Task{
  id: number,
  name: string,
  description: string,
  deadline: string
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
