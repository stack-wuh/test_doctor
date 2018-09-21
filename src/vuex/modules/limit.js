import $http from '../../utils/axios'
import {_g, NotNull, getObj} from '../../utils/global'
import {list} from '../../utils/menu'
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
  },

}

const mutations = {
  setLimitStore(state, {params} = {}){
    state.data = params
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
   * 过滤权限列表 -- 主导航的查看权限
   */
  formatLimitStoreByMenu(state, getters){
    let _arr = list.map((item,index) => {
      item.children && item.children.map(list => {
        getters.formatLimitStoreInit.map(ss => {
          if(ss.menuName === item.label){
            ss.subMenu.map(sc => {
              if(list.label === sc.menuName){
                let result = sc.authorityList.find(sn => sn.name === '查看').isAuth
                return {...list, isShow: result}
              }
            })
          }
        })
      })
      return item
      // getters.formatLimitStoreInit.map(list => {
      //   if(item.label === list.menuName){ 
      //     item.children.map((subItem,subIndex) =>{
      //       list.subMenu.map(subList => {
      //         if(subItem.label === subList.menuName){
      //           let _obj = subList.authorityList.find(ss => ss.name === '查看')
      //           if(!getObj(_obj, 'isAuth')){
      //            return {isShow:false, ...subItem}
      //           }else{
      //             return {isShow: true, ...subItem}
      //           }
      //         }
      //       })
      //     })
      //   }
      // })
    })[2]

    return _arr
  }
}

export default {
  state, actions, mutations, getters
}