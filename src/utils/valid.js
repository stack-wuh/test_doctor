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