<template lang="pug">
  div
    img(:src="comingImg")
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

  img{
    height: 100%;
  }

</style>
