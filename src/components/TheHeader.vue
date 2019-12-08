<template lang="pug">
  .wrapper.flex
    header.flex
      .header-title.flex
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
            :class="{'active-item':activeRoute === route.path}") {{route.name}}
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import cont1 from '../assets/img/cont1.png';
import cont2 from '../assets/img/cont2.jpg';
import cont3 from '../assets/img/cont3.jpg';

const contacts = [cont1, cont2, cont3];


@Component({
  watch: {
    $route(route) {
      this.activeRoute = route.fullPath;
    },
  },
})

export default class TheHeader extends Vue {
  activeRoute = null;

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
    padding: 30px;
    padding-bottom: 0;

    .header-title{
      align-items: center;
      h2{
        margin: 0 10px;
        font-size: 32px;
        white-space: nowrap;
      }
      .dots3-but.grey{
        background-color: #EAEAEA;
        left: 0;
      }
      &:before{
         content: "";
         background: url('../assets/img/Shapes@2x.png');
         background-size: 40px 40px;
         background-color: #FFC200;
         min-width: 40px;
         min-height: 40px;
         border-radius: 20%;
       }
    }

    .header-controls{
      align-items: center;
      justify-content: space-between;

      .contacts{
        img{
          width: $contactsDiametr;
          height: $contactsDiametr;
          margin-right: 5px;
          border-radius: 50%;
        }

        div{
          border-radius: 15px;
          font-size: 14px;
        //padding: 5px 10px;
        }
      }

      .communication {
        margin-left: 15px;
      }

      button{
        height: $contactsDiametr;
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
    padding-left: 30px;
    height: 60px;
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

</style>
