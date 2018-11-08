import $http from '../../../utils/axios'
import {_g, NotNull} from '../../../utils/global'


const state = {
  data: [],
  total: 0,
  currPageNo: 1,
  info:{},

  xAxis: [], // 图表的x
  series: [], // 图表的 data
  title: '标题', // 图表的标题

}

const mutations = {
  setStatisticStore(state, {params}){
    state.data = params && params.list
    state.total = params && params.total
    state.total = params && params.pageNo
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
}

const actions = {
  /**
   * 抽取统计分析模块内全部的get请求
   * 
   */
  getStatisticStore({commit, rootState, dispatch}, {path, search, currPageNo = 1}){
    let _url = ''
    switch(path){ 
      case '用户统计' : _url = 'statistics/userStatistics.do', search = {...search, ...rootState.search}
        break;
      case '车辆统计' : _url = 'statistics/carStatistics.do', search = {...search, ...rootState.search}
        break;
      case '业务统计' : _url = 'statistics/businessStatistics.do', search = {...search, type: 1, businessType: 1, dataType: 3, ...rootState.search}
        break;
      case '活动统计' : _url = 'statistics/activeStatistics.do', search = {...search, currPageNo, type: 1, ...rootState.search}
        break;
      case '会员统计' : _url = 'statistics/memberStatistics.do', search = {...search}
        break;
      case '提成日报' : _url = 'employee/getEmployeeList.do', search = {...search, currPageNo}
        break;
      case '客户资料完整度' : _url = 'statistics/userDataIntegrity.do', search = {...search, ...rootState.search, currPageNo}
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
          default: commit('setStatisticStore',{params:res.data})
        }
        return resolve(res)
      })
    })
  }
}

const getters = {
  formatStatistic: (state) => ({path}) => {
    return state.data && state.data.map(item => {
      if(path === '活动统计'){
        return {...item, typeText: item.type == 1 ? '普通活动' : item.type=== 2 ? '活动抽奖' : item.type == 3 ? '推荐有礼' : '摇一摇', statusText: item.status == 0 ? '未开始' : item.status == 1 ? '进行中' : item.status == 2 ? '已结束' : '已关闭',recommendStateText: item.recommendState == 0 ? '保险' : '保养维护'}
      }else{
        return {...item}
      }
    })
  }
}

export default {
  state, mutations, actions, getters
}
