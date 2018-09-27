import $http from '../../../utils/axios'
import {_g, NotNull} from '../../../utils/global'
const state = {
  data:[],
  total:0,
  currentPage:1,
  tempObj:{
    isShowDialog: false,
    list:[]
  },
  tempForm:{}
}

const mutations = {
  /**
   * 卡券管理 -- 保存卡券管理下数据
   */
  setCouponStore(state,{params} = {}){
    state.data = params && params.list
    state.total = params && params.total
    state.currentPage = params && params.pageNum
  },

  setCouponAddModelWithDialog(state, {isShowDialog, list} = {}){
    state.tempObj = {
      isShowDialog,
      list: state.data
    }
  },
  /**
   * 关闭弹框但是为清除表单
   */
  clearCouponAddModel(state){
    state.tempObj = {
      isShowDialog: false,
      list: state.tempObj.list
    }
  },
  /**
   * 单纯的关闭弹框
   * @param {*} state 
   */
  hideDialog(state){
    state.tempObj.isShowDialog = false
  },
  /**
   * 保存一下 佣金提现的表单
   */
  setCouponMemberTake(state, {params} = {}){
    state.tempForm  = params
  },
  handleClearCouponMemberTake(state, rootState){
    rootState.search = {}
    state.tempForm = {}
  },
  /**
   * 处理一下抽奖模板页面的数据
   */
  setCouponModel(state, {params} = {}){
    state.tempForm = {
      form:params && params.template,
      list:params && params.pageInfo.list
    }
  }
}

const actions = {
  /*
   * 卡券管理 -- 获取卡券管理模块下所有的列表
   */
  getCouponStore({commit, rootState, dispatch} ,{path ,search, currPageNo = 1} = {}){
    let _url;
    switch(path){
      case '奖品卡券管理' : _url = 'coupon/getCouponList.do', search = {...rootState.search, search, currPageNo}
        break;
      case '抽奖模板设置' : _url = 'lottery/carLotteryTemplateList.do', search = {...rootState.search, ...search, currPageNo}
        break;
      case '编辑抽奖模板' : _url = 'lottery/getAddCarLottery.do', search = {...rootState.search, ...search, currPageNo}
        break;
      case '用户佣金提现' : _url = 'takeMoney/getUserTakeMoneny.do', search = {...rootState.search}
        break;
      case '查看领取明细' : _url = 'coupon/getTakeListByUserCouponVo.do', search = {...rootState.search, ...search, currPageNo}, dispatch('getCouponSourceList')
        break;
      case '用户佣金提现' : _url = 'takeMoney/getUserTakeMoneny.do', search = {...rootState.search, ...search, currPageNo} 
        break;
      case '用户提现记录' : _url = 'takeMoney/getUserTakeCashList.do', search = {...rootState.search, ...search, currPageNo}
        break;
      case '员工奖励' : _url = 'employeeReward/employeeRewardList.do', search = {...rootState.search, currPageNo, ...search}, dispatch('getCouponForActivity')
        break;
      case '用户卡券发放' : _url = 'coupon/grantCouponToUser.do', search = {...rootState.search, currPageNo, ...search}, dispatch('getCouponCounselor'), dispatch('getMemberList'), dispatch('getCouponList')
        break;
      case '用户卡券管理' : _url = 'coupon/getTakeListByUserCouponVo.do', search = {...rootState.search, currPageNo, ...search}, dispatch('getCouponSourceList')
        break;
      case '用户奖励' : _url = 'coupon/userCouponList.do', search = {...rootState.search, currPageNo, ...search}, dispatch('getPariseList')
        break;
    }
    $http.post(_url, NotNull(search), res => {
      commit('setCouponStore' ,{params: res.data})
    })
  },
  /**
   * 卡券管理 -- 奖品卡券管理 
   *  更新/发布
   */
  couponPraisePubAndPut({commit}, {path, form:{
    id,
    couponType,
    couponName,
    number,
    consumptionFull,
    validTill,
    receiveType,
    roleIds,
    instructions,
    couponValue,
  }} = {}){
    return new Promise((resolve, reject) => {
      $http.post('coupon/addCoupon.do', {
        id,
        couponType,
        couponName,
        number,
        consumptionFull,
        validTill,
        receiveType,
        roleIds,
        instructions,
        couponValue,
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   *  卡券管理 -- 奖品卡券管理 -- 领取明细文件上传
   */
  couponReciverList({commit}, {path, form:{fileName}} = {}){
   return new Promise((resolve, reject) => {
    $http.post('coupon/getTakeListByUserCouponVoForReport.do', {fileName: fileName.toString()}, res => {
      return resolve(res)
    })
   }) 
  },
  /**
   * 卡券管理 -- 抽奖模板 -- 编辑抽奖模板
   */
  couponPariseTake({commit, rootState}, {path, form, form:{id, data}} = {}){
    let _url = id ? 'lottery/updateCarLottery.do' : 'lottery/saveCarLotteryTemplate.do'
    return new Promise((resolve, reject) => {
      $http.post(_url, form, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 卡券管理 -- 抽奖模板 -- 获取奖品列表
   */
  couponPariseList({commit, rootState}, {search, currPageNo = 1} = {}){
    return new Promise((resolve, reject) => {
      $http.post('lottery/getAddCarLottery.do', {currPageNo, ...search}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 卡券管理 -- 抽奖模板 -- 根据id获取抽奖模板
   */
  getCouponModel({commit}, {id} = {}){
    return new Promise((resolve, reject) => {
      $http.post('lottery/getCarLotteryTemplateList.do', {id}, res => {
        // commit('setCouponModel', {params: res.data})
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
      case '抽奖模板设置' : _url = 'lottery/delCarLotteryTemplate.do'
        break;
    }
    $http.post(_url, {ids:id}, res => {
      setTimeout(()=>{
        dispatch('getCouponStore', {path})
      },1000)
    })
  },

  /**
   * 卡券管理-- 用户卡券管理 -- 导入文件
   */
  couponImportExcel({dispatch}, {path, form, form:{fileName}}){
    return new Promise((resolve, reject) => {
      $http.post('coupon/takeListByUserCouponVoForImport.do', {fileName: fileName.toString()}, res => {
        return resolve(res)
      })
    })
  },
  /**
   *卡券管理 -- 用户卡券管理 -- 核销 
   */
  couponMemberChecked({dispatch}, {path, form:{id}} = {}){
    $http.post('lottery/cancleLottery.do', {id}, res => {
      setTimeout(()=>{
        dispatch('asyncHideDialog')
        dispatch('getCouponStore', {path})
      },1000)
    })
  },

  /**
   * 卡券管理 -- 用户卡券发放 -- 推送
   */
  couponMemberSend({dispatch, commit, rootState}, {path, choose, text} = {}){
    let search = {}
    switch(text){
      case '根据选中用户推送' : search = {ids: choose}
          break;
      case '根据条件推送' : search = NotNull({...rootState.search})
          break;
      default : search = {}
    }
    $http.post('coupon/grantCoupon.do', {...search, ...rootState.tableHeader}, res => {
      dispatch('getCouponStore', {path})
      commit('clearTableHeaderForm')
    })
  },

  /**
   * 打开对话框 -- 编辑抽奖模板的添加 事件
   * 还要发起请求并且赋值
   */
  couponAddModelWithDialog({commit}, {path, search, currPageNo = 1} = {}){ 
    commit('setCouponAddModelWithDialog', {isShowDialog: true})
  },

  /**
   * 卡券管理 -- 用户佣金提现 -- 精确查询
   */
  couponMemberTake({commit, rootState}, {path, search} = {}){
    let temp = rootState.search
    for(var k in temp){
      if(temp[k] == ''){
        return 
      }
    }
    $http.post('takeMoney/getUserTakeMoneny.do', temp, res => {
      commit('setCouponMemberTake', {params: res.data})
    })
  },

  /**
   * 卡券管理 -- 用户佣金提现 -- 提现
   */
  couponMemberTakePut({dispatch}, {path, form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('takeMoney/saveTakeCash.do', form, res => {
        return resolve(res)
      })
    })
  },
    /**
   * 清除用户佣金提现的表单
   */
  clearCouponMemberTake({commit, rootState}){
    commit('handleClearCouponMemberTake', rootState)
  },
  /**
   * 员工奖励 -- 发放
   */
  couponMemberParise({dispatch}, {path, row, row:{id}} = {}){
    $http.post('employeeReward/grantEmployeeReward.do', {id}, res => {
      setTimeout(() => {
        dispatch('getCouponStore', {path})
      }, 1000);
    })
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
        case '员工奖励' : return {...item, stateText: item.status == 0 ? '未发放' : '已发放', rewardTypeText: item.rewardType == 0 ? '消费' : '分享'}
        case '用户奖励' : return {...item, couponTypeText: item.couponType == 0 ? '分享' : '消费'}
        case '用户卡券管理' : return {...item,couponTypeText: item.couponType == 0 ? '实物奖品' : '电子代金券',statesText: item.states == 0 ? '未使用' : item.states == 1 ? '已使用' : '已过期'}
        case '用户卡券发放' : return {...item,attentionStateText: item.attentionState == 0 ? '未关注' : '已关注',sexText: item.sex == 1 ? '男' : '女'}
        default : return {...item}
      }
    })
  },
  formatCouponModel: state => ({keyWord} = {}) => {
    return state.tempObj.list.map(item => {
      if(item.name === keyWord){
        return {...item}
      }
    })
  }
}

export default {
  state ,mutations ,actions ,getters
}