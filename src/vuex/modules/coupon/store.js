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
      case '编辑抽奖模板' : _url = 'lottery/getAddCarLottery.do', search = {...rootState.search, search, currPageNo}
        break;
      case '用户佣金提现' : _url = 'takeMoney/getUserTakeMoneny.do', search = {...rootState.search}
        break;
      case '查看领取明细' : _url = 'coupon/getTakeList.do', search = {...rootState.search, ...search}, dispatch('getCouponFromList')
        break;
      case '抽奖模板设置' : _url = 'lottery/carLotteryTemplateList.do', search = {...rootState.search, ...search, currPageNo}
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
  couponPraisePubAndPut({commit}, {path, form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('coupon/addCoupon.do', form, res => {
        return resolve(res)
      })
    })
  },

  /**
   *  卡券管理 -- 奖品卡券管理 -- 领取明细文件上传
   */
  couponReciverList({commit}, {path, form} = {}){
   return new Promise((resolve, reject) => {
    $http.post('coupon/getTakeListByUserCouponVoForReport.do', form, res => {
      return resolve(res)
    })
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
  },



  /**
   * 卡券管理 -- 用户佣金提现 
   * 提现
   */
  userCommUp({dispatch}, {path, row} = {}){
    console.log(path, row)
  }
}

const getters = {
  /**
   * 计算卡券管理 store数据
   */
  formatCouponStore: (state) => ({path} = {}) => {
    return state.data.map(item => {
      switch(path){
        case '奖品卡券管理' : return {...item, couponTypeText: item.couponType == 1 ? '电子代金券' : '实物奖品'}
        case '查看领取明细' : return {...item, couponTypeText: item.couponType == 1 ? '电子代金券' : '实物奖品', stateText: item.states == 0 ? '未使用' : item.states == 1 ? '已使用' : '已过期'}
        default : return {...item}
      }
    })
  }
}

export default {
  state ,mutations ,actions ,getters
}