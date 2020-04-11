<template>
    <div class="problem-page">
      <van-nav-bar
        title="疑问列表"
        left-text="添加"
        fixed
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
<!--          <van-icon name="plus" size="18" />-->
        </template>
      </van-nav-bar>

      <van-search
        class="fixSearch"
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        background="#4fc08d"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch" class="searchBtn">搜索</div>
        </template>
      </van-search>

      <scroll-content class="logPageMain"
                      ref="scrollRef"
                      @pullingUpDoing="mat1"
                      @bsPosition="mat2"
      >
        <div>
          <div class="spaceDiv"></div>

          <!--         列表-->
          <van-cell value="详细内容"
                    :class="{greyBgcolor:curIndex === index}"
                    v-for="(value, index) in resData"
                    @click="showProblemDetail(value, index)"
                    ref="index"
                    is-link>
            <template #title>
              <span class="custom-title">{{ value.Ptext}}</span>
            </template>

            <template #label>
              <van-tag class="tagMagin" color="#7232dd" plain type="danger">{{ value.Ptime}}</van-tag>
              <van-tag class="tagMagin" color="#7232dd" plain type="danger">{{ value.Ptype}}</van-tag>
            </template>
          </van-cell>
          <!--         列表-->

        </div>
      </scroll-content>


      <problem-detail
        v-show="showDetail"
        :detail-data="detailData"
        :answer-data="answerData"
        @clickBackBtn = "respClickBackBtn"
      />

      <van-dialog v-model="addProblemShow" title="添加问题" @confirm="addProblem" show-cancel-button>
        <van-form >
          <van-field
            readonly
            clickable
            label="类型"
            :value="pType"
            placeholder="选择问题类型"
            @click="showPicker = true"
          />

          <van-field
            v-model="pText"
            rows="5"
            autosize
            type="textarea"
            placeholder="请输入你的疑问"
          />

        </van-form>
      </van-dialog>

      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>


    </div>
</template>

<script>
    import {getAllProblem, addProblem} from "network/problemPageData";
    import {checkSession} from "common/js/commonFun";
    import ScrollContent from "common/scroll/ScrollContent";
    import ProblemDetail from "./childens/ProblemDetail";
    import {getAnswerByPid} from "network/problemPageData";

    import Vue from 'vue';
    import { NavBar } from 'vant';
    import { Toast } from 'vant';
    import { Icon } from 'vant';
    import { Search } from 'vant';
    import { Cell, CellGroup } from 'vant';
    import { Tag } from 'vant';
    import { Picker } from 'vant';
    import { Popup } from 'vant';

    Vue.use(Popup);
    Vue.use(Picker);
    Vue.use(Tag);
    Vue.use(Cell);
    Vue.use(CellGroup);
    Vue.use(Search);
    Vue.use(Icon);
    Vue.use(Toast);
    Vue.use(NavBar);

    export default {
        name: "ProblemPage",
        data(){
          return{
            pType:'', //类型
            pText:'', //内容
            columns: ['PYTHON', 'CSS', 'JS', 'LINUX', 'PHP','情感','学习','生活','情感','其他'], //下拉框值
            searchValue:'', //搜素框关联值
            resData:{},  //所有返回数据
            curIndex: 0,// 当前问题下标
            showDetail:false, //详细内容显示控制器
            detailData:{},  //详细内容
            answerData:{},  //答案对象
            addProblemShow:false, //是否显示添加区域
            showPicker: false, //是否显示picker
          }
        },
        components:{
            ScrollContent,
            ProblemDetail,
        },
        created() {
          checkSession('unameid')
          this.$store.commit("setShowTabBarTrue")
          this.getAllProblemData()
        },
        methods:{
          //picker相关方法
          onConfirm(value) {
            this.pType = value;
            this.showPicker = false;
          },
          //下拉框相关函数
          onChange(picker, value, index) {
            Toast(`当前值：${value}, 当前索引：${index}`);
          },

          //添加问题的函数
          addProblem(){
            addProblem(this.pText, this.pType).then(res => {
              if(res.data.code){
                this.$router.go(0)
              }else {
                Toast.fail('添加失败');
              }
            })
          },
          //根据问题编号查找答案
          getAnswer(id){
            getAnswerByPid(id).then(res=>{
              this.answerData = res
            })
          },
          //当详细数据组件返回按钮被点击时响应的方法
          respClickBackBtn(){
            this.showDetail = false
          },
          // 查询详细信息
          showProblemDetail(value, index){
            this.curIndex = index
            this.showDetail = true
            this.detailData = value
            this.getAnswer(value.Pid)
          },

          // 搜索框触发时间
          onSearch(){

          },
          // 屏幕滑动相关方法
          mat1(){

          },

          mat2(){

          },
          // 导航栏相关方法
          onClickLeft() {
            this.addProblemShow=true
          },
          onClickRight() {
            Toast('按钮');
          },
          // 获取最近20条问题
          getAllProblemData(){
            getAllProblem().then(res=>{
              this.resData = res.data
            })
          },
        },
    }
</script>

<style scoped>
  .searchBtn{
    color: white;
    display: block;
  }
  .fixSearch{
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .spaceDiv{
    width: 100%;
    height: 60px;
  }

  .greyBgcolor{
    background-color: #cacaca;
  }
  .tagMagin{
    margin: 0 3px;
  }

</style>
