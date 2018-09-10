import $http from '../../../utils/axios'
import {_g } from '../../../utils/global'
const state = {
  list:[],
  total:0,
  currentPage:1,
  tempArr1:[],
  tempObj: {
    isShowDialog: false,
    data:[]
  }
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
          ...rootState.search, 
          ...search, 
          currPageNo, 
          realName: ''
        }, dispatch('getMemberList')
        break;
      case '充值明细' : _url = "detail/getRecharge.do", search = {
          ...rootState.search, 
          ...search,
          currPageNo,
        }
        break;
      case '消费明细' : _url = 'detail/getConsumerDetails.do', search = {
        ...rootState.search, 
        ...search, 
        currPageNo,
      }
       break;
      case '会员充值' : _url = 'detail/selectUserMsgVo.do', search = {
        ...rootState.search,
        // realName:'',
        // phone:'',
        // plateNum:'',
      }
        break;
      case '车辆管理' : _url = 'vehicle/init.do', search = {
        ...rootState.search,
        currPageNo,
      }
        break;
    }
    $http.post(_url, search, res => {
      switch(path){
        case '积分管理' : return commit('setMemberStore', {params: res.data.info, tempArr1: res.data.businessType || []})
        case '充值明细' : return commit('setMemberStore', {params: res.data.info, tempArr1: res.data.payWay || []})
        case '消费明细' : return commit('setMemberStore', {params: res.data.info, tempArr1: res.data.list2 || []})
        default : commit('setMemberStore', {params: res.data})
      }
    })
  },

  /**
   * 会员管理模块
   * 会员列表 
   * 编辑/新增会员信息
   */
  memberInfoPubAndPut({dispatch}, {path, form, form:{id}} = {}){
    return new Promise((resolve, reject) => {
      $http.post('vipList/insertPage.do', form, res => {
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
  },

  /**
   * 会员管理 -- 添加顾问
   */
  memberAddCounselor({commit}, {choose, text, path}){
    commit('setMemberAddCounselorData', {choose, path, text})
  },

  /**
   * 会员管理 -- 车辆管理
   */
  memberCarComm({commit}, {search} = {}){
    $http.post('vehicle/getPlateNum.do', search, res => {
      console.log(res)
    })
  }
}

const mutations = {
  /**
   * 
   * @param {*} state 
   * @param {*} params
   * @param {*} tempArr1 临时变量,用来存储后台data数据源中的下拉框数据  
   */
  setMemberStore(state,{params:{list, total, pageNum}, tempArr1} = {}){
    state.list = list
    state.total = total
    state.currentPage = pageNum
    state.tempArr1 = tempArr1 && Object.values(tempArr1) && Object.values(tempArr1).map(item => { return {label: item, value: item}})
  },
  setMemberAddCounselorData(state, {path, text, choose} = {}){
    let sublist = []
    choose.split(',').map(item => {
      state.list.map(list => {
        if(item == list.id){
          sublist = [...sublist, list]
        }
      })
    })
    state.tempObj = {
      isShowDialog : true,
      data: sublist
    }
  },
  clearMemberAddCounselor(state){
    state.tempObj = {
      isShowDialog: false,
      data: []
    }
  },
  handleDelMemberItem(state, {index} = {}){
    state.tempObj.data.splice(index, 1)
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