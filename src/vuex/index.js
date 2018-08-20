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
    state.tableRow = row 
  },
  handlehideDialog(state,params){
    state.dialogVisible = false
    state.tableRow = {}
  },
  showChange(state,params){
    state.isShowLoading = params
  }
}

export const actions = {
  changeShowLoading({commit},params){
    commit('showChange',params.show)
  }
}

export const getters = {
  
}