<template lang="pug">
  .calendar-wrapper
    TaskDetailsModal(v-if="isModalActive"
      :editedTask="editedTask"
      :isEditEnabled="false"
      @close="isModalActive = false")
    fullCalendar(:events="fcEvents()" locale="en" @eventClick="taskClicked")
</template>

<script lang="ts">
import fullCalendar from 'vue-fullcalendar';
import { Component, Vue } from 'vue-property-decorator';
import TaskDetailsModal from '@/components/TaskDetailsModal.vue';

import { vxm } from '@/store/store';
import { CalendarEvent, Task } from '@/interfaces';

@Component({
  components: { fullCalendar, TaskDetailsModal },
})
export default class Calendar extends Vue {
  tasks: Task[] = vxm.myStore.TASKS;

  isModalActive = false;

  editedTask: Task | undefined = {} as Task;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  taskClicked(event: any) {
    this.editedTask = vxm.myStore.TASK_BY_ID(event.id);
    this.isModalActive = true;
  }

  // created() {
  //   this.tasks = vxm.myStore.TASKS;
  // }

  fcEvents() {
    const events: CalendarEvent[] = [];

    for (let i = 0; i < this.tasks.length; i += 1) {
      const task: Task = this.tasks[i];
      events.push({
        title: task.name,
        start: new Date(task.deadline).toJSON().slice(0, 10),
        end: new Date(task.deadline).toJSON().slice(0, 10),
        id: Number(task.id),
      });
    }
    return events;
  }
}
</script>

<style lang="scss" scoped>
.calendar-wrapper{
  padding: 10px;
  width: 100%;
}
</style>
