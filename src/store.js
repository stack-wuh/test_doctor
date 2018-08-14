import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {state,mutations,actions,getters} from '../src/vuex/index.js'

import TableList from './vuex/tables/list'
import SearchTypeList from './vuex/search/list'
import Button from './vuex/button/button'

export default new Vuex.Store({
  state ,
  mutations ,
  actions ,
  getters ,
  modules:{
    TableList , 
    SearchTypeList ,
    Button ,
  }
})
