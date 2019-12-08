<template lang="pug">
  div
    img(:src="comingImg")
</template>

<script lang="ts">

import comingImg from '../../assets/img/coming-soon.png';

export default {
  name: 'Kanban',
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
