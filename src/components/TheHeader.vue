<template lang="pug">
  .wrapper.flex
    header.flex
      .header-title.flex
        img#burger(:src='burgerIco' @click="$emit('burgerClicked')")
        .wrap.flex
          h2 Website Redesign
        button.dots3-but.grey
          .dots3
      .header-controls.flex
        .contacts.flex
          img(v-for="(cont,index) in contacts" :key="index" :src="cont")
        .communication.flex
          button.share Share
          button.chat.flex Chat
    nav.navigation.flex
      router-link(v-for="(route,index) in $router.options.routes" :key="index"
       :to='route' v-if="route.hasOwnProperty('name')"
       :class="{'active-item': activeRoute === route.path}") {{route.name}}
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

const cont1 = require('@/assets/img/cont1.png');
const cont2 = require('@/assets/img/cont2.jpg');
const cont3 = require('@/assets/img/cont3.jpg');

const burgerIco = require('@/assets/img/burger.svg');

const contacts = [cont1, cont2, cont3];


@Component
export default class TheHeader extends Vue {
  // @Prop() burgerIco!: string;

  @Watch('$route')
  onRouteChange(route: any) {
    this.activeRoute = route.fullPath;
  }

  activeRoute = '';

  burgerIco = burgerIco;

  contacts = contacts;

  mounted() {
    this.activeRoute = this.$route.fullPath;
  }
}
</script>

<style lang="scss" scoped>

  .wrapper{
    flex-direction: column;
    width: 100%;
  }

  header{
    justify-content: space-between;
    box-sizing: border-box;
    padding: 30px 25px 0;

    .header-title{
      align-items: center;

      #burger{
        display: none;
      }

      .wrap::before {
        content: "";
        background: #FFC200 url('../assets/img/Shapes@2x.png') no-repeat;
        background-size: 40px 42px;
        min-width: 40px;
        min-height: 42px;
        border-radius: 20%;
      }

      h2{
        margin: 0 10px;
        font-size: 32px;
        white-space: nowrap;
      }

      .dots3-but.grey{
        background-color: #EAEAEA;
        left: 0;
      }
    }

    .header-controls{
      align-items: center;
      justify-content: space-between;

      .contacts{
        img{
          width: $contactsDiameter;
          height: $contactsDiameter;
          margin-right: 5px;
          border-radius: 50%;
        }

        div{
          border-radius: 15px;
          font-size: 14px;
        }
      }

      .communication {
        margin-left: 15px;
      }

      button{
        height: $contactsDiameter;
        @include offButtonEffects;
        border-radius: 15px;
        font-size: 14px;
        cursor: pointer;
      }

      .share{
        font-size: 14px;
        width: 67px;
        background: #EAEAEA;
      }

      .chat{
        border-radius: 15px;
        align-items: center;
        justify-content: center;
        color: #FFC200;
        background-color: #FFF8DD;
        width: 81px;
        margin-left: 17px;
      &:before{
         content: url('../assets/img/Combined Shape@1x.svg');
         margin-right: 5px;
       }
      }
    }

  }

  .navigation{
    padding-left: 25px;
    height: 35px;
    padding-top: 20px;

    a{
      text-decoration: none;
      color: #131313;
      opacity: 0.7;
      margin-right: 27px;
      font-size: 16px;

      &.active-item{
        opacity: 1;
        font-weight: 900;
        border-bottom: 2px solid #FFC200;
        /*border-bottom: yellow;*/
      }
    }
  }

  @media screen and (max-width: 800px) {
    .header-title .wrap h2 {
      font-size: 28px;
    }
    header{
      padding-top: 5px;
      padding-left: 70px;
      width: 100vw;
      flex-wrap: wrap;
      justify-content: space-around;

      .header-title{
        width: 100vw;
        margin-bottom: 10px;

        #burger{
          display: block;
          margin-right: 10px;
        }
      }
    }
    .navigation a{
      margin-right: 20px;
    }
  }

</style>
