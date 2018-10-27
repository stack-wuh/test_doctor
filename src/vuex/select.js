import $http from '@/utils/axios'

const state = {
  department:[],
}

const mutations = {
  setDepartmentList(state, {params}){
    state.department = params
  }
}

const actions = {
  /**
   * 系统管理 -- 部门管理 -- select
   * department: Array
   */
  getSysDepartList({commit}, {search = {}}){
    return new Promise((resolve, reject) => {
      $http.post('department/getdepDrop.do', search, res => {
        commit('setDepartmentList', {params: res.data})
        return resolve(res)
      })
    })
  }
}

const getters = {

}

export default {
  state, mutations, actions, getters
}