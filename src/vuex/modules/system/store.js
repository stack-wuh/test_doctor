import $http from '../../../utils/axios'
const state = {
  
}

const mutations = {

}

const actions = {
  getStoresList({commit},params){
    $http.post('/employee/getEmployeeList.do')
  },
}

const getters = {

}

export default  {
  state , mutations , actions , getters
}