<template>
    <div class="login-page">

      <div class="cont">
        <div class="height50px"></div>
        <div class="height50px"></div>
        <div class="webIcon">
          <van-image
            round
            width="10rem"
            height="10rem"
            src="https://www.liujie006.cn/resourceLibrary/f418a90947cdc2a70db79330570cdb6c.jpg"
          />
        </div>
        <div class="height50px"></div>
        <van-form @submit="submitFun">
          <van-field
            v-model="nameValue"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="pwdValue"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div class="height50px"></div>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>

    </div>
</template>

<script>
    import {doLogin} from "../../network/LJlogin";

    import Vue from 'vue';
    import { Dialog } from 'vant';
    import { Image } from 'vant';
    import { Form } from 'vant';
    import { Field } from 'vant';
    import { Button } from 'vant';
    import { Toast } from 'vant';
    import VueCookies from 'vue-cookies'

    Vue.use(VueCookies)
    Vue.use(Toast);
    Vue.use(Button);
    Vue.use(Field);
    Vue.use(Form);
    Vue.use(Image);

    export default {
        name: "LoginPage",
        data(){
          return{
            nameValue:"",
            pwdValue:""
          }
        },
        created() {
          this.checkCookie('unameid')
        },
        methods:{
          submitFun(){
            doLogin(this.nameValue,this.pwdValue).then(res=>{
              if (res.data.code!=0){
                Toast(res.data.msg);
                this.$store.commit("setShowTabBarTrue")
                this.$router.push('/mainPage')
              }else {
                Dialog.alert({
                  message: res.data.msg
                }).then(() => {
                  // on close
                  this.nameValue = ''
                  this.pwdValue = ''
                });
              }

            })

          },

          checkCookie(key){
            let status = $cookies.isKey(key)
            if (status){
              this.$store.commit("setShowTabBarTrue")
              this.$router.push("/mainPage")
            }
          },

        },
    }
</script>

<style scoped>
  .login-page{
    width: 100%;
    position: relative;
    height: 100vh;
    z-index: 10;
    background-color: white;
  }
  .cont{
    width: 80%;
    height: 100%;
    margin: auto;
    background-color: white;
  }
  .webIcon{
    width: 10rem;
    margin: 0px auto;
  }
  .height50px{
    width: 100%;
    height: 50px;
  }
</style>
