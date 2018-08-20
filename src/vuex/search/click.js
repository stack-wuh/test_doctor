export const  clearSearchForm = ({path} = {}) => {
  window.$store.commit('clearSearchForm')
  setTimeout(()=>{
    window.$store.dispatch('getStoresList',{path})
  })
}

export const searchFormList = ({path} = {}) => {
  window.$store.dispatch('getStoresList',{path})
}