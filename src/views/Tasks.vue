<template lang="pug">
  .tasks-wrapper.content-wrapper
    button.btn-yellow(type='button', @click="isAddModalVisible = true") Add new task
    TaskDetailsModal(
      v-if="isEditModalVisible"
      @close="isEditModalVisible = false"
      :editedTask="editedTask"
      )
    ModalWindow(v-if="isAddModalVisible" @close="isAddModalVisible = false")
    hr
    .table-wrapper-over.content-wrapper
      .table-wrapper
        table
          thead
            th(scope='col' v-for='(col,index) in tableCols' :key='index') {{col}}
          transition-group(name="tasks" tag="tbody")
            tr.table-row.test(
              v-for='(task,i) in tasks'
              :key="task.id"
              ref="table-row"
              )
              td(@click="editTask(task.id)") {{ task.status }}
              td(@click="editTask(task.id)") {{ task.name }}
              td(@click="editTask(task.id)") {{ task.description }}
              td(@click="editTask(task.id)") {{ task.added | formattedDate }}
              td(@click="editTask(task.id)") {{ task.deadline | formattedDate}}
              td
                img(@click='deleteTask(i)' :src="closeIco")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Status, Task } from '@/interfaces';
import ModalWindow from '@/components/AddTaskModal.vue';
import TaskDetailsModal from '@/components/TaskDetailsModal.vue';

const closeIco = require('@/assets/img/close.svg');

/* Table cols */
const tableCols: string[] = ['Status', 'Task', 'Description', 'Start', 'Deadline', 'Del'];

@Component({
  components: { TaskDetailsModal, ModalWindow },
})
export default class Tasks extends Vue {
  isAddModalVisible = false;

  isEditModalVisible = false;

  tableCols: string[] = tableCols;

  editedTask: Task = {} as Task;

  closeIco = closeIco;

  tasks = this.$store.getters.getTasks;

  deleteTask(index: number) {
    this.$store.dispatch('deleteTask', index);
  }

  mounted() {
    this.startAnimation();
  }

  editTask(id: number) {
    this.isEditModalVisible = true;
    this.editedTask = this.$store.getters.getTaskById(id);
  }

  startAnimation() {
    const speed: number = 200;
    const animationSpeed: number = 1000; // css @keyframes scale-text-row
    const blinkedRows = this.$refs['table-row'] as Array<any>;

    for (let i = 0; i < blinkedRows.length; i += 1) {
      // add animation class
      setTimeout(() => {
        blinkedRows[i].classList.add('scale-text-row');
      }, speed * i);

      // remove animation class
      setTimeout(() => {
        blinkedRows[i].classList.remove('scale-text-row');
      }, speed * i + animationSpeed);
    }
  }
}

</script>

<style lang="scss" scoped>

  .tasks-enter-active {
    animation: blink;
    animation-duration: 2s;
  }

  @keyframes blink {
    33%, 66% {
      opacity: 0;
      background-color: lightgrey;
    }
    50%, 100% {
      opacity: 1;
      background-color: white;
    }
  }

  .scale-text-row{
    animation: scale-text-row-animation 1s;
  }

  @keyframes scale-text-row-animation {
    50% {
      font-size: 1.1em;
    }
  }

  .tasks-wrapper {
    width: 100%;
    text-align: center;

    button{
      margin-top: 5px;
    }
    .table-wrapper-over {
      height: 86%;
      background-color: white;
      .table-wrapper {
        height: 100%;
        overflow: auto;

        table {
          table-layout: fixed;
          font-size: 14px;
          width: 100%;
          border-collapse: collapse;

          thead {
            text-align: center;
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
              &:nth-last-child(2), &:nth-last-child(3) {
                width: 13%;
              }
            }
          }

          tr {
            cursor: pointer;
            td {
              word-wrap: break-word;
              border-bottom: 1px solid darkgrey;
              padding: 5px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: $mobileWidth) {
    .table-wrapper{
      thead, td{
        font-size: 8px;
      }
      td img{
        width: 10px;
      }
    }
  }
</style>
