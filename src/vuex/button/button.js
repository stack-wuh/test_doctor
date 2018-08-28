import {
  jump2Detail ,
  jump2Add , 
  jump2AddWithDialog ,
  DelAndFreshWithAll ,
  export2Excel ,
} from './click'
import { openDialog } from '../tables/click';
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
        },
        {
          text:'导出',
          type:'',
          size:'small',
          style:'',
          click:export2Excel,
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
        },
        {
          text:'导出',
          type:'',
          size:'small',
          style:'',
          click:jump2Detail,
        }
      ]
    },
    {
      name:'新增',
      desc:'单独一个新增按钮,路由跳转到指定的页面',
      params:['员工列表','检修项配置','专项检测配置'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:jump2Add
        }
      ]
    },{
      name:'新增',
      desc:'单独一个新增按钮,出现dialog对话框',
      params:['部门管理','会员卡等级设置','角色管理'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:jump2AddWithDialog
        }
      ]
    },
    {
      name:'新增删除',
      desc:'新增删除按钮组(表格顶部批量删除),弹出一个dialog对话框',
      params:['会员充值设置','保养提醒设置','保险公司','快捷回复设置','配件大类管理','预约时间管理','养车知识','养车知识分类','套餐管理','采购订单','采购入库','采购退货','付款管理','调拨接收','调拨发起','日常盘点'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:jump2AddWithDialog
        },
        {
          text:'删除',
          type:'',
          size:'small',
          style:'',
          click:DelAndFreshWithAll,
        }
      ]
    },
    {
      name:'新增删除',
      desc:'新增删除按钮组(包括表格顶部批量删除),跳转到指定地址',
      params:['自动回复配置','汽车精品管理','奖品卡券管理','抽奖模板设置','摇一摇活动'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
          click:jump2Add
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
      name:'导出',
      desc:'单独导出按钮',
      params:['精品订单管理','充值明细','消费明细','用户奖励','员工奖励','保险服务','检修记录','业务结算'],
      btn:[
        {
          text:'导出',
          type:'',
          size:'small',
          style:'',
          click:export2Excel
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
        },
        {
          text:'分配保养顾问',
          type:'',
          size:'small',
          style:'',
        },
        {
          text:'分配保险顾问',
          type:'',
          size:'small',
          style:'',
        },
        {
          text:'分配续保顾问',
          type:'',
          size:'small',
          style:'',
        },
        {
          text:'导入',
          type:'',
          size:'small',
          style:'',
        }
      ]
    },
    {
      name:'导入导出',
      desc:'导入导出定制模板',
      params:['用户卡券管理'],
      btn:[
        {
          text:'导入',
          type:'',
          size:'small',
          style:'',
        },
        {
          text:'导出',
          type:'',
          size:'small',
          style:'',
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
        },
        {
          text:'推送数量',
          type:'select',
          size:'small',
          style:'width:140px;',
        },
        {
          text:'根据选中用户推送',
          type:'',
          size:'small',
          style:'',
        },
        {
          text:'根据条件推送',
          type:'',
          size:'small',
          style:'',
        },
        {
          text:'全部推送',
          type:'',
          size:'small',
          style:'',
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
        },
        {
          text:'提现',
          type:'',
          size:'small',
          style:'',
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
        },
        {
          text:'删除',
          type:'',
          size:'small',
          style:'',
        }
      ]
    },
    {
      name:'新增下架',
      desc:'摇一摇活动新增下架定制模板',
      params:['摇一摇活动'],
      btn:[
        {
          text:'新增',
          type:'',
          size:'small',
          style:'',
        },
        {
          text:'下架',
          type:'',
          size:'small',
          style:'',
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
        },
        {
          text:'删除',
          type:'',
          size:'',
          style:'',
        },
        {
          text:'导出',
          type:'',
          size:'',
          style:'',
        }
      ]
    }
  ]
}

const mutations = {

}

const actions = {

}

const getters = {
  getBtnLists : state => params => {
    const arr = state.list.filter(item => item.params && item.params.includes(params.name))
    return arr[0] ? arr[0].btn : []
    // return state.list.find(item => item.params && item.params.includes(params.name) ? item : []).btn
  }
}

export default {
  state , mutations , actions , getters
}