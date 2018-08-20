export const  _g = {
  toastMsg({type = 'success',msg:message = '获取成功!'} = {}){
    window.$message({
      type ,
      message ,
    })
  }
}
