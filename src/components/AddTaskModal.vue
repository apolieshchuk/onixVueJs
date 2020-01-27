<template lang="pug">
  transition(name='modal-fade')
    .modal-backdrop
      .modal(role='dialog', aria-labelledby='modalTitle', aria-describedby='modalDescription')
        header#modalTitle.modal-header
          div Add new task
          button.btn-close(type='button', @click="$emit('close')", aria-label='Close modal') x
        section#modalDescription.modal-body
          .form-wrapper.flex
            form.flex(@submit.prevent="addTask")
              input(type='text' placeholder='Task name'
                v-model='formTaskName' required ref="inputName")
              input(type='text' placeholder='Task description'
                v-model="formTaskDescription" required)
              button.btn-yellow(type='submit') Add task
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { Status, Task } from '@/interfaces';

@Component
export default class ModalWindow extends Vue {
  formTaskName: string = '';

  formTaskDescription: string = '';

  addTask() {
    const id = this.$store.getters.getLastTaskId + 1;
    const task: Task = {
      id,
      name: this.formTaskName,
      description: this.formTaskDescription,
      deadline: new Date(2020, 0, 27),
      status: Status.todo,
    };
    this.formTaskDescription = '';
    this.formTaskName = '';
    this.$store.dispatch('addTask', task);

    // add blinking row when add new item
    // this.$nextTick(() => {
    //   const blinkedRow = this.$refs['table-row'] as Array<any>;
    //   blinkedRow[blinkedRow.length - 1].classList.add('blink-row');
    // });

    // close modal window
    this.$emit('close');

    // const inpName = this.$refs.inputName as HTMLElement;
    // inpName.focus();
  }
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

  .modal-header,
  .modal-footer {
    padding: 10px;
    display: flex;
  }

  .modal-header {
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

    .form-wrapper {
      justify-content: center;
      form {
        flex-direction: column;
        input {
          height: 33%;
          margin-bottom: 5px;
        }
      }
    }
  }
}

</style>
