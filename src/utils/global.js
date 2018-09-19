export const  _g = {
  toastMsg({type = 'success',msg:message = '获取成功!'} = {}){
    window.$message({
      type ,
      message ,
    })
  }
}

/**
 * 排除掉对象内的空值
 * @param {*} obj 
 */
export const NotNull = obj => {
  let _obj = {}, data = []
  if(obj instanceof Object){
    data = Object.keys(obj)
  }else if(obj instanceof String){
    data = Object.keys(JSON.parse(data))
  }else{
    data = []
  }
  data.forEach(item => {
    if(obj[item] && obj[item].toString()[0]){
      _obj[item] = obj[item]
    }else if(obj[item] === 0 || obj[item] === '0'){
      _obj[item] = obj[item]
    }
  })
  return _obj
}