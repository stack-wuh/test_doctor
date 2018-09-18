import $http from '../../../utils/axios'
import {_g, NotNull} from '../../../utils/global'
const state = {
  data:[],
  total:0,
  currPageNo:1
}

const actions = {
  getServerStore({commit, rootState}, {path, search, currPageNo=1} = {}){
    let _url = ''
    switch(path){
      case '养车知识分类' : _url = 'raisingBackend/raisingTypeList.do', search = {...rootState.search, ...search, currPageNo}
        break; 
      case '养车知识' : _url = 'raisingBackend/getRaisingList.do', search = {...rootState.search, currPageNo}
        break;
      case '救援服务' : _url = 'rescueBackend/getRescueList.do', search = {...rootState.search, currPageNo}
        break;
      case '意见反馈' : _url = 'feedback/init.do', search = {...rootState.search, currPageNo}
        break;
    }
    return new Promise((resolve, reject) => {
      $http.post(_url, NotNull(search), res => {
        commit('setServerStore', {params: res.data})
        return resolve(res)
      })
    })
  },

  /**
   * 抽取
   * 客户服务模块全部的删除事件
   * 删除成功之后刷新
   */
  serverModulesDelAndFresh({dispatch}, {path, row:{id}} = {}){
    let _url = ''
    switch(path){
      case '救援服务' : _url = 'rescueBackend/delRescue.do'
        break;
    }
    return new Promise((resolve,reject) => {
      $http.post(_url, {ids: id}, res => {
        setTimeout(()=>{
          dispatch('getServberStore',{path})
        },1000)
        return resolve(res)
      })
    })
  }
}
const mutations = {
  setServerStore(state, {params} = {}){
    state.data = params.list
    state.total = params.total
    state.currPageNo = params.pageNum
  },
}

const getters = {
  formatServerStore: (state,rootState,rootGetters) => ({path} = {}) => {
    return state.data.map(item => {
      if(path === '救援服务'){
        return {...item, statusText: item.status == 0 ? '未确认' : item.status == 1 ? '已确认' : '已取消'}
      }else{
        return {...item}
      }
    })
  }
}

export default {
  state, actions, mutations, getters
}