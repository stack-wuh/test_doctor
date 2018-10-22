import $http from '../../../utils/axios'
import {_g, NotNull} from '../../../utils/global'

const state = {
  data: [],
  total: 0,
  currPageNo: 1,
}

const mutations = {
  setSellingStore(state, {params}){
    state.data = params && params.list
    state.total = params && params.total
    state.currPageNo = params && params.pageNo
  }
}

const actions = {
  getSellingStore({commit, rootState, dispatch}, {path, search, currPageNo = 1}){
    let _url = null
    switch(path){
      case '' : _url = '', search = {...search}
    }
    return new Promise((resolve, reject) => {
      $http.post(_url, search, res => {
        commit('setSellingStore', {params: res.data})
        return resolve(res)
      })
    })
  }
}

const getters = {
  sellingStoreFormat: (state) => ({path}) => {
    return state.data && state.data.map(item => {
      if(path === ''){
        return {...item}
      }else{
        return {...item}
      }
    })
  }
}

export default {
  state, mutations, actions, getters
}