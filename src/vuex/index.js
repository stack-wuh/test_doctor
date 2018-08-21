export const state = {
  dialogVisible:false,
  dialogForm:{},
  isShowLoading:false,
  form:{},
  search:{} , 
  tableRow:{},
}

export const mutations = {
  /**
   * 清空search表单
   */
  clearSearchForm(state){
    state.search = {}
  },
  handleOpenDialog(state,{params , text , row}){
    state.dialogVisible = true
    state.tableRow = row && JSON.parse(JSON.stringify(row))
  },
  handlehideDialog(state){
    state.dialogVisible = false
    state.tableRow = {}
  },
  showChange(state,params){
    state.isShowLoading = params
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
  }
}

export const getters = {
  
}