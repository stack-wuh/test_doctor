import $http from '../../../utils/axios'
import {_g, NotNull} from '../../../utils/global'
const state = {
  data:[],
  list1:[], // 备用数组
  list2:[], //备用数组
  total:0,
  currentPage:1,
  temp_list:[],
}

const mutations = {
  /**
   * 设置system模块所有列表的返回值
   */
  setStoreList(state,status){ 
    state.data = status.params && status.params.list
    state.total = status.params && status.params.total
    state.currentPage = status.params && status.params.pageNum
  },

  /**
   * 设置会员卡积分规则
   * 消费返积分 
   */
  setInterConsume(state,status){
    state.list1 = status.params && status.params.data
  },
  /**
   * 设置会员卡积分规则
   * 会员卡积分规则
   */
  setCouponIntegRules(state , status){
    state.data =  status && status.params
  },
  setShareList(state, {params}){
    state.temp_list = params && params.map(item => {
      return {...item, typeText: item.type === 1 ? '套餐' : item.type === 2 ? '活动' : '卡券'}
    })
  }
}

const actions = {
  /**
   * 获取门店管理列表 , 部门管理列表 , 员工管理列表  , 关注用户列表 ， 会员卡等级设置列表
   * @param {*} param0 
   * @param {*} params 
   */
  getStoresList({commit, rootState, dispatch},{path, search, currPageNo = 1} = {}){
    let _url ;
    switch(path){
      case '门店管理' : _url = '/store/getStoreList.do' , search = {...rootState.search, currPageNo}
        break ;
      case '部门管理' : _url = '/department/getDepartmentList.do', search = {...rootState.search, currPageNo}
              dispatch('getSysDepartList',{search: {}})
        break ;
      case '员工列表' : _url = 'employee/getEmployeeList.do' , search = {...rootState.search, search, currPageNo}
        break;
      case '关注用户列表' : _url = 'user/getUserList.do', search = {...rootState.search, currPageNo}
        break;
      case '角色管理' : _url = 'roleBackend/getRoleList.do', search = {...rootState.search, currPageNo}
        break;
      case '会员卡等级设置' : _url = 'platform/getRankList.do', search = {currPageNo}
        break;
      case '会员充值设置' : _url = 'platform/getRechargeList.do', search = {currPageNo}
        break;
      case '保养提醒设置' : _url = 'platform/getRemindList.do', search = {currPageNo}
        break;
      case '自动回复配置' : _url = 'platform/getAutoResponseList.do', search = {currPageNo}
        break;
      case '保险公司' : _url = 'platform/getInsuranceList.do', search = {...rootState.search, currPageNo}
        break;
      case '快捷回复设置' : _url = 'platform/getFastReplyList.do', search = {...rootState.search, currPageNo}, dispatch('getRoleList')
        break;
    }
    $http.post(_url, NotNull(search), (res)=>{
      commit('setStoreList',{params:res.data})
      commit('handleClear')
    })
  },

  /**
   * 发布新的门店
   */
  pubStoreList({rootState}, {form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('store/addStoreInfo.do', form,(res)=>{
        return resolve(res)
      })
    })
  },

  /**
   * department 部门编辑/新增
   * dialog对话框编辑内容
   */
  depPubAndPut({commit ,dispatch},{form,path} = {}){
    $http.post('department/addDepartment.do',form,(res)=>{
      if(res.status == 0){
        setTimeout(()=>{
          commit('handlehideDialog')
          dispatch('getStoresList',{path})
        },1000)
      }
    })
  },
  /**
   * staff 员工列表 -- 更新
   * dialog对话框编辑内容
   * @param {*} param0 
   * @param {*} param1 
   */
  staffPubAndPut({commit,dispatch},{form, path} = {}){
    $http.post('employee/updateEmployee.do',NotNull(form) ,res => {
      (res.status) == 0 && (
        setTimeout(()=>{
          commit('handlehideDialog')
          dispatch('getStoresList',{path})
        },1000)
      )
    })
  },
  /**
   * staff 员工列表 -- 添加新的员工
   * dialog对话框
   */
  staffFirstPub({commit, dispatch}, {form:{
    departmentId,
    realName,
    sex,
    phone,
    birthday,
    username,
    passwrod,
    idNum,
    email,
    reservation,
    id,
    roleId,
  }, path} = {}){
    $http.post('employee/addEmployee.do', {
      departmentId,
      realName,
      sex,
      phone,
      birthday,
      username,
      passwrod,
      idNum,
      email,
      reservation,
      userId: id,
      roleId,
    }, res=>{
      setTimeout(()=>{
        dispatch('asyncHideDialog')
        dispatch('getStoresList',{path})
      },1000)
    })
  },
  /**
   * staff 员工列表 
   * 重置员工列表密码
   */
  staffResetPwd({commit,dispatch},{path , row:{id}} = {}){
    $http.post('employee/resetPasswords.do',{id},res=>{
      (res.status == 0) && (
        setTimeout(()=>{
          commit('handlehideDialog')
          dispatch('getStoresList',{path})
        },1000)
      )
    })
  },
  /**
   * staff 员工列表
   * 删除员工
   */
  staffDelAndFresh({dispatch},{path , row:{id}} = {}){
    $http.post('employee/delEmployee.do',{id} , res=>{
        setTimeout(()=>{
          dispatch('getStoresList',{path})
        },1000)
    })
  },

  /**
   * 会员卡等级设置 ： 新增 / 更新
   * dialog对话框 
   * params id: 若id存在即为更新 ， 若不存在即为新增
   */
  couponLevelPubAndPut({dispatch} , {path , form , form:{id} } = {}){
    let _url = id ? 'platform/updateMemberRank.do' : 'platform/addMemberRank.do'
    $http.post( _url , form , res=>{
      if(res.status == 0){
        setTimeout(()=>{
          dispatch('asyncHideDialog')
          dispatch('getStoresList',{path})
        },1000)
      }
    })
  },

  /**
   * 会员卡等级设置 ： 删除
   * 表格按钮点击事件
   * params ： id
   */
  couponLevelDel({dispatch} , {path , row:{id}} = {}){
    $http.post('platform/delMemberRank.do' , {id} , res => {
      if(res.status == 0){
        setTimeout(()=>{
          dispatch('asyncHideDialog')
          dispatch('getStoresList' , { path })
        },1000)
      }
    })
  },

  /**
   * 会员卡积分规则
   * 消费返积分列表
   */
  couponIntergalForConsume({commit}){
    return new Promise((resolve, reject) => {
      $http.post('platform/integralReturnList.do' , {} , res => {
        commit('setInterConsume' , {params : res})
        return resolve(res)
      })
    })
  },

  /**
   * 会员卡积分规则
   * 获取积分规则
   */
  getCouponIntegralRules({commit}){
    console.log('is loading')
    $http.post('platform/getIntegralRule.do' , {} , res =>{
      commit('setCouponIntegRules' , {params : res.data })
    })
  },
  /**
   * 发布会员卡积分规则
   * @param {*} param0 
   * @param {*} from 
   * form表单
   */
  couponPubAndPut({dispatch} , {form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('platform/addOrUpIntegralRule.do' , form, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 会员卡积分规则 -- 积分消费规则
   */
  getCouponSaleRule(){
    return new Promise((resolve, reject) => {
      $http.post('platform/getIntegralExpend.do', {}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 会员卡积分规则 -- 发布积分消费规则
   */
  couponMemberSalePub({dispatch}, {form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('platform/upIntegralExpend.do', form, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 会员卡积分规则 -- 获取积分抵现列表
   */
  getCouponMemberSells(){
    return new Promise((resolve, reject) => {
      $http.post('platform/getIntegralTonow.do', {}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 会员卡积分规则 -- 发布积分底线规则
   */
  setCouponMemberSells({dispatch}, {form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('platform/upIntegralTonow.do', form, res => {
        dispatch('getCouponMemberSells')
        return resolve(res)
      })
    })
  },
  /**
   * 会员充值设置
   * 会员充值新增/更新
   */
  memberPayPubAndPut({dispatch} , {path , form:{
    id, 
    rechargeAmount,
    donationAmount,
    giftIntegral,
    }, form} = {}){
    let _url = id ? 'platform/updateRecharge.do' : 'platform/addRecharge.do'
    let couponIds = JSON.parse(JSON.stringify(form)).couponId.toString()
    $http.post( _url , {
      rechargeAmount,
      donationAmount,
      giftIntegral,
      couponIds,
      id
    }, res => {
      setTimeout(()=>{
        dispatch('asyncHideDialog')
        dispatch('getStoresList' , {path})
      },1000)
    })
  },
  /**
   * 会员充值设置
   * 会员删除
   */
  memberDelAndFresh({dispatch} , {path , row:{id}} = {}){
    let _url = '' , search = {}
    switch(path){
      case '会员充值设置' : _url = 'platform/delRecharge.do', search = {ids:id}
        break;
      case '保养提醒设置' : _url = 'platform/delRemind.do', search = {ids:id}
        break;
      case '自动回复配置' : _url = 'platform/delAutoResponse.do', search = {ids:id}
        break;
      case '保险公司' : _url = 'platform/delInsurance.do', search = {ids:id}
        break;
      case '快捷回复设置' : _url = 'platform/delFastReply.do', search = {ids:id}
        break;
      case '角色管理' : _url = 'roleBackend/delRole.do', search = {id}
        break;
    }
    $http.post( _url, search, res => {
      setTimeout(()=>{
        dispatch('asyncHideDialog')
        dispatch('getStoresList' , {path})
      },1000)
    })
  },
  /**
   * 保养提醒设置
   * 新增 / 编辑
   */
  keepPubAndPut({dispatch} , {form , form:{id, days, content, type} , path} = {}){
    let _url = id ? 'platform/updateRemind.do' : 'platform/addRemind.do'
    $http.post( _url , {
      id,
      days,
      content,
      type,
    } , res => {
      setTimeout(()=>{
        dispatch('asyncHideDialog')
        dispatch('getStoresList' , {path})
      },1000)
    })
  },
  /**
   * 自动回复设置
   * 编辑 / 发布
   */
  replyPubAndPut({dispatch} , {form , path , form:{
    id,
    keyword,
    type,
    picture,
    content,
    status,
  }}  = {}){
    let _url = id ? 'platform/updateAutoResponse.do' : 'platform/addAutoResponse.do'
    return new Promise((resolve, reject) => {
      $http.post( _url , {
        id,
        keyword,
        type,
        picture,
        content,
        status,
      } , res => {
        return resolve(res)
      })
    })
 
  },
  /**
   * 保险公司设置
   * 新增 /编辑
   */
  companyPubAndPut({dispatch} , {form , path , form:{id}} = {}){
    let _url = id ? 'platform/updateInsurance.do' : 'platform/addInsurance.do'
    $http.post(_url ,form ,res => {
      setTimeout(()=>{
        dispatch('asyncHideDialog')
        dispatch('getStoresList' ,{path })
      },1000)
    })
  },
  /**
   * 快捷回复设置
   * 编辑/新增
   */
  fastReplyPubAndPut({dispatch} , {form , path , form:{
    id,
    roleId,
    serialNum,
    messageContent,
  }} = {}){
    let _url = id ? 'platform/updateFastReply.do' : 'platform/addFastReply.do'
    $http.post(_url ,{
      id,
      roleId,
      serialNum,
      messageContent,
    } ,res => {
      setTimeout(()=>{
        dispatch('asyncHideDialog')
        dispatch('getStoresList' ,{path })
      },1000)
    })
  },
  /**
   * 系统管理 -- 角色管理
   * 新增 / 编辑
   */
  RolePubAndPut({dispatch} , {form , path, form:{id}} = {}){
    let _url = id ? 'roleBackend/updateRole.do' : 'roleBackend/addRole.do'
    $http.post(_url ,NotNull(form) ,res => {
      setTimeout(()=>{
        dispatch('asyncHideDialog')
        dispatch('getStoresList' ,{path})
      },1000)
    })
  },
  /**
   * 系统管理 -- 关注后消息推送
   */
  pushPubAndPut({dispatch}, {form, path, form:{id}} = {}){
    let list = {}
    form.forEach(item => {
      list[item.prop] = item.value
      if(item.pushType != 0){
        list.typeId = item.pushType
      }
    })
    console.log(form, id)

    $http.post('platform/addMessagePush.do', list, res => {

    })
  },
  /**
   * 系统管理 -- 获取关注后消息推送内容
   */
  getPushInfo({commit}){
    $http.post('platform/getMessagePush.do', {}, res => {
      commit('setCouponIntegRules', {params:res.data})
    })
  },
  /**
   * 系统管理 -- 切换状态
   */
  handleChangeState({commit},{row:{id, state, status},path} = {}){
    let _url = ''
    switch(path){
      case '部门管理' : _url = 'department/addDepartment.do' 
        break;
      case '员工列表' : _url = 'employee/bannedEmployee.do'
        break;
      case '自动回复配置' : _url = 'platform/updateAutoResponse.do'
        break;
      case '配置项目提成' : _url = 'commissionBack/upProjectCom.do'
        break;
    }
    $http.post(_url, {id, state, status})
  },
  /**
   * 系统管理 -- 平台设置 -- 获取分享列表
   */
  getShareList({commit}){
    return new Promise((resolve, reject) => {
      $http.post('platform/getShareRuleList.do', {}, res => {
        commit('setShareList',{params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 系统管理 -- 平台管理 -- 获取消费规则列表
   */
  getSalesRuleList(){
    return new Promise((resolve, reject) => {
      $http.post('platform/getConsumeRuleList.do', {}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 系统管理 -- 平台管理 -- 分享与消费奖励 -- 用户分享
   */
  userSharePubAndFresh({dispatch}, {form, form:{id}} = {}){
    let _url = id ? 'platform/updateShareRule.do' : 'platform/addShareRule.do'
    return new Promise((resolve, reject) => {
      $http.post(_url, form, res => {
        setTimeout(()=>{
          dispatch('getShareList')
          dispatch('asyncHideDialog')
        },1000)
        return resolve(res)
      })
    })
  },
  /**
   * 系统管理 -- 平台管理 -- 分享与消费奖励 -- 用户消费
   */
  userShopPubAndFresh({dispatch}, {form} = {}){
    let memberId = [], commissionCoefficient = []
    let reg = /^\d$/
    form.filter(item => item.commissionCoefficient).map(ss => { 
      memberId = [...memberId, ss.id]
      commissionCoefficient =  [...commissionCoefficient ,ss.commissionCoefficient]
     })
    return new Promise((resolve, reject) => {
      $http.post('platform/addConsumeRule.do', {
        memberId: memberId.toString(),
        commissionCoefficient: commissionCoefficient.toString()
      }, res => {
        dispatch('getSalesRuleList')
      })
    })
  }
}

const getters = {
  /**
   * 获取计算之后的data,方便后面的列表过滤
   */
  formatStoreDataList(state){
    return state && state.data
  },

  formatSystemStore: state => ({path} = {}) => {
    return state.data && state.data.map(item => {
      if(path === '门店管理'){
        return {...item, typeText: item.storeType == 0 ? '集团' : item.storeType == 1 ? '4S店' : '维修店', stateText: item.state == 1 ? '正常' : '禁用'}
      }else if(path === '保养提醒设置'){
        return {...item, typeText: item.type == 0 ? '未到店' : '已到店'}
      }else if(path === '自动回复配置'){
        return {...item, typeText: item.type == 0 ? '文本' : '图文'}
      }else if(path === '角色管理'){
        return {...item, typeText: item.type === 0 ? '普通用户' : item.type === 1 ? '保养顾问' : item.type === 2 ? '续保顾问' : '保险顾问'}
      }else{
        return {...item, sexText: item.sex == 1 ? '男' : '女'}
      }
    })
  },
  /**
   * 处理消费返积分
   */
  formatInterForConsume(state ){
    return  state.list1 && state.list1.map(item => {
      return {...item , range:((item.moneyMin || 0) + '-' + (item.moneyMax || '')) }
    })
  }
}

export default  {
  state , mutations , actions , getters
}