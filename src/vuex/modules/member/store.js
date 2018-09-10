import $http from '../../../utils/axios'
import {_g } from '../../../utils/global'
const state = {
  list:[],
  total:0,
  currentPage:1,
}

const actions = {
  /**
   * 获取会员模块全部的表格内容
   */
  getMemberStore({commit, rootState, dispatch}, {path, search, currPageNo = 1} = {}){
    let _url = ''
    switch(path){
      case '会员列表' : _url = 'vipList/init.do', search = {
        realName:'',
        phone:'',
        grade:'',
        sex:'',
        state:'',
        userName:'',
        plateNum:'',
        carModel:'',
        startCreateTime:'',
        endCreateTime:'',
        minIntegral:'',
        maxIntegral:''
        , ...rootState.search, ...search, currPageNo}, 
        dispatch('getMemberList')
        dispatch('getCounselorList')
        break;
      case '积分管理' : _url = 'detail/getIntegrals.do', search = {
        ...rootState.search, ...search, currPageNo
      }
      break;
    }
    $http.post(_url, search, res => {
      switch(path){
        case '积分管理' : return commit('setMemberStore', {params: res.data.info})
        default : commit('setMemberStore', {params: res.data})
      }
      // commit('setMemberStore',{params: res.data})
    })
  },

  /**
   * 会员管理模块
   * 会员列表 
   * 编辑/新增会员信息
   */
  memberInfoPubAndPut({dispatch}, {path, form, form:{id}} = {}){
    return new Promise((resolve, reject) => {
      $http.post('vipList/insertOrUpdate.do', form, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 会员管理模块
   * 会员列表
   * 导入数据
   */
  memberInfoImport({commit,dispatch}, {path, form, form:{fileName} = {}}){
    if(form.fileName.length){
      form.fileName = form.fileName.toString()
    }else{
      _g.toastMsg({
        type:'error',
        msg:'请选择文件之后再提交'
      })
      return
    }
    return new Promise((resolve,reject) => {
      $http.post('vipList/imports.do', form, res => {
        setTimeout(()=>{
          dispatch('handleDialogWithImport',{visible:false})
          return resolve()
        },1000)
      })
    })
  }
}

const mutations = {
  setMemberStore(state,{params:{list, total, pageNum}} = {}){
    state.list = list
    state.total = total
    state.currentPage = pageNum
  }
}

const getters = {
  memberStore: state => ({path} = {}) => {
    return state.list.map(item => {
      switch(path){
        case '积分管理' : return {...item, typeText: item.type == 1 ? '增加' : '减少'}
        default : return {...item}
      }
    })
  },
}

export default {
  state, mutations, actions, getters
}