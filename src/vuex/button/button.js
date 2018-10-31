import {
  jump2Detail ,
  jump2Add , 
  jump2AddWithDialog ,
  DelAndFreshWithAll ,
  export2Excel ,
  importExcelWithDialog,
  handleDialogForMember,
  handleDialogForCoupon,
  handleCouponMemberSend,
  handleSelectChangeForTable,
  serveDialogToggleForSetting,
  dialogToggleForServerCarForm,
  DownAndFreshWithAll
} from './click'
const state = {
  list:[
    {
      name:'新增导出',
      desc:'新增导出两大类别按钮组,跳转到指定页面',
      params:['门店管理'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:jump2Add,
          isAuth:1,
        },
        {
          text:'导出',
          type:'',
          size:'small',
          style:'',
          click:export2Excel,
          isAuth:1,
        }
      ]
    },
    {
      name:'新增导出',
      desc:'新增导出两大类别按钮组,打开一个dialog对话框',
      params:['套餐销售'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:jump2AddWithDialog,
          isAuth:1,
        },
        {
          text:'导出',
          type:'',
          size:'small',
          style:'',
          click:jump2Detail,
          isAuth:1,
        }
      ]
    },
    {
      name:'新增',
      desc:'单独一个新增按钮,路由跳转到指定的页面',
      params:['员工列表','消息中心'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:jump2Add,
          isAuth:1,
        }
      ]
    },
    {
      name:'新增',
      desc:'单独一个新增按钮,出现dialog对话框',
      params:['部门管理','会员卡等级设置','分享与消费奖励规则'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:jump2AddWithDialog,
          isAuth:1,
        }
      ]
    },
    {
      name:'新增',
      desc:'定制单独一个新增按钮,出现dialog对话框',
      params:['检修项配置'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:dialogToggleForServerCarForm,
          isAuth:1,
        }
      ]
    },
    {
      name:'新增',
      desc:'定制单独一个新增按钮,打开dialog对话框',
      params:['专项检测配置'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:serveDialogToggleForSetting,
          isAuth:1,
        }
      ],
    },
    {
      name:'新增',
      desc:'单独一个新增按钮,出现dialog对话框,定制',
      params:['编辑抽奖模板'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:handleDialogForCoupon,
          isAuth:1,
        }
      ]
    },
    {
      name:'新增删除',
      desc:'新增删除按钮组(表格顶部批量删除),弹出一个dialog对话框',
      params:['角色管理','会员充值设置','保养提醒设置','保险公司','快捷回复设置','配件大类管理','预约时间管理','养车知识分类','套餐管理','供应商设置','仓库设置','商品分类设置','项目分类设置','物流公司配置','支付方式配置'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:jump2AddWithDialog,
          isAuth:1,
        },
        {
          text:'删除',
          type:'',
          size:'small',
          style:'',
          click:DelAndFreshWithAll,
          isAuth:1,
        }
      ]
    },
    {
      name:'新增删除',
      desc:'新增删除按钮组(包括表格顶部批量删除),跳转到指定地址',
      params:['自动回复配置','汽车精品管理','奖品卡券管理','抽奖模板设置','摇一摇活动','养车知识', '调拨发起', '日常盘点', '调拨接收', '付款管理', '挂账还款', '采购订单', '采购入库', '采购退货'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:jump2Add,
          isAuth:1,
        },
        {
          text:'删除',
          type:'',
          size:'small',
          style:'',
          click:DelAndFreshWithAll,
          isAuth:1,
        }
      ]
    },
    {
      name:'导出',
      desc:'单独导出按钮',
      params:['精品订单管理', '精品订单详情','充值明细','消费明细','用户奖励','员工奖励','保险服务','检修记录','业务结算','活动中奖','库存报表','出入库明细表','盘点明细表','日报月报','销售统计表','商品销售统计','项目销售统计','采购明细表','挂账单据明细表','挂账还款明细表', '用户统计', '车辆统计','业务统计','活动统计','明细查询', '摇一摇中奖'],
      btn:[
        {
          text:'导出',
          type:'',
          size:'small',
          style:'',
          click:export2Excel,
          isAuth:1,
        }
      ]
    },
    {
      name:'导入',
      desc:'单独导出按钮',
      params:[],
      btn:[
        {
          text:'导入',
          type:'',
          size:'small',
          style:'',
          isAuth:1,
        }
      ],
    },
    {
      name:'会员列表',
      desc:'会员列表定制型',
      params:['会员列表'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:jump2Add,
          isAuth:1,
        },
        {
          text:'分配保养顾问',
          type:'',
          size:'small',
          style:'',
          click:handleDialogForMember,
          isAuth:1,
        },
        {
          text:'分配保险顾问',
          type:'',
          size:'small',
          style:'',
          click:handleDialogForMember,
          isAuth:1,
        },
        {
          text:'分配续保顾问',
          type:'',
          size:'small',
          style:'',
          click:handleDialogForMember,
          isAuth:1,
        },
        {
          text:'导入',
          type:'',
          size:'small',
          style:'',
          click:importExcelWithDialog,
          isAuth:1,
        }
      ]
    },
    {
      name:'导入导出',
      desc:'导入导出定制模板',
      params:['用户卡券管理','查看领取明细'],
      btn:[
        {
          text:'导入',
          type:'',
          size:'small',
          style:'',
          click:importExcelWithDialog,
          isAuth:1,
        },
        {
          text:'导出',
          type:'',
          size:'small',
          style:'',
          click:export2Excel,
          isAuth:1,
        }
      ]
    },
    {
      name:'用户卡券发放',
      desc:'用户卡券发放定制模板',
      params:['用户卡券发放'],
      btn:[
        {
          text:'请选择卡券',
          type:'select',
          size:'small',
          style:'width:140px;',
          prop:'couponList',
          key:'couponID',
          list:[],
          change:handleSelectChangeForTable
        },
        {
          text:'推送数量',
          type:'select',
          size:'small',
          style:'width:140px;',
          prop:'total',
          key:'num',
          list:[],
          change:handleSelectChangeForTable
        },
        {
          text:'根据选中用户推送',
          type:'',
          size:'small',
          style:'',
          click:handleCouponMemberSend,
          isAuth:1,
        },
        {
          text:'根据条件推送',
          type:'',
          size:'small',
          style:'',
          click:handleCouponMemberSend,
          isAuth:1,
        },
        {
          text:'全部推送',
          type:'',
          size:'small',
          style:'',
          click:handleCouponMemberSend,
          isAuth:1,
        },
      ]
    },
    {
      name:'提成日报',
      desc:'提成日报定制模板',
      params:['提成日报'],
      btn:[
        {
          text:'请选择员工',
          type:'select',
          size:'small',
          style:'width:140px;',
          prop:'couponList',
          key:'couponID',
          list:[],
          change:handleSelectChangeForTable
        },
        {
          text:'发放',
          type:'',
          size:'small',
          style:'',
          click:'',
          isAuth:1,
        },
        {
          text:'配置项目提成',
          type:'',
          size:'small',
          style:'',
          click:'',
          isAuth:1,
        },
        {
          text:'配置提成员工',
          type:'',
          size:'small',
          style:'',
          click:'',
          isAuth:1,
        },
      ]
    },
    {
      name:'用户提现记录',
      desc:'用户提现定制模板',
      params:['用户提现记录'],
      btn:[
        {
          text:'导出',
          type:'',
          size:'small',
          style:'',
          click:export2Excel
        },
        {
          text:'提现',
          type:'',
          size:'small',
          style:'',
          click:jump2Add
        }
      ]
    },
    {
      name:'普通活动',
      desc:'市场推广-普通活动,活动抽奖定制模板',
      params:['普通活动','活动抽奖'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:jump2Add,
        },
        {
          text:'下架',
          type:'',
          size:'small',
          style:'',
          click:DelAndFreshWithAll
        }
      ]
    },
    {
      name:'导出删除',
      desc:'导出删除定制模板',
      params:['报名查询','推荐有礼','预约管理','救援服务','意见反馈'],
      btn:[
        {
          text:'导出',
          type:'',
          size:'small',
          style:'',
          click:export2Excel,
        },
        {
          text:'删除',
          type:'',
          size:'small',
          style:'',
          click:DelAndFreshWithAll
        }
      ]
    },
    {
      name:'新增下架',
      desc:'摇一摇活动新增下架定制模板',
      params:['摇一摇活动','问卷调查'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:jump2Add
        },
        {
          text:'下架',
          type:'',
          size:'small',
          style:'',
          click: DownAndFreshWithAll
        }
      ]
    },
    {
      name:'开单导出删除',
      desc:'业务开单模块定制模板',
      params:['业务开单'],
      btn:[
        {
          text:'开单',
          type:'',
          size:'',
          style:'',
        },
        {
          text:'快速开单',
          type:'',
          size:'',
          style:'',
        },
        {
          text:'导出',
          type:'',
          size:'',
          style:'',
        },
        {
          text:'删除',
          type:'',
          size:'',
          style:'',
        }
      ],
    },
    {
      name:'新增删除导出',
      desc:'业务出库模块定制',
      params:['业务出库','业务退货'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'',
          style:'',
          click:jump2AddWithDialog
        },
        {
          text:'删除',
          type:'',
          size:'',
          style:'',
          click:DelAndFreshWithAll
        },
        {
          text:'导出',
          type:'',
          size:'',
          style:'',
        }
      ]
    },
    {
      name:'新增删除导入',
      desc:'业务出库模块定制',
      params:['商品设置', '项目设置'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'',
          style:'',
          click:jump2AddWithDialog
        },
        {
          text:'删除',
          type:'',
          size:'',
          style:'',
          click:DelAndFreshWithAll
        },
        {
          text:'导入',
          type:'',
          size:'',
          style:'',
          click:importExcelWithDialog,
        }
      ]
    },
    {
      name:'我要发布',
      desc:'系统消息发布模块定制',
      params:['系统消息'],
      btn:[
        {
          text:'我要发布',
          type:'',
          size:'',
          style:'',
          click:jump2Add
        },
      ]
    }
  ]
}

const mutations = {

}

const actions = {

}

const getters = {
  getBtnLists : (state,rootGetters) => params => {
    const arr = state.list.filter(item => item.params && item.params.includes(params.name))
    arr.forEach(item => {
      item.btn.forEach(sub => {
        if(sub.prop === 'total'){
          let list = [1,2,5,10,50,100,200]
          sub.list = list.map(item => {return {label: item, value: item}})
        }else if(sub.prop === 'couponList'){
          sub.list = rootGetters.formatCouponList
        }
      })
    })
    return arr[0] ? arr[0].btn : []
  }
}

export default {
  state , mutations , actions , getters
}