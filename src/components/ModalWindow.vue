<template lang="pug">
  transition(name='modal-fade')
    .modal-backdrop
      .modal(role='dialog', aria-labelledby='modalTitle', aria-describedby='modalDescription')
        .form-wrapper.flex
          form.flex(@submit.prevent="addTask")
          input(type='text' placeholder='Task name'
            v-model='formTaskName' required ref="inputName")
          input(type='text' placeholder='Task description'
            v-model="formTaskDescription" required)
          button(type='submit') Add Task
        header#modalTitle.modal-header
          slot(name='header')
            | This is the default tile!
            button.btn-close(type='button', @click='closeModal', aria-label='Close modal')
              | x
        section#modalDescription.modal-body
          slot(name='body')
            | I'm the default body!
        footer.modal-footer
          slot(name='footer')
            | I'm the default footer!
            button.btn-green(type='button', @click='closeModal', aria-label='Close modal')
              | Close me!
</template>

<script lang="ts">
// import { Component, Vue } from 'vue-property-decorator';

import { Component, Vue } from 'vue-property-decorator';
import { Status, Task } from '@/interfaces';

@Component
export default class ModalWindow extends Vue {
  taskId = this.$store.getters.getTaskId;

  formTaskName: string = '';

  formTaskDescription: string = '';

  closeModal() {
    this.$emit('close');
  }

  addTask() {
    this.taskId += 1;
    const task: Task = {
      id: this.taskId,
      name: this.formTaskName,
      description: this.formTaskDescription,
      deadline: '02.02.2020',
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
}
</script>

<style lang="scss" scoped>
  .blink-row {
    animation: blink 1s;
    animation-iteration-count: 3;
  }

  @keyframes blink {
    50% {
      opacity: 0;
      background-color: lightgrey;
    }
  }

  .modal-backdrop {
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

    .modal-header,
    .modal-footer {
      padding: 15px;
      display: flex;
    }

    .modal-header {
      border-bottom: 1px solid #eeeeee;
      color: #4AAE9B;
      justify-content: space-between;

      .btn-close {
        border: none;
        font-size: 20px;
        padding: 20px;
        cursor: pointer;
        font-weight: bold;
        color: #4AAE9B;
        background: transparent;
      }
    }

    .modal-footer {
      border-top: 1px solid #eeeeee;
      justify-content: flex-end;
      .btn-green {
        color: white;
        background: #4AAE9B;
        border: 1px solid #4AAE9B;
        border-radius: 2px;
      }
    }

    .modal-body {
      position: relative;
      padding: 20px 10px;
    }
  }

</style>
