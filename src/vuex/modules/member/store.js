import $http from '../../../utils/axios'
import {_g, NotNull } from '../../../utils/global'
const state = {
  list:[],
  total:0,
  currentPage:1,
  tempArr1:[],
  tempObj: {
    isShowDialog: false,
    data:[],
    list:[],
    text:'',
  }
}

const actions = {
  /**
   * 获取会员模块全部的表格内容
   */
  getMemberStore({commit, rootState, dispatch}, {path, search, currPageNo = 1} = {}){
    let _url = ''
    switch(path){
      case '会员列表' : _url = 'vipList/init.do', search = {
        realName:'',
        phone:'',
        grade:'',
        sex:'',
        state:'',
        userName:'',
        plateNum:'',
        carModel:'',
        startCreateTime:'',
        endCreateTime:'',
        minIntegral:'',
        maxIntegral:''
        , ...rootState.search, ...search, currPageNo}, 
        dispatch('getMemberList')
        dispatch('getCounselorList')
        dispatch('getCounselorUpKeepList')
        dispatch('getCounselorInSuranceList')
        break;
      case '积分管理' : _url = 'detail/getIntegrals.do', search = {
          ...rootState.search, 
          ...search, 
          currPageNo, 
        }, dispatch('getMemberList')
        break;
      case '充值明细' : _url = "detail/getRecharge.do", search = {
          ...rootState.search, 
          ...search,
          currPageNo,
          rechargeType: (rootState.search.rechargeType) && (rootState.search.rechargeType === '线上' ? 0 : rootState.search.rechargeType === '线下' ? 1 : 2)
        }
        break;
      case '消费明细' : _url = 'detail/getConsumerDetails.do', search = {
        ...rootState.search, 
        ...search, 
        currPageNo,
      }
       break;
      case '会员充值' : _url = 'detail/selectUserMsgVo.do', search = {
        ...rootState.search,
      }
        break;
      case '车辆管理' : _url = 'vehicle/init.do', search = {
        ...rootState.search,
        currPageNo,
      }
        break;
    }
    $http.post(_url, NotNull(search), res => {
      switch(path){
        case '积分管理' : return commit('setMemberStore', {params: res.data.info, tempArr1: res.data.businessType || []})
        case '充值明细' : return commit('setMemberStore', {params: res.data.info, tempArr1: res.data.payWay || []})
        case '消费明细' : return commit('setMemberStore', {params: res.data.info, tempArr1: res.data.list2 || []})
        case '会员充值' : return commit('setMemberInfo', {params: res.data})
        default : commit('setMemberStore', {params: res.data})
      }
    })
  },

  /**
   * 会员管理模块
   * 会员列表 
   * 编辑/新增会员信息
   */
  memberInfoPubAndPut({dispatch}, {path, form, form:{
    id,
    userId,
    realName,
    phone,
    sex,
    birthday,
    vehicleId,
    plateNum,
    carModel,
    upkeepEmployeeId,
    safeEmployeeId,
    renewEmployeeId,
    insuranceStart,
    lastMaintainTime,
    maintainIntervalKm,
    memberId,
    integral,
    money,
    brokerage,
    consultantId1,
    consultantId2,
    consultantId3,
    upkeepId,
    safeId,
    renewId,
  }} = {}){
    return new Promise((resolve, reject) => {
      $http.post('vipList/insertOrUpdate.do', {
        userId,
        realName,
        phone,
        sex,
        birthday,
        vehicleId,
        plateNum,
        carModel,
        upkeepEmployeeId,
        safeEmployeeId,
        renewEmployeeId,
        insuranceStart,
        lastMaintainTime,
        maintainIntervalKm,
        memberId,
        integral,
        money,
        brokerage,
        consultantId1,
        consultantId2,
        consultantId3,
        upkeepId,
        safeId,
        renewId,
      }, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 会员管理模块
   * 会员列表
   * 导入数据
   */
  memberInfoImport({commit,dispatch}, {path, form, form:{fileName} = {}}){
    if(form.fileName.length){
      form.fileName = form.fileName.toString()
    }else{
      _g.toastMsg({
        type:'error',
        msg:'请选择文件之后再提交'
      })
      return
    }
    return new Promise((resolve,reject) => {
      $http.post('vipList/imports.do', form, res => {
        setTimeout(()=>{
          dispatch('handleDialogWithImport',{visible:false})
          return resolve()
        },1000)
      })
    })
  },

  /**
   * 会员管理 -- 分配顾问
   */
  memberPostCounselor({commit, rootState}, {form} = {}){
   return new Promise((resolve, reject)=>{
    $http.post('vipList/changeEmployee.do', form, res => {
      return resolve(res)
    })
   }) 
  },
  /**
   * 会员管理 -- 添加顾问
   */
  memberAddCounselor({commit, rootState}, {choose, text, path}){
    commit('setMemberAddCounselorData', {choose, path, text, rootState})
  },

  /**
   * 会员管理 -- 车辆管理 -- 会员卡
   */
  memberCouponComm({commit}, {search} = {}){
    return new Promise((resolve,reject) => {
      $http.post('vehicle/getPlateNum.do', search, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 保存会员卡信息
   */
  memberCouponCommPutAndFresh({dispatch}, {path, form:{
    realName,
    sex,
    birthday,
    phone,
    afterServiceId,
    createTimes,
    afterServiceRoleId,
    id
  }} = {}){
    return new Promise((resolve, reject) => {
      $http.post('vehicle/save.do', {
        realName,
        sex,
        birthday,
        phone,
        afterServiceId,
        createTimes,
        afterServiceRoleId,
        id
      }, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 会员管理 -- 会员卡管理 -- 查看用户卡券
   */
  memberCardList({dispatch}, {id} = {}){
    return new Promise((resolve, reject) => {
      $http.post('vehicle/selectCoupon.do', {id}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 会员管理 -- 车辆管理 -- 车辆查询
   */
  memberCarComm({commit}, {search} = {}){
    return new Promise((resolve, reject) => {
      $http.post('vehicle/selectVehicle.do', search, res => {
        return resolve(res)
      })
    })
  },
  memberCarCommPut({commit}, {form, form:{
    id,
    carModel,
    plateNum,
    frameNum,
    engineNum,
    InsuranceStarts,
    lastMaintainTimes,
    firstBoardTimes,
    lastMaintainKm,
    maintainIntervalKm,
  }} = {}){
    return new Promise((resolve, reject)=> {
      $http.post('vehicle/updateVehicle.do', {
        id,
        carModel,
        plateNum,
        frameNum,
        engineNum,
        InsuranceStarts,
        lastMaintainTimes,
        firstBoardTimes,
        lastMaintainKm,
        maintainIntervalKm,
      }, res => {
          return resolve(res)
      })
    }) 
  },
  /**
   * 会员管理 -- 会员充值 -- 精确查询会员信息
   */
  memberRecharge({commit, rootState}, {form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('detail/selectUserMsgVo.do', rootState.search, res => {
        commit('setSelectUserMsg', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 会员管理 -- 会员充值 -- 充值
   */
  memberRechargeDo({commit}, {form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('detail/realPay.do', {...form, ids:form.ids.toString()}, res => {
        return resolve(res)
      })
    })
  },
}

const mutations = {
  /**
   * 
   * @param {*} state 
   * @param {*} params
   * @param {*} tempArr1 临时变量,用来存储后台data数据源中的下拉框数据  
   */
  setMemberStore(state,{params:{list, total, pageNum}, tempArr1} = {}){
    state.list = list
    state.total = total
    state.currentPage = pageNum
    state.tempArr1 = tempArr1 && Object.values(tempArr1) && Object.values(tempArr1).map(item => { return {label: item, value: item}})
  },
  setMemberAddCounselorData(state, {text, choose, rootState} = {}){
    let sublist = []
    choose.split(',').map(item => {
      state.list.map(list => {
        if(item == list.id){
          sublist = [...sublist, list]
        }
      })
    })
    state.tempObj = {
      isShowDialog : true,
      data: sublist,
      list:text === '分配保养顾问' ? rootState.upKeepList : text === '分配保险顾问' ? rootState.inSuranceList : rootState.renewList,
      text
    }
  },
  clearMemberAddCounselor(state){
    state.tempObj = {
      isShowDialog: false,
      data: [],
      list: [],
      text:'',
    }
  },
  handleDelMemberItem(state, {index} = {}){
    state.tempObj.data.splice(index, 1)
  },
  /**
   * 临时处理一下会员充值页的 会员信息
   * @param {*} state 
   * @param {*} param1 
   */
  setSelectUserMsg(state, {params} = {}){
    state.tempObj.data = params
  },

  setMemberInfo(state, {params} = {}){
    state.tempObj.data = params
  },
  clearTempObj(state){
    state.tempObj.data = []
  }
}

const getters = {
  memberStore: state => ({path} = {}) => {
    return state.list.map(item => {
      switch(path){
        case '积分管理' : return {...item, typeText: item.type == 1 ? '增加' : '减少'}
        case '会员列表' : return {...item, sexText: item.sex == 0 ? '女' : '男'}
        case '车辆管理' : return {...item, insuranceStateText: item.insuranceState == 1 ? '已到期' : '未到期',maintainStateText: item.maintainState == 1 ? '已到期' : '未到期'}
        default : return {...item}
      }
    })
  },
}

export default {
  state, mutations, actions, getters
}