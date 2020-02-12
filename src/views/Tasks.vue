<template lang="pug">
  .tasks-wrapper
    button.btn-yellow(type='button', @click="isAddModalVisible = true") Add new task
    TaskDetailsModal(
      v-if="isEditModalVisible"
      @close="isEditModalVisible = false"
      @closeAndSave="closeAndSave"
      :editedTask="editedTask"
      )
    ModalWindow(v-if="isAddModalVisible"
      @addAndClose="addAndClose"
      @close="isAddModalVisible = false")
    hr
    .table-wrapper-over
      .table-wrapper
        table
          thead
            th(scope='col' v-for='(col,index) in tableCols' :key='index') {{col}}
          transition-group(:name="animationName" tag="tbody" )
            tr.table-row.test(
              v-for='task in tasks'
              :key="task.id"
              ref="tableRow"
              )
              td(@click="editTask(task.id)") {{ task.status }}
              td(@click="editTask(task.id)") {{ task.name }}
              td(@click="editTask(task.id)") {{ task.description }}
              td(@click="editTask(task.id)") {{ task.added | formattedDate }}
              td(@click="editTask(task.id)") {{ task.deadline | formattedDate}}
              td
                img(@click='store.DELETE_TASK(task.id)' :src="closeIco")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Task } from '@/interfaces';
import ModalWindow from '@/components/AddTaskModal.vue';
import TaskDetailsModal from '@/components/TaskDetailsModal.vue';
import { vxm } from '@/store/store';

import * as closeIco from '@/assets/img/close.svg';
import * as api from '@/service/tasksApi';

/* Table cols */
const tableCols: string[] = ['Status', 'Task', 'Description', 'Start', 'Deadline', 'Del'];

@Component({
  components: { TaskDetailsModal, ModalWindow },
})
export default class Tasks extends Vue {
  isAddModalVisible = false;

  isEditModalVisible = false;

  animationName = '';

  tableCols: string[] = tableCols;

  editedTask: Task | undefined = {} as Task;

  closeIco = closeIco;

  store = vxm.myStore;

  mounted() {
    this.store.FETCH_TASKS();
    setTimeout(() => this.startAnimation(), 500);
  }

  addAndClose() {
    this.animationName = 'tasksAnim';
    this.isAddModalVisible = false;
  }

  closeAndSave() {
    this.isEditModalVisible = false;
    api.pushTasks(this.store.GET_TASKS);
  }

  get tasks() {
    return this.store.GET_TASKS;
  }

  editTask(id: number) {
    this.isEditModalVisible = true;
    this.editedTask = this.store.TASK_BY_ID(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // stopAnimation = (el: any, done: any) => {
  //   console.log('event');
  //   console.log(this.isFirstInit);
  //   if (this.isFirstInit) done();
  // };

  startAnimation() {
    const speed = 200;
    const animationSpeed = 1000; // css @keyframes scale-text-row
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blinkedRows = this.$refs.tableRow as Array<any>;
    if (blinkedRows === undefined) return;

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

  .tasksAnim-enter-active {
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
    text-align: center;
    padding: 5px;
    button{
      margin-top: 5px;
    }
    .table-wrapper-over {
      height: 89%;
      background-color: white;
      padding: 5px;
      border-radius: 5px;
      box-sizing: border-box;
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
    .tasks-wrapper {
      .table-wrapper-over{
        .table-wrapper{
          thead, td{
            font-size: 9px;
          }
          td img{
            width: 10px;
          }
          table thead th{
            &:nth-child(1){
              width: 15%;
            }
            &:nth-last-child(2), &:nth-last-child(3) {
              width: 10%;
            }
          }
        }
      }
    }
  }
</style>
