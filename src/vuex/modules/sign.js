
import $http from '../../../src/utils/axios'
import {_g} from '../../../src/utils/global'
const state = {

}

const mutations = {
  handleNameAndPwd(state, {form, rootState, code} = {}){
    rootState.form = {
      username:form.username || '',
      password:form.password || '',
    }
  }
}

const actions = {
  /**
   * 登录后台
   * @param {*} param0 
   */
  signIn({rootState, dispatch},{form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('employee/Login.do', form, res => {
         if(res.status == 0){
          setTimeout(()=>{
            window.$route.push({name: 'index'})
          },1000)
           return resolve(res)
         }else{
           return reject(res)
         }
      })
    })
  },

  /**
   * 记住密码直接登录
   * 跳过验证码验证
   * 似乎改过了登陆成功的code码？？？
   * @param {object} rootState 
   */
  handleSignInWidthoutCode({rootState}){
    $http.post('employee/Login.do',rootState.form ,res => {
      if(res.status == 1){
        setTimeout(()=>{
          window.$route.push({name:'index'})
        },1000)
      }
    })
  },

  /**
   * 用户退出
   */
  signOut(){
    $http.post('employee/doLogout.do', {} ,res => {
      localStorage.setItem('saveObj', '')
      localStorage.setItem('isSavePwdInExpire', false)
      if(res.status == 0){
       setTimeout(()=>{
          window.$route.push({name:'signin'})
       },1000)
      }
    })
  }
}

const getters = {

}

export default {
  state , mutations , actions , getters
}