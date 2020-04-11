<template>
    <div class="personal-page">
      <van-nav-bar
        title="个人日志"
        left-text="简历"
        fixed
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <van-icon name="plus" size="18" />
        </template>
      </van-nav-bar>

      <scroll-content class="logPageMain"
                      ref="scrollRef"
                      @pullingUpDoing="mat1"
                      @bsPosition="mat2"
      >
       <div class="main-content">
<!--        主体内容-->
         <van-field
           readonly
           clickable
           name="datetimePicker"
           :value="timeValue"
           label="时间选择"
           placeholder="点击选择时间"
           @click="showPicker = true"
         />
         <van-popup v-model="showPicker" position="bottom">
           <van-datetime-picker
             v-model="currentDate"
             type="date"
             :min-date="minDate"
             :max-date="maxDate"
             @confirm="onConfirm"
             @cancel="showPicker = false"
           />
         </van-popup>

         <!--         列表-->
         <van-cell value="详细内容"
                   :label="value.ltime"
                   :class="{greyBgcolor:curIndex === index}"
                   v-for="(value, index) in logData"
                   @click="showLogDetail(value, index)"
                   ref="index"
                   is-link>
           <template #title>
             <span class="custom-title">{{ value.ltitle}}</span>
           </template>
         </van-cell>
         <!--         列表-->
         <h2 v-show="logData.length <= 0">没有搜索到相关数据 </h2>
 <!--        主体内容-->
       </div>
      </scroll-content>

      <log-detail v-show="showDetail"
                  :detail-data="detailData"
                  @clickBackBtn = "respClickBackBtn"
      />

    </div>
</template>

<script>
    import {getAllLog, getLogByTime} from "../../network/logPageData";
    import {checkSession} from "common/js/commonFun";

    import ScrollContent from "common/scroll/ScrollContent";
    import LogDetail from "./childens/LogDetail";

    import Vue from 'vue';
    import { Toast } from 'vant';
    import { NavBar } from 'vant';
    import { Icon } from 'vant';
    import { Field } from 'vant';
    import { Popup } from 'vant';
    import { DatetimePicker } from 'vant';
    import { Cell, CellGroup } from 'vant';

    Vue.use(Cell);
    Vue.use(CellGroup);
    Vue.use(DatetimePicker);
    Vue.use(Popup);
    Vue.use(Field);
    Vue.use(Icon);
    Vue.use(NavBar);

    export default {
        name: "PersonalPage",
        components:{
          ScrollContent,
          LogDetail
        },
        data(){
          return{
            logData:{},  //日志数据
            timeValue: '',
            curIndex: 0,// 当前日志下标
            showDetail:false, //详细内容显示控制器
            detailData:{},  //详细内容
            showPicker: false,
            minDate: new Date(2020, 0, 1), //时间选择器初始化最低时间
            maxDate: new Date(2025, 10, 1), //时间选择器初始化最高时间
            currentDate: new Date()  //初始化日历
          }
        },
        created() {
          checkSession('unameid')
          this.$store.commit("setShowTabBarTrue")
        },
        mounted() {
          this.showAllLogData()
        },
        methods:{
          // 显示所有日志列表
          showAllLogData(){
            getAllLog().then(res=>{
              this.logData =res.data
              console.log(res)
            })
          },
          // 显示单个日志详细信息
          showLogDetail(value, index){
            this.curIndex = index
            this.showDetail = true
            this.detailData = value
            console.log(value)
          },
          //当详细数据组件返回按钮被点击时响应的方法
          respClickBackBtn(){
            this.showDetail = false
          },

          mat1(){

          },

          mat2(){

          },

          onConfirm(time) {
            let y = time.getFullYear()
            let m = time.getMonth()+1
            let d = time.getDate()
            let newTime = y+"-"+m+"-"+d
            this.timeValue = newTime
            this.showPicker = false;
            getLogByTime(newTime).then(res=>{
              this.logData =res.data
            })
          },

          onClickLeft() {
            Toast('返回');
          },
          onClickRight() {
            this.$router.push('/addLogPage');
          }
        },

    }
</script>

<style scoped>
  .personal-page{

  }
  .logPageMain{
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .main-content{
    width: 100%;
    min-height: 100vh;
  }

  .greyBgcolor{
    background-color: #cacaca;
  }
</style>
