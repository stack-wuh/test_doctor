import $http from '../../../utils/axios'
const state = {
  data:[],
  total:0,
  currentPage:1,
}

const mutations = {
  /**
   * 卡券管理 -- 保存卡券管理下数据
   */
  setCouponStore(state,{params} = {}){
    state.data = params && params.list
    state.total = params && params.total
    state.currentPage = params && params.pageNum
  }
}

const actions = {
  /**
   * 卡券管理 -- 获取卡券管理模块下所有的列表
   */
  getCouponStore({commit} ,{path ,search} = {}){
    let _url;
    switch(path){
      case '奖品卡券管理' : _url = 'coupon/getCouponList.do'
        break;
    }
    $http.post(_url ,search ,res => {
      commit('setCouponStore' ,{params: res.data})
    })
  }
}

const getters = {
  /**
   * 计算卡券管理 store数据
   */
  formatCouponStore(state){
    return state.data
  }
}

export default {
  state ,mutations ,actions ,getters
}