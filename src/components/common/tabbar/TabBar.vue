<template>
  <div id="tab-bar">

    <BarItem  link="/mainPage">
      <img slot="item-icon" src="~assets/img/tabbar/home.png">
      <img slot="item-icon-dev" src="~assets/img/tabbar/homedev.png">
      <div slot="item-text">主页</div>
    </BarItem>

    <BarItem link="/TranslationPage">
      <img slot="item-icon" src="~assets/img/tabbar/translation.png">
      <img slot="item-icon-dev" src="~assets/img//tabbar/translation-dev.png">
      <div slot="item-text">翻译</div>
    </BarItem>

    <BarItem link="/problemPage">
      <img slot="item-icon" src="~assets/img//tabbar/problem.png">
      <img slot="item-icon-dev" src="~assets/img/tabbar/problem-dev.png">
      <div slot="item-text">问题</div>
    </BarItem>

    <BarItem link="/personalPage">
      <img slot="item-icon" src="~assets/img//tabbar/mine-dev.png">
      <img slot="item-icon-dev" src="~assets/img/tabbar/mine.png">
      <div slot="item-text">个人</div>
    </BarItem>

  </div>
</template>

<script>
  import BarItem from "./BarItem";
    export default {
        name: "TabBar",
        components: {
          BarItem
      }
    }
</script>
s
<style scoped>
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 1px rgba(100,100,100,.2);
    z-index: 9;
  }
</style>
