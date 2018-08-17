export const  _g = {
  toastMsg({type = 'error',msg:message = '服务连接错误,请稍后重试!'} = {}){
    window.$message({
      type ,
      message ,
    })
  }
}
