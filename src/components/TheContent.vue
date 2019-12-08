<template lang="pug">
  .content-wrapper.flex
    router-view
</template>

<script>
export default {
  name: 'TheContent',
};
</script>

<style scoped>

  .content-wrapper{
    height: 100%;
    width: 100%;
    background-color: #EAEAEA;
    padding: 20px 30px;
    box-sizing: border-box;
    overflow: auto;
    justify-content: center;
  }

</style>
