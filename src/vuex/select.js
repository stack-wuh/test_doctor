import $http from '@/utils/axios'

const state = {
  department:[],
  serveSettingOne: [],
  serverSetting: [],
}

const mutations = {
  /**
   * 
   */
  setDepartmentList(state, {params}){
    state.department = params
  },
  /**
   * 设置客户服务 -- 车辆检测 -- 专项检测配置
   */
  setServeCarSettingOne(state, {params}){
    state.serveSettingOne = params
  },
  /**
   * 设置 客户服务 -- 车辆检测 -- 检修项配置
   */
  setServerCarSetting(state, {params}){
    state.serverSetting = params
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
  },

  /**
   * 客户服务 -- 车辆检测 -- 专项检测配置
   * serveSettingOne: Array
   */
  getServeCarSettingOne({commit}){
    return new Promise((resolve, reject) => {
      $http.post('detection/updatePage.do', {}, res => {
        commit('setServeCarSettingOne', {params: res.data})
        return resolve(res)
      })
    })
  },
  
  /**
   * 客户服务 -- 车辆检测 -- 检修项配置
   * serverSetting: Array
   */
  getServeCarSetting({commit}){
    return new Promise((resolve, reject) => {
      $http.post('maintenanceItem/updatePage.do', {}, res => {
        commit('setServerCarSetting', {params: res.data})
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