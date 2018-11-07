import $http from '../../../utils/axios'
import {_g, NotNull} from '../../../utils/global'


const state = {
  data: [],
  total: 0,
  currPageNo: 1,

  xAxis: [], // 图标的x
  series: [], // 图标的 data

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
      case '用户统计' : _url = 'statistics/userStatistics.do', search = {...search}
        break;
      case '车辆统计' : _url = '', search = {...search}
        break;
      case '业务统计' : _url = 'statistics/businessStatistics.do', search = {...search}
        break;
      case '活动统计' : _url = 'statistics/activeStatistics.do', search = {...search}
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
      if(path === ''){
        return {...item}
      }else{
        return {...item}
      }
    })
  }
}

export default {
  state, mutations, actions, getters
}
