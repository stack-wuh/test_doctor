import $http from '../../utils/axios'
import {_g, NotNull, getObj, getQueryString, throttle} from '../../utils/global'
import {list} from '../../utils/menu'
const state = {
  data:[],
  limits:[], //登陆者权限列表
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
    var startTime = localStorage.getItem('startTime'), now = +new Date()
    var authorityId = localStorage.getItem('startFormId')
    return new Promise((resolve, reject) => {
      if(now - startTime < 2000 && authorityId == form.authorityId){
        _g.toastMsg({
          type: 'error',
          msg:'请勿重复操作权限!'
        })
        return reject(new Error('no touch in time'))
      }
      $http.post('authorityBackend/authSet.do', form, res => {
        if(res.status === 0){
          localStorage.setItem('startTime', + new Date())
          localStorage.setItem('startFormId', form.authorityId)
        }
        if(res.status === 0){
          return resolve(res)
        }else{
          return reject(res)
        }
      })
    }).catch(err => {
      setTimeout(()=> {
        dispatch('getLimitStore')
      }, 500)
    })
  },

  /**
   * 按登陆者角色, 获取登陆者权限列表
   */
  getUserLimit({commit}){
    return new Promise((resolve, reject) => {
      $http.post('authorityBackend/getUserAuthList.do', {}, res => {
        commit('setUserLimitList', {params: res.data})
        return resolve(res.data)
      })
    })
  }
}

const mutations = {
  setLimitStore(state, {params} = {}){
    state.data = params
  },
  setUserLimitList(state, {params} = {}){
    state.limits = params
  }
}

const getters = {
  /**
   * 权限列表 -- 初始化
   */
  formatLimitStoreInit(state){
    return state.data.map(item => {
      return {id: item.id, menuName: item.menuName, subMenu: item.authorityMenuList}
    })
  },

  /**
   * 权限列表 -- 精确到页面按钮 
   */
  formatLimitByButton: (state) => ({menu, subMenu, child, text}) => {
    let data =  state.limits.filter(item => getQueryString(item.url).menu === menu)
    let result
    if(child){
     result = data.filter(list => getQueryString(list.url).subMenu === subMenu)
                  .filter(subList => getQueryString(subList.url).child === child)
                    .some(sub => sub.name === text)
    } else{          
      result = data.filter(list => getQueryString(list.url).subMenu === subMenu)
                            .some(sub => sub.name === text)
    }
    return result
  }
}

export default {
  state, actions, mutations, getters
}