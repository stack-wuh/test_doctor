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