import $http from '../../../utils/axios'
import {_g, NotNull} from '../../../utils/global'
const state = {
  data:[],
  total:0,
  currPageNo:1
}

const actions = {
  /**
   * 抽离了服务模块全部的get事件
   * @param {*} param0 
   * @param {*} param1 
   */
  getServerStore({commit, rootState}, {path, search, currPageNo=1} = {}){
    let _url = ''
    switch(path){
      case '养车知识分类' : _url = 'raisingBackend/raisingTypeList.do', search = {...rootState.search, ...search, currPageNo}
        break; 
      case '养车知识' : _url = 'raisingBackend/getRaisingList.do', search = {...rootState.search, currPageNo}
        break;
      case '救援服务' : _url = 'rescueBackend/getRescueList.do', search = {...rootState.search, currPageNo}
        break;
      case '意见反馈' : _url = 'feedback/init.do', search = {...rootState.search, currPageNo}
        break;
      case '问卷调查' : _url = 'questionnaire/init.do', search = {currPageNo}
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
    }
    return new Promise((resolve,reject) => {
      $http.post(_url, {ids: id}, res => {
        setTimeout(()=>{
          dispatch('getServerStore',{path})
        },1000)
        return resolve(res)
      })
    })
  }
}
const mutations = {
  setServerStore(state, {params} = {}){
    state.data = params.list
    state.total = params.total
    state.currPageNo = params.pageNum
  },
}

const getters = {
  formatServerStore: (state,rootState,rootGetters) => ({path} = {}) => {
    return state.data.map(item => {
      if(path === '救援服务'){
        return {...item, statusText: item.status == 0 ? '未确认' : item.status == 1 ? '已确认' : '已取消'}
      }else if(path === '意见反馈'){
        return {...item, feedbackTypeText: item.feedbackType == 0 ? '保险' : item.feedbackType == 1 ? '续保' : item.feedbackType == 2 ? '保养' : '其他',
                          processingStateText: item.processingState == 0 ? '未回复' : '已回复'}
      }else if(path === '问卷调查'){
        return {...item, validate: `${item.startDates}-${item.endDates}`, activeStateText: item.activeState == 0 ? '待发布' : item.activeState == 1 ? '进行中' : item.activeState == 2 ? '已结束' : '已关闭'}
      }else if(path === '养车知识'){
        return {...item, stateText: item.state == 0 ? '未发布' : '已发布'}
      }else{
        return {...item}
      }
    })
  }
}

export default {
  state, actions, mutations, getters
}