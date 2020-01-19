<template lang="pug">
  .tasks-wrapper.content-wrapper
    button.btn-yellow(type='button', @click='showModal') Add new task
    // modal(v-show='isModalVisible', @close='closeModal')
    ModalWindow(v-if="isModalVisible" @close='closeModal')
    hr
    .table-wrapper-over.content-wrapper
      .table-wrapper
        table
          thead
            th(scope='col' v-for='(col,index) in tableCols' :key='index') {{col}}
          transition-group(name="tasks" tag="tbody")
            tr.table-row(v-for='(task,i) in tasks' :key="task.id" ref="table-row")
              td {{ task.status }}
              td {{ task.name }}
              td {{ task.description }}
              td {{ task.deadline }}
              td
                button(@click='deleteTask(i)') Del
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Status, Task } from '@/interfaces';
import ModalWindow from '@/components/AddTaskModal.vue';


/* Table cols */
const tableCols: string[] = ['Status', 'Task', 'Description', 'Deadline', 'Del'];


// ({
//   computed: mapGetters({
//     tasks: 'getTasks',
//   }),
// })
@Component({
  components: { ModalWindow },
})
export default class Tasks extends Vue {
  isModalVisible = false;

  tableCols: string[] = tableCols;

  tasks = this.$store.getters.getTasks;

  closeModal() { this.isModalVisible = false; }

  showModal() { this.isModalVisible = true; }

  deleteTask(index: number) {
    this.$store.dispatch('deleteTask', index);
  }

  // lifecycle hook
  mounted() {
    const blinkedRows = this.$refs['table-row'] as Array<any>;
    for (let i = 0; i < blinkedRows.length; i += 1) {
      setTimeout(() => {
        blinkedRows[i].classList.add('scale-text-row');
      }, 200 * i);
    }
  }
}

</script>

<style lang="scss">
  .table-row{
    opacity: 1;
  }

  .tasks-enter-active {
    animation: blink;
    animation-duration: 2s;
  }

  /*.tasks-enter, .tasks-leave-to !* .list-leave-active до версии 2.1.8 *! {*/
  /*  opacity: 0;*/
  /*  transform: translateY(30px);*/
  /*}*/
  /*.tasks-enter{*/
  /*  animation-name: blink;*/
  /*  animation-duration: 1s;*/
  /*}*/

  /*.blink-row {*/
  /*  animation: blink 1s;*/
  /*  animation-iteration-count: 3;*/
  /*}*/

  @keyframes blink {
    50% {
      opacity: 0;
      background-color: lightgrey;
    }
  }

  .btn-yellow {
    color: white;
    font-weight: bold;
    background: #FFCC33;
    height: 30px;
    border: 1px solid #FFC200;
    border-radius: 2px;
  }
</style>

<style lang="scss" scoped>


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
              &:nth-last-child(2) {
                width: 13%;
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
