<template>
    <div class="problem-detail">
      <van-nav-bar
        title="问题详情"
        left-text="返回"
        right-text="我要回答"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <scroll-content class="logPageMain"
                      ref="scrollRef"
                      @pullingUpDoing="mat1"
                      @bsPosition="mat2"
      >
        <div>

          <van-panel :title="detailData.Ptext">

            <van-form @submit="submitAnswer" v-show="showAnswerArea">
              <van-field
                v-model="curAnswer"
                rows="5"
                autosize
                type="textarea"
                placeholder="问题答案"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                  提交
                </van-button>
              </div>
            </van-form>

            <van-collapse v-model="activeName" accordion>
              <div v-for="(value, index) in answerData.data" :key="index">
                <van-collapse-item  :name="parseInt(index+1)" >
                  <template #title>
                    <div>
                      {{ '答案'+parseInt(index+1) }}
                      <van-tag plain class="listSpan">{{value.Aperson}}</van-tag>
                      <van-tag plain class="listSpan">{{value.Atime}}</van-tag>
                    </div>
                  </template>

                  {{value.Atext }}

                </van-collapse-item>
              </div>
            </van-collapse>

          </van-panel>

        </div>
      </scroll-content>

      <van-tabbar v-model="active">
        <van-tabbar-item name="bj" @click="editFun" icon="edit">编辑</van-tabbar-item>
        <van-tabbar-item name="ln" icon="comment-o">浏览</van-tabbar-item>
        <van-tabbar-item name="sc" @click="delProblem" icon="delete">删除</van-tabbar-item>
      </van-tabbar>

      <van-dialog v-model="show" title="问题编辑" @confirm="submitEdit" show-cancel-button>
        <van-cell-group>
          <van-field v-model="detailData.Ptext" placeholder="问题为空" />
        </van-cell-group>
      </van-dialog>
    </div>
</template>

<script>
    import ScrollContent from "common/scroll/ScrollContent";
    import {addAnswerByPid, delProblemByPid, editProblem} from "network/problemPageData";

    import Vue from 'vue';
    import { NavBar } from 'vant';
    import { Toast } from 'vant';
    import { Panel } from 'vant';
    import { Collapse, CollapseItem } from 'vant';
    import { Tabbar, TabbarItem } from 'vant';
    import { Field } from 'vant';
    import { Dialog } from 'vant';
    import { Form } from 'vant';
    import { Button } from 'vant';

    Vue.use(Button);
    Vue.use(Form);
    Vue.use(Dialog);
    Vue.use(Field);
    Vue.use(Tabbar);
    Vue.use(TabbarItem);
    Vue.use(Collapse);
    Vue.use(CollapseItem);
    Vue.use(Panel);
    Vue.use(NavBar);
    export default {
        name: "ProblemDetail",
        props:{
          detailData:{
            type:Object,
            default:{}
          },
          answerData:{
            type:Object,
            default:{}
          }

        },
        data(){
          return{
            activeName: '0', //折叠面板相关
            active: 'ln', //tabbar
            curProblem:'', //问题复制
            show: false , //dialog弹出框控制
            curAnswer:'', //当前的答案
            showAnswerArea:false, //是否显示回答区域
          }
        },
        components:{
            ScrollContent,
            [Dialog.Component.name]: Dialog.Component
        },
        methods: {
          //提交问题答案的方法
          submitAnswer(){
            addAnswerByPid(this.detailData.Pid, this.curAnswer).then(res=>{
              if (res.data.code){
                Dialog.alert({
                  message: res.data.msg
                }).then(() => {
                  // on close
                  this.$router.go(0)
                });

              }else {
                Dialog.alert({
                  message: res.data.msg
                }).then(() => {
                  // on close
                });
              }
            })

          },
          //编辑确认时触发的事件
          submitEdit(){
            editProblem(this.detailData).then(res=>{
              if(res.data.code){
                this.$router.go(0)
              }else {
                Toast.fail('修改失败');
              }
            })
          },
          //点击删除时触发的按钮
          delProblem(){
            Dialog.confirm({
              message: '确认删除该问题？'
            }).then(() => {
              // on confirm
              delProblemByPid(this.detailData.Pid).then(res=>{
                if(res.data.code){
                  this.$router.go(0)
                }else {
                  Toast.fail('删除失败');
                }
              })
            }).catch(() => {
              // on cancel
            });
          },
          //点击编辑时触发的按钮
          editFun(){
            this.show =true
          },

          // 屏幕滑动相关方法
          mat1(){

          },

          mat2(){

          },
          // 导航栏相关方法
          onClickLeft() {
            this.$emit('clickBackBtn')
          },
          onClickRight() {
            this.showAnswerArea = ! this.showAnswerArea
          }
        },
    }
</script>

<style scoped>
  .problem-detail{
    width: 100%;
    position: relative;
    height: 100vh;
    z-index: 10;
    background-color: white;
  }
  .listSpan{
    margin: 0 3px;
  }
</style>
