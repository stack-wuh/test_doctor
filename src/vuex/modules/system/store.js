import $http from '../../../utils/axios'
const state = {
  data:[],
  total:0,
  currentPage:1,
}

const mutations = {
  setStoreList(state,status){ 
    state.data = status.params && status.params.list
    state.total = status.params && status.params.total
    state.currentPage = staus.params && status.params.pageNum
  }
}

const actions = {
  /**
   * 获取门店管理列表
   * @param {*} param0 
   * @param {*} params 
   */
  getStoresList({commit,rootState},{path , search} = {}){
    let _url ;
    switch(path){
      case '门店管理' : _url = '/store/getStoreList.do'
        break ;
      case '部门管理' : _url = '/department/getDepartmentList.do'
        break ;
      case '员工列表' : _url = 'employee/getEmployeeList.do' , search = {...rootState.search , search}
        break;
      case '关注用户列表' : _url = ''
        break;
    }
    $http.post(_url,search,(res)=>{
      commit('setStoreList',{params:res.data})
    })
  },

  /**
   * 发布新的门店
   */
  pubStoreList({rootState}){
    $http.post('store/addStoreInfo.do',rootState.form,(res)=>{
      if(res.status == 0){
        setTimeout(()=>{
          window.$route.go(-2)
        },1000)
      }
    })
  },

  /**
   * department 部门编辑/新增
   * dialog对话框编辑内容
   */
  depPubAndPut({commit,rootState ,dispatch},{form,path} = {}){
    form = {...form , state:form.state === '正常' ? 1 : 0}
    $http.post('department/addDepartment.do',form,(res)=>{
      if(res.status == 0){
        setTimeout(()=>{
          commit('handlehideDialog')
          dispatch('getStoresList',{path})
        },1000)
      }
    })
  },
  /**
   * staff 员工列表
   * dialog对话框编辑内容
   * @param {*} param0 
   * @param {*} param1 
   */
  staffPubAndPut({commit,dispatch},{form,path} = {}){
    $http.post('employee/updateEmployee.do',form,res => {
      res.status == 0 && (
        setTimeout(()=>{
          commit('handlehideDialog')
          dispatch('getStoresList',{path})
        },1000)
      )
    })
  },
  /**
   * staff 员工列表 
   * 重置员工列表密码
   */
  staffResetPwd({commit,dispatch},{path , row:{id}} = {}){
    $http.post('employee/resetPasswords.do',{id},res=>{
      res.status && (
        setTimeout(()=>{
          commit('handlehideDialog')
          dispatch('getStoresList',{path})
        },1000)
      )
    })
  },
  /**
   * staff 员工列表
   * 删除员工
   */
  staffDelAndFresh({dispatch},{path , row:{id}} = {}){
    setTimeout(()=>{
      dispatch('getStoresList',{path})
    },1000)
    // $http.post('employee/delEmployee.do',{id} , res=>{
    //   res.status && (
    //     setTimeout(()=>{
    //       dispatch('getStoreList',{path})
    //     },1000)
    //   )
    // })
  }
}

const getters = {
  /**
   * 获取计算之后的data,方便后面的列表过滤
   */
  formatStoreDataList(state){
    return state && state.data
  },

  /**
   * 过滤数据
   * 门店管理/部门管理 state过滤
   * state ： 0禁用 ， 1：正常
   */
  changeStateDataList(state,getters){ 
   return getters.formatStoreDataList.map(item => {
     if( item.storeName || item.depName){
       return {...item , stateText:item.state == 0 ? '禁用' : '正常'}
     }
   })
  },

}

export default  {
  state , mutations , actions , getters
}