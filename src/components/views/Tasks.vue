<template lang="pug">
  .wrapper
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
            tr.table-row(v-for='(task,i) in tasks' :key="task.id")
              td
                button(@click='deleteTask(i)') Del
              td {{ task.name }}
              td {{ task.description }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Task } from '@/interfaces';


/* Table cols */
const tableCols: string[] = ['Status', 'Task', 'Description'];


@Component({
  computed: mapGetters({
    tasks: 'getTasks',
  }),
})
export default class Tasks extends Vue {
  tableCols: string[] = tableCols;

  formTaskName: string = '';

  formTaskDescription: string = '';

  taskId = this.$store.getters.getTaskId;

  addTask() {
    this.taskId += 1;
    const task: Task = {
      id: this.taskId,
      name: this.formTaskName,
      description: this.formTaskDescription,
      deadline: '',
    };
    this.formTaskDescription = '';
    this.formTaskName = '';
    this.$store.dispatch('addTask', task);

    // add blinking row when add new item
    this.$nextTick(() => {
      const blinkedRow = document.querySelector('.table-row:nth-child(1)');
      if (blinkedRow != null) blinkedRow.classList.add('blink-row');
    });

    // const inpName = document.querySelector('form input:first-child') as HTMLElement;
    const inpName = this.$refs.inputName as HTMLElement;
    inpName.focus();
  }

  deleteTask(index: number) {
    this.$store.dispatch('deleteTask', index);
  }

  // lifecycle hook
  // eslint-disable-next-line class-methods-use-this
  mounted() {
    const blinkedRows = document.querySelectorAll('.table-row');
    for (let i = 0; i < blinkedRows.length; i += 1) {
      setTimeout(() => {
        blinkedRows[i].classList.add('scale-text-row');
      }, 1000 * i);
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
      font-size: 1.3em;
    }
  }
  @keyframes blink {
    50% {
      opacity: 0;
      background-color: lightgrey;
    }
  }

  .content-wrapper {
    background-color: white;
    border-radius: 5px;
    padding: 5px;
  }

  .wrapper {
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
      height: 75%;

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
