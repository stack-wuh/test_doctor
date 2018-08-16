
/**
 * 表格内按钮事件
 * 抽取页面组件按钮
 * 打开dialog对话框
 * dialog对话框的visible由vuex控制
 * 事件传递mutations
 * params
 * 
 */
export const openDialog = params => {
   window.$store.commit('handleOpenDialog') 
}

/**
 * 表格内按钮事件
 * 跳转到指定页面事件
 * params
 * 
 */
export const jump2Other = params => {
  let {menu , subMenu ,child , path} = params
  let rootPath = '' , other = ''
  switch(child || subMenu){
    case '角色权限' : rootPath = '/system/limit/setting'
      break ;
    case '自动回复配置' : rootPath = '/system/store/reply'
      break ;
    case '汽车精品管理' : rootPath = '/use/pub'
      break ;
    case '会员列表' : rootPath = '/member/pub'
      break ;
    default : rootPath = '/index'
  }
  window.$route.push({path:'/mid/container',query:Object.assign(params,{path:rootPath})})
}