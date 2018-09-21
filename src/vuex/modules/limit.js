import $http from '../../utils/axios'
import {_g, NotNull, getObj} from '../../utils/global'
import {list} from '../../utils/menu'
const state = {
  data:[],
  limits:[
    {
      "id":15,
      "menuId":22,
      "name":"汽车精品管理",
      "descInfo":"主导航-汽车精品管理页面是否可见",
      "url":"use/store?menu=用品管理&subMenu=汽车精品管理",
      "method":"quality/getQualityList.do",
      "type":0
    },
    {
      "id":15,
      "menuId":22,
      "name":"平台设置",
      "descInfo":"主导航-汽车精品管理页面是否可见",
      "url":"use/store?menu=用品管理&subMenu=汽车精品管理",
      "method":"quality/getQualityList.do",
      "type":0
    },
  ], //登陆者权限列表
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
   * 主导航 -- 权限 --过滤器
   */
  formatLimitStoreMenu(state){
    return list.map(item => {
      item.children && item.children.map(list => {
        // 设置二级菜单的权限可见
        state.limits.map(ll => {
          if(list.label === ll.name){
            list.isAuth = 1
          }else{
            list.isAuth = 0
          }
        })
        //设置三级菜单的权限可见
        list.children && list.children.map(subList => {
          state.limits.map(ll => {
            if(subList.label === ll.name){
              list.isAuth = 1
            }else{
              list.isAuth = 0
            }
          })
        })
      })
      return item
    })
  }
}

export default {
  state, actions, mutations, getters
}