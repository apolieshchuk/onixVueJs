<template lang="pug">
  .wrapper
    .form-wrapper.flex
      form.content-wrapper.flex(@submit.prevent="addTask" ref="form")
        input(type='text' placeholder='Task name'
          v-model='formTaskName' required)
        input(type='text' placeholder='Task description'
          v-model="formTaskDescription" required)
        button(type='submit') Add Task
    hr
    .table-wrapper-over.content-wrapper
      .table-wrapper
        table
          thead
            th(scope='col' v-for='(col,index) in tableCols' :key='index') {{col}}
          tbody
            tr(v-for='(task,i) in tasks' v-bind:key='i')
              td
                button(@click='deleteTask(i)') Del
              td(v-for='(col,index) in Object.values(task)'
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

.content-wrapper{
  background-color: white;
  border-radius: 5px;
  padding: 5px;
}

.wrapper {
  width: 100%;
  .form-wrapper{
    height: 20%;
    justify-content: center;
    form{
      flex-direction: column;
      width: 20%;
      * {
        height: 20px;
      }
    }
  }
  .table-wrapper-over{
    height: 75%;
    .table-wrapper{
      height: 100%;
      overflow: auto;
      table {
        table-layout: fixed;
        font-size: 14px;
        width: 100%;
        border-collapse: collapse;
        thead {
          text-align: left;
          th {
            padding: 8px 8px 8px 1px;
            background-color: #333333;
            color: white;
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
          border-bottom: 1px solid darkgrey;
          padding: 5px;
        }
      }
    }
  }
}
</style>
