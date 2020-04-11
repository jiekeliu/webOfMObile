<template>
    <div class="add-log-page-main">
      <scroll-content class="logPageMain"
                      ref="scrollRef"
                      @pullingUpDoing="mat1"
                      @bsPosition="mat2"
      >

        <div>
          <van-form >
            <van-field
              v-model="logTitle"
              label="日志标题"
              placeholder="请输入日志标题"
              :rules="[{ required: true, message: '请填写日志标题' }]"
            />

            <van-field
              readonly
              clickable
              name="datetimePicker"
              :value="timeValue"
              label="时间选择"
              placeholder="点击选择时间"
              @click="showPicker = true"
              :rules="[{ required: true, message: '请选择具体时间' }]"
            />
            <van-field
              v-model="logMassage"
              rows="10"
              autosize
              label=""
              type="textarea"
              placeholder="请输入日志内容"
              show-word-limit
              :rules="[{ required: true, message: '内容不能为空' }]"
            />

          </van-form>
        </div>
      </scroll-content>
      <div class="submitBtn">
        <van-button block type="primary" @click="onSubmit">
          提交
        </van-button>
      </div>

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
    </div>
</template>

<script>

    import {addLog} from "../../../network/logPageData";
    import ScrollContent from "common/scroll/ScrollContent";

    import Vue from 'vue';
    import { Form } from 'vant';
    import { Field } from 'vant';
    import { Popup } from 'vant';
    import { DatetimePicker } from 'vant';
    import { Button } from 'vant';
    import { Dialog } from 'vant';

    Vue.use(Button);
    Vue.use(DatetimePicker);
    Vue.use(Popup);
    Vue.use(Field);
    Vue.use(Form);

    export default {
        name: "AddLogPageMain",
      components:{
          ScrollContent,
      },
        data() {
          return {
            logTitle:'', //日志标题
            timeValue: '',//日志时间
            logMassage:'', //日志内容
            showPicker: false, //时间选择器显示控制
            minDate: new Date(2020, 0, 1), //时间选择器初始化最低时间
            maxDate: new Date(2025, 10, 1), //时间选择器初始化最高时间
            currentDate: new Date() , //初始化日历,
            butStatus:false
          };
        },
        methods: {
          mat1(){

          },

          mat2(){

          },

          // 时间选择器点击确定按钮时触发的方法
          onConfirm(time) {
            let y = time.getFullYear()
            let m = time.getMonth()+1
            let d = time.getDate()
            let newTime = y+"-"+m+"-"+d
            this.timeValue = newTime
            this.showPicker = false;
          },
          // 表单提交函数
          onSubmit() {
            if (this.logTitle =='' ){
              return
            }
            if (this.timeValue =='' ){
              return
            }
            if (this.logMassage =='' ){
              return
            }
            addLog(this.logTitle,this.timeValue,this.logMassage).then(res=>{
              console.log(res.data)
              if (res.data.code === 0){

                Dialog.alert({
                  message: res.data.msg
                }).then(() => {
                  this.logTitle = ''
                  this.timeValue = ''
                  this.logMassage = ''
                });

              }else  if (res.data.code === 1){

                Dialog.alert({
                  message: res.data.msg
                }).then(() => {
                  this.logTitle = ''
                  this.timeValue = ''
                  this.logMassage = ''
                  this.$router.back()
                });

              }
            })
          },
        },
    }
</script>

<style scoped>
  .add-log-page-main{
    /*width: 100%;*/
    /*overflow: hidden;*/
    /*position: absolute;*/
    /*top: 50px;*/
    /*bottom: 70px;*/
    /*left: 0;*/
    /*right: 0;*/
  }
  .submitBtn{
    margin: 0px;
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
  }
</style>
