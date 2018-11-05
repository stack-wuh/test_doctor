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
    formInfo: {},
  },
  sellingRecivers:{
    form: {},
    list: []
  },
  payTypeList: [],
  providerList: [],
  logisticList:[],
  sellingSale:{
    salesList:[],
    total: 0,
    currPageNo: 1,
  },
  sellingCouponList: [],
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
  },

  /**
   * 进存销 -- 财务管理 -- 物流公司 -- select
   */
  setLogisticList(state, {params}){
    state.logisticList = params
  },

  /**
   * 进存销 -- 套餐管理 -- 套餐销售 -- 销售列表
   */
  setSalesList(state, {params}){
    state.sellingSale = {
      salesList: params && params.list,
      total: params && params.total,
      currPageNo: params && params.pageNo
    }
  },

  /**
   * 进存销 -- 业务管理 -- 业务出库 
   * 获取商品列表
   */
  setSellingGoodsList1(state, {params}){
    state.sellingStore.SellingStoreGoods = params && params.goodsInfo
    state.sellingStore.formInfo = params && params.repositoryInfo
  },

  /**
   * 进存销 -- 业务管理 -- 业务出库
   * 获取商品列表
   */
  setSellingGoodsOutList(state, {params}){
    state.sellingStore.SellingStoreGoods = params
  },

  /**
   * 进存销 -- 业务结算 -- 可用卡券 -- select
   */
  setSellingCouponList(state, {params}){
    state.sellingCouponList = params
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
  getServeCarSetting({commit}, {row: {id } }){
    return new Promise((resolve, reject) => {
      $http.post('maintenanceItem/updatePage.do', {id }, res => {
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
  },

  /**
   * 进存销 -- 采购管理 -- 采购订单 -- 新增
   * 获取商品列表
   */
  getPurchaseList({commit}, {currPageNo = 1}){
    return new Promise((resolve, reject) => {
      $http.post('purchaseOrder/getGoodList.do', {currPageNo}, res => {
        commit('setSellingGoodsList', {params: res.data})
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 采购管理 -- 采购订单 -- 物流公司 -- select
   * logisticList: Array
   */
  getLogisticList({commit}){
    return new Promise((resolve, reject) => {
      $http.post('purchaseOrder/getLogisticsDrop.do', {}, res => {
        commit('setLogisticList', {params: res.data})
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 套餐管理 -- 套餐销售 -- 获取套餐列表
   * salesList: Array
   */
  getSalesList({commit}, {currPageNo = 1}){
    return new Promise((resolve, reject) => {
      $http.post('packageSale/init.do', {currPageNo}, res => {
        commit('setSalesList', {params: res.data})
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 业务管理 -- 业务退货 -- 新增
   * 获取新增商品列表
   */
  getBusinessInfo({commit}, {outRepositoryCode, currPageNo = 1}){
    return new Promise((resolve, reject) => {
      $http.post('back/getGoodsInfo.do', {outRepositoryCode, currPageNo}, res => {
        commit('setSellingGoodsList1', {params: res.data})
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 业务管理 -- 业务出库 -- 新增
   * 获取新增页内容
   */
  getBusinessOutInfo({commit}, {orderCode, repositoryId}){
    return new Promise((resolve, reject) => {
      $http.post('outRepository/getGoodsList.do', {orderCode, repositoryId}, res => {
        commit('setSellingGoodsOutList', {params: res.data})
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 业务管理-- 业务结算 -- 结算
   * 可用卡券列表 -- select
   */
  getSellingCouponList({commit}, {userId, totalMoney}){
    return new Promise((resolve, reject) => {
      $http.post('orderSettlememt/useCouponSelect.do', {
        userId, 
        totalMoney
      }, res => {
        commit('setSellingCouponList', {params: res.data})
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