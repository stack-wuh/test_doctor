import $http from '../../../utils/axios'
import {_g, NotNull} from '../../../utils/global'
const state = {
 data:[],
 total:0,
 currPageNo:1
}

const actions = {
  /**
   * 获取市场推广模块所有的get请求
   */
  getMarketStore({commit, dispatch, rootState}, {path, search, currPageNo = 1} = {}){
    let _url = ''
    switch(path){
      case '普通活动' : _url = 'ordinaryActivities/ordinaryActivitiesList.do', search = {...rootState.search, currPageNo}, dispatch('getActiveList')
        break;
      case '活动抽奖' : _url = 'activitiesDraws/activitiesDrawsList.do', search = {...rootState.search, currPageNo}
        break;
      case '推荐有礼' : _url = 'recommendingGift/recommendingGiftList.do', search = {...rootState.search, currPageNo}
        break;
      case '摇一摇活动' : _url = 'rockIngActivities/rockIngActivitiesList.do', search = {...rootState.search, currPageNo}
        break;
    }
    return new Promise((resolve, reject) => {
      $http.post(_url, NotNull(search), res =>{
        commit('setMarketStore', {params: res.data})
        return resolve(res)
      })
    })

  }
}

const mutations = {
  /**
   * 保存所有get请求的值
   */
  setMarketStore(state, {params} = {}){
    state.data = params.list
    state.total = params.total
    state.currPageNo = params.pageNum
  }
}

const getters = {
  formMarketStore: (state) => ({path} = {}) => {
    return state.data.map(item => {
      if(path === '普通活动'){
        return {...item, statusText: item.status == 0 ? '已下架' : item.status == 1 ? '已发布' : '已推送', valid: `${item.startDateStr || ''}-${item.endDateStr || ''}`}
      }else{
        return {...item}
      }
    })
  }
}

export default  {
  state, mutations, actions, getters
}