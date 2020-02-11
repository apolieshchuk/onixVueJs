import { expect } from 'chai';
import { mount, shallowMount } from '@vue/test-utils';
import Tasks from '@/views/Tasks.vue';
import Kanban from '@/views/Kanban.vue';
import Calendar from '@/views/Calendar.vue';
import tasks from '@/store/tasks';
import utils from '@/service/utils';
import { Status } from '@/interfaces';

describe('Tasks.vue', () => {
  const wrapper = shallowMount(Tasks);
  wrapper.setData({ tasks });

  it('Drawing tasks in Tasks.vue', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(wrapper.find('.table-row').exists()).to.be.true;
  });
  it('Drawing button in Tasks.vue', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(wrapper.find('.btn-yellow').exists()).to.be.true;
  });
  it('FALSE test in Tasks.vue', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(wrapper.find('.false-test').exists()).to.be.true;
  });
});
describe('Kanban.vue', () => {
  const wrapper = shallowMount(Kanban);
  const tasksTodo = utils(tasks, Status.todo);
  const tasksDone = utils(tasks, Status.done);
  const tasksInProgress = utils(tasks, Status.inprogress);
  wrapper.setData({ tasksTodo, tasksDone, tasksInProgress });

  it('Drawing tasks in Kanban.vue', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(wrapper.find('.task-card').exists()).to.be.true;
  });
});
describe('Calendar.vue', () => {
  const wrapper = mount(Calendar);
  wrapper.setData({ tasks });

  it('Drawing tasks in Calendar.vue', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(wrapper.find('.event-item').exists()).to.be.true;
  });
});
