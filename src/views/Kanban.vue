import {Status} from "@/interfaces";
<template lang="pug">
  .kanban-wrapper.content-wrapper.flex
    .table-head.flex
      .table-col-head(v-for="status in tableCols") {{ status }}
    .table-body.flex
      .table-col(v-for="(list,index) in [tasksTodo,tasksDone,tasksInProgress]")
        draggable.draggable(group="cards"
          :id="'drag-' + tableCols[index]"
          :list="list" @add="updateTasks"
          )
          .task-card.flex(
            v-for="task in list"
            :id="'task-' + task.id"
          )
            div {{task.name}} {{ task.deadline }}
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { Status } from '@/interfaces';


const statusKeys = Object.keys(Status);
const tableCols = statusKeys.map(k => Status[k as any]).map(v => v as Status);

@Component({
  components: { draggable },
})
export default class Kanban extends Vue {
  tableCols = tableCols;

  tasks = this.$store.getters.getTasks;

  tasksTodo = this.$store.getters.getTasks.filter(obj => obj.status === Status.todo);

  tasksDone = this.$store.getters.getTasks.filter(obj => obj.status === Status.done);

  tasksInProgress = this.$store.getters.getTasks.filter(obj => obj.status === Status.inprogress);

  // eslint-disable-next-line class-methods-use-this
  updateTasks(event) {
    const id = event.clone.id.split('-')[1];
    const status = event.to.id.split('-')[1];
    this.$store.dispatch('updateTaskStatus', { id, status });
  }

  // eslint-disable-next-line class-methods-use-this
  draggableOptions(status) {
    return {
      group: {
        name: `${status}_cards`,
        put(to, from) {
          return !(to.el.id === 'draggable-todo' && from.el.id === 'draggable-done');
        },
      },
    };
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
  height: 7%;
  .table-col-head{
    margin-top: 0;
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
      // @include horizontalCenteringDiv;
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
