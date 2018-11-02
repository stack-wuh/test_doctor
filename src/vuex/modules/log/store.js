import {_g, NotNull} from '../../../utils/global'
import $http from '../../../utils/axios'


const state = {
  data:[],
  total:0,
  currPageNo:1,
}

const mutations = {
  setLogStore(state, {params} = {}){
    state.data = params.list
    state.total = params.total
    state.currPageNo = params.pageNum
  }
}

const actions = {
  /**
   * 获取内容
   */
  getLogStore({commit, rootState}, {path, search, currPageNo = 1} = {}){
    let _url = ''
    switch(path){
      case '版本更新' : _url = 'log/getVersionList.do', search = {...search, currPageNo}
        break;
      case '操作日志' : _url = 'log/userLogList.do', search = {...search, currPageNo, ...rootState.search}
        break;
      case '联系我们' : _url = 'log/getContactUs.do', search = {}
        break;
      case '系统消息' : _url = 'message/getMessageCenter.do', search = {...rootState.search, currPageNo}
        break;
    }
    return new Promise((resolve, reject) => {
      $http.post(_url, NotNull(search), res => {
        commit('setLogStore', {params: res.data})
        return resolve(res)
      })
    }) 
  },

  /**
   * 
   */

  /**
   * 添加/编辑 版本更新日志
   */
  versionPubAndFresh({commit, dispatch}, {form, form:{id}, path} = {}){
    let _url = id ? 'log/updateVersion.do' : 'log/addVersion.do'
    return new Promise((resolve, reject) => {
      $http.post(_url, NotNull(form), res => {
        dispatch('getLogStore', {path})
        return resolve(res)
      })
    })
  },
  /**
   * 模块内全部的删除事件
   */
  logDelItemAndFresh({dispatch}, {id, path} = {}){
    let _url = '' 
    switch(path){
      case '版本更新' : _url = 'log/delVersion.do'
        break;
    }
    window.$confirm('此操作将删除该条信息,请确认?', '提示', {
      confirmButtonText:'确定',
      cancelButtonText:'取消',
      type:'info'
    }).then(res => {
      $http.post(_url, {id}, res => {
        setTimeout(() => {
          dispatch('getLogStore', {path})
        }, 1000);
      })
    }).catch(err => {
      _g.toastMsg({
        type:'error',
        msg:'该操作已取消或操作错误!'
      })
    })
  },
  /**
   * 联系我们
   */
  logConcat({dispatch}, {form, path, form:{id}} = {}){
    let _url = id ? 'log/updateContactUs.do' : 'log/addContactUs.do'
    $http.post(_url, form, res => {
      setTimeout(()=>{
        dispatch('getLogStore',{path})
      },1000)
    })
  },
  /**
   * 发布 -- 系统消息
   */
  logSystemMsgPub({dispatch}, {form, path}){
    return new Promise((resolve, reject) => {
      $http.post('message/addOrUpMessageCenter.do', form, res => {
        return resolve(res)
      })
    })

  }
}

const getters = {
  formatLogStore: (state) => ({path} = {}) => {
    return state.data && state.data.map(item => {
      if(path == '版本更新'){
        return {...item, lists:item.reserved1 && item.reserved1.split(',')}
      }else if(path == '系统消息'){
        return {...item, typeText: item.type == 0 ? '公告' : '提醒'}
      }else if(path === '操作日志'){
        return {...item, typeText: item.type === 0 ? '查看' : item.type === 1 ? '新增' : item.type === 2 ? '修改' : '删除'}
      }else{
        return {...item}
      }
    })
  }
}

export default {
  state, mutations, actions, getters
}