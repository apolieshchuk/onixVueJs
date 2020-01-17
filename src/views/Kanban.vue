<template lang="pug">
  .kanban-wrapper.content-wrapper.flex
    .table-head.flex
      .table-col-head(v-for="status in tableCols") {{ status }}
    .table-body.flex
      .table-col(v-for="status in tableCols")
        .task-card.flex(
          v-for="task in tasks"
          v-if="task.status === status"
          )
          div {{task.name}} {{ task.deadline }}
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { Status } from '@/interfaces';

const statusKeys = Object.keys(Status);
const tableCols = statusKeys.map(k => Status[k as any]).map(v => v as Status);

@Component
export default class Kanban extends Vue {
  tableCols = tableCols;

  tasks = this.$store.getters.getTasks;
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
