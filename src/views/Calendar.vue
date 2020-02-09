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
  myStore = vxm.myStore;

  isModalActive: boolean = false;

  editedTask: Task | undefined = {} as Task;

  // eslint-disable-next-line class-methods-use-this
  taskClicked(event: any) {
    this.editedTask = this.myStore.TASK_BY_ID(event.id);
    this.isModalActive = true;
  }

  fcEvents() {
    const events: CalendarEvent[] = [];

    for (let i = 0; i < this.myStore.TASKS_LENGTH; i += 1) {
      const task: any = this.myStore.TASKS[i];
      events.push({
        title: task.name,
        start: new Date(task.deadline).toJSON().slice(0, 10),
        end: new Date(task.deadline).toJSON().slice(0, 10),
        id: task.id,
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
