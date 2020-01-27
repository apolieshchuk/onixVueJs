<template lang="pug">
  .kanban-wrapper
    TaskDetailsModal(
      v-if="isEditModalVisible"
      @close="isEditModalVisible = false"
      :editedTask="editedTask"
    )
    .table-head.flex
      .table-head-col(v-for="status in tableCols") {{ status }} ( {{ countCards(status) }} cards )
    .table-head.flex
      .table-head-filter(v-for="(status,col) in tableCols")
        .filter.flex
          input(v-model="nameFilters[col]" placeholder="Name")
          input(type="date" v-model="startDateFilters[col]"
            id="filter-todo-start" name="filter-start")
          input(type="date" v-model="finishDateFilters[col]"
            id="filter-todo-finish" name="filter-finish")
    .table-body.flex
      .table-col(v-for="(list,index) in [tasksTodo,tasksDone,tasksInProgress]")
        draggable.draggable(group="cards"
          :id="'drag-' + tableCols[index]"
          :move="checkMove"
          :list="list" @add="updateTasks"
          )
          .task-card.flex(
            v-for="task in list"
            v-if="isActiveInFilter(task.name, task.status, task.deadline)"
            :id="'task-' + task.id"
            :class="[cardStyle(task.status, task.deadline), hotCard(task.status,task.deadline)]"
            @click="editTask(task.id)"
          )
            div {{task.name}} {{ formattedDate(task.deadline) }}
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import mixins from 'vue-class-component';
import { Status, Task } from '@/interfaces';
import TaskDetailsModal from '@/components/TaskDetailsModal.vue';
import MyMixin from '@/mixins';


const statusKeys = Object.keys(Status);
const statusValues = statusKeys.map(k => Status[k as any]).map(v => v as Status);

@Component({
  components: { TaskDetailsModal, draggable },
})
export default class Kanban extends mixins(MyMixin) {
  tableCols = statusValues;

  isEditModalVisible = false;

  editedTask: Task = {} as Task;

  tasks = this.$store.getters.getTasks;

  tasksTodo = this.$store.getters.getTasks.filter((obj: Task) => obj.status === Status.todo);

  tasksDone = this.$store.getters.getTasks.filter((obj: Task) => obj.status === Status.done);

  tasksInProgress = this.$store.getters.getTasks.filter((obj: Task) => obj.status
    === Status.inprogress);

  nameFilters: string[] = ['', '', ''];

  startDateFilters: string[] = ['', '', ''];

  finishDateFilters: string[] = ['', '', ''];

  updateTasks(event: any) {
    const id: number = event.clone.id.split('-')[1];
    const status: Status = event.to.id.split('-')[1];
    this.$store.dispatch('updateTaskStatus', { id, status });
  }

  // eslint-disable-next-line class-methods-use-this
  checkMove(event: any) {
    return !(event.to.id === 'drag-todo' && event.from.id === 'drag-done');
  }

  editTask(id: number) {
    this.isEditModalVisible = true;
    this.editedTask = this.$store.getters.getTaskById(id);
  }

  // eslint-disable-next-line class-methods-use-this
  cardStyle(status: Status, date: Date) {
    if (status === Status.todo || status === Status.inprogress) {
      if (date < new Date()) return 'task-card-past';
    }

    switch (status) {
      case Status.done: return 'task-card-done';
      case Status.inprogress: return 'task-card-inprogress';
      case Status.todo: return 'task-card-todo';
      default: return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  hotCard(status: Status, date: Date) {
    if (status === Status.done) return '';
    const diffForHot = 24;
    const diff: number = (date.getTime() - new Date().getTime()) / 36e5;
    if (diff < diffForHot && diff > 0) return 'hot';
    return '';
  }

  countCards(status: Status) {
    switch (status) {
      case Status.inprogress: return this.tasksInProgress.length;
      case Status.todo: return this.tasksTodo.length;
      case Status.done: return this.tasksDone.length;
      default: return 0;
    }
  }

  isActiveInFilter(name: string, status: Status, deadline: Date) {
    // Filter by name
    const nameFilter = this.filterNames(status).toLowerCase();
    const filterByName: boolean = name.toLowerCase().includes(nameFilter, 0);
    if (!filterByName) return false;

    // Filter by date
    const filterByDate: boolean = this.filterDates(deadline, status);

    return filterByName && filterByDate;
  }

  filterNames(status: Status) {
    return this.nameFilters[this.statusCol(status)];
  }

  filterDates(deadline: Date, status: Status) {
    const startFilterDate: string = this.startDateFilters[this.statusCol(status)];
    const finishFilterDate: string = this.finishDateFilters[this.statusCol(status)];
    let startDateFilter: boolean;
    let finishDateFilter: boolean;
    // finish filter
    if (finishFilterDate === '') finishDateFilter = true;
    else finishDateFilter = new Date(finishFilterDate) >= deadline;

    // start filter
    if (startFilterDate === '') startDateFilter = true;
    else startDateFilter = new Date(startFilterDate) <= deadline;
    return finishDateFilter && startDateFilter;
  }

  // eslint-disable-next-line class-methods-use-this
  statusCol(status: Status) {
    switch (status) {
      case Status.todo: return 0;
      case Status.done: return 1;
      case Status.inprogress: return 2;
      default: return -1;
    }
  }
}
</script>

<style lang="scss" scoped>
.kanban-wrapper{
  width: 100%;
  background: url("../assets/img/kanban_bg.jpg") 100% 100%;
  flex-direction: column;
  padding: 8px;
}

.table-head,.table-body{
  width: 100%;
}

.table-col,.table-head-col {
  text-align: center;
  width: (100% / 3);
  margin: 2px;
  .draggable{
    height: 100%;
  }
}

.table-head{
  height: 25px;
  .table-head-col{
    background-color: #333333;
    border-radius: 3px;
    color: white;
    overflow: hidden;
  }
  .table-head-filter{
    display: inline-block;
    margin: 2px;
    .filter input:first-child{
      width: 50%;
      font-size: 11px;
      margin-right: 5px;
    }
    [type="date"]{
      font-size: 10px;
    }
    .filter{
      input{
        height: 15px;
        display: inline-block;
      }
    }
  }
}


.table-body{
  height: 90%;

  .table-col {
    border-radius: 5px;
    overflow: auto;
    border: 1px solid #333333;
    padding-top: 5px;
    .task-card{
      cursor: pointer;
      margin-left: 10px;
      border-radius: 5px;
      min-height: 50px;
      min-width: 200px;
      width: 80%;
      margin-bottom: 7px;
      padding: 2px;
      box-sizing: border-box;
      justify-content: center;
      overflow-wrap: break-word;
      float: left;
      &:nth-child(2n){
        float: right;
        margin-right: 10px;
      }
      div {
        align-self: center;
      }
    }
    .hot::after{
      content: url('../assets/img/hot.svg');
    }
    .task-card-todo{
      background-color: #FFCC33;
    }
    .task-card-done{
      background-color: lightgreen;
    }
    .task-card-inprogress{
      background-color: lightblue;
    }
    .task-card-past{
      background-color: lightcoral;
    }
  }
}
</style>
