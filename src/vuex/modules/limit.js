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
    $http.post('authorityBackend/getAuthList.do', form, res => {
      
    })  
  }
}

const mutations = {

}

const getters = {

}

export default {
  state, actions, mutations, getters
}