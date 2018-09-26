export const  clearSearchForm = ({path, menu} = {}) => {
  window.$store.commit('clearSearchForm')
  setTimeout(()=>{
    switch(menu){
      case '卡券管理' : return window.$store.dispatch('getCouponStore', {path})
      case '会员管理' : return window.$store.dispatch('getMemberStore', {path})
      case '系统管理' : return window.$store.dispatch('getStoresList', {path})
      case '用品管理' : return window.$store.dispatch('getUseStore', {path})
      case '市场推广' : return window.$store.dispatch('getMarketStore', {path})
      case '客户服务' : return window.$store.dispatch('getServerStore', {path})
    }
  })
}

export const searchFormList = ({path} = {}) => {
  window.$store.dispatch('getStoresList',{path})
}

export const handleSearchList = ({path, menu} = {}) => {
  if(menu === '卡券管理'){
    if(path === '用户佣金提现'){
      return window.$store.dispatch('couponMemberTake')
    }else{
      return window.$store.dispatch('getCouponStore', {path })
    }
  }else if(menu === '会员管理'){
      return window.$store.dispatch('getMemberStore', {path})
  }else if(menu === '系统管理'){
      return window.$store.dispatch('getStoresList', {path})
  }else if(menu === '用品管理'){
    return window.$store.dispatch('getUseStore', {path})
  }else if(menu === '市场推广'){
    return window.$store.dispatch('getMarketStore', {path})
  }else if(menu === '客户服务'){
    return window.$store.dispatch('getServerStore', {path})
  }
}