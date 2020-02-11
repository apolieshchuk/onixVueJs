<template lang="pug">
  .kanban-wrapper.flex
    TaskDetailsModal(
      v-if="isEditModalVisible"
      @close="isEditModalVisible = false"
      :editedTask="editedTask"
    )
    .filter.flex
      label(for="nameFilter") Filter:
      input(v-model="nameFilter" id="nameFilter" placeholder="Name")
      input(type="date" v-model="startDateFilter"
        id="filter-todo-start" name="filter-start")
      input(type="date" v-model="finishDateFilter"
        id="filter-todo-finish" name="filter-finish")
    .table.flex
      .table-head.flex
        .table-head-col(v-for="status in tableCols") {{ status }} ({{ countCards(status) }}
          span  cards
          span )
      .table-body.flex
        draggable.table-col(v-for="(list,index) in [tasksTodo,tasksDone,tasksInProgress]"
          :key="index"
          group="cards"
          :id="'drag-' + tableCols[index]"
          :move="checkMove"
          :list="list" @add="updateTasks"
          )
          .task-card.flex(
            v-for="task in list"
            v-if="isActiveInFilter(task.name, task.deadline)"
            :id="'task-' + task.id"
            :class="[cardStyle(task.status, task.deadline), hotCard(task.status,task.deadline)]"
            @click="editTask(task.id)"
          )
            div {{task.name}} {{ task.deadline | formattedDate }}
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { Status, Task } from '@/interfaces';
import TaskDetailsModal from '@/components/TaskDetailsModal.vue';
import { vxm } from '@/store/store';

const statusKeys = Object.keys(Status);
const statusValues: Status[] = Object.values(Status).filter((x) => typeof x === 'string');

@Component({
  components: { TaskDetailsModal, draggable },
})
export default class Kanban extends Vue {
  tableCols = statusValues;

  isEditModalVisible = false;

  editedTask: Task | undefined = {} as Task;

  myStore = vxm.myStore;

  nameFilter = '';

  startDateFilter = '';

  finishDateFilter = '';

  t = this.myStore.TASKS;

  tasksTodo = this.myStore.TASKS.filter((obj: any) => obj.status === Status.todo);

  tasksDone = this.myStore.TASKS.filter((obj: any) => obj.status === Status.done);

  tasksInProgress = this.myStore.TASKS.filter((obj: any) => obj.status === Status.inprogress);

  updateTasks(event: any) {
    const id: number = event.clone.id.split('-')[1];
    const status: Status = event.to.id.split('-')[1];
    const payload = { id, status };
    this.myStore.UPDATE_TASK_STATUS(payload);
  }

  checkMove = (event: any) => !(event.to.id === 'drag-todo' && event.from.id === 'drag-done');

  editTask(id: number) {
    this.isEditModalVisible = true;
    this.editedTask = this.myStore.TASK_BY_ID(id);
  }

  cardStyle = (status: Status, date: Date) => {
    // eslint-disable-next-line no-param-reassign
    date = new Date(date); // for vuex_persist

    if (status === Status.todo || status === Status.inprogress) {
      if (date < new Date()) return 'task-card-past';
    }

    switch (status) {
      case Status.done: return 'task-card-done';
      case Status.inprogress: return 'task-card-inprogress';
      case Status.todo: return 'task-card-todo';
      default: return null;
    }
  };

  hotCard = (status: Status, date: Date) => {
    // eslint-disable-next-line no-param-reassign
    date = new Date(date); // for vuex_persist

    if (status === Status.done) return '';
    const diffForHot = 24;
    const diff: number = (date.getTime() - new Date().getTime()) / 36e5;
    if (diff < diffForHot && diff > 0) return 'hot';
    return '';
  };

  countCards(status: Status) {
    switch (status) {
      case Status.inprogress: return this.tasksInProgress.length;
      case Status.todo: return this.tasksTodo.length;
      case Status.done: return this.tasksDone.length;
      default: return 0;
    }
  }

  isActiveInFilter(name: string, date: Date) {
    const deadline: Date = new Date(date); // for vuex_persist
    // Filter by name
    const filterByName: boolean = name.toLowerCase().includes(this.nameFilter.toLowerCase(), 0);
    if (!filterByName) return false;

    // Filter by date
    return this.filterDate(deadline);
  }

  filterDate(date: Date) {
    const deadline: Date = new Date(date); // for vuex_persist

    const startFilterString = Date.parse(this.startDateFilter);
    const finishFilterString = Date.parse(this.finishDateFilter);

    let isStartFilter: boolean;
    let isFinishFilter: boolean;

    // start filter
    if (!startFilterString) isStartFilter = true;
    else {
      const startFilter: Date = new Date(startFilterString);
      startFilter.setHours(0, 0, 0);
      isStartFilter = deadline >= startFilter;
    }

    // finish filter
    if (!finishFilterString) isFinishFilter = true;
    else {
      const finishFilter: Date = new Date(finishFilterString);
      finishFilter.setHours(0, 0, 0);
      isFinishFilter = deadline <= finishFilter;
    }

    return isFinishFilter && isStartFilter;
  }
}
</script>

<style lang="scss" scoped>
.kanban-wrapper{
  background: url("../assets/img/kanban_bg.jpg") 100% 100%;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .filter{
    justify-content: center;
    margin-bottom: 5px;
    margin-top: 5px;
    *{
      margin-right: 3px;
    }
    label{
      font-weight: bold;
    }
    input{
      border-radius: 7px;
      border: solid 1px black;
      padding: 2px;
      outline: none;
    }
  }
  .table{ // DONT TOUCH THIS FLEXBOXESS SCROLL!!
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
    .table-col,.table-head-col{
      text-align: center;
      width: (100% / 3);
      margin: 2px;
    }
    .table-head{
      .table-head-col{
        background-color: #333333;
        border-radius: 3px;
        color: white;
      }
    }
    .table-body{
      flex: 1 1 auto;
      height: 94%;
      overflow-y: auto;
      .table-col {
        overflow-y: auto;
        border-radius: 5px;
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
  }
}

@media screen and (max-width: $mobileWidth) {
  .kanban-wrapper{
    .filter{
      margin-left: 5px;
    }
    .table{
      .table-head, .table-body{
        font-size: 12px;
      }
      .table-head-col span:first-child{
        display: none;
      }
      .table-body{
        .table-col .task-card{
          min-width: 20px;
        }
      }
    }
  }
}
</style>
