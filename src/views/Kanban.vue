import {Status} from "@/interfaces";
<template lang="pug">
  .kanban-wrapper.content-wrapper.flex
    TaskDetailsModal(
      v-if="isEditModalVisible"
      @close="isEditModalVisible = false"
      :editedTask="editedTask"
    )
    .table-head.flex
      .table-col-head(v-for="status in tableCols") {{ status }}
    .table-body.flex
      .table-col(v-for="(list,index) in [tasksTodo,tasksDone,tasksInProgress]")
        draggable.draggable(group="cards"
          :id="'drag-' + tableCols[index]"
          :move="checkMove"
          :list="list" @add="updateTasks"
          )
          .task-card.flex(
            v-for="task in list"
            :id="'task-' + task.id"
            @click="editTask(task.id)"
          )
            div {{task.name}} {{ task.deadline }}
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { Status, Task } from '@/interfaces';
import TaskDetailsModal from '@/components/TaskDetailsModal.vue';


const statusKeys = Object.keys(Status);
const tableCols = statusKeys.map(k => Status[k as any]).map(v => v as Status);

@Component({
  components: { TaskDetailsModal, draggable },
})
export default class Kanban extends Vue {
  tableCols = tableCols;

  isEditModalVisible = false;

  editedTask: Task = {} as Task;

  tasks = this.$store.getters.getTasks;

  tasksTodo = this.$store.getters.getTasks.filter((obj: Task) => obj.status === Status.todo);

  tasksDone = this.$store.getters.getTasks.filter((obj: Task) => obj.status === Status.done);

  tasksInProgress = this.$store.getters.getTasks.filter((obj: Task) => obj.status
    === Status.inprogress);


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
}
</script>

<style lang="scss" scoped>
.kanban-wrapper{
  width: 100%;
  background: url("../assets/img/kanban_bg.jpg") 100% 100%;
  flex-direction: column;
}

.table-head,.table-body{
  width: 100%;
}

.table-col,.table-col-head {
  text-align: center;
  width: (100% / 3);
  margin: 2px;
  .draggable{
    height: 100%;
  }
}

.table-head{
  height: 25px;
  .table-col-head{
    background-color: #333333;
    border-radius: 3px;
    color: white;
    overflow: hidden;
  }
}

.table-body{
  height: 95%;

  .table-col {
    border-radius: 5px;
    overflow: auto;
    border: 1px solid #333333;
    padding-top: 5px;
    .task-card{
      cursor: pointer;
      margin-left: 10px;
      background-color: #FFCC33;
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
  }
}
</style>
