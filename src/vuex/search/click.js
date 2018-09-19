export const  clearSearchForm = ({path, menu} = {}) => {
  window.$store.commit('clearSearchForm')
  setTimeout(()=>{
    switch(menu){
      case '卡券管理' : return window.$store.dispatch('getCouponStore', {path})
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
  }
}