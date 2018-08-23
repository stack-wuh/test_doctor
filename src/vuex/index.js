import $http from '../utils/axios'
export const state = {
  dialogVisible:false,
  dialogForm:{},
  isShowLoading:false,
  form:{},
  search:{} , 
  tableRow:{},
  choose:'',
  departmentList:[],
  roleList:[]
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
  }
}

export const getters = {
  formatDepList(state){
    return state.departmentList
  },
  formatRoleList(state){
    return state.roleList
  }
}