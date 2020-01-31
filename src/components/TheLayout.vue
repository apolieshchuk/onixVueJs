<template lang="pug">
  .container-main.flex
    transition(name="slideSidebar")
      TheSideMenu(v-if="isActiveSidebar" @hideSidebar="isActiveSidebar = false")
    .container-right.flex
      TheHeader(:isActiveSidebar = "isActiveSidebar" @showSidebar="isActiveSidebar = true")
      TheContent
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import TheContent from './TheContent.vue';
import TheHeader from './TheHeader.vue';
import TheSideMenu from './TheSideMenu.vue';

Vue.filter('formattedDate', (date: Date) => {
  const dayNum: number = date.getDate();
  const day: string = dayNum < 10 ? `0${dayNum}` : dayNum.toString();
  const monthNum: number = (date.getMonth() + 1);
  const month: string = monthNum < 10 ? `0${monthNum}` : monthNum.toString();
  return `${day}.${month}.${date.getFullYear()}`;
});

@Component({
  components: {
    TheContent, TheHeader, TheSideMenu,
  },
})
export default class Layout extends Vue {
  isActiveSidebar = true;

  created() {
    this.isActiveSidebar = window.screen.width >= 600;
  }
}

</script>

<style lang="scss">
  #burger{
    cursor: pointer;
  }

  .container-right{
    flex-direction: column;
    flex-grow: 1;
    height: 100vh;
    /*overflow: hidden;*/
  }

  body{
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
  .flex{
    display: flex;
  }
  .dots3-but{
    min-width: $contactsDiameter;
    min-height: $contactsDiameter;
    position: relative;
    left: 10px;
    border-radius: 50%;
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
  }
  .dots3{
    background-color: #9b9b9b;
    position: absolute;
    left: 42%;
    top: 42%;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }
  .dots3::after{
    content: "";
    position: inherit;
    width: inherit;
    height: inherit;
    left: 8px;
    border-radius: inherit;
    background-color: inherit;
  }
  .dots3::before{
    content: "";
    position: inherit;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    left: -8px;
    background-color: inherit;
  }

</style>

<style lang="scss" scoped>
  .slideSidebar-enter-active, .slideSidebar-leave-active {
    transition: transform .2s;
  }
  .slideSidebar-enter, .slideSidebar-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    transform: translateX(-280px);
  }

  /*@media only screen and (max-width: 600px) {*/
  /*  #side-menu {*/
  /*    display: none;*/
  /*  }*/
  /*}*/
</style>
