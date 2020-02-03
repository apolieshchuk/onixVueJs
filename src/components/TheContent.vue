<template lang="pug">
  .content-wrapper.flex
    router-view
</template>

<script>
export default {
  name: 'TheContent',
};
</script>

<style lang="scss">
  .btn-yellow {
    color: white;
    font-weight: bold;
    background: #FFCC33;
    height: 30px;
    border: 1px solid #FFC200;
    border-radius: 2px;
    min-width: 100px;
  }
  .btn-cancel {
    color: #333333;
    font-weight: bold;
    background: white;
    height: 30px;
    border: 1px solid grey;
    border-radius: 2px;
    min-width: 100px;
    margin-right: 10px;
  }
</style>

<style lang="scss" scoped>
  .content-wrapper{
    height: $contentHeight;
    width: 100%;
    background-color: #EAEAEA;
    box-sizing: border-box;
    overflow: auto;
    justify-content: center;
  }
</style>
