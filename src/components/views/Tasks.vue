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
import { mapGetters } from 'vuex';

/* Table cols */
const tableCols: string[] = ['Status', 'Task', 'Description', 'Deadline'];


@Component({
  computed: mapGetters({
    tasks: 'getTasks',
  }),
})
export default class Tasks extends Vue {
  tableCols = tableCols;

  // get tasks() {
  //   return this.$store.state.tasks;
  // }

  // created() {
  //   this.$store.commit('initTasks', tasks);
  // }
}

</script>

<style scoped>

</style>
