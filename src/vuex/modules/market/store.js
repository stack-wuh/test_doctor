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
  getMarketStore({commit, dispatch, rootState}, {path, search, currPageNo = 1, id} = {}){
    let _url = ''
    switch(path){
      case '普通活动' : _url = 'ordinaryActivities/ordinaryActivitiesList.do', search = {...rootState.search, currPageNo}, dispatch('getMarketActivies')
        break;
      case '活动抽奖' : _url = 'activitiesDraws/activitiesDrawsList.do', search = {...rootState.search, currPageNo}, dispatch('getMarketActivies')
        break;
      case '推荐有礼' : _url = 'recommendingGift/recommendingGiftList.do', search = {...rootState.search, currPageNo}
        break;
      case '摇一摇活动' : _url = 'rockIngActivities/rockIngActivitiesList.do', search = {...rootState.search, currPageNo}
        break;
      case '精准获客' : _url = 'ordinaryActivities/accurateGuests.do', search = {...rootState.search, currPageNo, id}
        break;
      case '报名查询' : _url = 'ordinaryActivities/signUpList.do', search = {...rootState.search, currPageNo, id}, dispatch('getActiveList')
        break;
      case '活动中奖' : _url = 'activitiesDraws/userLotteryInfo.do', search = {...rootState.search, currPageNo}
        break;
      case '摇一摇中奖' : _url = 'rockIngActivities/userRockingList.do', search = {...rootState.search, currPageNo}
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
    let _url = '', search = {}
    switch(path){
      case '报名查询' : _url = 'ordinaryActivities/delSignUp.do', search = {ids: id}
        break;
      case '普通活动' : _url = 'ordinaryActivities/banActivities.do', search = {ids: id}
        break;
      case '活动抽奖' : _url = 'activitiesDraws/banActivitiesDraw.do', search = {ids: id}
        break;
      case '推荐有礼' : _url = 'recommendingGift/recommendingStateDel.do', search = {id }
        break;
    }
    return new Promise((resolve, reject) => {
      $http.post(_url, search, res => {
        setTimeout(() => {
          dispatch('getMarketStore', {path})
        }, 1000);
        return resolve(res)
      })
    })
  },
  
  /**
   * 市场推广 -- 普通活动 -- 编辑/新增
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
   * 市场推广 -- 普通活动 -- 报名查询 -- 领取
   */
  marketPrevSend({dispatch}, {path, row:{id,status}, query}){
    $http.post('ordinaryActivities/takeSignUp.do', {id, status}, res => {
      dispatch('getMarketStore', {path, id: query.id})
    })
  },

  /**
   * 市场推广 -- 活动抽奖 -- 编辑/新增
   */
  marketOtherActivePub({dispatch}, {path, form:{
    title,
    picture,
    isPush,
    enrollFee,
    isPay,
    startTimeForString,
    endTimeForString,
    type,
    number,
    id,
    lotteryTemplateId,
    date,
    registNum,
    state
  }} = {}){
    return new Promise((resolve, reject) => {
      $http.post('activitiesDraws/addOrUpdateActivitiesDraws.do', {
        title,
        picture,
        isPush: isPush === true ? 1 : 0,
        enrollFee,
        isPay:isPay === true ? 1: 0,
        startTimeForString: date[0],
        endTimeForString: date[1],
        type,
        number,
        id,
        lotteryTemplateId,
        registNum,
        state
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   *   市场推广 -- 摇一摇活动 -- 编辑/新增 -- 活动列表 
   */
  getShackActive({dispatch}){
    return new Promise((resolve, reject) => {
      $http.post('activitiesDraws/activitiesDrawsSelect.do', {}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 市场推广 -- 摇一摇活动 -- 新增/编辑
   */
  marketShakePub({dispatch}, {form: {
    fieldName,
    activityDateToString,
    partakeNum,
    displayNum,
    winnerScore,
    backgroundPicture,
    data,
    id,
  }}){
    let _url = id ? 'rockIngActivities/updateRockIngActivitiesInfo.do' : 'rockIngActivities/addRockIngActivities.do'
    return new Promise((resolve, reject) => {
      $http.post(_url, {
        fieldName,
        activityDateToString,
        partakeNum,
        displayNum,
        winnerScore,
        backgroundPicture,
        data,
        id
      }, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 市场推广 -- 摇一摇活动 --- 获取编辑内容
   */
  marketShakeEdit({dispatch}, {id }){
    return new Promise((resolve, reject) => {
      $http.post('rockIngActivities/rockIngActivitiesInfo.do', {id }, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 市场推广 -- 摇一摇活动 -- 开启
   */
  marketShakeStateChange({dispatch}, {path, row, row: {id }}){
    return new Promise((resolve, reject) => {
      $http.post('rockIngActivities/start.do', {id}, res => {
        dispatch('getMarketStore', {path, })
      })
    })
  },

  /**
   * 市场推广 -- 推荐有礼 -- 领取/确认
   */
  marketSendPost({dispatch}, {path, row: {id }}){
    return new Promise((resolve, reject) => {
      $http.post('recommendingGift/recommendingStateUpdate.do', {id }, res => {
        dispatch('getMarketStore', {path: '推荐有礼'})
      })
    })
  },

  /**
   * 市场推广 -- 活动抽奖 -- 发布
   */
  marketActivePost({dispatch}, {path, row: {id }, text}){
    let _url = text === '推送' ? 'activitiesDraws/updateStateActivitiesDraws.do' : 'activitiesDraws/updateStateActivitiesDraws.do'
    return new Promise((resolve, reject) => {
      $http.post(_url , {id}, res => {
        setTimeout(() => {
          res.status === 0 &&  dispatch('getMarketStore', {path })
        }, 1000)
      })
    })
  },

  /**
   * 市场推广 -- 活动抽奖 -- 推送
   */
  marketActiveSend({dispatch}, {path, row: {id }}){
    $http.post('activitiesDraws/updateStateActivitiesDraws.do', {id }, res => {
      setTimeout(() => {
        res.status === 0 && dispatch('getMarketStore', {path })
      }, 1000)
    })
  },

  /**
   * 市场推广 -- 普通活动 -- 推送/发布
   */
  marketOtherActivePost({dispatch}, {path, text, id}){
    let _url = text === '发布' ? 'ordinaryActivities/releaseActivities.do' : 'ordinaryActivities/push.do'
    $http.post(_url, {id }, res => {
      setTimeout(() => {
        res.status === 0 && dispatch('getMarketStore', {path })
      }, 1000)
    })
  },
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
        return {...item, columnTypeText: item.columnType === 0 ? '养车' : '养车', statusText: item.status == 0 ? '未开始' : item.status == 1 ? '进行中' : item.status == 2 ? '已结束' : '已关闭', valid: `${item.startDateStr || ''}至${item.endDateStr || ''}`}
      }else if(path === '报名查询'){
        return {...item, isValidText: item.isValid == 0 ? '已失效' : '有效', statusText: item.status == 0 ? '未确认' : item.status == 1 ? '已确认' : '已领取', isPlayText: item.isPlay == 0 ? '未支付' : '已支付'}
      }else if(path === '精准获客'){
        return {...item, accurateGuestsText: item.accurateGuests === 1 ? '是' : '否',whetherForwardingText: item.whetherForwarding === 1 ? '是' : '否'}
      }else if(path === '活动抽奖'){
        return {...item,  columnTypeText: item.columnType === 0 ? '养车' : '养车', validate: `${item.startTimeForString} 至 ${item.endTimeForString}`, stateText: item.state === 0 ? '未开始' : item.state === 1 ? '进行中' : item.state === 2 ? '已结束' : '已关闭'}
      }else if(path === '活动中奖'){
        return  {...item, statusText: item.status === 0 ? '未领取' : '已领取', typeText: item.type === 0 ? '电子代金券' : '实物卡券'}
      }else if(path === '摇一摇中奖'){
        return {...item, statusText: item.status === 1 ? '已领取' : '未领取'}
      }else if(path === '摇一摇活动'){
        return {...item, activeStateText: item.activeState === 1 ? '进行中' : '已结束'}
      }else if(path === '推荐有礼'){
        return {...item, typeText: item.type === 0 ? '保险' : '保养维护', currentStateText: item.currentState === 0 ? '待确认' : item.currentState === 1 ? '已确认' : item.currentState === 2 ? '已领取' : '已失效'}
      }else{
        return {...item}
      }
    })
  }
}

export default  {
  state, mutations, actions, getters
}