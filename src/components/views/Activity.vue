<template lang="pug">
  .activity-wrapper.flex
    .messanger-wrapper.flex
      table.messanger
        //MESSAGE
        tr.message(v-for="(msg,index) in messageObjects" :key="index")
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

/* type of icons */
const okIco = 'ok-ico';
const msgIco = 'msg-ico';
const uploadIco = 'upload-ico';

/* Message interface */
interface Message{
  msg: string,
  date?: boolean; // date, sys, common
  user?: string,
  time?: string,
  ico?: string,
  photos?: any[],
}

/* Photo names */
const photos = [
  '/assets/img/nature-1.jpg',
  '/assets/img/nature-2.jpg',
  '/assets/img/nature-3.jpg',
  '/assets/img/nature-4.jpg',
];

/* MessageObjects */
const messageObjects: Message[] = [
  { msg: '17.11.2019', date: true },
  {
    msg: 'mark as done Listing on Product Hunt so that we can reach as many potential users',
    user: 'Anton Polieschuk',
    time: '12:40 PM',
    ico: okIco,
  },
  {
    msg: 'commented on Account for teams and personal in bottom style',
    user: 'Vasya Pupkin',
    time: '17:40 PM',
    ico: msgIco,
  },
  {
    msg: 'During a project build, it is necessary to evaluate the product'
    + ' design and development against project requirements and outcomes',
  },
  {
    msg: 'uploaded 4 files on An option to search in current projects or in all projects',
    user: 'Oksana Sergeevna',
    time: '19:28 PM',
    ico: uploadIco,
    photos,
  },
  {
    msg: 'feeling good! Its okey!',
    user: 'Ivan Ivanov',
    time: '19:45 PM',
    ico: okIco,
  },
  {
    msg: 'write some msg',
    user: 'Ivan Ivanov',
    time: '20:28 PM',
    ico: msgIco,
  },
  {
    msg: 'load some photo',
    user: 'Ivan Ivanov',
    time: '20:48 PM',
    ico: uploadIco,
    photos: [
      '/assets/img/nature-1.jpg',
      '/assets/img/nature-2.jpg',
      '/assets/img/nature-3.jpg'],
  },
];


@Component
export default class Activity extends Vue {
  // data
  messageObjects = messageObjects;

  // methods
  onImgClick(index:number) {
    this.$store.commit('changeClickedImg', index);
  }
}

</script>

<style lang="scss" scoped>

  .activity-wrapper{
    background-color: white;
    border-radius: 15px;
    height: 100%;
    min-width: 700px;
    padding: 5px;
  }

  .messanger-wrapper{
    overflow: auto;
    height: 100%;
    width: 100%;
  }

  .messanger {
    width: 100%;
    border-collapse: separate;
    border-spacing: 10px;

    .message {

      > td {
        @if($debug){border: 1px solid black};
      }

      .date {
        margin-top: 0;
        opacity: 0.5;
        font-size: 14px;
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
            content: url('../../../public/assets/img/Icon@3x.svg');
          }
        }

        .msg-ico {
          background-color: #FFF8DD;
          &:after {
            content: url('../../../public/assets/img/message.svg');
          }
        }

        .msg-ico {
          background-color: #FFF8DD;
          &:after {
            content: url('../../../public/assets/img/message.svg');
          }
        }

        .upload-ico {
          background-color: #E3EFFF;
          &:after {
            content: url('../../../public/assets/img/download.svg');
          }
        }
      }
      .message-content {
        font-size: 15px;
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
        font-size: 14px;
        color: #131313;
      }
    }
  }

</style>
