import $http from '@/utils/axios'

const state = {
  department:[],
  serveSettingOne: [],
  serverSetting: [],
  storeList: [],
  employeeList: [],
  sellingStore:{
    SellingStoreGoods: [],
    total: 0,
    currPageNo: 1,
  },
  sellingRecivers:{
    form: {},
    list: []
  },
  payTypeList: [],
  providerList: [],
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
  },
  /**
   * 进存销 -- 仓库管理 -- 商品列表
   */
  setSellingGoodsList(state, {params}){
    state.sellingStore.SellingStoreGoods = params && params.list
    state.sellingStore.total = params && params.total
    state.sellingStore.currPageNo = params && params.pageNum
  },
  /**
   * 进存销 -- 仓库管理 -- 仓库列表
   */
  setSellingStore(state, {params}){
    state.storeList = params
  },
  /**
   * 进存销 -- 仓库管理 -- 操作人列表下拉
   */
  setEmployeeList(state, {params}){
    state.employeeList = params
  },
  /**
   * 进存销 -- 仓库管理 -- 商品列表
   */
  setReciverGoods(state, {params}){
    state.sellingRecivers = {
      form: params.OutRepository,
      list: params.list
    }
  },
  /**
   * 进存销 -- 财务管理 -- 支付方式 -- select
   */
  setPayTypeList(state, {params}){
    state.payTypeList = params
  },
  /**
   * 进存销 -- 财务管理 -- 供应商 -- select
   */
  setProviderList(state, {params}){
    state.providerList = params
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
  },

  /**
   * 进存销 -- 仓库管理 -- 调拨发起 -- 新增/编辑 -- 获取商品列表
   * SellingStoreGoods: Array
   */
  getSellingGoodsList({commit}, {outputRepositoryId, currPageNo = 1}){
    return new Promise((resolve, reject) => {
      $http.post('repositoryOutput/getGoodsList.do', {repositoryId: outputRepositoryId, currPageNo}, res => {
        commit('setSellingGoodsList', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 进存销 -- 仓库管理 -- 调拨发起 -- 新增/编辑 -- 仓库名称 --- select
   * storeList: Array
   */
  getSellingStores({commit}){
    return new Promise((resolve, reject) => {
      $http.post('outRepository/repositorySelect.do', {}, res => {
        commit('setSellingStore', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 进存销 -- 仓库管理 -- 员工列表 -- select
   *  employeeList: Array
   */
  getEmployeeList({commit}){
    return new Promise((resolve, reject) => {
      $http.post('purchaseOrder/getEmployeeDrop.do', {}, res => {
        commit('setEmployeeList', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 进存销 -- 仓库管理 -- 调拨接收  -- 获取商品列表
   * reciverGoods: Array
   */
  getReciverGoods({commit}, {outputCode}){
    return new Promise((resolve, reject) => {
      $http.post('repositoryInput/getOutputInfo.do', {outputCode}, res => {
        commit('setReciverGoods', {params: res.data})
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 财务管理 -- 支付方式 -- select
   * payList: Array
   */
  getPayTypeList({commit}){
    return new Promise((resolve, reject) => {
      $http.post('orderSettlememt/payTypeSelect.do', {}, res => {
        commit('setPayTypeList', {params: res.data})
        return resolve(res)
      })
    })
  },
  
  /**
   * 进存销 -- 财务管理 -- 供应商 -- select
   * providerList: Array
   */
  getProviderList({commit}){
    return new Promise((resolve, reject) => {
      $http.post('purchaseOrder/getSupplierDrop.do', {}, res => {
        commit('setProviderList', {params: res.data})
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