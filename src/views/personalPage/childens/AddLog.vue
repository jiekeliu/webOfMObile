<template>
    <div class="add-log">
      <van-nav-bar
        title="添加日志"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #right>
        </template>
      </van-nav-bar>

      <add-log-page-main/>


    </div>
</template>

<script>

    import AddLogPageMain from "./AddLogPageMain";

    import Vue from 'vue';
    import { Toast } from 'vant';
    import { NavBar } from 'vant';
    import { Icon } from 'vant';

    Vue.use(Icon);
    Vue.use(NavBar);

    export default {
        name: "AddLog",
        components:{
          AddLogPageMain
        },
        methods:{
          onClickLeft() {
            this.$router.back()
          },

        },
    }
</script>

<style scoped>
  .add-log{
    position: relative;
    height: 100vh;
    z-index: 10;
    background-color: white;
  }

</style>
