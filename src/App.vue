<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <tab-bar v-show="this.$store.state.showTabBar"></tab-bar>
  </div>
</template>

<script>
  import TabBar from "./components/common/tabbar/TabBar";

  export default {
    name: 'App',
    components: {
      TabBar,
    },
    data(){
      return{

      }
    },
  }
</script>

<style>
  @import "assets/extraPage/css/normalize.css";
</style>
