/**
 * 验证最大值为一
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const MaxNumberValue = (rule, value ,callback) => {
  if(!value){
    return callback(new Error('请编辑折扣比例'))
  }
  setTimeout(()=>{
    if(value > 1){
      callback(new Error('值不能大于1'))
    }else if(value < 0){
      callback(new Error('折扣比例为0-1之间的小数'))
    }else{
      callback()
    }
  },100)
}

/**
 * 选择卡券验证
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const MaxCouponNumber = (rule, value, callback) => {
  if(!value){
    return callback(new Error('请选择赠送卡券'))
  }
  setTimeout(()=>{
    if(value.length === 0){
      callback(new Error('最少选择一张卡券'))
    }else if(value.length > 3){
      callback(new Error('最多选择三张卡券'))
    }else{
      callback()
    }

  },100)
}

/**
 * 验证手机号码
 */

 export const validPhone = (rule, value, callback) => {
   if(!value){
     return callback(new Error('请编辑电话号码'))
   }
   setTimeout(()=>{
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    if(value.length < 11){
      callback(new Error('手机号长度为11位数字'))
    }else if(reg.test(value)){
      callback()
    }else{
      callback(new Error('手机号格式错误'))
    }
   },500)
 }

 /**
  * 验证身份证号
  */
 export const validNoNum = (rule, value, callback) => {
   if(!value){
     return callback(new Error('请编辑身份证号'))
   }
   setTimeout(() => {
     let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
     if(reg.test(value)){
        callback()
     }else if(!reg.test(value)){
       callback(new Error('身份证号格式错误'))
     }
   }, 100);
 }

 /**
  * 验证邮箱地址
  */
 export const validEmail = (rule, value, callback) => {
   if(!value){
     return callback(new Error('请编辑邮箱地址'))
   }
   setTimeout(()=>{
    let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/ 
    if(reg.test(value)){
      callback()
    }else if(!reg.test(value)){
      callback(new Error('邮箱地址格式错误'))
    }
   },100)
 }

 /**
  * 验证日期
  */
 export const validDate = (rule, value, callback) => {
   if(!value){
     return callback(new Error('请选择日期'))
   }
   setTimeout(()=>{
     let reg = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/
     if(reg.test(value)){
       callback()
     }else if(!reg.test(value)){
       callback(new Error('日期格式错误'))
     }
   },100)
 }

 /**
  * 验证输入的金额不能为负
  */

  export const positiveNumber = (rule, value, callback) => {
    if(!value){
      return callback(new Error('请编辑金额'))
    }
    setTimeout(()=>{
      let reg = /^\d+$/
      if(Number.parseInt(value, 10) <= 0){
        callback(new Error('请编辑正确的金额'))
      }else if(!reg.test(value)){
        callback(new Error('只能输入数字'))
      }else{
        callback()
      }
    },100)
  }

  /**
   * 验证积分
   */
  export const validIntegral = (rule, value, callback) => {
    if(!value){
      return callback(new Error('请编辑积分'))
    }
    setTimeout(()=>{
      let reg = /^\d+$/
      if(Number.parseInt(value, 10) < 0){
        callback(new Error('请编辑正确的积分'))
      }else if(!reg.test(value)){
        callback(new Error('只能输入数字'))
      }else{
        callback()
      }
    },100)
  }