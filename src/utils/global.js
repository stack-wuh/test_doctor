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

/**
 * 取出指定对象属性的值
 */
 export const getObj = (obj,argus) => {
	let _arr = []
	if(typeof(obj) !== 'object') return
	if(typeof(argus) === 'string'){
		argus = argus.toString()
	}else {
		argus = [...argus]
	}
	if(typeof(argus) === 'string'){
		return obj[argus]
	}
	if(typeof(argus) === 'object'){
		argus.forEach(item => {
			_arr = [..._arr, obj[item]]
		})
		return _arr
	}
}

/**
 * 解析url
 */
export const getQueryString = (url) => { 
  if(url) { 
      url=url.substr(url.indexOf("?")+1); 
  } 
  var result = {}, 
  queryString =url || location.search.substring(1), 
  re = /([^&=]+)=([^&]*)/g, 
  m; 
  while (m = re.exec(queryString)) {
      result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]); 
  } 
  return result; 
} 
