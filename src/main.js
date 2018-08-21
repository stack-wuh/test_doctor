import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/utils/element'
import '../src/assets/style/base.scss'
import '../src/assets/style/el-base.scss'
import '../src/assets/style/font/iconfont.css'
import $http from '../src/utils/axios'
import {_g} from '../src/utils/global'


window.$route = router
window.$store = store
window._g = _g
Vue.prototype.$http = $http
Vue.config.productionTip = false

window.rootPath = '/car_doctor'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
