export const  clearSearchForm = ({path} = {}) => {
  window.$store.commit('clearSearchForm')
  setTimeout(()=>{
    switch(path){
      case '用户佣金提现' : return window.$store.dispatch('couponMemberTake')
      case '会员充值' : return window.$store.dispatch('memberRecharge')
      case '保险公司' : return window.$store.dispatch('getStoresList', {path}) 
      case '奖品卡券管理' : return window.$store.dispatch('getCouponStore', {path})
    }
  })
}

export const searchFormList = ({path} = {}) => {
  window.$store.dispatch('getStoresList',{path})
}

export const handleSearchList = ({path} = {}) => {
  switch(path){
    case '用户佣金提现' : return window.$store.dispatch('couponMemberTake')
    case '会员充值' : return window.$store.dispatch('memberRecharge')
    case '保险公司' : return window.$store.dispatch('getStoresList', {path}) 
    case '奖品卡券管理' : return window.$store.dispatch('getCouponStore', {path})
  }
}