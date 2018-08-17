import axios from 'axios'
import _g  from './global'

/**
 * 发起请求的拦截器
 */
axios.interceptors.request.use(config => {
  /**
   * 发起请求之前要做什么
   */
  window.$store.dispatch('changeShowLoading',{show:true})
  _g.toastMsg({type:'success',msg:'已发起请求!'})
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
    return response.data
  }
  return {
    status : -404 ,
    msg: '网络异常'
  }
}

const checkCode = res => {
  if(res.status == -404){
    console.log('res is error')
  }
  if(res.data && (res.data.success)){
    console.log(res,res.data.msg)
  }
  return res
}

export default {
  post(url,data){
    return axios({
      method:'post',
      baseURL:window.rootPath,
      url,
      data,
      timeout:10000,
      headers:{
        'X-Requested-With':'XMLHttpRequest',
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then(response => {
      return checkStatus(response)
    }).then(res=>{
      return checkCode(res)
    })
  }
}