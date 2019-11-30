<template lang="pug">
  .container-main.flex
    SideMenu
    .container-right.flex
      Header
      Content
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import Content from '@/components/Content.vue';
import Header from '@/components/Header.vue';
import SideMenu from '@/components/SideMenu.vue';

@Component({
  components: {
    Content, Header, SideMenu,
  },
})
export default class Layout extends Vue {}
</script>

<style lang="scss">

  @import "assets/css/variables.scss";

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
    min-width: $contactsDiametr;
    min-height: $contactsDiametr;
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
