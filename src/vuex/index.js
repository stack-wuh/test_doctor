import $http from '../utils/axios'
export const state = {
  dialogVisible:false,
  visibleDialogWithImport:false,
  dialogForm:{},
  isShowLoading:false,
  form:{},
  search:{
    // currPageNo:1,
  } , 
  tableRow:{},
  choose:'',
  departmentList:[],
  roleList:[], // 角色列表
  couponList:[],
  pushList:[],
  carTypeList:[],
  memberList:[],
  counselorList:{},
  couponFormList:[],
  couponActivityList:[],
  upKeepList:[], // 会员列表 -- 保养顾问 -- select
  inSuranceList:[], // 会员列表 -- 保险顾问 -- select
  renewList:[], // 会员列表 -- 续保顾问 -- select
  couponSrouce:[], // 卡券来源 -- select
  sellList:[], //销售顾问
  tableHeader:{}, // 表格顶部 -- select/input 
  pariseList:[], // 用户奖励的奖励类型 -- select
  articleType:[], //养车知识文章类型 -- select
  activesList:[], //活动栏目下拉 -- select
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
  },
  /**
   * 设置导入文件dialog
   * @param {*} state 
   * @param {*} param1 
   */
  handleDialogWithImport(state, {visible} = {}){
    state.visibleDialogWithImport  = visible
  },

  /**
   * 保存会员等级列表
   */
  setMemberList(state, {params} = {}){
    state.memberList = params
  },

  /**
   * 保存顾问类型列表
   * @param {*} state 
   * @param {*} param1 
   */
  setCounselorList(state, {renewList} = {}){
    state.counselorList = {renewList}
  },
  /**
   * 处理一下保养顾问
   * @param {*} state 
   * @param {*} param1 
   */
  setCounselorUpkeepList(state, {upKeepList} = {}){
    state.upKeepList = upKeepList
  },
  /**
   * 处理一下保险顾问
   */
  setCounselorInsuranceList(state, {inSuranceList} = {}){
    state.inSuranceList = inSuranceList
  },
  /***
   * 处理一下续保顾问
   */
  setCouponrenewList(state, {renewList}){
    state.renewList = renewList
  },
  /**
   * 保存卡券来源列表
   * @param {*} state 
   * @param {*} param1 
   */
  setCouponFromList(state, {params} = {}){
    state.couponFromList = params
  },

  /**
   * 保存卡券内容 -- 活动卡券列表
   */
  setActivityList(state, {params} = {}){
    state.couponActivityList = params
  },

  /**
   * 处理一下卡券来源的下拉框数据
   */
  setCouponSourceList(state, {params} = {}){
    state.couponSrouce = params
  },

  /**
   * 处理用户卡券发放的顾问列表
   */
  setCouponCounselor(state, {params} = {}){
    state.upKeepList = params['保养顾问'].map(item => {return {label: item, value: item}})
    state.renewList = params['续保顾问'].map(item => { return {label: item, value: item}})
    state.inSuranceList = params['保险顾问'].map(item => {return {label: item, value: item}})
    state.sellList = params['销售顾问'].map(item => {return {label: item, value: item}})
  },

  /**
   * 设置表格头部 select/input change时的值
   */
  setTableHeaderForm(state, {key, value} = {}){
    state.tableHeader[key] = value
  },
  /**
   * 清除tableHeader值
   */
  clearTableHeaderForm(state){
    state.tableHeader = {}
  },
  /**
   * 处理 奖励类型 -- select
   */
  setPariseList(state, {params} = {}){
    Object.values(params).map((item,index) => {
      state.pariseList[index] =  item.map(list => {
        return {label: list, value: list}
      })
    })
  },
  /**
   * 客户服务 -- 养车知识 -- 文章分类 -- select
   */
  setArtType(state, {params} = {}){
    state.articleType = params
  },
  /**
   * 设置活动栏目 -- select
   */
  setActivesList(state, {params} = {}){
    state.activesList = params
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
  },

  /**
   * 会员等级 -- 会员等级列表 -- select
   * @param {*} param0 
   */
  getMemberList({commit}){
    $http.post('detail/commonGetMembers.do', {}, res => {
      commit('setMemberList', {params: res.data})
    })
  },

  /**
   * 会员等级 -- 获取保养顾问 -- select
   * @param {*} param0 
   */
  getCounselorUpKeepList({commit}){
    $http.post('vipList/commonGetEmployees.do', {name: '保养顾问'}, res => {
      let arr = res.data.map(item => {
        return {label: item.realName, value: item.realName, id: item.id}
      })
      commit('setCounselorUpkeepList', {upKeepList: arr})
    })
  },
  /**
   * 会员等级 -- 获取保险顾问 -- select
   * @param {*} param0 
   */
  getCounselorInSuranceList({commit}){
    $http.post('vipList/commonGetEmployees.do', {name: '保险顾问'}, res => {
      let arr = res.data.map(item => {
        return {label: item.realName, value: item.realName, id: item.id}
      })
      commit('setCounselorInsuranceList', {inSuranceList: arr})
    })
  },
  /**
   * 会员等级 -- 获取续保顾问 -- select
   * @param {*} param0 
   */
  getCounselorList({commit}){
    $http.post('vipList/commonGetEmployees.do', {name: '续保顾问'}, res => {
      let arr = res.data.map(item => {
        return {label: item.realName, value: item.realName, id: item.id}
      })
      commit('setCouponrenewList', {renewList: arr})
    })
  },
  /**
   * 获取售后顾问 --- select
   */
  getSellsList(){
    $http.post('vipList/commonGetEmployees.do', {name: '售后顾问'}, res => {
      
    })
  },
  /**
   * 卡券管理 -- 奖品卡券管理  -- 获取卡券来源 -- select
   */
  getCouponFromList({commit}){
    $http.post('coupon/couponSourceSelect.do', {}, res => {
      commit('setCouponFromList', {params: res.data})
    })
  },
  /**
   * 卡券管理 -- 用户卡券发放 -- 获取顾问列表 -- select
   */
  getCouponCounselor({commit}){
    $http.post('coupon/getGrantCouponSelectList.do', {}, res => {
      commit('setCouponCounselor', {params: res.data})
    })
  },

  /**
   * 卡券管理 -- 员工奖励 -- 活动卡券
   */
  getCouponForActivity({commit}){
    $http.post('employeeReward/activityCouponList.do', {}, res => {
      commit('setActivityList', {params: res.data})
    })
  },
  /**
   * 卡券管理 -- 用户卡券发放 -- 卡券来源 -- select
   */
  getCouponSourceList({commit}){
    $http.post('coupon/couponSourceSelect.do', {}, res => {
      commit('setCouponSourceList', {params: res.data})
    })
  },

  /**
   * 卡券管理 -- 用户奖励 -- 奖励类型 -- select
   */
  getPariseList({commit}){
    $http.post('coupon/userCouponSelect.do', {}, res => {
      commit('setPariseList', {params: res.data})
    })
  },
  /**
   * 客户服务 -- 养车知识 -- 文章分类下拉
   */
  getArtType({commit}){
    $http.post('raisingBackend/raisingTypeDrop.do', {}, res => {
      commit('setArtType', {params: res.data})
    })
  },
  getActiveList({commit}){
    $http.post('activitiesDraws/activitiesDrawsSelect.do', {}, res => {
      commit('setActivesList', {params: res.data})
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
  },
  formatMemberList(state){
    return state.memberList.map(item => {
      return {label: item.name, value: item.id}
    })
  },
  formatCouponActivityList(state){
    return state.couponActivityList.map(item => {
      return {label: item, value: item}
    })
  },
  formatCouponSrouce(state){
    return state.couponSrouce.map(item => {
      return {label: item, value: item}
    })
  },
  formatPariseList(state){
    return state.pariseList
  }
}