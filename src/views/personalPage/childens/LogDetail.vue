<template>
    <div class="log-detial">
      <van-nav-bar
        :title="detailData.ltitle"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
      />

      <scroll-content class="logPageMain"
                      ref="scrollRef"
                      @pullingUpDoing="mat1"
                      @bsPosition="mat2"
      >

        <van-panel>
          <br>
          <div v-html="detailData.ltext"></div>
        </van-panel>

      </scroll-content>

      <div class="del-btn">
        <van-button round type="info" size="small" block @click="delLog" >删除日志</van-button>
      </div>
    </div>
</template>

<script>
    import ScrollContent from "common/scroll/ScrollContent";
    import {delLogByLid} from "network/logPageData";

    import Vue from 'vue';
    import { NavBar } from 'vant';
    import { Button } from 'vant';
    import { Panel } from 'vant';
    import { Dialog } from 'vant';

    Vue.use(Panel);
    Vue.use(Button);
    Vue.use(NavBar);
    export default {
        name: "LogDetail",
        components:{
          ScrollContent,
        },
        props:{
          detailData:{
            type:Object,
            default:{}
          }
        },
        methods: {
          onClickLeft() {
            console.log('返回');
            this.$emit('clickBackBtn')
          },

          delLog(){
            Dialog.confirm({
              message: '删除的内容将不能找回，你确定删除吗？'
            }).then(() => {
              // on confirm
              delLogByLid(this.detailData.lid).then(res=>{
                Dialog.alert({
                  message: res.data.msg
                }).then(() => {
                  // on close
                  this.$router.go(0)
                });
              })

            }).catch(() => {
              // on cancel
            });
          },

          mat1(){

          },

          mat2(){

          },
      }
    }
</script>

<style scoped>
  .log-detial{
    width: 100%;
    position: relative;
    height: 100vh;
    z-index: 10;
    background-color: white;
  }
  .del-btn{
    height: 34px;
    position: absolute;
    bottom: 3px;
    left: 5px;
    right: 5px;
  }
</style>
