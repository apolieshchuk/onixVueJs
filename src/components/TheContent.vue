<template lang="pug">
  .wrapper.flex
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
