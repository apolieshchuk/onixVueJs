<template lang="pug">
  .wrapper-coming-soon
</template>

<script lang="ts">
const comingImg = require('@/assets/img/coming-soon.png');

export default {
  name: 'Calendar',
  data() {
    return {
      comingImg,
    };
  },
};
</script>

<style lang="scss" scoped>

  .wrapper-coming-soon{
    background: url('../assets/img/coming-soon.png') no-repeat center center;
    height: 400px;
    width: 500px;
  }

</style>
