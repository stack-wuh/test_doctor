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
  getCouponStore({commit, rootState, dispatch} ,{path ,search, currPageNo = 1} = {}){
    let _url;
    switch(path){
      case '奖品卡券管理' : _url = 'coupon/getCouponList.do', search = {...rootState.search, search, currPageNo}, dispatch('getCouponList') 
        break;
      case '抽奖模板设置' : _url = 'lottery/carLotteryTemplateList.do', search = {...rootState.search, search, currPageNo}
        break;
    }
    $http.post(_url, search, res => {
      commit('setCouponStore' ,{params: res.data})
    })
  },
  /**
   * 卡券管理 -- 奖品卡券管理 
   *  更新/发布
   */
  couponPraisePubAndPut({commit}, {path, form = {}, form:{receiveType, roleId}} = {}){
    form = {...form, receiveType:receiveType.toString(), roleId:roleId.toString()}
    $http.post('coupon/addCoupon.do', form, res => {

    })
  },
  /**
   * 卡券管理 -- 抽取所有模块内的表格删除事件
   * 删除(单选/多选)
   */
  couponModulesDelAndFresh({dispatch},{path, row:{id}} = {}){
    let _url = ''
    switch(path){
      case '奖品卡券管理' : _url = 'coupon/delCoupon.do'
        break;
    }
    $http.post(_url, {ids:id}, res => {
      setTimeout(()=>{
        dispatch('getCouponStore', {path})
      },1000)
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