<template>
    <div class="main-page">

        {{ intro }}

    </div>
</template>

<script>
    import {getAllintro} from "network/mainPageData";
    import {checkSession} from "common/js/commonFun";

    export default {
        name: "MainPage",
        data(){
          return{
            intro:{}
          }
        },
        created() {
            this.$store.commit("setShowTabBarTrue")
            checkSession('unameid')
            this.getData()
        },
        methods:{
            getData(){
              console.log(process.env.VUE_APP_BASE_API)
                getAllintro().then(res=>{
                    this.intro =res
                    console.log(res)
                })

            },

        }
    }
</script>

<style scoped>
  .main-page{
    overflow: hidden;
  }

</style>
