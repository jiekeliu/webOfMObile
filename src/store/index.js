import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      showTabBar:false
    },
    mutations: {
    setShowTabBarFalse(state){
      state.showTabBar = false
    },

    setShowTabBarTrue(state){
      state.showTabBar = true
    },

  },
  actions: {
  },
  modules: {
  }
})
