<template>
  <div class="bar-item" @click="Itemclick">
    <div v-if="!isactive" ><slot name="item-icon"></slot></div>
    <div v-else ><slot name="item-icon-dev"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
    export default {
        name: "BarItem",
        props:{
          link: {
            type: String,
            required: true
          },
          activeColor:{
            type:String,
            default: 'red'
          }
        },
        data() {
          return {
            // isactive:false
          }
        },
       computed:{
         isactive(){
           // console.log(this.$route.path.indexOf(this.path))
           return this.$route.path.indexOf(this.link) !==-1
         },
         activeStyle(){
           return this.isactive ? {color: this.activeColor}:{}
         }
       },
        methods:{
          Itemclick(){
             // console.log(this.link)
            this.$router.replace(this.link)
          }
        }
    }
</script>

<style scoped>
  .bar-item{
    flex: 1;
    text-align: center;
    height: 44px;
    font-size: 12px;
    padding-top: 5px;
  }
  .bar-item img{
    height: 20px;
  }

</style>
