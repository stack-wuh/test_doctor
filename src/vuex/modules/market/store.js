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
      case '普通活动' : _url = 'ordinaryActivities/ordinaryActivitiesList.do', search = {...rootState.search, currPageNo}, dispatch('getMarketActivies')
        break;
      case '活动抽奖' : _url = 'activitiesDraws/activitiesDrawsList.do', search = {...rootState.search, currPageNo}, dispatch('getActiveList')
        break;
      case '推荐有礼' : _url = 'recommendingGift/recommendingGiftList.do', search = {...rootState.search, currPageNo}
        break;
      case '摇一摇活动' : _url = 'rockIngActivities/rockIngActivitiesList.do', search = {...rootState.search, currPageNo}
        break;
      case '精准获客' : _url = 'ordinaryActivities/accurateGuests.do', search = {...rootState.search, currPageNo}
        break;
      case '报名查询' : _url = 'ordinaryActivities/signUpList.do', search = {...rootState.search, currPageNo}, dispatch('getActiveList')
        break;
      case '活动中奖' : _url = 'activitiesDraws/userLotteryInfo.do', search = {...rootState.search, currPageNo}
        break;
    }
    return new Promise((resolve, reject) => {
      $http.post(_url, NotNull(search), res =>{
        commit('setMarketStore', {params: res.data})
        return resolve(res)
      })
    })

  },

  /**
   * 市场推广模块内容全部的删除事件
   */
  marketDelAndFresh({dispatch}, {row, row:{id}, path}){
    let _url = ''
    switch(path){
      case '报名查询' : _url = 'ordinaryActivities/delSignUp.do'
        break;
      case '普通活动' : _url = 'ordinaryActivities/banActivities.do'
        break;
    }
    return new Promise((resolve, reject) => {
      $http.post(_url, {ids: id}, res => {
        setTimeout(() => {
          dispatch('getMarketStore', {path})
        }, 1000);
        return resolve(res)
      })
    })
  },
  
  /**
   * 市场退管 -- 普通活动 -- 编辑/新增
   */
  marketActivePutAndPost({dispatch}, {path, form:{
    date,
    id,
    activityTitle,
    picture,
    homePagePromotion,
    enrollFee,
    partakeCompulsoryPayment,
    startDateStr,
    endDateStr,
    couponId,
    initialEnrollNum,
    whetherAllowEnroll,
    viewCount,
    minTime,
    maxTime,
    conditionStatus,
  }} = {}){
    return new Promise((resolve, reject) => {
      $http.post('ordinaryActivities/addActivities.do', {
        id,
        activityTitle,
        picture,
        homePagePromotion:homePagePromotion === true ? 1 : 0 ,
        enrollFee,
        partakeCompulsoryPayment: partakeCompulsoryPayment === true ? 1 : 0,
        startDateStr: date[0],
        endDateStr: date[1],
        couponId,
        initialEnrollNum,
        whetherAllowEnroll: whetherAllowEnroll === true ? 1 : 0,
        viewCount,
        minTime,
        maxTime,
        conditionStatus: conditionStatus === true ? 1 : 0,
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 市场推广 -- 普通活动 -- 发布
   */
  marketActivePubAndFresh({dispatch}, {path, id} = {}){
    $http.post('ordinaryActivities/releaseActivities.do', {id}, res => {
      dispatch('getMarketStore', {path})
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
        return {...item, statusText: item.status == 0 ? '未开始' : item.status == 1 ? '进行中' : item.status == 2 ? '已结束' : '已关闭', valid: `${item.startDateStr || ''}至${item.endDateStr || ''}`}
      }else if(path === '报名查询'){
        return {...item, isValidText: item.isValid == 0 ? '已失效' : '有效', statusText: item.status == 0 ? '未确认' : item.staus == 1 ? '已确认' : '已领取', isPlayText: item.isPlay == 0 ? '未支付' : '已支付'}
      }else{
        return {...item}
      }
    })
  }
}

export default  {
  state, mutations, actions, getters
}