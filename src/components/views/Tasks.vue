<template lang="pug">
  .tasks-wrapper
    .form-wrapper.flex
      form.content-wrapper.flex(@submit.prevent="addTask")
        input(type='text' placeholder='Task name'
          v-model='formTaskName' required ref="inputName")
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
            tr.table-row(v-for='(task,i) in tasks' :key="task.id" ref="table-row")
              td {{ task.status }}
              td {{ task.name }}
              td {{ task.description }}
              td
                button(@click='deleteTask(i)') Del
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Status, Task } from '@/interfaces';


/* Table cols */
const tableCols: string[] = ['Status', 'Task', 'Description', 'Del'];


// ({
//   computed: mapGetters({
//     tasks: 'getTasks',
//   }),
// })

@Component
export default class Tasks extends Vue {
  tableCols: string[] = tableCols;

  formTaskName: string = '';

  formTaskDescription: string = '';

  taskId = this.$store.getters.getTaskId;

  tasks = this.$store.getters.getTasks;

  addTask() {
    this.taskId += 1;
    const task: Task = {
      id: this.taskId,
      name: this.formTaskName,
      description: this.formTaskDescription,
      status: Status.todo,
    };
    this.formTaskDescription = '';
    this.formTaskName = '';
    this.$store.dispatch('addTask', task);

    // add blinking row when add new item
    this.$nextTick(() => {
      const blinkedRow = this.$refs['table-row'] as Array<any>;
      blinkedRow[blinkedRow.length - 1].classList.add('blink-row');
    });

    const inpName = this.$refs.inputName as HTMLElement;
    inpName.focus();
  }

  deleteTask(index: number) {
    this.$store.dispatch('deleteTask', index);
  }

  // lifecycle hook
  mounted() {
    const blinkedRows = this.$refs['table-row'] as Array<any>;
    for (let i = 0; i < blinkedRows.length; i += 1) {
      setTimeout(() => {
        blinkedRows[i].classList.add('scale-text-row');
      }, 100 * i);
    }
  }

  beforeUpdate() {
    const blinkedRows = this.$refs['table-row'] as Array<any>;
    for (let j = 0; j <= blinkedRows.length; j += 1) {
      blinkedRows[j].classList.remove('scale-text-row');
    }
  }
}

</script>

<style lang="scss" scoped>
  .blink-row {
    animation: blink 1s;
    animation-iteration-count: 3;
  }

  .scale-text-row{
    animation: scale-text-row-animation 1s;
  }
  @keyframes scale-text-row-animation {
    50% {
      font-size: 1.2em;
    }
  }
  @keyframes blink {
    50% {
      opacity: 0;
      background-color: lightgrey;
    }
  }
  .tasks-wrapper {
    width: 100%;
    .form-wrapper {
      height: 20%;
      justify-content: center;

      form {
        flex-direction: column;
        // width: 20%;
        input {
          height: 33%;
          margin-bottom: 2px;
        }
      }
    }

    .table-wrapper-over {
      height: 73%;

      .table-wrapper {
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
                width: 12%;
                text-align: center;
              }

              &:nth-child(2) {
                width: 20%;
              }

              &:nth-last-child(1) {
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                width: 8%;
              }
            }
          }

          td {
            word-wrap: break-word;
            border-bottom: 1px solid darkgrey;
            padding: 5px;
          }
        }
      }
    }
  }
</style>
