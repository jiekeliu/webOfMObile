import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

export function checkSession(key) {
    let status = $cookies.isKey(key)
    if (!status){
      window.location.replace("")
    }
}
