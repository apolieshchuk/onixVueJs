<template lang="pug">
  .files-wrapper.flex
    ul Files in Activity:
      li(v-for="photo in store.ACTIVITY_PHOTOS") {{ photo }}
    p  for design contact Darya Ursol :)
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { vxm } from '@/store/store';

@Component
export default class Files extends Vue {
  store = vxm.myStore;
}
</script>

<style lang="scss" scoped>
.files-wrapper{
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  ul {
    align-self: center;
    font-weight: bold;
    font-size: 24px;
    li{
      font-weight: normal;
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
  p{
    align-self: flex-end;
    margin-right: 20px;
  }
}
</style>
