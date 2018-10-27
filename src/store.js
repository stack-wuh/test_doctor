import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {state,mutations,actions,getters} from '../src/vuex/index.js'

import TableList from './vuex/tables/list'
import SearchTypeList from './vuex/search/list'
import Button from './vuex/button/button'
import MyLog from './vuex/plugins/log'

import Sign from './vuex/modules/sign'
import System from './vuex/modules/system/store'
import Use from './vuex/modules/use/store'
import Coupon from './vuex/modules/coupon/store'
import Member from './vuex/modules/member/store'
import Log from './vuex/modules/log/store'
import Server from './vuex/modules/server/store'
import Market from './vuex/modules/market/store'
import Limit from './vuex/modules/limit'
import Statistic from './vuex/modules/statistic/store'
import Selling from './vuex/modules/selling/store'

import Select from './vuex/select'

export default new Vuex.Store({
  state ,
  mutations ,
  actions ,
  getters ,
  modules:{
    TableList, 
    SearchTypeList,
    Button,
    Sign,
    System, 
    Use,
    Coupon,
    Member,
    Log,
    Server,
    Market,
    Limit,
    Statistic,
    Selling,
    Select,
  },
  plugins:[MyLog]
})
