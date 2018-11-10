import { _g} from '../../utils/global'
import $http from '../../utils/axios'
/**
 * 表格内按
 * 钮事件
 * 抽取页面组件按钮
 * 打开dialog对话框
 * dialog对话框的visible由vuex控制
 * 事件传递mutations
 * params
 * 
 */
export const openDialog = (params,text,row) => {
  let {subMenu, child} = params
  switch(child || subMenu){
    case '部门管理' : window.$store.dispatch('getSysDepartList',{search:{id: row.id}})  //获得上级部门列表
        break;
    case '关注用户列表' : window.$store.dispatch('getDepartmentList'), window.$store.dispatch('getRoleList') // 获得部门列表 / 角色列表
        break;
    case '会员充值设置' : window.$store.dispatch('getCouponList') // 获得卡券列表
                        row = {...row, couponId:row.couponIds ? row.couponIds.split(',').map(item => Number(item)) : []}
        break;
    case '员工列表' : window.$store.dispatch('getDepartmentList'), window.$store.dispatch('getRoleList')
      row = {...row, sex: Number(row.sex)}
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
export const jump2Other = (params ,types ,row, index, query) => {
  let {menu , subMenu ,child , path} = params
  let rootPath = '' , other = '' , data = ''
  switch(child || subMenu){
    case '门店管理' : rootPath = '/system/store/pub' , child = '发布新店', data = JSON.stringify(row)
      break ;
    case '角色权限' : rootPath = '/system/limit/setting' , child = '编辑角色权限'
      break ;
    case '自动回复配置' : rootPath = '/system/store/reply'  , child = '自动回复配置' , data = JSON.stringify(row)
      break ;
    case '汽车精品管理' : rootPath = types == '编辑' ? '/use/pub' : '/use/store' , child = types == '编辑' ? '编辑汽车精品信息' :'精品订单详情' , data = JSON.stringify(row)
      break ; 
    case '会员列表' : rootPath = '/member/pub' , child = '编辑会员信息', data = JSON.stringify(row)
      break ;
    case '奖品卡券管理' : rootPath = types == '编辑' ? '/coupon/pub' : '/coupon/store' , 
                        child = types == '编辑' ? '编辑奖品卡券' : '查看领取明细',
                        data = JSON.stringify(row)
      break ;
    case '抽奖模板设置' : rootPath = '/coupon/lotto/pub' , child = '编辑抽奖模板', data = JSON.stringify(row)
      break ;
    case '普通活动' : 
            rootPath = types == '编辑' ? '/market/active/pub' : types == '精准获客' ? '/market/store' : types == '报名查询' ? '/market/store' : '' , 
            child = types == '编辑' ? '编辑活动详情' : types == '精准获客' ? '精准获客' : types == '报名查询' ? '报名查询' :''
            data = JSON.stringify(row)
      break ;
    case '活动抽奖' : rootPath = types === '编辑' ? '/market/active/other/pub' : '/market/store' , child = types === '编辑' ? '编辑活动详情' : types === '中奖查询' ? '活动中奖' : '暂无'
            data = JSON.stringify(row)
      break ; 
    case '摇一摇活动' :
            rootPath = types == '编辑' ? '/market/shake/pub' : types == '中奖查询' ? '/market/store' : '' ,
            child = types == '编辑' ? '编辑摇一摇活动' : types == '中奖查询' ? '摇一摇中奖' : '',
            data = JSON.stringify(row)
      break ;
    case '保险服务' : rootPath = '/serve/insure/pub' , child = '编辑保险服务',
            data = JSON.stringify(row)
      break ;
    case '车辆管理' :  rootPath = '/member/info', child = '查看客户及车辆档案', data = JSON.stringify(row)
      break;
    case '系统消息' : rootPath = '/log/msg/detail', child = '系统消息详情', data = JSON.stringify(row)
      break;
    case '养车知识' : rootPath = '/serve/carfeed/pub', child = '编辑养车知识', data = JSON.stringify(row)
      break;
    case '角色管理' : rootPath = '/system/limit/setting', child = '编辑用户权限', data = JSON.stringify(row)
      break;
    case '检修记录' : rootPath = '/serve/overhual', child = '检修记录详情', data = JSON.stringify(row)
      break;
    case '问卷调查' : rootPath = 
                      types === '编辑' ? '/serve/question/pub' : types === '问卷统计' ? '/serve/ques/static' : '/serve/store', 
                     child = 
                      types === '编辑' ? '编辑问卷' : types === '问卷统计' ? '问卷统计' : '明细查询' , data = JSON.stringify(row)
      break;
    case '调拨发起' : rootPath = '/selling/store/pub', child = '编辑调拨发起', data = JSON.stringify(row)
      break;
    case '调拨接收' : rootPath = '/selling/store/pub', child = '编辑调拨接收', data = JSON.stringify(row)
      break;
    case '日常盘点' : rootPath = '/selling/store/pub', child = '编辑日常盘点', data = JSON.stringify(row)
      break;
    case '付款管理' : rootPath = '/selling/store/pub', child = '编辑付款管理', data = JSON.stringify(row)
      break;
    case '挂账还款' : rootPath = '/selling/refund/pub', child = '查看挂账还款', data = JSON.stringify(row)
      break;
    case '采购订单' : rootPath = '/selling/store/pub', child = '编辑采购订单', data = JSON.stringify(row)
      break;
    case '采购入库' : rootPath = '/selling/store/pub', child = '编辑采购入库', data = JSON.stringify(row)
      break;
    case '采购退货' : rootPath = '/selling/store/pub', child = '编辑采购退货', data = JSON.stringify(row)
      break;
    case '会员套餐记录' : rootPath = '/selling/store', child = '会员套餐记录详情', data = JSON.stringify(row)
      break; 
    case '业务退货' : rootPath = '/selling/store/pub', child = '编辑业务退货', data = JSON.stringify(row)
      break;
    case '业务出库' : rootPath = '/selling/store/pub', child = '编辑业务出库', data = JSON.stringify(row)
      break;
    case '业务结算' : rootPath = '/selling/account', child = '编辑业务结算', data = JSON.stringify(row)
      break;
    case '套餐销售' : rootPath = '/selling/sale/pub', child = '编辑套餐销售', data = JSON.stringify(row)
      break;
    case '业务开单' : rootPath = '/selling/open', child = '编辑业务开单', data = JSON.stringify(row)
      break;
    case '套餐管理' : rootPath = '/selling/meal/pub', child = '编辑套餐管理', data = JSON.stringify(row)
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
   let search = {ids: id}
   let _url = '', dispatch =''
   window.$confirm('该操作将删除此条信息,请确认?','提示',{
     confirmButtonText:'确定',
     cancelButtonText:'取消',
     type:'info',
   }).then(()=>{
    switch(child || subMenu){
      case '奖品卡券管理' : _url = 'coupon/delCoupon.do', dispatch = 'getCouponStore'
        break; 
      case '系统消息' : _url = 'message/delMessageCenter.do', dispatch = 'getLogStore'
        break;
      case '养车知识分类': _url = 'raisingBackend/delRaisingType.do', dispatch = 'getServerStore'
        break;
      case '专项检测配置' : _url = 'detection/delete.do', dispatch = 'getServerStore', search = {id}
        break;
      case '检修项配置' : _url = 'maintenanceItem/delete.do', dispatch = 'getServerStore', search = {id}
        break;
    }
    $http.post(_url, search, res => {
      setTimeout(() => {
        window.$store.dispatch(dispatch, {path: child || subMenu})
      }, 1000)
    })
   }).catch(()=>{
     _g.toastMsg({
       type:'info',
       message:'操作错误或已取消'
     })
   })
 }

 export const handleDelItemForCouponModel = (params, text, row, index) => {
  window.$bus.$emit('handleDelItemForModel',index)
 }

 /**
  * 市场推广 -- 普通活动 -- 发布
  */
export const marketActivePub = (params, text, row) => {
  let {subMenu, child } = params
  let path = child || subMenu
  window.$confirm(`该操作将${text}活动至前台, 请确认?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(res => {
    window.$store.dispatch('marketOtherActivePost', {path, text, id: row.id})
  }).catch(err => {
    _g.toastMsg({
      type: 'error',
      msg: '操作已取消或错误'
    })
  })
}

/**
 * 卡券管理 -- 员工奖励 -- 发放
 */

export const couponMemberParise = (params, text, row) => {
  let {subMenu, child} = params
  window.$store.dispatch('couponMemberParise', {row, path: child || subMenu})
}

/**
 * 市场推广 -- 普通活动 -- 报名查询 -- 发放
 */
export const marketPrevSend = (params, status, row, query) => {
  let {subMenu, child} = params
  window.$store.dispatch('marketPrevSend', {row, path: child || subMenu, query: {id: query.id}})
}

/**
 * 客户服务 -- 养车知识 -- 发布
 */
export const carFeedPubAndFresh = (params, status, row) => {
  let {subMenu, child} = params
  window.$confirm('该操作将文章推送到前台,请确认?', '提示', {
    confirmButtonText:'确认',
    cancelButtonText:'取消',
    type:'warning',
  }).then(()=> {
    window.$store.dispatch('carFeedPunAndFresh', {id: row.id})
  }).catch(()=> {
    _g.toastMsg({
      type: 'error',
      msg:'操作已取消'
    })
  })
}

/**
 * 专项检测配置 -- 切换状态
 */
export const serveSettingState = (params, row) => {
 let {subMenu, child} = params
 switch(child || subMenu){
   case '专项检测配置' : return window.$store.dispatch('serveSettingStateChange', {id: row.id, state: row.state}) 
 }
}

/**
 * 客户服务 -- 车辆检测 -- 检修项配置
 * 查看项目操作
 */
export const handleToggleStateForServeCar = (params, text, row) =>{
  window.$store.dispatch('serveSettingItemList', {row})
  window.$store.commit('serverCarStateToggle',{params, text, row})
  if(text === '编辑'){
    window.$store.dispatch('getServeCarSetting', {row})
  }
}

/**
 * 客户服务 -- 车辆检测 -- 专项检测配置
 */
export const handlerForSettingOne = (params, text, row) => {
  window.$store.dispatch('handleSettingOneState', {row})
}

/**
 * 客户服务 -- 问卷调查 -- 发布
 */
export const handleQuesPub = (params, text, row) => {
  window.$confirm('该操作将推送至前台,请确认?', '提示', {
    confirmButtonText:'确认',
    cancelButtonText:'取消',
    type:'warning'
  }).then(() => {
    window.$store.dispatch('serverQuesSend', {params, row})
  }).catch(() => {
    _g.toastMsg({
      type:'error',
      msg:'操作已取消或失败'
    })
  })
}

/**
 * 市场推广 -- 摇一摇活动 -- 开启
 */
export const handleShakeState = (params, text, row) => {
  let path = params.child || params.subMenu
  window.$confirm('该操作将开启活动, 请确认?', '提示', {
    confirmButtonText: '确认',
    confirmCancelText: '取消',
    type: 'warning'
  }).then(() => {
    window.$store.dispatch('marketShakeStateChange', {path, row})
  }).catch(() => {
    _g.toastMsg({
      type: 'error',
      msg: '操作已取消或失败'
    })
  })
}


/**
 * 进存销 -- 套餐管理 -- 会员套餐记录
 */
export const handleSellingMemberChange = (params, text, row) => {
  let path = params.child || params.subMenu
  window.$store.dispatch('sellingMealMemberUpdate', {path, id: row.id})
}


/**
 * 市场推广 -- 发布/领取/确认
 */

 export const handleMarketSenderPost = (params, text, row) => {
   let path = params.child || params.subMenu
   window.$confirm(`该操作将${text}该条内容, 请确认?`, '提示', {
     confirmButtonText: '确认',
     confirmCancelText: '取消',
     type: 'warning'
   }).then(res => {
     switch(path){
      case '推荐有礼' : return window.$store.dispatch('marketSendPost', {path, row, text})
      case '活动抽奖' : return window.$store.dispatch('marketActivePost', {path, row, text})
      case '预约管理' : return window.$store.dispatch('serverCoustorPost', {path, row, text})
      default : return _g.toastMsg({
        type: 'error',
        msg: '操作错误或已取消'
      })
    } 
   }).catch(err => {
     _g.toastMsg({
       type: 'error',
       msg: '操作已取消或失败'
     })
   })
 }

 export const handleForMemberSetting = (params, row, $index) => {
   window.$store.dispatch('resetTableData', {params, row, $index})
 }