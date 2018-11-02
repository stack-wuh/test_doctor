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
  /**
   * 抽取进销存模块内全部的get事件
   * params {path} 路由地址
   * params {search} 钩子里面的搜索条件
   * params {currPageNo} 页码 
   */
  getSellingStore({commit, rootState, dispatch}, {path, search, currPageNo = 1, query}){
    let _url = null
    switch(path){
      case '业务开单' : _url = 'bussinessOrder/getBussinessOrderList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '业务结算' : _url = 'orderSettlememt/getOrderSettlememtList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '业务出库' : _url = 'outRepository/getOutRepositoryList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '业务退货' : _url = 'back/getBackList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '套餐管理' : _url = 'packageManage/init.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '套餐销售' : _url = 'packageSale/init.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '会员套餐记录' : _url = 'packageUseInfo/init.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '采购订单' : _url = 'purchaseOrder/purchaseOrderList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '采购入库' : _url = 'storage/getStorageList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '采购退货' : _url = 'purchaseBack/purchaseBackList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '付款管理' : _url = 'pay/getPayList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '挂账还款' : _url = 'accountPay/accountPayList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '调拨发起' : _url = 'repositoryOutput/outputList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '调拨接收' : _url = 'repositoryInput/inputList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '日常盘点' : _url = 'check/getCheckList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '供应商设置' : _url = 'supplier/getSupplier.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '仓库设置' : _url = 'repository/takeRepositoryList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '商品分类设置' : _url = 'goodClassification/getGoodClassification.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '商品设置' : _url = 'good/getGoodList.do', search = {...search, currPageNo, ...rootState.search},
                        dispatch('getGoodsTypeList')
        break;
      case '项目分类设置' : _url = 'projectType/getProjectList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '项目设置' : _url = 'project/getProjectInfoList.do', search = {...search, currPageNo, ...rootState.search},
                      dispatch('getProjectsList')
        break;
      case '物流公司配置' : _url = 'logistics/getLogisticsList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '支付方式配置' : _url = 'payType/getPayTypeList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '库存报表' : _url = 'StorageReport/getStorageReportList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '出入库明细表' : _url = 'OutOrInfoDetail/OutOrInfoDetailList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '盘点明细表' : _url = 'reportManage/inventoryList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '日报月报' : _url = 'reportManage/inOutStockList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '销售统计表' : _url = 'reportManage/customerConsumptionList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '商品销售统计' : _url = 'projectSales/goodsInit.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '项目销售统计' : _url = 'projectSales/projectInit.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '采购明细表' : _url = 'reportManage/purchaseDetails.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '挂账单据明细表' : _url = 'reportManage/accountsList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '挂账还款明细表' : _url = 'reportManage/accountsList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '营业额统计表' : _url = 'reportManage/turnoverList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '收款统计' : _url = 'reportManage/gatherList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '付款统计' : _url = 'reportManage/paymentList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '会员套餐记录详情' : _url = 'packageUseInfo/detail.do', search = {id: query.id, currPageNo}
        break;
    }
    return new Promise((resolve, reject) => {
      $http.post(_url, NotNull(search), res => {
        commit('setSellingStore', {params: res.data})
        return resolve(res)
      })
    })
  },

  /**
   * 抽取进存销模块内全部的删除事件
   * @param {*} param0 
   * @param {*} param1 
   */
  sellingDelAndFresh({dispatch}, {path, row: {id }}){
    let _url = ''
    switch(path){
      case '供应商设置' : _url = 'supplier/delSupplier.do'
        break;
      case '仓库设置' : _url = 'repository/delRepository.do'
        break;
      case '商品分类设置' : _url = 'goodClassification/delGoodClassification.do'
        break;
      case '商品设置' : _url = 'good/delGood.do'
        break;
      case '项目分类设置' : _url = 'projectType/delete.do'
        break;
      case '物流公司配置' : _url = 'logistics/delete.do'
        break;
      case '支付方式配置' : _url = 'payType/delete.do'
        break;
      case '项目设置' : _url = 'project/delete.do'
        break;
      case '调拨发起' : _url = 'repositoryOutput/delOutput.do'
        break;
      case '调拨接收' : _url = 'repositoryInput/delInput.do'
        break;
      case '挂账还款' : _url = 'accountPay/delAccountPay.do'
        break;
      case '付款管理' : _url = 'pay/delPay.do'
        break;
      case '采购订单' : _url = 'purchaseOrder/delPurchaseOrder.do'
        break;
      case '套餐管理' : _url = 'packageManage/delete.do'
        break;
      case '业务退货' : _url = 'back/delete.do'
        break;
      case '业务开单' : _url = 'bussinessOrder/delete.do'
        break;
    }
    return new Promise((resolve,reject) => {
      $http.post(_url, {ids: id}, res => {
        setTimeout(()=>{
          dispatch('getSellingStore',{path})
        },1000)
        return resolve(res)
      })
    })
  },

  /**
   * 进销存 -- 平台配置管理 --- 供应商设置 -- 新增/编辑
   */
  platformProviderPub({dispatch}, {form:{
    supplierName,
    contactName,
    contactPhone,
    qqNumber,
    mainWork,
    address,
    remark,
    id,
  }, path}){
    return new Promise((resolve, reject) => {
      $http.post('supplier/saveOrUpdateSupplier.do', {
        supplierName,
        contactName,
        contactPhone,
        qqNumber,
        mainWork,
        address,
        remark,
        id,
      }, res => {
        setTimeout(()=> {
          dispatch('asyncHideDialog')
          dispatch('getSellingStore', {path })
        }, 1000)
      })
    })
  },

  /**
   * 进存销 -- 平台配置管理 -- 仓库设置 -- 新增/编辑
   */
  platformRepositoryPub({dispatch}, {form: {
    repositoryName,
    contactName,
    contactPhone,
    address,
    remark,
    id,
  }, path}){
    return new Promise((resolve, reject) => {
      $http.post('repository/saveOrUpdateRepository.do', {
        repositoryName,
        contactName,
        contactPhone,
        address,
        remark,
        id,
      }, res => {
        setTimeout(()=> {
          dispatch('asyncHideDialog')
          dispatch('getSellingStore', {path })
        }, 1000)
      })
    })
  },

  /**
   * 进存销 --- 平台配置管理 --- 商品分类设置 -- 新增/编辑
   */
  platformGoodsTypePub({dispatch}, {form: {
    goodsClassificationName,
    contactName,
    contactPhone,
    remark,
    id,
  }, path}){
    return new Promise((resolve, reject) => {
      $http.post('goodClassification/saveOrUpdateGoodClassification.do', {
        goodsClassificationName,
        contactName,
        contactPhone,
        remark,
        id,
      }, res => {
        setTimeout(()=> {
          dispatch('asyncHideDialog')
          dispatch('getSellingStore', {path })
        }, 1000)
      })
    })
  },

  /**
   * 进存销 --- 平台配置管理 --- 商品设置 -- 新增/编辑
   */
  platformGoodsPub({dispatch}, {form: {
    classificationId,
    goodsName,
    goodsUnit,
    goodsCode,
    carBrand,
    carModel,
    carType,
    takePrice,
    salePrice,
    isFastOrder,
    isShowShop,
    isShareMoney,
    isEmployeeAward,
    saleAward,
    workAward,
    id,
  }, path}){
    return new Promise((resolve, reject) => {
      $http.post('good/saveOrUpdateGood.do', {
        classificationId,
        goodsName,
        goodsUnit,
        goodsCode,
        carBrand,
        carModel,
        carType,
        takePrice,
        salePrice,
        isFastOrder,
        isShowShop,
        isShareMoney,
        isEmployeeAward,
        saleAward,
        workAward,
        id,
      }, res => {
        setTimeout(()=> {
          dispatch('asyncHideDialog')
          dispatch('getSellingStore', {path })
        }, 1000)
      })
    })
  },

  /**
   * 进存销 -- 平台配置管理 -- 商品设置 -- 导入
   */
  platformGoodsImport({dispatch}, {form: {fileName}, path}){
    return new Promise((resolve, reject) => {
      $http.post('good/import.do', {fileName: fileName.toString()}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 平台配置管理 --- 项目设置 -- 导入
   */
  platformProjectImport({dispatch}, {form: {fileName}, path}){
    return new Promise((resolve, reject) => {
      $http.post('project/import.do', {fileName: fileName.toString()}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 --- 平台配置管理 -- 项目分类设置 -- 新增/编辑
   */
  platformProjectTypePub({dispatch}, {form: {
    projectName,
    remark,
    id,
  }, path}){
    return new Promise((resolve, reject) => {
      $http.post('projectType/saveOrUpdate.do', {
        remark,
        projectName,
        id,
      }, res => {
        setTimeout(() => {
          dispatch('asyncHideDialog')
          dispatch('getSellingStore', {path })
        }, 1000)
      })
    })
  },

  /**
   * 进存销 --- 平台配偶管理 -- 物流公司 -- 新增/编辑
   */
  platformLogisiticPub({dispatch}, {form: {
    logisticsName,
    contactName,
    contactPhone,
    address,
    remark,
    id,
  }, path}){
    return new Promise((resolve, reject) => {
      $http.post('logistics/saveOrUpdate.do', {
        logisticsName,
        contactName,
        contactPhone,
        address,
        remark,
        id,
      }, res => {
        setTimeout(()=>{
          dispatch('asyncHideDialog')
          dispatch('getSellingStore', {path })
        }, 1000)
      })
    })
  },

  /**
   * 进存销 --- 平台配置管理 -- 支付方式 -- 新增/编辑
   */
  platformPayPub({dispatch}, {form: {
    payType,
    payInfo,
    remark,
    id
  }, path}){
    return new Promise((resolve, reject) => {
      $http.post('payType/saveOrUpdate.do', {
        payType,
        payInfo,
        remark,
        id
      }, res => {
        setTimeout(()=>{
          dispatch('asyncHideDialog')
          dispatch('getSellingStore', {path })
        }, 1000)
      })
    })
  },

  /**
   * 进存销 --- 平台配置管理 -- 项目配置 -- 新增/编辑
   */
  platformProjectPub({dispatch}, {form: {
    projectId,
    projectName,
    time,
    salePriceUnit,
    timePriceUnit,
    totalPrice,
    isShareMoney,
    isFastOrder,
    isEmployeeAward,
    saleAward,
    workAward,
    remark,
    id,
  }, path}){
    return new Promise((resolve, reject) => {
      $http.post('project/saveOrUpdate.do', {
        projectId,
        projectName,
        time,
        salePriceUnit,
        timePriceUnit,
        totalPrice,
        isShareMoney,
        isFastOrder,
        isEmployeeAward,
        saleAward,
        workAward,
        remark,
        id,
      }, res => {
        setTimeout(()=> {
          dispatch('asyncHideDialog')
          dispatch('getSellingStore', {path})
        }, 1000)
      })
    })
  },

  /**
   * 进存销 -- 仓库管理 -- 调拨发起 -- 新增/编辑
   */
  sellingStoreSendPost({dispatch}, {form, form:{
    id,
    outputRepositoryId,
    inputRepositoryId,
    outputDate,
    takeGoodsDate,
    employeeId,
    remark,
    status,
    data
  }}){
    let _url = form.id ? 'repositoryOutput/updateOutput.do' : 'repositoryOutput/addOutput.do'
    return new Promise((resolve, reject) => {
      $http.post(_url, {
        id,
        outputRepositoryId,
        inputRepositoryId,
        outputDate,
        takeGoodsDate,
        employeeId,
        remark,
        status,
        data
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 仓库管理 -- 调拨发起 -- 获取编辑的内容
   */
  sellingStoreSendPut({dispatch}, {id}){
    return new Promise((resolve, reject) => {
      $http.post('repositoryOutput/getOutputInfo.do', {id}, res => {
        return resolve(res)
      })
    })
  },
  
  /**
   * 进存销 -- 仓库管理 -- 调拨接收 -- 新增
   */
  sellingStoreReciverPost({dispatch}, {form:{
    outputRepositoryId,
    inputRepositoryId,
    inputDate,
    employeeId,
    remark,
    status,
    data,
    id,
  }}){
    return new Promise((resolve, reject) => {
      let _url = id ? 'repositoryInput/upInput.do' : 'repositoryInput/addInput.do'
      $http.post(_url, {
        outputRepositoryId,
        inputRepositoryId,
        inputDate,
        employeeId,
        remark,
        status,
        data,
        id
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 仓库管理-- 调拨接收 -- 获取编辑内容
   */
  sellingStoreReciverPut({dispatch}, {id}){
    return new Promise((resolve, reject) => {
      $http.post('repositoryInput/getInputInfo.do', {id}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 仓库管理 -- 日常盘点 -- 新增/编辑
   */
  sellingStoreCheckPost({dispatch}, {form:{
    repositoryId,
    employeeId,
    checkDate,
    remark,
    status,
    data,
    id
  }}){
    return new Promise((resolve, reject) => {
      let _url = id ? 'check/updatCheck.do' : 'check/addCheck.do'
      $http.post(_url, {
        repositoryId,
        employeeId,
        checkDate,
        remark,
        status,
        data,
        id
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 仓库管理 -- 日常盘点 -- 获取编辑内容
   */
  sellingStoreCheckPut({dispatch}, {id}){
    return new Promise((resolve, reject) => {
      $http.post('check/getCheckInfo.do', {id}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 财务管理 -- 挂账还款 
   *  根据收款单号获取内容
   */
  getSellingFinance({dispatch}, {payCode}){
    return new Promise((resolve, reject) => {
      $http.post('accountPay/getPayOrderInfo.do', {payCode}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 财务管理 -- 挂账还款 -- 新增
   */
  sellingStoreRefundPost({dispatch}, {form: {
    payId,
    payType,
    price,
    remark
  }}){
    return new Promise((resolve, reject) => {
      $http.post('accountPay/addAccountPay.do', {
        payId,
        payType,
        price,
        remark
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 财务管理 -- 挂账还款 -- 查看
   * 根据id获取内容
   */
  sellingStoreRefundPut({dispatch}, {id}){
    return new Promise((resolve, reject) => {
      $http.post('accountPay/accountPayInfo.do', {id}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 进存销 -- 财务管理 -- 付款管理 -- 获取新增的内容
   */
  sellingFinancePayPut({dispatch}, {storageCode}){
    return new Promise((resolve, reject) => {
      $http.post('pay/getStorageInfo.do', {storageCode}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 财务管理 -- 付款管理 -- 新增/编辑
   */
  sellingFinancePayPost({dispatch}, {
    form:{
      storageId,
      supplierId,
      payType,
      userId,
      remark,
      data,
      status,
    }
  }){
    return new Promise((resolve, reject) => {
      $http.post('pay/addPay.do', {
        storageId,
        supplierId,
        payType,
        userId,
        remark,
        data,
        status,
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 财务管理  -- 付款管理 -- 获取付款单详情
   * 根据id获取付款单详情
   */
  sellingFinancePayInfo({dispatch}, {id}){
    return new Promise((resolve, reject) => {
      $http.post('pay/getPayInfo.do', {id}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 采购管理 -- 采购订单 -- 新增/编辑
   */
  sellingFinancePost({dispatch},{form:{
    takerId,
    supplierId,
    logisticsId,
    purchaseDate,
    price,
    remark,
    data,
    status,
    id
  }}){
    return new Promise((resolve, reject) => {
      let _url = id ? 'purchaseOrder/updatePurchaseOrder.do' : 'purchaseOrder/addPurchaseOrder.do'
      $http.post(_url, {
        takerId,
        supplierId,
        logisticsId,
        purchaseDate,
        price,
        remark,
        data,
        status,
        id
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 采购管理 -- 采购订单 -- 编辑
   *  根据id获取编辑详情
   */
  getSellingFinanceOrderInfo({dispatch}, {id}){
    return new Promise((resolve, reject) => {
      $http.post('purchaseOrder/getPurchaseOrderInfo.do', {id}, res => {
        return resolve(res)
      })
    })
  },
  
  /**
   * 进存销 -- 采购管理 -- 采购入库 -- 新增
   * 根据采购订单获取新增内容
   */
  getSellingFinanceInputInfo({dispatch}, {purchaseCode}){
    return new Promise((resolve, reject) => {
      $http.post('storage/getPurchaseInfoList.do', {purchaseCode}, res =>{
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 采购管理 -- 采购入库 -- 新增
   */
  sellingFinanceInputPost({dispatch}, {form:{
    id,
    storageDate,
    supplierId,
    repositoryId,
    remark,
    status,
    data,
  }}){
    return new Promise((resolve, reject) => {
      let _url = id ? 'storage/updateStroeAndInfo.do' : 'storage/addStorage.do'
      $http.post(_url, {
        id,
        storageDate,
        supplierId,
        repositoryId,
        remark,
        status,
        data,
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 采购管理 -- 采购入库 -- 编辑
   * 根据id获取采购入库的详情
   */
  getSellingFinanceInputPutInfo({dispatch}, {id}){
    return new Promise((resolve, reject) => {
      $http.post('storage/getStroageInfo.do', {id}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 采购管理 -- 采购退货 -- 新增
   * 根据采购订单号获取新增的内容
   */
  getSellingFinanceBackPostInfo({dispatch}, {purchaseCode}){
    return new Promise((resolve, reject) => {
      $http.post('purchaseBack/getPurchaseInfo.do', {purchaseCode}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 采购管理 -- 采购退货 -- 新增/编辑
   */
  sellingFinanceBackPost({dispatch}, {form: {
    purchasId,
    backDate,
    backerId,
    repositoryId,
    remark,
    status,
    data,
    id,
  }}){
    return new Promise((resolve, reject) => {
      let _url = id ? 'purchaseBack/updatePurchaseBack.do' : 'purchaseBack/addPurchaseBack.do'
      $http.post(_url, {
        purchasId,
        backDate,
        backerId,
        repositoryId,
        remark,
        status,
        data,
        id,
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 采购管理 -- 采购退货 -- 编辑
   * 根据id获取编辑内容
   */
  getSellingFinanceBackInfo({dispatch}, {id}){
    return new Promise((resolve, reject) => {
      $http.post('purchaseBack/getPurchaseBackInfo.do', {id}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 套餐管理 -- 会员套餐记录 -- 停用
   */
  sellingMealMemberUpdate({dispatch}, {id, path}){
    return new Promise((resolve, reject) => {
      $http.post('packageUseInfo/update.do', {id}, res => {
        setTimeout(() => {
          dispatch('getSellingStore', {path})
        }, 1000)
      })
    })
  },

  /**
   * 进存销 -- 套餐管理 -- 套餐销售 -- 新增
   * 获取页面内容 -- 根据车牌或者是手机号
   */
  getSellingMealSaleInfo({dispatch}, {condition}){
    return new Promise((resolve, reject) => {
      $http.post('bussinessOrder/getUserInfo.do', {condition}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 套餐管理 -- 套餐销售 -- 新增
   */
  sellingMealSalePost({dispatch}, {form: {
    saleNo,
    userId,
    packageId,
    startDates,
    endDates,
    salerId,
    packagePrice,
    takeMoney,
    payType,
    status,
    ids,
  }}){
    return new Promise((resolve, reject) => {
      $http.post('packageSale/saveDraft.do', {
        saleNo,
        userId,
        packageId,
        startDates,
        endDates,
        salerId,
        packagePrice,
        takeMoney,
        payType,
        status,
        ids,
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 业务管理 -- 业务退货 -- 新增
   */
  sellingBusinessBackPost({dispatch}, {form:{ 
    status,
    outRepositoryCode,
    backDate,
    remark,
    OrderStatus,
    goodsData,
    outRepositoryId,
  }}){
    return new Promise((resolve, reject) => {
      $http.post('back/save.do', {
        status,
        outRepositoryCode,
        backDate,
        remark,
        OrderStatus,
        goodsData,
        outRepositoryId,
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 进存销 -- 业务管理 -- 业务出库 -- 新增/编辑
   */
  sellingBusinessOutPost({dispatch}, {form: {
    status,
    orderCode,
    repositoryId,
    outRepositoryDate,
    remark,
    goodsData,
  }}){
    return new Promise((resolve, reject) => {
      $http.post('outRepository/save.do', {
        status,
        orderCode,
        repositoryId,
        outRepositoryDate,
        remark,
        goodsData,
      }, res => {
        return resolve(res)
      })
    })
  }
}

const getters = {
  sellingStoreFormat: (state) => ({path}) => {
    return state.data && state.data.map(item => {
      if(path === '业务开单'){
        return {...item, orderStatusText: item.orderStatus === 0 ? '未支付' : '已支付', payStatusText: item.payStatus === 0 ? '未结算' : '已结算', repositoryStatusText: item.repositoryStatus === 0 ? '未出库' : '已出库', accountPayStautsText: item.accountPayStauts === 0 ? '未出账' : '已出账'}
      }else if(path === '业务结算'){
        return {...item, payStatusText: item.payStatus === 0 ? '未结算' : '已结算'}
      }else if(path === '套餐管理'){
        return {...item, packageStatusText: item.packageStatus === 0 ? '已停用' : '已启用', isShareText: item.isShare === 0 ? '否' : '是', isEmployeeAwardText: item.isEmployeeAward === 0 ? '否' :'是'}
      }else if(path === '业务出库'){
        return {...item, backStatusText: item.backStatus === 0 ? '未退货' : item.backStatus === 1 ? '部分退货' : '全部退货', checkStatusText: item.checkStatus === 0 ? '未提交' : '已提交', statusText: item.status === 0 ? '未提交' : '已提交'}
      }else if(path === '业务退货'){
        return {...item, statusText: item.status === 0 ? '未提交' : '已提交', checkStatusText: item.checkStatus === 0 ? '未提交' : '已提交'}
      }else if(path === '会员套餐记录'){
        return {...item, stateText: item.state === 0 ? '未提交' : item.state === 1 ? '已提交' : '已停用' }
      }else if(path === '会员套餐记录详情'){
        return {...item, typeText: item.type === 0 ? '商品' : '项目'}
      }else if(path === '采购订单'){
        return {...item, checkStatusText: item.checkStatus === 0 ? '未通过' : '已通过', repositoryStatusText: item.repositoryStatus === 0 ? '未出库' : '已出库'}
      }else if(path === '采购入库'){
        return {...item, backStatusText: item.backStatus === 0 ? '未退货' : '已退货', payStatusText: item.payStatus === 0 ? '未结算' : '已结算', checkStatusText: item.checkStatus === 0 ? '未审核' : item.checkStatus === 1 ? '已审核' : '待审核'}
      }else if(path === '采购退货'){
        return {...item, checkStatusText: item.checkStatus === 0 ? '不通过' : item.checkStatus === 1 ? '已通过' : '待处理'}
      }else if(path === '挂账还款'){
        return {...item, statusText: item.status === 0 ? '未通过' : '已通过'}
      }else if(path === '调拨发起'){
        return {...item, receiveStatusText: item.receiveStatus === 0 ? '在途' : item.receiveStatus === 1 ? '部分接收' : '全部接收', checkStatusText: item.checkStatus === 0 ? '未审核' : item.checkStatus === 1 ? '已通过' : '待审核'}
      }else if(path === '调拨接收'){
        return {...item, checkStatusText: item.checkStatus === 0 ? '未通过' : item.checkStatus === 1 ? '已通过' : '待审核'}
      }else if(path === '日常盘点'){
        return {...item, statusText: item.status === 0 ? '未提交' : '已提交'}
      }else if(path === '商品分类设置'){
        return {...item}
      }else if(path === '商品设置'){
        return {...item, isFastOrderText: item.isFastOrder === 0 ? '否' : '是', isShowShopText: item.isShowShop === 0 ? '否' : '是', isShareMoneyText: item.isShareMoney === 0 ? '否' : '是', isEmployeeAwardText: item.isEmployeeAward === 0 ? '否' :' 是'}
      }else if(path === '项目设置'){
        return {...item, isShareMoneyText: item.isShareMoney === 0 ? '否' : '是', isFastOrderText: item.isFastOrder === 0 ? '否' : '是', isEmployeeAwardText: item.isEmployeeAward === 0 ? '否' : '是'}
      }else if(path === '挂账单据明细表'){
        return {...item, stateText: item.state === 0 ? '未通过' : '已通过'}
      }else if(path === '挂账还款明细表'){
        return {...item, stateText:item.state === 0 ? '全部未还' : item.state === 1 ? '部分已还' : '全部已还'}
      }else if(path === '付款管理'){
        return {...item, checkStatusText: item.checkStatus === 0 ? '未通过' : '已通过'}
      }else{  
        return {...item}
      }
    })
  }
}

export default {
  state, mutations, actions, getters
}