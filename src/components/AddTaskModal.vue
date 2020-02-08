<template lang="pug">
  transition(name='modal-fade')
    .modal-backdrop
      .modal(role='dialog', aria-labelledby='modalTitle', aria-describedby='modalDescription')
        header#modalTitle.modal-header
          div Add new task
          button.btn-close(type='button', @click="$emit('close')", aria-label='Close modal') x
        section#modalDescription.modal-body
          form.flex(@submit.prevent="addTask")
            .form-content.flex
              .flex.labels
                label(for="addTaskName") Name
                label(for="addTaskDescription") Description
                label(for="addTaskDeadline") Deadline
              .flex.inputs
                input(type='text' id="addTaskName" placeholder='Task name'
                  v-model='formTaskName' required ref="inputName")
                input(type='text' id="addTaskDescription" placeholder='Task description'
                  v-model="formTaskDescription" required)
                input(type='date' :min="currentDate()"
                  id="addTaskDeadline" v-model="deadline" required)
            button.btn-yellow(type='submit') Add task
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { Status, Task } from '@/interfaces';
import { vxm } from '@/store/store';

  @Component
export default class ModalWindow extends Vue {
  formTaskName: string = '';

  formTaskDescription: string = '';

  deadline: string = '';

  addTask() {
    const task: Task = {
      id: vxm.myStore.TASK_ID,
      name: this.formTaskName,
      description: this.formTaskDescription,
      deadline: new Date(this.deadline),
      status: Status.todo,
      added: new Date(),
    };
    this.formTaskDescription = '';
    this.formTaskName = '';
    vxm.myStore.ADD_TASK(task);

    // close modal window
    this.$emit('close');
  }

  currentDate = () => new Date().toJSON().slice(0, 10)
}
</script>

<style lang="scss" scoped>


.modal-backdrop {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  margin-bottom: 120px;

  .modal-header {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #eeeeee;
    color: #FFC200;
    justify-content: space-between;
    height: 20px;
    div{
      margin-left: 90px;
      font-weight: bold;
    }
    .btn-close {
      border: none;
      font-size: 20px;
      cursor: pointer;
      font-weight: bold;
      color: #FFC200;
      background: transparent;
      height: 100%;
    }
  }

  .modal-body {
    position: relative;
    padding: 10px;

    form {
      flex-direction: column;
      .form-content{
        .labels,.inputs{
          flex-direction: column;
        }
        .labels{
          margin-right: 3px;
          justify-content: space-around;
          label{
            align-self: start;
            font-size: 14px;
          }
        }
        input {
          height: 20px;
          margin-bottom: 5px;
        }
      }
      button{
        height: 30px;
      }
    }
  }
}

</style>
