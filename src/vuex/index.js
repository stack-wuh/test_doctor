export const state = {
  dialogVisible:false,
  dialogForm:{}
}

export const mutations = {
  handleOpenDialog(state,params){
    state.dialogVisible = true
  },
  handlehideDialog(state,params){
    state.dialogVisible = false
  },
}

export const actions = {

}

export const getters = {
  
}