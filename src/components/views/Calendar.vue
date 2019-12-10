<template lang="pug">
  div
    img(:src="comingImg")
</template>

<script lang="ts">

export default {
  name: 'Calendar',
  data() {
    return {
      comingImg: '/assets/img/coming-soon.png',
    };
  },
};
</script>

<style lang="scss" scoped>

  img{
    height: 100%;
  }

</style>
