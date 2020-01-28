import Vue from 'vue';
import Component from 'vue-class-component';

// You can declare a mixin as the same style as components.
@Component
export default class MyMixin extends Vue {
  formattedDate = (date: Date) => {
    const day: string = date.getDate().toString();
    const monthNum: number = (date.getMonth() + 1);
    const month: string = monthNum < 10 ? `0${monthNum}` : monthNum.toString();
    return `${day}.${month}.${date.getFullYear()}`;
  }
}
