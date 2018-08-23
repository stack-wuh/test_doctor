import $http from '../../../utils/axios'
const state = {
  data:[],
  list1:[], // 备用数组
  list2:[], //备用数组
  total:0,
  currentPage:1,
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
  }
}

const actions = {
  /**
   * 获取门店管理列表 , 部门管理列表 , 员工管理列表  , 关注用户列表 ， 会员卡等级设置列表
   * @param {*} param0 
   * @param {*} params 
   */
  getStoresList({commit,rootState},{path , search} = {}){
    let _url ;
    switch(path){
      case '门店管理' : _url = '/store/getStoreList.do'
        break ;
      case '部门管理' : _url = '/department/getDepartmentList.do'
        break ;
      case '员工列表' : _url = 'employee/getEmployeeList.do' , search = {...rootState.search , search}
        break;
      case '关注用户列表' : _url = ''
        break;
      case '角色管理' : _url = 'roleBackend/getRoleList.do' 
        break;
      case '会员卡等级设置' : _url = 'platform/getRankList.do'
        break;
      case '会员充值设置' : _url = 'platform/getRechargeList.do'
        break;
      case '保养提醒设置' : _url = 'platform/getRemindList.do'
        break;
      case '自动回复配置' : _url = 'platform/getAutoResponseList.do'
        break;
      case '保险公司' : _url = 'platform/getInsuranceList.do'
        break;
      case '快捷回复设置' : _url = 'platform/getFastReplyList.do'
        break;
    }
    $http.post(_url,search,(res)=>{
      commit('setStoreList',{params:res.data})
    })
  },

  /**
   * 发布新的门店
   */
  pubStoreList({rootState}){
    $http.post('store/addStoreInfo.do',rootState.form,(res)=>{
      if(res.status == 0){
        setTimeout(()=>{
          window.$route.go(-2)
        },1000)
      }
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
   * staff 员工列表
   * dialog对话框编辑内容
   * @param {*} param0 
   * @param {*} param1 
   */
  staffPubAndPut({commit,dispatch},{form,path} = {}){
    $http.post('employee/updateEmployee.do',form,res => {
      (res.status) == 0 && (
        setTimeout(()=>{
          commit('handlehideDialog')
          dispatch('getStoresList',{path})
        },1000)
      )
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
      res.status && (
        setTimeout(()=>{
          dispatch('getStoresList',{path})
        },1000)
      )
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
    $http.post('platform/integralReturnList.do' , {} , res => {
      commit('setInterConsume' , {params : res})
    })
  },

  /**
   * 会员卡积分规则
   * 获取积分规则
   */
  getCouponIntegralRules({commit}){
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
    let list = {}
    form.forEach(item => {
      list[item.prop] = item.value
      list.id = item.id
    })
    $http.post('platform/addOrUpIntegralRule.do' , list)
  },

  /**
   * 会员充值设置
   * 会员充值新增/更新
   */
  memberPayPubAndPut({dispatch} , {form , path , form:{id}} = {}){
    let _url = id ? 'platform/updateRecharge.do' : 'platform/addRecharge.do'
    $http.post( _url , form , res => {
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
    let _url = ''
    switch(path){
      case '会员充值设置' : _url = 'platform/delRecharge.do'
        break;
      case '保养提醒设置' : _url = 'platform/delRemind.do'
        break;
      case '自动回复配置' : _url = 'platform/delAutoResponse.do'
        break;
      case '保险公司' : _url = 'platform/delInsurance.do'
        break;
      case '快捷回复设置' : _url = 'platform/delFastReply.do'
        break;
    }
    $http.post( _url, {ids:id} , res => {
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
  keepPubAndPut({dispatch} , {form , form:{id} , path} = {}){
    let _url = id ? 'platform/updateRecharge.do' : 'platform/addRemind.do'
    $http.post( _url , form , res => {
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
  replyPubAndPut({dispatch} , {form , path , form:{id}}  = {}){
    let _url = id ? 'platform/updateAutoResponse.do' : 'platform/addAutoResponse.do'
    $http.post( _url , form , res => {
      setTimeout(()=>{
        window.$route.go(-2)
      },1000)
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
  fastReplyPubAndPut({dispatch} , {form , path , form:{id}} = {}){
    let _url = id ? 'platform/updateFastReply.do' : 'platform/addFastReply.do'
    $http.post(_url ,form ,res => {
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
    $http.post(_url ,form ,res => {
      setTimeout(()=>{
        dispatch('asyncHideDialog')
        dispatch('getStoresList' ,{path})
      },1000)
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

  /**
   * 过滤数据
   * 门店管理/部门管理 / 自动回复 state过滤
   * state ： 0禁用 ， 1：正常
   */
  changeStateDataList(state,getters){ 
   return  (getters.formatStoreDataList) && (Array.isArray(getters.formatStoreDataList)) && getters.formatStoreDataList.map(item => {
     let keys = Object.keys(item)
     if( item.storeName || item.depName){  // 门店/部门过滤
       return {...item , stateText:item.state == 0 ? '禁用' : '正常'}
     }else if(keys.includes('days') && keys.includes('content') && keys.includes('type') ){  // 保养提醒过滤
       return {...item , typeText:item.type == 0 ? '未到店' : '已到店'}
     }else if(keys.includes('keyword') && keys.includes('picture')){   // 自动回复
      return {...item , typeText:item.type == 0 ? '文本' : '图文'}
     }else if(keys.includes('roleTitle') && keys.includes('type') && keys.includes('description')){
      return {...item ,typeText:item.type == 0 ? '普通用户' : item.type == 1 ? '保养顾问' : item.type == 2 ? '续保顾问' : '保险顾问'}
     }else{
       return {...item}
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