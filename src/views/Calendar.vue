<template lang="pug">
  .calendar-wrapper
    fullCalendar(:events="fcEvents()" locale="en")
</template>

<script lang="ts">
import fullCalendar from 'vue-fullcalendar';
import { Component, Vue } from 'vue-property-decorator';

import { vxm } from '@/store/store';
import { CalendarEvent, Task } from '@/interfaces';

@Component({
  components: { fullCalendar },
})
export default class Calendar extends Vue {
  myStore = vxm.myStore;

  fcEvents() {
    const events: CalendarEvent[] = [];

    for (let i = 0; i < this.myStore.TASKS_LENGTH; i += 1) {
      const task: Task = this.myStore.TASKS[i];
      events.push({
        title: task.name,
        start: new Date(task.deadline).toJSON().slice(0, 10),
        end: new Date(task.deadline).toJSON().slice(0, 10),
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
