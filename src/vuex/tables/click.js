import { _g} from '../../utils/global'
import $http from '../../utils/axios'
/**
 * 表格内按钮事件
 * 抽取页面组件按钮
 * 打开dialog对话框
 * dialog对话框的visible由vuex控制
 * 事件传递mutations
 * params
 * 
 */
export const openDialog = (params,text,row) => {
  let {menu, subMenu, child} = params
  switch(child || subMenu){
    case '部门管理' : window.$store.dispatch('getDepartmentList')  //获得上级部门列表
        break;
    case '关注用户列表' : window.$store.dispatch('getDepartmentList'), window.$store.dispatch('getRoleList') // 获得部门列表 / 角色列表
        break;
    case '会员充值设置' : window.$store.dispatch('getCouponList') // 获得卡券列表
        break;
  }
   window.$store.commit('handleOpenDialog',{params,text,row}) 
}

/**
 * 表格内按钮事件
 * 跳转到指定页面事件
 * params
 * 
 */
export const jump2Other = (params ,types ,row) => {
  let {menu , subMenu ,child , path} = params
  let rootPath = '' , other = '' , data = ''
  switch(child || subMenu){
    case '门店管理' : rootPath = '/system/store/pub' , child = '发布新店', data = JSON.stringify(row)
      break ;
    case '角色权限' : rootPath = '/system/limit/setting' , child = '编辑角色权限'
      break ;
    case '自动回复配置' : rootPath = '/system/store/reply'  , child = '自动回复配置' , data = JSON.stringify(row)
      break ;
    case '汽车精品管理' : rootPath = types == '编辑' ? '/use/pub' : '' , child = types == '编辑' ? '编辑汽车精品信息' :'' , data = JSON.stringify(row)
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
    case '车辆管理' :  rootPath = '/member/info', child = '查看客户及车辆档案', data = JSON.stringify(row)
      break;
    default : rootPath = '/index'
  }
  window.$route.push({path:'/mid/container',query:Object.assign(params,{path:rootPath ,child , data})})
}

/**
 * staff -- 员工列表
 * 重置员工列表密码
 * params：id 员工id
 */
export const staffResetPwd = (params,types , row) => {
  let {menu , subMenu , child} = params
  let path = child || subMenu
  window.$store.dispatch('staffResetPwd',{path , row})
}
/**
 * staff -- 员工列表
 * 删除员工
 * params ，id 员工id
 */
export const staffDelAndFresh = (params , types , row) => {
  let { subMenu , child} = params
  let path = child || subMenu
  window.$confirm('该操作将删除此条信息,是否继续?' ,'提示' ,{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning'
  }).then(()=>{
    window.$store.dispatch('staffDelAndFresh',{path , row})
  }).catch(()=>{
    _g.toastMsg({
      type:'info',
      msg:'操作已取消'
    })
  })
}

/**
 * couponLevel -- 会员卡等级设置
 * 删除会员卡等级列表
 */
export const couponLevelDelAndFresh = (params , types , row) => {
  let {subMenu , child} = params
  let path = child || subMenu
  window.$confirm('该操作将删除此条信息,是否继续?' ,'提示' ,{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning'
  }).then(()=>{
    window.$store.dispatch('couponLevelDel', {path , row})
  }).catch(()=>{
    _g.toastMsg({
      type:'info',
      msg:'操作已取消'
    })
  })
}

/**
 * 会员充值设置 , 保养提醒设置
 * 删除会员列表 , 删除保养提醒列表
 */
export const memberDelAndFresh = (params , type , row) => {
  let {subMenu , child} = params
  let path = child || subMenu
  window.$confirm('该操作将删除此条信息,是否继续?' , '提示' , {
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning',
  }).then(()=>{
    window.$store.dispatch('memberDelAndFresh' , {path , row})
  }).catch(()=>{
    window.$message({
      type:'info',
      message:'操作已取消！'
    })
  })
}

/**
 * 用品管理 -- 精品订单管理 
 * 表格按钮 提货事件
 */
export const handleTakeGood = (params ,type ,row) => {
  if(type === '提货'){
    window.$store.dispatch('handleTakeGood' , {row , path:params.child || params.subMenu})
  }else{
    _g.toastMsg({
      type:'info',
      msg:'不能重复提货!'
    })
    return 
  }
}
/**
 * 用品管理 -- 配件大类
 * 表格按钮
 * 删除事件
 */
export const useDelAndFresh = (params ,type ,row) => {
  window.$confirm('该操作将删除此条信息,是否继续?' , '提示' , {
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning',
  }).then(()=>{
    window.$store.dispatch('useDelAndFresh' , {path:params.child || params.subMenu , row})
  }).catch(()=>{
    window.$message({
      type:'info',
      message:'操作已取消！'
    })
  })
}

/**
 * 表格事件 -- switch类型的change事件
 * 切换状态
 */
export const handleSwitchChange = (params, row) => {
  let {subMenu, child} = params
  window.$store.dispatch('handleChangeState', {row, path: child || subMenu})
}

/**
 * 表格内部删除按钮点击事件
 * 测试 -- 抽取卡券模块内部所有表格删除事件
 * 测试无误 -- 后期全部换成改方法
 */

 export const handleDelAndFresh = (params, text, row) => {
   let {subMenu, child} = params
   let {id} = row
   let _url = '', dispatch =''
   window.$confirm('该操作将删除此条信息,请确认?','提示',{
     confirmButtonText:'确定',
     cancelButtonText:'取消',
     type:'info',
   }).then(()=>{
    switch(child || subMenu){
      case '奖品卡券管理' : _url = 'coupon/delCoupon.do', dispatch = 'getCouponStore'
        break; 
    }
    $http.post(_url, {ids:id}, res => {
      window.$store.dispatch(dispatch, {path: child || subMenu})
    })
   }).catch(()=>{
     _g.toastMsg({
       type:'info',
       message:'操作错误或已取消'
     })
   })
 }