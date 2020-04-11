<template>
 <div class="wrp" ref="wrapper">
  <slot></slot>
 </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
      name: "ScrollContent",
      props:{
        //probeType属性：当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
        // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
        // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
        // 如果没有设置该值，其默认值为 0，即不派发 scroll 事件
        probeType: {
          type: Number,
          default: 3
        },
        // pullUpLoad属性：
        // 默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载
        pullUpLoad: {
          type: Boolean,
          default: true
        }
      },
      data(){
        return{
          bs: {}
        }
      },
      mounted() {
        setTimeout(this.__initScroll, 20)
      },
      methods: {
        __initScroll() {
          if (!this.$refs.wrapper) {
            return
          }
          //初始化BSscroll
          this.bs = new BScroll(this.$refs.wrapper, {
            probeType: this.probeType,
            click:true,
            pullUpLoad:this.pullUpLoad
          })

          // console.log(this.$refs)
          this.bs.on('scroll', pos=>{
            this.$emit("bsPosition",pos)
          })

          this.bs.on('pullingUp',()=>{
            this.pullUpCallBack();
          })

        },
        pullUpCallBack(){
          console.log('上拉加载');
          this.$emit('pullingUpDoing',true)
        },
        refresh() {
          this.bs && this.bs.refresh && this.bs.refresh()
        },
        finishPullUp(){
          this.bs && this.bs.finishPullUp && this.bs.finishPullUp()
        },

        toTop(x,y,sTime){
          this.bs && this.bs.scrollTo && this.bs.scrollTo(x,y,sTime)

        },
        getScrollHeight(){
          return this.bs? this.bs.y : 0
        }


      }
    }
</script>

<style scoped>
  .wrp{
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 50px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
