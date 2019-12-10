<template lang="pug">
  aside.side-menu.flex
    .menu-title.flex
      .menu-title-name.flex
        p PROJECTUS
      button.search
    .menu-ava.flex
      img(:src='userAva' :alt='userName')
      .menu-ava-name
        p {{userName}}
        p Product Owner
      button.dots3-but
        .dots3
    .menu-info.flex
      button.complited-tasks-but(@click='doTask')
        p {{completedTasks}}
        p Completed Tasks
      button.open-tasks-but(@click='goTasks')
        p {{openTasks}}
        p Open Tasks
    .menu-nav.flex
      span MENU
      a(href='#') Home
      a(href='#') My Tasks
      div
        a(href='#') Notifications
        .notification-count {{ clickedImg }}
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';


@Component
export default class TheSideMenu extends Vue {
  // initial data
  openTasks: number = this.$store.getters.getTasksLength;

  completedTasks: number = 372;

  userName: string = 'Anton Polieshchuk';

  userAva = '/assets/img/ava.jpg';

  // computed
  get clickedImg() {
    return this.$store.getters.getClickedImg;
  }

  // methods
  doTask() {
    if (this.openTasks > 0) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to change the number of tasks?')) {
        this.completedTasks += 1;
        this.openTasks -= 1;
      }
    }
  }

  goTasks() {
    if (this.openTasks > 0) {
      this.$router.push('/tasks');
    }
  }
}

</script>

<style lang="scss" scoped>

  .side-menu {
    flex-direction: column;
    background-color: black;
    color: white;
    height: 100vh;
    width: 19%;
    min-width: 270px;
    /*border: 1px solid black;*/

    > div {
      padding: 15px 25px;
    }

    .menu-title {
      font-size: 16px;
      align-items: center;
      justify-content: space-between;
      .menu-title-name {
        align-items: center;
        &:before {
          margin-right: 15px;
          content: url('../../public/assets/img/Logo@3x.svg');
        }
      }
      p {
        position: relative;
        bottom: 1px;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 24px;
        margin-top: 15px;
      }

      .search {
        @include offButtonEffects;
        //margin-left: 200px;
        &:after {
          content: url('../../public/assets/img/Search@3x.svg');
          cursor: pointer;
        }
      }

    }
    .menu-ava {
      align-items: center;
      justify-content: space-between;
      background-color: #202020;
      margin-right: 0;
      img {
        width: 20%;
        border-radius: 50%;
      }

      .menu-ava-name p {
        margin: 0;
        &:first-child {
          font-size: 14px;
          font-weight: 100;
        }
        &:last-child {
          font-size: 12px;
          margin-top: 5px;
          color: #9B9B9B;
        }
      }
    }

    .menu-info {
      justify-content: space-between;
      button {
        @include offButtonEffects;
        padding: 0;
        width: 50%;
        margin-top: 5px;
        color: white;
        text-align: left;
        cursor: pointer;
        > p:first-child {
          margin-bottom: 0;
          margin-top: 0;
          font-size: 20px;
        }
        > p:last-child {
          margin-top: 5px;
          font-size: 12px;
          opacity: 0.5;
        }
      }
    }
    .menu-nav {
      flex-direction: column;
      justify-content: space-around;

      > span {
        font-size: 12px;
        color: #878787;
        line-height: 18px;
      }

      a, > div {
        margin-top: 20px;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 22px;
        text-decoration: none;
      }

      .notification-count {
        display: inline-block;
        background-color: #FFC200;
        width: 23px;
        text-align: center;
        border-radius: 50%;
        color: black;
        margin-left: 15px;
        font-weight: bold;
      }
    }
  }
</style>
