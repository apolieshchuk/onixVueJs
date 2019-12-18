<template lang="pug">
  .wrapper.over
    form.mb-1.rounded.p-1(@submit.prevent="addTask" ref="form")
      .form-row.mb-1
        .col-4
          input.form-control(type='text' placeholder='Task name'
            v-model='formTaskName' required)
        .col-8
          input.form-control(type='text' placeholder='Task description'
            v-model="formTaskDescription" required)
      .form-row.justify-content-center
        .col-12.text-center
          button.btn.btn-warning.w-100(type='submit') Add Task
    .wrap-more.bg-light.p-1.rounded
      .table-wrapper
        table.table
          thead.thead-dark
            th(scope='col' v-for='(col,index) in tableCols' :key='index') {{col}}
          tbody
            tr(v-for='(task,i) in tasks' v-bind:key='i')
              td.text-center
                button(@click='deleteTask(i)') Done
              td.text-break(v-for='(col,index) in Object.values(task)'
                v-bind:key='index') {{col}}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Task } from '@/interfaces';

/* Table cols */
const tableCols: string[] = ['Status', 'Task', 'Description', 'Deadline'];


@Component({
  computed: mapGetters({
    tasks: 'getTasks',
  }),
})
export default class Tasks extends Vue {
    tableCols: string[] = tableCols;

    formTaskName: string = '';

    formTaskDescription: string = '';

    addTask() {
      const task: Task = {
        name: this.formTaskName,
        description: this.formTaskDescription,
        deadline: '',
      };
      this.formTaskDescription = '';
      this.formTaskName = '';
      this.$store.dispatch('addTask', task);
    }

    deleteTask(index: number) {
      this.$store.dispatch('deleteTask', index);
    }
}

</script>

<style lang="scss" scoped>

.wrapper {
  width: 100%;
  form,.wrap-more{
    border: 1px solid darkgrey;
    background-color: white;
  }
  .wrap-more{
    height: 80%;
  }
  .table-wrapper{
    overflow: auto;
    height: 100%;
    table {
      table-layout: fixed;
      font-size: 14px;
      width: 100%;
      thead {
        th {
          position: sticky;
          top: 0;
          z-index: 1;
          padding: 8px;
          border: none;
          &:nth-child(1) {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            width: 8%;
            text-align: center;
          }
          &:nth-child(2) {
            width: 20%;
          }

          &:nth-last-child(1) {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          &:nth-last-child(1) {
            width: 15%;
          }
        }
      }
      td{
        word-wrap: break-word;
      }
    }
  }
}
</style>
