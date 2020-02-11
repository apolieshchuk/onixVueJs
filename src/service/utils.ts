import { Status, Task } from '@/interfaces';

// eslint-disable-next-line max-len
const filterBy = (array: Task[], status: Status) => array.filter((obj: Task) => obj.status === status);

export default filterBy;
