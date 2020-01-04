<template lang="pug">
  .kanban-wrapper.content-wrapper.flex
    .table-head.flex
      .table-col-head(v-for="status in tableCols") {{ status }}
    .table-body.flex
      .table-col(v-for="status in tableCols")
        .task-card(
          v-for="task in tasks"
          v-if="task.status === status"
          ) {{task.name}} {{ task.deadline }}
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
  padding-top: 0;
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
    .task-card{
      overflow: hidden;
      background-color: #FFCC33;
      border-radius: 5px;
      display: inline-block;
      height: 50px;
      width: 80%;
      margin-bottom: 2px;
      padding-top: 10px;
      box-sizing: border-box;
    }
  }
}
</style>
