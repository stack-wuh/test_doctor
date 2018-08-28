import $http from '../../../utils/axios'
const state = {

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
      
    })
  }
}

const mutations = {

}

const getters = {

}

export default {
  state, mutations, actions, getters
}