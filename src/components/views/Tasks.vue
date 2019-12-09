<template lang="pug">
  table.table
    thead.thead-dark
      th(scope='col' v-for='(col,index) in tableCols' :key='index') {{col}}
    tbody
      tr(v-for='(task,i) in tasks' v-bind:key='i')
        th(scope='row')
          input(type='checkbox')
        td(v-for='(col,index) in Object.values(task)' v-bind:key='index') {{col}}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

/* Table cols */
const tableCols: string[] = ['Status', 'Task', 'Description', 'Deadline'];

/* Task interface */
interface Task{
  name: string,
  description: string,
  deadline: string
}

/* Function for creating task object */
function createTaskObj(name:string, description:string, deadline:string): Task {
  return { name, description, deadline };
}


/* Create task objects */
const tasks = [
  createTaskObj('Breakfast', 'Have breakfast', '17.11, 9:00 am'),
  createTaskObj('Vue-programming', 'Do some programming in Vue.js', '17.11, 11:00 am'),
  createTaskObj('Shopping', 'Go shopping with my wife', '17.11, 13:00 am'),
  createTaskObj('Vue-programming', 'Continue programming process', '17.11, 15:00 am'),
  createTaskObj('Dinner', 'Eat,eat,eat....', '17.11, 17:00 am'),
  createTaskObj('Sleep', 'Go sleep until 4 a.m.', '17.11, 19:00 am'),
];


@Component
export default class Tasks extends Vue {
  tableCols = tableCols;

  get tasks() {
    return this.$store.state.tasks;
  }

  created() {
    this.$store.commit('initTasks', tasks);
  }
}

</script>

<style scoped>

</style>
