/* type of icons */
import { Message } from '@/interfaces';
import * as img1 from '@/assets/img/nature-1.jpg';
import * as img2 from '@/assets/img/nature-2.jpg';
import * as img3 from '@/assets/img/nature-3.jpg';
import * as img4 from '@/assets/img/nature-4.jpg';

const okIco = 'ok-ico';
const msgIco = 'msg-ico';
const uploadIco = 'upload-ico';


/* Photo names */
export const activityPhotos = [img1, img2, img3, img4];

/* MessageObjects */
export const messageObjects: Message[] = [
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
    photos: activityPhotos,
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
    photos: [img1, img2, img3],
  },
];
