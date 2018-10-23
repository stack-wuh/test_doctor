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
  getSellingStore({commit, rootState, dispatch}, {path, search, currPageNo = 1}){
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
      case '商品设置' : _url = 'good/getGoodList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '项目分类设置' : _url = 'projectType/getProjectList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '项目设置' : _url = 'project/getProjectInfoList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '物流公司配置' : _url = 'logistics/getLogisticsList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '支付方式配置' : _url = 'payType/getPayTypeList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '库存报表' : _url = 'StorageReport/getStorageReportList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '' : _url = '', search = {...search, currPageNo, ...rootSatte.search}
        break;
    }
    return new Promise((resolve, reject) => {
      $http.post(_url, NotNull(search), res => {
        commit('setSellingStore', {params: res.data})
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
        return {...item, }
      }else if(path === '采购订单'){
        return {...item, checkStatusText: item.checkStatus === 0 ? '未通过' : '已通过', repositoryStatusText: item.repositoryStatus === 0 ? '未出库' : '已出库'}
      }else if(path === '采购入库'){
        return {...item, backStatusText: item.backStatus === 0 ? '未退货' : '已退货', payStatusText: item.payStatus === 0 ? '未结算' : '已结算', checkStatusText: item.checkStatus === 0 ? '未审核' : item.checkStatus === 1 ? '已审核' : '待审核'}
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
      }else{
        return {...item}
      }
    })
  }
}

export default {
  state, mutations, actions, getters
}