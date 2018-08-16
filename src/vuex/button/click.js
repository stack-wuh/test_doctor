
export const jump2Other =  params => {
  window.$route.push('/index')
}

export const jump2Detail = params => {
  window.$route.push('/detail')
}

/**
 * 点击新增按钮
 * 需要路由跳转到指定页面
 */

 export const jump2Add = params => {
   let {menu , subMenu , child} = params
   let rootPath = '' , other = ''
   switch( child || subMenu || menu){
     case '门店管理' : rootPath =  '/system/store/pub' , child = '发布新店'
          break ;
     case '员工列表' : rootPath = '/system/store'  , child = '新增员工'
          break ;
     case '自动回复配置' : rootPath = '/system/store/reply' 
          break ;
     case '汽车精品管理' : rootPath = '/use/pub' , child = '编辑汽车精品信息'
          break ;  
     case '会员列表' : rootPath = '/member/pub' , child = '编辑会员信息'
          break ;
     case '抽奖模板设置' : rootPath = '/coupon/lotto/pub' , child = '编辑抽奖模板'
          break ;
     case '普通活动' : rootPath = '/market/active/pub' , child = '编辑活动详情'
          break ;
     case '摇一摇活动' : rootPath = '/market/shake/pub' , child = '编辑摇一摇活动'
          break ;
     default : rootPath = '/index'
   }
   window.$route.push({path:'/mid/container',query:{path:rootPath , menu , subMenu ,child}})
 }

 /**
  * 点击新增按钮
  * 出现dialog对话框
  */
 export const jump2AddWithDialog = params => {
   window.$store.commit('handleOpenDialog')
 }