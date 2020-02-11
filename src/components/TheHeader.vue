<template lang="pug">
  .header-wrapper.flex
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
       :class="{'active-item': activeRoute === route.path}") {{route.name}}
</template>

<script lang="ts">
import {
  Component, Vue, Watch,
} from 'vue-property-decorator';

import * as cont1 from '@/assets/img/cont1.png';
import * as cont2 from '@/assets/img/cont2.jpg';
import * as cont3 from '@/assets/img/cont3.jpg';

const contacts = [cont1, cont2, cont3];


@Component
export default class TheHeader extends Vue {
  // @Prop() burgerIco!: string;

  @Watch('$route')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRouteChange(route: any) {
    this.activeRoute = route.fullPath;
  }

  activeRoute = '';

  contacts = contacts;

  mounted() {
    this.activeRoute = this.$route.fullPath;
  }
}
</script>

<style lang="scss" scoped>

  .header-wrapper {
    box-sizing: border-box;
    flex-direction: column;
    min-height: $headerHeight;
    max-height: $headerHeight;
    justify-content: space-around;
    padding-left: 20px;
    padding-right: 20px;
    header{
      height: 100%;
      justify-content: space-between;
      box-sizing: border-box;
      .header-title{
        align-items: center;
        &:before {
          content: "";
          height: $headerLogoHeight;
          background: #FFC200 url('../assets/img/Shapes@2x.png') no-repeat;
          background-size: $headerLogoHeight $headerLogoHeight;
          min-width: $headerLogoHeight;
          min-height: $headerLogoHeight;
          border-radius: 20%;
          margin-right: 10px;
        }
        h2{
          margin: 0 10px 0 0;
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
      a{
        text-decoration: none;
        color: #131313;
        opacity: 0.7;
        margin-right: 25px;
        font-size: 16px;
        padding-bottom: 10px;
        &.active-item{
          opacity: 1;
          font-weight: 900;
          border-bottom: 2px solid #FFC200;
          /*border-bottom: yellow;*/
        }
      }
    }
  }

  @media screen and (max-width: $mobileWidth) {
    .header-wrapper{
      padding-left: 15px;
      header{
        margin-left: 20px;
        flex-wrap: wrap;
        justify-content: space-around;
        .header-title{
          justify-content: center;
          &:before {
            height: 25px;
            background-size: 25px 25px;
            min-width: 25px;
            min-height: 25px;
            margin-right: 5px;
          }
          h2 {
            margin-right: 5px;
            font-size: 23px;
          }
          .dots3-but{
            min-width: 20px;
            min-height: 20px;
            .dots3{
              width: 3px;
              height: 3px;
              &::after {
                left: 5px;
              }
              &::before{
                left: -5px;
              }
            }
          }
        }
        .header-controls{
          .communication{
            margin-left: 5px;
            .chat{
              margin-left: 5px;
            }
          }
        }
      }
      .navigation {
        justify-content: center;
        a{
          margin-right: 10px;
          font-size: 15px;
        }
      }
    }
  }

</style>
