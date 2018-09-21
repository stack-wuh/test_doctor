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
      url=url.substr(url.indexOf("?")+1); //字符串截取，比我之前的split()方法效率高 
  } 
  var result = {}, //创建一个对象，用于存name，和value 
  queryString =url || location.search.substring(1), //location.search设置或返回从问号 (?) 开始的 URL（查询部分）。 
  re = /([^&=]+)=([^&]*)/g, //正则，具体不会用 
  m; 
  while (m = re.exec(queryString)) { //exec()正则表达式的匹配，具体不会用 
      result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]); //使用 decodeURIComponent() 对编码后的 URI 进行解码 
  } 
  return result; 
} 