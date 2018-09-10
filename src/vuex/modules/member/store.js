import $http from '../../../utils/axios'
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
        break;
    }
    $http.post(_url, search, res => {
      commit('setMemberStore',{params: res.data})
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
  memberInfoImport({commit,dispatch}, {path, form}){
    form.fileName = form.fileName.tolocalString()
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
  memberStore: state => {
    return state.list
  }
}

export default {
  state, mutations, actions, getters
}