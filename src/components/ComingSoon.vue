<template lang="pug">
  .wrapper-coming-soon.flex
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

  .wrapper-coming-soon{
    height: 100%;
    img{
      align-self: center;
      height: 550px;
      width: 650px;
    }
  }

  @media screen and (max-width: $mobileWidth) {
    .wrapper-coming-soon img {
      height: 250px;
      width: 350px;
    }
  }

</style>
