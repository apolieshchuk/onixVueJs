<template lang="pug">
  .wrapper.flex
    router-view
</template>

<script>
export default {
  name: 'TheContent',
};
</script>

<style lang="scss" scoped>
  .wrapper{
    height: 100%;
    width: 100%;
    background-color: #EAEAEA;
    // padding: 20px 30px;
    box-sizing: border-box;
    overflow: auto;
    justify-content: center;
  }
</style>
<style lang="scss">
  .content-wrapper{
    border-radius: 5px;
    padding: 10px;
  }
</style>
