import $http from '../utils/axios'
export const state = {
  dialogVisible:false,
  dialogForm:{},
  isShowLoading:false,
  form:{},
  search:{
    // currPageNo:1,
  } , 
  tableRow:{},
  choose:'',
  departmentList:[],
  roleList:[],
  couponList:[],
  pushList:[],
  carTypeList:[],
}

export const mutations = {
  /**
   * 清空search表单
   */
  clearSearchForm(state){
    state.search = {}
  },
  handleOpenDialog(state,{row}){
    state.dialogVisible = true
    state.tableRow = row && JSON.parse(JSON.stringify(row))
  },
  handlehideDialog(state){
    state.dialogVisible = false
    state.tableRow = {}
  },
  showChange(state,params){
    state.isShowLoading = params
  },

  /**
   * 获取表格勾选的数组
   */
  handelSelection(state , {params} = {}){
      state.choose = params
  },

  /**
   * 保存获取的部门列表
   */
  setDepartmentList(state ,{params} = {}){
    state.departmentList = params && params
  },
  /**
   * 保存获取的角色类型列表
   */
  setRoleList(state ,{params} ={}){
    state.roleList = params && params
  },
  /**
   * 清空表单
   * 切换路由时
   * 清空form编辑表单内容
   */
  handleClear(state){
    state.form = {}
  },
  /**
   * 设置表单
   * computed 计算属性
   * 重置form 表单内容
   */
  setFormData(state, value){
    state.form = value
  },
  /**
   * 保存卡券列表 select
   */
  setCouponList(state,{params} = {}){
    state.couponList = params && params
  },
  /**
   * 设置关注消息推送内容
   * @param {*} state 
   * @param {*} param1 
   */
  setPushList(state, {params} = {}){
    state.pushList = params && params
  },
  /**
   * 保存汽车精品类别列表
   */
  setCarTypeList(state,{params} = {}){
    state.carTypeList = params && params
  } 
}

export const actions = {
  /**
   * 配合指令 v-loading
   * 输出 isShowloading
   * @param {*} param0 
   * @param {*} params 
   */
  changeShowLoading({commit},params){
    commit('showChange',params.show)
  } ,

  /**
   * dialog对话框
   * 异步close 
   */
  asyncHideDialog({commit}){
    commit('handlehideDialog')
  },

  /**
   * select 上级部门列表
   */
  getDepartmentList({commit}){
    $http.post('department/getSuperiorList.do', {} ,res => {
      commit('setDepartmentList' ,{params:res.data})
    })
  },

  /**
   * seelct 角色类型列表
   */
  getRoleList({commit}){
    $http.post('roleBackend/getRoleDrop.do' ,{} ,res => {
      commit('setRoleList' ,{params:res.data})
    })
  },
  /**
   * 清空form表单
   */
  clearForm({commit}){
    commit('handleClear')
  },
  /**
   * select  获取卡券列表
   */
  getCouponList({commit}){
    $http.post('platform/getCouponDrop.do', {}, res => {
      commit('setCouponList', {params: res.data})
    })
  },
  /**
   * 消息关注后推送
   * @param {*} param0 
   * @param {*} param1 
   */
  getPushList({commit}, {pushType} = {}){
    $http.post('platform/getPushContent.do', {pushType}, res => {
      commit('setPushList', {params:res.data})
    })
  },

  /**
   * 汽车精品管理 -- 精品类别列表 -- select
   */
  getCarTypeList({commit}){
    $http.post('quality/qualityTypeDrop.do', {}, res => {
      commit('setCarTypeList', {params: res.data})
    })
  }
}

export const getters = {
  formatDepList(state){
    return state.departmentList
  },
  formatRoleList(state){
    return state.roleList
  },
  formatCouponList(state){
    return state.couponList
  },
  formatPushList(state){
    return state.pushList
  },
  formatCarTypeList(state){
    return state.carTypeList
  }
}