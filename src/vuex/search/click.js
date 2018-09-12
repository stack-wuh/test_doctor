export const  clearSearchForm = ({path} = {}) => {
  window.$store.commit('clearSearchForm')
  setTimeout(()=>{
    window.$store.dispatch('getStoresList',{path})
  })
}

export const searchFormList = ({path} = {}) => {
  window.$store.dispatch('getStoresList',{path})
}

export const handleSearchList = ({path} = {}) => {
  switch(path){
    case '用户佣金提现' : return window.$store.dispatch('couponMemberTake')
    case '会员充值' : return window.$store.dispatch('memberRecharge')
  }
}