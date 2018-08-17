export const state = {
  dialogVisible:false,
  dialogForm:{},
  isShowLoading:false,
}

export const mutations = {
  handleOpenDialog(state,params){
    state.dialogVisible = true
  },
  handlehideDialog(state,params){
    state.dialogVisible = false
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