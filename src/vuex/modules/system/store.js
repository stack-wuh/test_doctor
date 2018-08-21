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
      case '会员卡等级设置' : _url = 'platform/getRankList.do'
        break;
      case '会员充值设置' : _url = 'platform/getRechargeList.do'
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
    form = {...form , state:form.state === '正常' ? 1 : 0}
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
   * 
   */
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
   * 门店管理/部门管理 state过滤
   * state ： 0禁用 ， 1：正常
   */
  changeStateDataList(state,getters){ 
   return  (getters.formatStoreDataList) && (Array.isArray(getters.formatStoreDataList)) && getters.formatStoreDataList.map(item => {
     if( item.storeName || item.depName){
       return {...item , stateText:item.state == 0 ? '禁用' : '正常'}
     }else {
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