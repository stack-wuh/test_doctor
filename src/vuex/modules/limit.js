import $http from '../../utils/axios'
import {_g, NotNull} from '../../utils/global'
const state = {
  data:[],
}

const actions = {
  /**
   * 获取权限列表
   */
  getLimitStore({commit}, {form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('authorityBackend/getAuthList.do', form, res => {
        commit('setLimitStore', {params: res.data})
        return resolve(res)
      })  
    })
  },

  /**
   * 点击按钮, 角色授权
   */
  handleAccredit({dispatch}, {form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('authorityBackend/authSet.do', form, res => {
        setTimeout(()=>{
          dispatch('getLimitStore')
        },100)
        return resolve(res)
      })
    })
  }
}

const mutations = {
  setLimitStore(state, {params} = {}){
    state.data = params && params.map(item => {
      item.authorityMenuList.map(list => {
        list.authorityList.map(sub => {
          sub.isAuth = sub.isAuth === 1 ? true : false
        })
      })
      return {id: item.id, menuName: item.menuName, subMenu: item.authorityMenuList}
    })
  }
}

const getters = {
  formatLimitStore(state){
    console.log(state ,' this is format')
    return state.data.map(item => {
      item.authorityMenuList.map(list => {
        list.authorityList.map(sub => {
          sub.isAuth = sub.isAuth === 1 ? true : false
        })
      })
      return {id: item.id, menuName: item.menuName, subMenu: item.authorityMenuList}
    })
  }
}

export default {
  state, actions, mutations, getters
}