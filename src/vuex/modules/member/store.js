import $http from '../../../utils/axios'
const state = {
  list:[],
  total:0,
  currentPage:1,
}

const actions = {
  /**
   * 获取会员模块全部的表格内容
   */
  getMemberStore({commit, rootState}, {path, search, currPageNo = 1} = {}){
    let _url = ''
    switch(path){
      case '会员列表' : _url = 'vipList/init.do', search = {...rootState.search, ...search, currPageNo}
        break;
    }
    $http.post(_url, search, res => {
      commit('setMemberStore',{params: res.data})
    })
  }
}

const mutations = {
  setMemberStore(state,{params:{list, total, pageNum}} = {}){
    state.list = list
    state.total = total
    state.currentPage = pageNum
  }
}

const getters = {
  memberStore: state => {
    return state.list
  }
}

export default {
  state, mutations, actions, getters
}