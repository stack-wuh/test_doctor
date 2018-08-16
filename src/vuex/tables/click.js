
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
export const jump2Other = (params,types) => {
  let {menu , subMenu ,child , path} = params
  let rootPath = '' , other = ''
  switch(child || subMenu){
    case '角色权限' : rootPath = '/system/limit/setting' , child = '编辑角色权限'
      break ;
    case '自动回复配置' : rootPath = '/system/store/reply'  , child = '编辑自动回复配置'
      break ;
    case '汽车精品管理' : rootPath = '/use/pub' , child = '编辑汽车精品信息'
      break ; 
    case '会员列表' : rootPath = '/member/pub' , child = '编辑会员信息'
      break ;
    case '奖品卡券管理' : rootPath = '/coupon/pub' , child = '编辑奖品卡券'
      break ;
    case '抽奖模板设置' : rootPath = '/coupon/lotto/pub' , child = '编辑抽奖模板'
      break ;
    case '普通活动' : 
            rootPath = types == '编辑' ? '/market/active/pub' : types == '精准获客' ? '/market/store' : types == '报名查询' ? '/market/store' : '' , 
            child = types == '编辑' ? '编辑活动详情' : types == '精准获客' ? '精准获客' : types == '报名查询' ? '报名查询' :''
      break ;
    case '活动抽奖' : rootPath = '/market/store' , child = '活动中奖' 
      break ; 
    case '摇一摇活动' :
            rootPath = types == '编辑' ? '/market/shake/pub' : types == '中奖查询' ? '/market/store' : '' ,
            child = types == '编辑' ? '编辑摇一摇活动' : types == '中奖查询' ? '摇一摇中奖' : ''
      break ;
    case '保险服务' : rootPath = '/serve/insure/pub' , child = '编辑保险服务'
      break ;
    default : rootPath = '/index'
  }
  window.$route.push({path:'/mid/container',query:Object.assign(params,{path:rootPath,child})})
}