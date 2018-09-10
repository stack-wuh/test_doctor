
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
  signIn({rootState, dispatch},{code} = {}){
    let length = Object.values(rootState.form).length > 0 ? true : false
    let result = length && Object.values(rootState.form).every(item => item)
    if(result){
      return new Promise((resolve,reject) => {
        if(rootState.form.code && rootState.form.code === code.join('')){
          $http.post('employee/Login.do',rootState.form , res => {
              resolve()
              setTimeout(()=>{
                window.$route.push({name:'index'})
              },1000)
          })
        }else{
          if(rootState.form.code !== code.join('')){
            _g.toastMsg({
              type:'error',
              msg:'验证码错误,请重试'
            })
          }
          return reject()
        }
      })
    }else{
      window._g.toastMsg({type:'error',msg:'请编辑必填项后提交'})
    }
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