<template lang="pug">
  .activity-wrapper.flex
    .messanger-wrapper.flex
      table.messanger
        //MESSAGE
        tr.message(v-for="(msg,index) in store.MESSAGE_OBJECTS" :key="index")
          // If date
          template(v-if="msg.date")
            td.date(colspan="2") {{msg.msg}}
          // Else
          template(v-else)
            // icon column
            td.message-icon
              div(:class="msg.ico")
            // msg column
            td.message-content(:class='{info : !msg.user}' :colspan='[!msg.user ? 2 : 1]' )
              p {{msg.user}} {{msg.msg}}
              // photo upload
              .message-content-upload.flex(v-if="msg.photos")
                img(@click="onImgClick(index)" v-for="(photo,index) in msg.photos"
                  :key="index" :src="photo" alt="")
            //column-separator
            td.message-sep(v-if="msg.user")
            //time column
            td.message-time {{msg.time}}
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { vxm } from '@/store/store';


@Component
export default class Activity extends Vue {
  store = vxm.myStore;

  onImgClick(index: number) {
    this.store.CLICKED_IMG = index;
  }
}

</script>

<style lang="scss" scoped>

  .activity-wrapper{
    min-width: 700px;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 5px;
  }

  .messanger-wrapper{
    overflow: auto;
    width: 100%;
  }

  .messanger {
    width: 100%;
    border-collapse: separate;
    border-spacing: 10px;
    font-size: 14px;
    .message {

      > td {
        @if($debug){border: 1px solid black};
      }

      .date {
        margin-top: 0;
        opacity: 0.5;
        color: #131313;
      }

      .message-icon {
        vertical-align: top;
        @include centeringDivInside;

        > div {
          width: $messageIcoWidth;
          height: $messageIcoWidth;
          border-radius: 50%;
          @include centeringDivInside;
        }

        .ok-ico {
          background-color: #CEF9C6;
          &:after {
            content: url('../assets/img/Icon@3x.svg');
          }
        }

        .msg-ico {
          background-color: #FFF8DD;
          &:after {
            content: url('../assets/img/message.svg');
          }
        }

        .msg-ico {
          background-color: #FFF8DD;
          &:after {
            content: url('../assets/img/message.svg');
          }
        }

        .upload-ico {
          background-color: #E3EFFF;
          &:after {
            content: url('../assets/img/download.svg');
          }
        }
      }
      .message-content {
        color: #131313;
        line-height: 20px;
        min-width: 100px;
        max-width: 400px;

        &.info {
          padding: 20px;
          background: #F7F6F3;
          border-radius: 10px;
        }

        > p {
          margin: 0;
        }
        .message-content-upload {
          flex-wrap: wrap;
          justify-content: center;
          padding-top: 10px;

          > img {
            width: 100px;
            margin: 4px;
            border-radius: 8px;
          }
        }
      }
      .message-sep {
        min-width: $messageSepWidth;
      }
      .message-time {
        min-width: $messageTimeWidth;
        vertical-align: top;
        text-align: right;
        opacity: 0.7;
        color: #131313;
      }
    }
  }

  @media screen and (max-width: $mobileWidth) {
    .activity-wrapper{
      min-width: 0;
      margin-right: 5px;
      margin-left: 5px;
    }
    .messanger{
      border-spacing: 5px;
      font-size: 11px;
      .message{
        .message-sep{
          min-width: 30px;
        }
        .message-time{
          min-width: 20px;
        }
        .message-content{
          &.info{
            padding: 10px;
          }
          .message-content-upload{
            flex-wrap: wrap;
            > img {
              width: 50px;
              margin: 2px;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
</style>
