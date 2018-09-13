import axios from 'axios'
import {_g, NotNull}  from './global'
import qs  from 'qs'
/**
 * 发起请求的拦截器
 */
axios.interceptors.request.use(config => {
  /**
   * 发起请求之前要做什么
   */
  window.$store.dispatch('changeShowLoading',{show:true})
  return config
},error =>{
  /**
   * 请求错误之后要做什么
   */
  window.$store.dispatch('changeShowloading',{show:false})
  _g.toastMsg()
  return Promise.reject(error)
})

axios.interceptors.response.use(response =>{
  setTimeout(()=>{
    window.$store.dispatch('changeShowLoading',{show:false})
  },500)
  return response
}, error =>{
  return Promise.reject(error)
})

/**
 * 响应消息
 */
const checkStatus = response =>{
  if(response && (response.status === 200 || response.status === 304 || response.status === 400)){
    let type = response.data.status == 0 ? 'success' : response.data.status == 1 ? 'error' : 'info'
    _g.toastMsg({type,msg:response.data.msg})
    return response.data
  }
  return {
    status : -404 ,
    msg: '网络异常'
  }
}

const checkCode = res => {
  if(res.status == -404){
    _g.toastMsg({type:'error',msg:res.msg})
  }
  if(res.data && res.status == 0){
    return new Promise((resolve,reject)=>{
      resolve(res)
    })
  }
  if(res.status == 10){
    _g.toastMsg({
      type:'info',
      msg:'请登录之后操作!'
    })
    setTimeout(() => {
      window.$route.push({name:'signin'})
    }, 1000);
  }
  return res
}

export default {
  post(url,data,cb){
    return axios({
      method:'post',
      baseURL:window.rootPath,
      url,
      data:qs.stringify(data),
      timeout:10000,
      headers:{
        'X-Requested-With':'XMLHttpRequest',
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then(response => {
      return checkStatus(response)
    }).then(res=>{
      // console.log(res ,'this is then' )
      return checkCode(res)
    }).then(res=>{
      cb && cb(res)
      // console.log('this is then callback')
    }).catch(err=>{
      if(err){
        _g.toastMsg({
          type:'error',
          msg:'网络异常,请稍后重试!',
        })
      }
      window.$store.dispatch('changeShowLoading',{show:false})
    })
  }
}