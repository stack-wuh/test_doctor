import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/utils/element'
import '../src/assets/style/base.scss'
import '../src/assets/style/el-base.scss'
import '../src/assets/style/font/iconfont.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
