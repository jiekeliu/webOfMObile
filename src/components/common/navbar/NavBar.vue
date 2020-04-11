<template>
    <div id="nav-bar">
      <div class="nav-left"><slot name="left" ></slot></div>
      <div class="nav-center"><slot name="center"></slot></div>
      <div class="nav-right"><slot name="right" ></slot></div>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
  #nav-bar{
    line-height: 42px;
    text-align: center;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .nav-left, .nav-right{
    width: 42px;
  }
  .nav-center{
    flex: 1;
  }
</style>
