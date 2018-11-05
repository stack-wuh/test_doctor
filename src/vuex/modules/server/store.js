import $http from '../../../utils/axios'
import {_g, NotNull} from '../../../utils/global'
const state = {
  data:[],
  total:0,
  currPageNo:1,
  dialogVisible: false,
  dialog_arr:[],
  dialog_row: {},
  dialogCanshowForm: false,

  isShowSettingOneDialog: false,
}

const actions = {
  /**
   * 抽离了服务模块全部的get事件
   * @param {*} param0 
   * @param {*} param1 
   */
  getServerStore({commit, rootState, dispatch}, {path, search, currPageNo=1} = {}){
    let _url = ''
    switch(path){
      case '养车知识分类' : _url = 'raisingBackend/raisingTypeList.do', search = {...rootState.search, ...search, currPageNo}
        break; 
      case '养车知识' : _url = 'raisingBackend/getRaisingList.do', search = {...rootState.search, currPageNo}, dispatch('getArtType')
        break;
      case '救援服务' : _url = 'rescueBackend/getRescueList.do', search = {...rootState.search, currPageNo}
        break;
      case '意见反馈' : _url = 'feedback/init.do', search = {...rootState.search, currPageNo}
        break;
      case '问卷调查' : _url = 'questionnaire/init.do', search = {currPageNo}
        break;
      case '预约管理' : _url = 'bookingBackend/init.do', search = {...rootState.search, currPageNo}
        break;
      case '预约时间管理' : _url = 'bookingTime/init.do', search = {...rootState.search, currPageNo}
        break;
      case '保险服务' : _url = 'insurances/init.do', search = {...rootState.search, currPageNo}
        break;
      case '检修记录' : _url = 'repairRecord/init.do', search = {...rootState.search, currPageNo}
        break;
      case '检修项配置' : _url = 'maintenanceItem/init.do', search = {...rootState.search, currPageNo}
        break;
      case '专项检测配置' : _url = 'detection/init.do', search = {...rootState.search, currPageNo},
                    dispatch('getServeCarSettingOne')
        break;
      case '检修记录详情' : _url = 'repairRecord/selectByOne.do', search = {...search}
        break;
      case '明细查询' : _url = 'questionnaire/getUserList.do', search = {...search, ...rootState.search}
        break;
      case '问卷统计' : _url = 'questionnaire/QuestionList.do', search = {...search}
        break;
    }
    return new Promise((resolve, reject) => {
      $http.post(_url, NotNull(search), res => {
        commit('setServerStore', {params: res.data})
        return resolve(res)
      })
    })
  },

  /**
   * 意见反馈 -- 提交
   */
  feedBackPut({dispatch}, {path, form:{id,replyContent}}){
    $http.post('feedback/update.do', {id, replyContent}, res => {
      dispatch('getServerStore', {path})
      dispatch('asyncHideDialog')
    })
  },
  /**
   * 养车知识分类
   * 新增/编辑
   */
  carFeedPubAndFresh({dispatch}, {form, path, form:{id}} = {}){
    let _url = id ? 'raisingBackend/updateRaisingType.do' : 'raisingBackend/addRaisingType.do'
    $http.post(_url, form, res => {
      setTimeout(()=>{
        dispatch('getServerStore', {path})
        dispatch('asyncHideDialog')
      },1000)
    })
  },
  /**
   * 养车知识
   * 编辑/新增
   */
  carFeedTotalPut({dispatch}, {form: {
    title,
    typeId,
    picture,
    content,
    id
  }, path} = {}){
    let _url = id ? 'raisingBackend/updateRaising.do' : 'raisingBackend/addRaising.do'
    return new Promise((resolve, reject) => {
      $http.post(_url, {
        title,
        typeId,
        picture,
        content,
        id
      }, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 养车知识
   * 文章详情
   */
  carFeedArtDetail({commit}, {form:{id}} = {}){
    return new Promise((resolve, reject) => {
      $http.post('raisingBackend/raisingInfo.do', {id}, res => {
        return resolve(res)
      })
    })
  },
  /** 
   * 养车知识 -- 发布
  */
  carFeedPunAndFresh({dispatch}, {id} = {}){
    return new Promise((resolve, reject) => {
      $http.post('raisingBackend/pubRaising.do', {id}, res => {
        setTimeout(() => {
          dispatch('getServerStore', {path: '养车知识'})
        }, 1000)
        return resolve(res)
      })
    })
  },

  /**
   * 抽取
   * 客户服务模块全部的删除事件
   * 删除成功之后刷新
   */
  serverModulesDelAndFresh({dispatch}, {path, row:{id}} = {}){
    let _url = ''
    switch(path){
      case '救援服务' : _url = 'rescueBackend/delRescue.do'
        break;
      case '意见反馈' : _url = 'feedback/delete.do'
        break;
      case '养车知识分类' : _url = 'raisingBackend/delRaisingType.do'
        break
      case '预约管理' : _url = 'bookingBackend/delete.do'
        break;
      case '预约时间管理' : _url = 'bookingTime/delete.do'
        break;
      case '问卷调查' : _url = 'questionnaire/updateActivity.do'
        break;
      case '养车知识' : _url = 'raisingBackend/delRaising.do'
        break;
      case '活动抽奖' : _url = 'activitiesDraws/banActivitiesDraw.do'
        break;
    }
    return new Promise((resolve,reject) => {
      $http.post(_url, {ids: id}, res => {
        setTimeout(()=>{
          dispatch('getServerStore',{path})
        },1000)
        return resolve(res)
      })
    })
  },

  /**
   * 客户服务 -- 预约时间管理-- 新增/编辑
   */
  serverPrevTimePubAndFresh({dispatch}, {path, form:{
    id,
    startTime,
    endTime,
    number,
    remark,
    type
  }} = {}){
    $http.post('bookingTime/insert.do', {
      id,
      startTime,
      endTime,
      number,
      remark,
      type
    }, res => {
      setTimeout(()=>{
        dispatch('asyncHideDialog')
        dispatch('getServerStore', {path})
      },1000)
    })
  },
  /**
   * 客户服务 -- 保险服务 -- 编辑保修服务
   */
  serverInsuracePutAndFresh({dispatch}, {form:{
    id,
    offer,
    remarks,
  }} = {}){
    return new Promise((resolve, reject) => {
      $http.post('insurances/update.do', {
        id,
        offer,
        remarks
      }, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 客户服务 --- 车辆检测 --- 专项检测配置
   */
  serveSettingStateChange(context, {id, state} = {}){
    return new Promise((resolve, reject) => {
      $http.post('detection/closeData.do', {id, state}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 客户服务 -- 车辆检测 -- 检修项配置
   * 查看项目操作列表
   */
  serveSettingItemList({commit}, {row:{id}} = {}){
    return new Promise((resolve, reject) => {
      $http.post('maintenanceItem/showList.do', {id}, res => {
        commit('setServeSettingItemList', {params: res.data})
      })
    })
  },

  /**
   * 客户服务 -- 问卷调查 -- 发布
   */
  serverQuesSend({commit}, {row:{id}}){
    return new Promise((resolve, reject) => {
      $http.post('questionnaire/publish.do', {id}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 客户服务 ---  问卷调查 --- 编辑问卷
   */
  serverQuestionPub({commit}, {form}){
    return new Promise((resolve, reject) => {
      $http.post('questionnaire/addQuestion.do', form, res => {
          return resolve(res)
      })
    })
  },

    /**
   * 客户服务 -- 车辆检测 专项检测配置 -- 编辑/新增 
   *  获取row中的id
   */
  handleSettingOneState({commit}, {row} = {}){
    commit('setSettingOneState', {row})
  },
  serverCarSettingOnePub({dispatch}, {form}){
    return new Promise((resolve, reject) => {
      $http.post('detection/insertOrUpdate.do', NotNull(form), res => {
        return resolve(res)
      })
    })
  },

  /**
   * 客户服务 -- 车辆检测 -- 检修项配置 -- 编辑/新增
   */
  serverCarSettingPub({dispatch}, {form: {
    id, 
    name, 
    picture,
    descInfo,
    data
  }}){
    return new Promise((resolve, reject) => {
      $http.post('maintenanceItem/insertOrUpdate.do', {
        id,
        name,
        picture,
        descInfo,
        data
      }, res => {
        return resolve(res)
      })
    })
  }
}
const mutations = {
  setServerStore(state, {params} = {}){
    state.data = params && params.list
    state.total = params && params.total
    state.currPageNo = params && params.pageNum
  },
  /**
   * 客户服务 -- 车辆检测
   * 对话框各种开关
   * @param {*} state 
   * @param {*} param1 
   */
  serverCarStateToggle(state,{params, text, row} = {}){
    state.dialog_arr = []
    if(text === '新增' || text === '编辑'){
      state.dialogCanshowForm = !state.dialogCanshowForm
    }else{
      state.dialogVisible = !state.dialogVisible
    }
  },
  setServeSettingItemList(state, {params} = {}){
    state.dialog_arr = params
  },

  /**
   * 客户服务 -- 车辆检测 专项检测配置 -- 编辑/新增 
   */
  setSettingOneState(state, {row} = {}){
    state.dialog_row = row
    state.isShowSettingOneDialog = !state.isShowSettingOneDialog
  },

}

const getters = {
  formatServerStore: (state) => ({path} = {}) => {
    return state.data && state.data.map(item => {
      if(path === '救援服务'){
        return {...item, statusText: item.status == 0 ? '未确认' : item.status == 1 ? '已确认' : '已取消'}
      }else if(path === '意见反馈'){
        return {...item, feedbackTypeText: item.feedbackType == 0 ? '保险' : item.feedbackType == 1 ? '续保' : item.feedbackType == 2 ? '保养' : '其他',
                          processingStateText: item.processingState == 0 ? '未回复' : '已回复'}
      }else if(path === '问卷调查'){
        return {...item, validate: `${item.startDates}-${item.endDates}`, activeStateText: item.activeState == 0 ? '待发布' : item.activeState == 1 ? '进行中' : item.activeState == 2 ? '已结束' : '已关闭'}
      }else if(path === '养车知识'){
        return {...item, stateText: item.state == 0 ? '未发布' : '已发布'}
      }else if(path === '预约管理'){
        return {...item, bookingSetIdText: item.bookingSetId === 1 ? '爱车保养' : item.bookingSetId === 2 ? '事故维修' : item.bookingSetId === 3 ? '故障检查' : item.bookingSetId === 4 ? '购买保险' : item.bookingSetId === 5 ? '爱车美容' : '其他', stateText: item.state === 0 ? '未确认' : item.state === 1 ? '未到店' : item.state === 2 ? '已确认' : '已取消'}
      }else if(path === '预约时间管理'){
        return {...item, rankTime: `${item.startTime}至${item.endTime}`}
      }else if(path === '保险服务'){
        return {...item, stateText: item.state === 0 ? '未确认' : '已确认'}
      }else if(path === '专项检测配置'){
        return {...item, stateText: item.state === 0 ? '已关闭' : '已开启'}
      }else{
        return {...item}
      }
    })
  },
  formatDialogTable: (state, rootState, rootGetters) => ({path} = {}) => {
    return state.dialog_arr.map(item => {
      if(path === '检修项配置'){
        return {...item, statusText: item.status === 1 ? '状态良好' : item.status === 2 ? '轻微磨损或老化' : '严重磨损或老化'}
      }else{
        return {...item}
      }
    })
  }
}

export default {
  state, actions, mutations, getters
}