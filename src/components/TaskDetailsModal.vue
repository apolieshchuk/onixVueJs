<template lang="pug">
  transition(name='modal-fade')
    .modal-backdrop
      .modal(role='dialog', aria-labelledby='modalTitle', aria-describedby='modalDescription')
        header#modalTitle.modal-header
          div Task details
          button.btn-close(type='button', @click="$emit('close')", aria-label='Close modal') x
        section#modalDescription.modal-body
          table
            tbody
              tr(v-for="key in ['id','status']")
                td {{key}}:
                td {{editedTask[key]}}
              tr
                td deadline:
                td {{editedTask.deadline | formattedDate}}
              tr
                td name:
                td
                  span(v-if="!isEditable") {{ editedTask.name }}
                  textarea.area-name(v-else v-model="taskName" @input="editTask")
              tr
                td description:
                td
                  span(v-if="!isEditable") {{ editedTask.description }}
                  textarea.area-description(v-else v-model="taskDescription" @input="editTask")
        footer.modal-footer
          button.btn-yellow(v-if="!isEditable" @click="isEditable=true") Edit
          button.btn-cancel(v-else @click="$emit('close')") Cancel
          transition(name="fade")
            button.btn-yellow(v-if="isTaskEdit" @click="saveChanges") Save
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { Task } from '@/interfaces';

@Component
export default class ModalWindow extends Vue {
  @Prop() editedTask!: Task;

  formTaskName: string = '';

  formTaskDescription: string = '';

  isEditable = false;

  isTaskEdit = false;

  taskName: string = this.editedTask.name;

  taskDescription: string = this.editedTask.description;

  editTask() {
    this.isTaskEdit = this.taskName !== this.editedTask.name
      || this.taskDescription !== this.editedTask.description;
  }

  saveChanges() {
    this.editedTask.name = this.taskName; /* I think this is bad idea. replace by mutation */
    this.editedTask.description = this.taskDescription;
    this.$emit('close');
  }
}
</script>

<style lang="scss" scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

table{
    text-align: left;

    tr td:nth-child(2){
      max-width: 400px;
      padding-left: 20px;
    }

    td textarea{
      min-width: 300px;
    }

    .area-name{
      min-height: 50px;
    }

    .area-description{
      min-height: 100px;
    }
  }

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
    justify-content: center;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #FFC200;
    justify-content: space-between;
    height: 20px;
    div{
      @include horizontalCenteringDiv;
      text-align: center;
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
