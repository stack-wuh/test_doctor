import $http from '../../../utils/axios'
import {_g, NotNull} from '../../../utils/global'


const state = {
  data: [],
  total: 0,
  currPageNo: 1,
  info:{}, // 顶部card的data

  xAxis: [], // 图表的x
  series: [], // 图表的 data
  title: '标题', // 图表的标题

}

const mutations = {
  setStatisticStore(state, {params}){
    state.data = params && params.list
    state.total = params && params.total
    state.currPageNo = params && params.pageNo
  },

  setIntegrityInfo(state, {params}){
    state.data = params && params.list
    state.xAxis = params && params.list.map(item => {return item.item})
    state.series = params && params.list.map(item => {return (Number.parseFloat(item.integrity) * 100).toFixed(2)})
  },

  setActiveInfo(state, {params}){
    state.data = params
  },

  setChartsInfo(state, {params}){
    state.xAxis = params && params.xAxis
    state.series = params && params.series
    state.title = params && params.title
  },

  setMemberInfo(state, {params}){
    state.data = [params]
    state.info = params
  },

  setReportInfo(state, {params}){
    state.data = params
  },

  resetData(state, {params}){
    state.data = params
  },

  setUserInfo(state, {params}){
    state.data = params && params.info
    state.info = {
      userTotal: params && params['车主总数'],
      userNew: params && params['车主新增昨日'],
      userNewTotal: params && params['车主新增月累计'],
      userLose: params && params['车主流失昨日'],
      userLoseTotal: params && params['车主流失月累计']
    }
  }
}

const actions = {
  /**
   * 抽取统计分析模块内全部的get请求
   * 
   */
  getStatisticStore({commit, rootState, dispatch}, {path, search, currPageNo = 1}){
    let _url = ''
    switch(path){ 
      case '用户统计' : _url = 'statistics/userStatistics.do', search = {...search, dataType: 3, type: 1, carType: 1, ...rootState.search}
        break;
      case '车辆统计' : _url = 'statistics/carStatistics.do', search = {...search, states: 0, ...rootState.search}
        break;
      case '业务统计' : _url = 'statistics/businessStatistics.do', search = {...search, type: 1, businessType: 1, dataType: 3, ...rootState.search}
        break;
      case '活动统计' : _url = 'statistics/activeStatistics.do', search = {...search, currPageNo, type: 1, ...rootState.search}
        break;
      case '会员统计' : _url = 'statistics/memberStatistics.do', search = {...search}
        break;
      case '提成日报' : _url = 'commissionBack/comReport.do', search = {...search, currPageNo, ...rootState.search}, dispatch('getStatisticMemberList')
        break;
      case '客户资料完整度' : _url = 'statistics/userDataIntegrity.do', search = {...search, ...rootState.search, currPageNo}
        break;
      case '配置项目提成' : _url = 'commissionBack/projectComList.do', search = {...search, currPageNo, ...rootState.search }
        break;
      case '配置员工提成' : _url = 'employee/getEmployeeList.do', search = {...search, ...rootState.search, currPageNo}
        break;
    }
    return new Promise((resolve, reject) => {
      $http.post(_url, NotNull(search), res => {
        switch(path){
          case '客户资料完整度' : commit('setIntegrityInfo', {params: res.data})
            break;
          case '活动统计' : commit('setActiveInfo', {params: res.data})
            break;
          case '业务统计' : (rootState.search.dataType === 3 || rootState.search.dataType ===  undefined) ? commit('setActiveInfo', {params: res.data}) : commit('setChartsInfo', {params: res.data}) 
            break;
          case '会员统计' : commit('setMemberInfo', {params: res.data})
            break;
          case '提成日报' : commit('setReportInfo', {params: res.data})
            break;
          case '用户统计' : (rootState.search.dataType === 3 || rootState.search.dataType === undefined) ? commit('setUserInfo', {params: res.data}) : commit('setChartsInfo', {params: res.data})
            break;
          default: commit('setStatisticStore',{params:res.data})
        }
        return resolve(res)
      })
    })
  },

  /**
   * 统计分析 -- 提成日报 -- 配置项目提成
   * 新增/编辑
   */
  statisticProjectPost({dispatch}, {form: {
    coefficient,
    name,
    id
  }, path}){
    return new Promise((resolve, reject) => {
      $http.post('commissionBack/addProjectCom.do', {
        coefficient,
        name,
        id
      }, res => {
        dispatch('getStatisticStore', {path})
        res.status === 0 && setTimeout(() => {
          dispatch('asyncHideDialog')
        }) 
      })
    })
  },

  /**
   * 统计分析 -- 提成日报 -- 配置员工提成
   * 保存
   */
  statisticMemberPost({dispatch, state}){
    let _data = state.data.filter(item => item.commission).map(item => item.id).toString()
    return new Promise((resolve, reject) => {
      $http.post('commissionBack/setComEmp.do', {ids: _data}, res => {
        res.status === 0 && setTimeout(()=>{
          dispatch('getStatisticStore', {path: '配置员工提成'})
        }, 1000)
      })
    })
  },

  resetTableData({state, commit}, {$index}){
    let _data = state.data
    _data[$index].commission = _data[$index].commission === 1 ? 0 : 1
    commit('resetData', {params: _data})
  },

  /**
   * 统计分析 -- 提成日报 -- 发放
   */
  statisticMemberDailyPost({rootState, dispatch}){
    if(!rootState.tableHeader.empId) return _g.toastMsg({type: 'error', msg: '请选择员工之后发送'})
    let ids = rootState.tableHeader.empId
    return new Promise((resolve, reject) => {
      $http.post('commissionBack/pushCom.do', {ids}, res => {
        res.status === 0 && setTimeout(() => {
          dispatch('getStatisticStore', {path: '提成日报'})
        }, 1000)
      })
    })
  }
}

const getters = {
  formatStatistic: (state) => ({path}) => {
    return state.data && state.data.map(item => {
      if(path === '活动统计'){
        return {...item, typeText: item.type == 1 ? '普通活动' : item.type == 2 ? '活动抽奖' : item.type == 3 ? '推荐有礼' : '摇一摇', statusText: item.status == 0 ? '未开始' : item.status == 1 ? '进行中' : item.status == 2 ? '已结束' : '已关闭',recommendStateText: item.recommendState == 0 ? '保险' : '保养维护'}
      }else if(path === '提成日报'){
        return {...item, statusText: item.status === 1 ? '已发放' : '未发放'}
      }else{
        return {...item}
      }
    })
  },
}

export default {
  state, mutations, actions, getters
}
