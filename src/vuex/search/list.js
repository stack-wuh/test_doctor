import {
  clearSearchForm ,
  handleSearchList,
} from './click'
const state = {
  search:{

  },
  types:[
    {
      name:'门店管理',
      params:['门店管理'],
      type:'',
      list:[
        {
          key:'门店名称',
          type:'input',
          prop:'name',
          value:'',
        },
        {
          key:'类型',
          type:'select',
          prop:'type',
          value:'',
          list:[
            {
              label:'集团',
              value:0
            },
            {
              label:'4s店',
              value:1
            },
            {
              label:'维修点',
              value:2
            }
          ],
        },
        {
          key:'服务开始日期',
          type:'date',
          prop:'start',
          value:'',
        },
        {
          key:'服务结束日期',
          type:'date',
          prop:'end',
          value:'',
        },
        {
          key:'状态',
          type:'select',
          prop:'state',
          value:'',
          list:[
            {
              label:'正常',
              value:1
            },
            {
              label:'禁用',
              value:0
            }
          ],
        }
      ]
    },
    {
      name:'staff',
      type:'',
      params:['员工管理','员工列表','关注用户列表'],
      list:[
        {
          key:'姓名',
          type:'input',
          prop:'realName',
          value:'',
        },
        {
          key:'联系电话',
          type:'input',
          prop:'phone',
          value:'',
        },
        {
          key:'性别',
          type:'select',
          list:[
            {
              label:'男',
              value:'男',
            },
            {
              label:'女',
              value:'女',
            }
          ],
          prop:'sex',
          value:'',
        },
        {
          key:'微信昵称',
          type:'input',
          prop:'nickname',
          value:'',
        }
      ]
    },
    {
      name:'staffAdd',
      type:'',
      list:[
        {
          key:'姓名',
          value:'',
          prop:'',
          type:'input',
        },
        {
          key:'联系电话',
          value:'',
          prop:'',
          type:'input',
        },
        {
          key:'性别',
          value:'',
          prop:'',
          type:'select',
        }
      ]
    },
    {
      name:'保险公司',
      type:'',
      params:['保险公司'],
      list:[
        {
          key:'保险公司名称',
          type:'input',
          value:'',
          prop:'keyword',
        }
      ]
    },
    {
      name:'快捷回复设置',
      type:'',
      params:['快捷回复设置'],
      list:[
        {
          key:'使用角色类型',
          type:'select',
          value:'',
          prop:'roleId',
          list:[
            {
              label:'销售顾问',
              value:0
            },
            {
              label:'续保顾问',
              value:1
            },
            {
              label:'售后顾问',
              value:3
            }
          ]
        }
      ]
    },
    {
      name:'汽车精品管理',
      type:'',
      params:['汽车精品管理'],
      list:[
        {
          key:'配件名称',
          type:'input',
          prop:'name',
          value:'',
        },
        {
          key:'请选择精品大类',
          type:'select',
          prop:'categoryId',
          value:'',
          list:[],
        },
        {
          key:'是否推荐',
          type:'select',
          prop:'recommend',
          value:'',
          list:[
            {
              label:'是',
              value:1
            },
            {
              label:'否',
              value:0
            }
          ],
        },
        {
          key:'积分兑换',
          type:'select',
          prop:'supportIntegralChange',
          value:'',
          list:[
            {
              label:'是',
              value:1,
            },
            {
              label:'否',
              value:0
            }
          ]
        },
        {
          key:'是否直降',
          type:'select',
          prop:'whetherDrop',
          value:'',
          list:[
            {
              label:'是',
              value:1
            },
            {
              label:'否',
              value:0
            }
          ]
        }
      ]
    },
    {
      name:'精品订单管理',
      params:['精品订单管理'],
      type:'',
      list:[
        {
          key:'订单编号',
          type:'input',
          prop:'orderNum',
          value:'',
        },
        {
          key:'姓名',
          type:'input',
          prop:'name',
          value:'',
        },
        {
          key:'联系电话',
          type:'input',
          prop:'telephone',
          value:'',
        },
        {
          key:'配件名称',
          type:'input',
          prop:'commodityName',
          value:'',
        },
        {
          key:'状态',
          type:'select',
          prop:'state',
          value:'',
          list:[
            {
              label:'未支付',
              value:'0'
            },
            {
              label:'已支付',
              value:1
            },
            {
              label:'已提货',
              value:2
            }
          ],
        },
        {
          key:'订单开始日期',
          type:'date',
          value:'',
          prop:'orderDate',
        },
        {
          key:'订单结束日期',
          type:'date',
          value:'',
          prop:'orderEnd',
        },
        {
          key:'提货开始日期',
          type:'date',
          value:'',
          prop:'deliveryDate',
        },
        {
          key:'提货结束日期',
          type:'date',
          value:'',
          prop:'deliveryEnd',
        }
      ]
    },
    {
      name:'配件大类管理',
      params:['配件大类管理'],
      type:'',
      list:[
        {
          key:'精品大类名称',
          type:'input',
          value:'',
          prop:'category',
        }
      ]
    },
    {
      name:'会员列表',
      type:'',
      params:['会员列表'],
      list:[
        {
          key:'姓名',
          type:'input',
          prop:'realName',
          value:'',
        },
        {
          key:'联系电话',
          type:'input',
          prop:'phone',
          value:'',
        },
        {
          key:'会员等级',
          type:'select',
          prop:'grade',
          value:'',
          list:[
            {
              label:'普通会员1',
              value:1
            }
          ],
        },
        {
          key:'性别',
          type:'select',
          prop:'sex',
          value:'',
          list:[
            {
              label:'男',
              value:'男',
            },
            {
              label:'女',
              value:'女',
            }
          ],
        },
        // {
        //   key:'顾问类型',
        //   type:'select',
        //   prop:'state',
        //   value:'',
        //   list:[
        //     {
        //       label:'保养顾问',
        //       value:1,
        //     },
        //     {
        //       label:'保险顾问',
        //       value:2,
        //     },
        //     {
        //       label:'续保顾问',
        //       value:3
        //     }
        //   ]
        // },
        {
          key:'保养顾问',
          type:'select',
          prop:'upkeepEmployee',
          value:'',
          list:[]
        },
        {
          key:'保险顾问',
          type:'select',
          prop:'safeEmployee',
          value:'',
          list:[]
        },
        {
          key:'续保顾问',
          type:'select',
          prop:'renewEmployee',
          value:'',
          list:[]
        },
        {
          key:'状态',
          type:'select',
          prop:'attentionState',
          value:'',
          list:[
            {
              label:'已关注',
              value:1,
            },
            {
              label:'未关注',
              value:0
            }
          ],
        },
        {
          key:'推荐人',
          type:'input',
          prop:'userName',
          value:'',
        },
        {
          key:'车牌号',
          type:'input',
          prop:'plateNum',
          value:'',
        },
        {
          key:'车型',
          type:'input',
          prop:'carModel',
          value:'',
        },
        {
          key:'关注开始日期',
          type:'date',
          prop:'startCreateTime',
          value:'',
        },
        {
          key:'关注结束日期',
          type:'date',
          prop:'endCreateTime',
          value:'',
        },
        {
          key:'积分区间(最小值)',
          type:'input',
          prop:'minIntegral',
          value:'',
        },
        {
          key:'积分区间(最大值)',
          type:'input',
          prop:'maxIntegral',
          value:'',
        },
      ]
    }, 
    {
      name:'会员充值',
      type:'',
      params:['会员充值'],
      list:[
        {
          key:'会员姓名',
          type:'input',
          prop:'realName',
          value:'',
        },
        {
          key:'联系电话',
          type:'input',
          prop:'phone',
          value:'',
        },
        {
          key:'车牌号',
          type:'input',
          prop:'plateNum',
          value:'',
        },
      ]
    },
    {
      name:'车辆管理',
      type:'',
      params:['车辆管理'],
      list:[
        {
          key:'姓名',
          type:'input',
          prop:'name',
          value:'',
        },
        {
          key:'联系电话',
          type:'input',
          prop:'telephone',
          value:'',
        },
        {
          key:'上次开始保养日期',
          type:'date',
          prop:'startLastMaintainTime',
          value:'',
        },
        {
          key:'上次保养结束日期',
          type:'date',
          prop:'endLastMaintainTime',
          value:'',
        },
        {
          key:'保养到期',
          type:'select',
          prop:'maintainState',
          value:'',
          list:[
            {
              label:'已到期',
              value:1
            },
            {
              label:'未到期',
              value:0
            }
          ]
        },
        {
          key:'保险购买开始日期',
          type:'date',
          prop:'StartInsuranceStart',
          value:'',
        },
        {
          key:'保险购买结束日期',
          type:'date',
          prop:'endInsuranceStart',
          value:'',
        },
        {
          key:'保险到期',
          type:'select',
          prop:'insuranceState',
          value:'',
          list:[
            {
              label:'已到期',
              value:1,
            },
            {
              label:'未到期',
              value:0
            }
          ]
        },
        {
          key:'车型',
          type:'input',
          prop:'carModel',
          value:'',
        },
        {
          key:'车牌号',
          type:'input',
          prop:'plateNum',
          value:'',
        }
      ]
    },
    {
      name:'发布抽奖模板',
      params:['编辑抽奖模板'],
      type:'',
      list:[
        {
          key:'模板名称',
          type:'input',
          prop:'',
          value:'',
        },
        {
          key:'简介',
          type:'input',
          prop:'',
          value:'',
        }
      ]
    },
    {
      name:'用户佣金提现',
      params:['用户佣金提现'],
      type:'',
      list:[
        {
          key:'姓名',
          type:'input',
          prop:'realName',
          value:'',
        },
        {
          key:'联系电话',
          type:'input',
          prop:'phone',
          value:'',
        },
        {
          key:'车牌号',
          type:'input',
          prop:'carNumber',
          value:'',
        }
      ],
    },
    {
      name:'积分管理',
      params:['积分管理'],
      type:'',
      list:[
        {
          key:'会员姓名',
          type:'input',
          prop:'realName',
          value:'',
        },
        {
          key:'联系电话',
          type:'input',
          prop:'phone',
          value:'',
        },
        {
          key:'微信昵称',
          type:'input',
          prop:'nickName',
          value:'',
        },
        {
          key:'积分发生开始日期',
          type:'date',
          prop:'startOperationTime',
          value:'',
        },
        {
          key:'积分发生结束日期',
          type:'date',
          prop:'endOperationTime',
          value:'',
        },
        {
          key:'会员等级',
          type:'select',
          prop:'memberId',
          value:'',
        },
        {
          key:'积分改变类型',
          type:'select',
          prop:'type',
          value:'',
          list:[
            {
              label:'增加',
              value:1,
            },
            {
              label:'减少',
              value:0
            }
          ]
        },
        {
          key:'业务类型',
          type:'select',
          prop:'businessType',
          value:'',
        },
      ]
    },  
    {
      name:'充值明细',
      params:['充值明细'],
      type:'',
      list:[
        {
          key:'订单号',
          type:'input',
          prop:'orderNum',
          value:'',
        },
        {
          key:'会员姓名',
          type:'input',
          prop:'realName',
          value:'',
        },
        {
          key:'联系电话',
          type:'input',
          prop:'phone',
          value:'',
        },
        {
          key:'操作人',
          type:'input',
          prop:'employeeName',
          value:'',
        },
        {
          key:'充值方式',
          type:'select',
          prop:'rechargeType',
          value:'',
          list:[],
        },
        {
          key:'开始日期',
          type:'date',
          prop:'startCreateTime',
          value:'',
        },
        {
          key:'结束日期',
          type:'date',
          prop:'endCreateTime',
          value:'',
        },
      ]
    }, 
    {
      name:'消费明细',
      params:['消费明细'],
      type:'',
      list:[
        {
          key:'会员姓名',
          type:'input',
          prop:'realName',
          value:'',
        },
        {
          key:'联系电话',
          type:'input',
          prop:'phone',
          value:'',
        },
        {
          key:'车牌号',
          type:'input',
          prop:'plateNum',
          value:'',
        },
        {
          key:'选择消费项目',
          type:'select',
          prop:'mealName',
          value:'',
          list:[
            {
              label:'一般维修',
              value:'一般维修',
            },
            {
              label:'购买保险',
              value:'购买保险',
            },
            {
              label:'美容洗车',
              value:'美容洗车',
            },
            {
              label:'汽车精品',
              value:'汽车精品',
            },
            {
              label:'套餐销售',
              value:'套餐销售',
            },
            {
              label:'其他',
              value:'其他',
            },
          ]
          
        },
        {
          key:'会员卡扣除状态',
          type:'select',
          prop:'status',
          value:'',
          list:[
            {
              label:'已扣除',
              value:1
            },
            {
              label:'未扣除',
              value:0,
            }
          ],
        },
        {
          key:'开始日期',
          type:'date',
          prop:'startTime',
          value:''
        },
        {
          key:'结束日期',
          type:'date',
          prop:'endTime',
          value:'',
        },
      ]
    },
    {
      name:'奖品卡券管理',
      params:['奖品卡券管理'],
      type:'',
      list:[
        {
          key:'卡券名称',
          type:'input',
          prop:'couponName',
          value:'',
        },
        {
          key:'奖品卡券类型',
          type:'select',
          prop:'couponType',
          value:'',
          list:[
            {
              label:'实物奖品',
              value: 0
            },
            {
              label:'电子代金券',
              value:1
            }
          ],
        },
        {
          key:'有效日期',
          type:'date',
          prop:'validDays',
          value:'',
        }
      ]
    },
    {
      name:'抽奖模板设置',
      params:['抽奖模板设置'],
      type:'',
      list:[
        {
          key:'模板名称',
          type:'input',
          prop:'name',
          default:'',
        }
      ]
    },
    {
      name:'用户卡券管理',
      params:['用户卡券管理','查看领取明细'],
      type:'',
      list:[
        {
          key:'姓名',
          prop:'realName',
          type:'input',
          value:''
        },
        {
          key:'联系电话',
          prop:'phone',
          type:'input',
          value:''
        },
        {
          key:'卡券名称',
          prop:'couponName',
          type:'input',
          value:''
        },
        {
          key:'卡券编号',
          prop:'codeNum',
          type:'input',
          value:''
        },
        {
          key:'类型',
          prop:'couponType',
          type:'select',
          value:'',
          list:[
            {
              label:'实物奖品',
              value:0
            },
            {
              label:'电子代金券',
              value:1
            }
          ]
        },
        {
          key:'获取开始日期',
          prop:'StartDate',
          type:'date',
          value:''
        },
        {
          key:'获取结束日期',
          prop:'EndDate',
          type:'date',
          value:''
        },
        {
          key:'状态',
          prop:'state',
          type:'select',
          value:'',
          list:[
            {
              label:'未使用',
              value:0
            },
            {
              label: '已使用',
              value:1
            },
            {
              label:'已过期',
              value:2
            }
          ]
        },
        {
          key:'卡券来源',
          prop:'reserved1',
          type:'select',
          value:'',
          list:[]
        },
      ]
    },
    {
      name:'用户卡券发放',
      params:['用户卡券发放'],
      type:'',
      list:[
        {
          key:'姓名',
          value:'',
          type:'default',
          prop:'name',
        },
        {
          key:'联系电话',
          value:'',
          type:'default',
          prop:'phone',
        },
        {
          key:'车型',
          value:'',
          type:'default',
          prop:'carModel',
        },
        {
          key:'车牌',
          value:'',
          type:'default',
          prop:'carNum',
        },
        {
          key:'性别',
          value:'',
          type:'select',
          prop:'sex',
          list:[
            {
              label:'男',
              value:1
            },
            {
              label:'女',
              value:0
            }
          ],
        },
        {
          key:'会员等级',
          value:'',
          type:'select',
          prop:'memberId',
          list:[],
        },
        {
          key:'销售顾问',
          value:'',
          type:'select',
          prop:'saleEmployeeName',
          list:[],
        },
        {
          key:'保养顾问',
          value:'',
          type:'select',
          prop:'upKeepEmployeeName',
          list:[],
        },
        {
          key:'保险顾问',
          value:'',
          type:'select',
          prop:'safeEmployeeName',
          list:[],
        },
        {
          key:'续保顾问',
          value:'',
          type:'select',
          prop:'renewEmplyoeeName',
          list:[],
        },
        {
          key:'个人信息是否完善',
          value:'',
          type:'select',
          prop:'personlInfo',
          list:[
            {
              label:'已完善',
              value:1
            },
            {
              label:'未完善',
              value:0
            }
          ],
        },
        {
          key:'车辆信息是否完善',
          value:'',
          type:'select',
          prop:'carInfo',
          list:[
            {
              label:'已完善',
              value:1
            },
            {
              label:'未完善',
              value:0
            }
          ],
        },
      ]
    },
    {
      name:'用户提现',
      params:['用户提现记录'],
      type:'',
      list:[
        {
          key:'姓名',
          value:'',
          type:'default',
          prop:'realName',
        },
        {
          key:'联系电话',
          value:'',
          type:'default',
          prop:'phone',
        },
        {
          key:'车牌号',
          value:'',
          type:'default',
          prop:'carNumber',
        },
        {
          key:'提现开始日期',
          value:'',
          type:'date',
          prop:'startDate',
        },
        {
          key:'提现结束日期',
          value:'',
          type:'date',
          prop:'endDate',
        }
      ],
    },
    {
      name:'用户奖励',
      params:['用户奖励'],
      type:'',
      list:[
        {
          key:'用户姓名',
          value:'',
          type:'default',
        },
        {
          key:'联系电话',
          value:'',
          type:'default',
        },
        {
          key:'奖励类型',
          value:'',
          type:'select',
        },
        {
          key:'活动卡券',
          value:'',
          type:'select',
        },
        {
          key:'消费最小金额',
          value:'',
          type:'input',
        },
        {
          key:'消费最大金额',
          value:'',
          type:'input',
        },
        {
          key:'返利开始日期',
          value:'',
          type:'date',
        },
        {
          key:'返利结束日期',
          value:'',
          type:'date',
        },
        {
          key:'单词分享用户数',
          value:'',
          type:'select',
        },
        {
          key:'奖励金额',
          value:'',
          type:'select',
        }
      ]
    },
    {
      name:'员工奖励',
      params:['员工奖励'],
      type:'',
      list:[
        {
          key:'员工姓名',
          value:'',
          type:'default',
          prop:'name',
        },
        {
          key:'联系电话',
          value:'',
          type:'default',
          prop:'phone',
        },
        {
          key:'消费最小金额',
          value:'',
          type:'input',
          prop:'minMoney',
        },
        {
          key:'消费最大金额',
          value:'',
          type:'input',
          prop:'maxMoney',
        },
        {
          key:'奖励开始日期',
          value:'',
          type:'date',
          prop:'startDate',
        },
        {
          key:'奖励结束日期',
          value:'',
          type:'date',
          prop:'endDate',
        },
        {
          key:'活动卡券',
          value:'',
          type:'select',
          prop:'activityCard',
        },
        {
          key:'发放状态',
          value:'',
          type:'select',
          prop:'status',
          list:[
            {
              label:'已发放',
              value:1
            },
            {
              label:'未发放',
              value:0
            }
          ]
        },
        {
          key:'奖励类型',
          value:'',
          type:'select',
          prop:'rewardType',
          list:[
            {
              label:'分享',
              value:1
            },
            {
              label:'消费',
              value:0
            }
          ]
        }
      ]
    },
    {
      name:'普通活动',
      params:['普通活动','活动抽奖'],
      type:'',
      list:[
        {
          key:'活动标题',
          value:'',
          type:'default',
        },
        {
          key:'活动开始日期',
          value:'',
          type:'date',
        },
        {
          key:'活动结束日期',
          value:'',
          type:'date',
        },
        {
          key:'发布开始日期',
          value:'',
          type:'date',
        },
        {
          key:'发布结束日期',
          value:'',
          type:'date',
        },
        {
          key:'活动栏目',
          value:'',
          type:'select',
        },
        {
          key:'全部活动',
          value:'',
          type:'select',
        },
      ],
    },
    {
      name:'精准获客',
      params:['精准获客'],
      type:'',
      list:[
        {
          key:'姓名',
          value:'',
          type:'default',
        },
        {
          key:'联系电话',
          value:'',
          type:'date',
        },
        {
          key:'是否精准客户',
          value:'',
          type:'date',
        },
        {
          key:'是否转发',
          value:'',
          type:'date',
        },
        {
          key:'活动开始日期',
          value:'',
          type:'date',
        },
        {
          key:'活动结束日期',
          value:'',
          type:'select',
        },
      ],
    },
    {
      name:'报名查询',
      params:['报名查询'],
      type:'',
      list:[
        {
          key:'参与人姓名',
          value:'',
          type:'default',
        },
        {
          key:'参与人联系电话',
          value:'',
          type:'default',
        },
        {
          key:'推荐人姓名',
          value:'',
          type:'default',
        },
        {
          key:'推荐人联系电话',
          value:'',
          type:'default',
        },
        {
          key:'活动开始日期',
          value:'',
          type:'date',
        },
        {
          key:'活动结束日期',
          value:'',
          type:'select',
        },
        {
          key:'报名状态',
          value:'',
          type:'select',
        },
        {
          key:'支付状态',
          value:'',
          type:'select',
        },
      ],
    },
    {
      name:'推荐有礼',
      params:['推荐有礼'],
      type:'',
      list:[
        {
          key:'推荐人手机号',
          value:'',
          type:'default',
        },
        {
          key:'被推荐人手机号',
          value:'',
          type:'default',
        },
        {
          key:'推荐类型',
          value:'',
          type:'select',
        },
        {
          key:'推荐状态',
          value:'',
          type:'select',
        },
        {
          key:'推荐开始日期',
          value:'',
          type:'date',
        },
        {
          key:'推荐结束日期',
          value:'',
          type:'date',
        },
      ],
    },
    {
      name:'摇一摇活动',
      params:['摇一摇活动'],
      type:'',
      list:[
        {
          key:'场次名称',
          value:'',
          type:'default',
        },
        {
          key:'发布开始日期',
          value:'',
          type:'date',
        },
        {
          key:'发布结束日期',
          value:'',
          type:'date',
        },
        {
          key:'活动状态',
          value:'',
          type:'select',
        }
      ],
    },
    {
      name:'摇一摇活动中奖查询',
      params:['摇一摇中奖'],
      type:'',
      list:[
        {
          key:'参与人姓名',
          value:'',
          type:'default',
        },
        {
          key:'参与人联系电话',
          value:'',
          type:'default',
        },
      ],
    },
    {
      name:'预约管理',
      params:['预约管理'],
      type:'',
      list:[
        {
          key:'姓名',
          value:'',
          type:'default',
        },
        {
          key:'联系电话',
          value:'',
          type:'default',
        },
        {
          key:'预约类型',
          value:'',
          type:'select',
        },
        {
          key:'预约状态',
          value:'',
          type:'select',
        },
        {
          key:'预约开始时间',
          value:'',
          type:'date',
        },
        {
          key:'预约结束时间',
          value:'',
          type:'date',
        },
      ]
    },
    {
      name:'保险服务',
      params:['保险服务'],
      type:'',
      list:[
        {
          key:'姓名',
          value:'',
          type:'default',
        },
        {
          key:'联系电话',
          value:'',
          type:'default',
        },
        {
          key:'状态',
          value:'',
          type:'select',
        },
      ]
    },
    {
      name:'检修记录',
      params:['检修记录'],
      type:'',
      list:[
        {
          key:'姓名',
          value:'',
          type:'default',
        },
        {
          key:'联系电话',
          value:'',
          type:'default',
        },
        {
          key:'车牌',
          value:'',
          type:'default',
        },
        {
          key:'检测开始时间',
          value:'',
          type:'date',
        },
        {
          key:'检测结束时间',
          type:'date',
          value:'',
        }
      ]
    },
    {
      name:'救援服务',
      params:['救援服务'],
      type:'',
      list:[
        {
          key:'姓名',
          value:'',
          type:'default',
        },
        {
          key:'联系电话',
          value:'',
          type:'default',
        },
      ]
    },
    {
      name:'养车知识',
      params:['养车知识'],
      type:'',
      list:[
        {
          key:'文章标题',
          value:'',
          type:'default',
        },
        {
          key:'文章类别',
          value:'',
          type:'select'
        }
      ]
    },
    {
      name:'业务开单',
      params:['业务开单'],
      type:'',
      list:[
        {
          key:'业务单号',
          value:'',
          type:'default',
        },
        {
          key:'会员名称',
          value:'',
          type:'default',
        },
        {
          key:'会员电话',
          value:'',
          type:'default'
        },
        {
          key:'车牌号',
          value:'',
          type:'default'
        },
        {
          key:'开始时间',
          value:'',
          type:'date'
        },
        {
          key:'结束时间',
          value:'',
          type:'date'
        },
      ]
    },
    {
      name:'意见反馈',
      params:['意见反馈'],
      type:'',
      list:[
        {
          key:'姓名',
          value:'',
          type:'default',
        },
        {
          key:'联系电话',
          value:'',
          type:'default',
        },
        {
          key:'反馈开始时间',
          value:'',
          type:'date'
        },
        {
          key:'反馈结束时间',
          value:'',
          type:'date'
        },
        {
          key:'回复状态',
          value:'',
          type:'select'
        },
        {
          key:'反馈类型',
          value:'',
          type:'select'
        },
      ]
    },
    {
      name:'业务结算',
      params:['业务结算'],
      type:'',
      list:[
        {
          key:'业务单号',
          value:'',
          type:'default',
        },
        {
          key:'会员名称',
          value:'',
          type:'default',
        },
        {
          key:'会员电话',
          value:'',
          type:'default',
        },
        {
          key:'车牌号',
          value:'',
          type:'default',
        },
        {
          key:'开始时间',
          value:'',
          type:'date'
        },
        {
          key:'结束时间',
          value:'',
          type:'date'
        },
        {
          key:'回复状态',
          value:'',
          type:'select',
          list:[
            {
              label:'已结算',
              value:1,
            },
            {
              label:'未结算',
              value:0,
            }
          ],
        },
      ]
    },
    {
      name:'业务出库',
      params:['业务出库'],
      type:'',
      list:[
        {
          key:'商品出库单号',
          value:'',
          type:'default',
        },
        {
          key:'开始时间',
          value:'',
          type:'date',
        },
        {
          key:'结束时间',
          value:'',
          type:'date',
        }
      ]
    },
    {
      name:'业务退货',
      params:['业务退货'],
      type:'',
      list:[
        {
          key:'商品退货单号',
          value:'',
          type:'default',
        },
        {
          key:'开始时间',
          value:'',
          type:'date',
        },
        {
          key:'结束时间',
          value:'',
          type:'date',
        }
      ]
    },
    {
      name:'套餐管理',
      params:['套餐管理'],
      type:'',
      list:[
        {
          key:'套餐名称',
          value:'',
          type:'default',
        },
        {
          key:'套餐状态',
          value:'',
          type:'select',
          list:[
            {
              label:'已启用',
              value:1
            },
            {
              label:'已停用',
              value:0
            }
          ]
        }
      ]
    },
    {
      name:'套餐销售',
      params:['套餐销售'],
      type:'',
      list:[
        {
          key:'销售单号',
          value:'',
          type:'default',
        },
        {
          key:'销售名称',
          value:'',
          type:'default',
        },
        {
          key:'会员名称',
          value:'',
          type:'default',
        },
        {
          key:'会员电话',
          value:'',
          type:'default',
        },
        {
          key:'车牌号',
          value:'',
          type:'default',
        },
        {
          key:'销售人员',
          value:'',
          type:'default',
        },
        {
          key:'销售开始时间',
          value:'',
          type:'date',
        },
        {
          key:'销售结束时间',
          value:'',
          type:'date',
        },
      ]
    },
    {
      name:'会员套餐记录',
      params:['会员套餐记录'],
      type:'',
      list:[
        {
          key:'套餐名称',
          value:'',
          type:'default',
        },
        {
          key:'会员名称',
          value:'',
          type:'default',
        },
        {
          key:'会员电话',
          value:'',
          type:'default',
        },
        {
          key:'车牌号',
          value:'',
          type:'default',
        },
        {
          key:'是否停用',
          value:'',
          type:'select',
          list:[
            {
              label:'已启用',
              value:1
            },
            {
              label:'已停用',
              value:0
            }
          ],
        },
      ]
    },
    {
      name:'采购订单',
      params:['采购订单','采购入库','采购退货'],
      type:'',
      list:[
        {
          key:'采购订单号',
          value:'',
          type:'default',
        },
        {
          key:'开始时间',
          value:'',
          type:'date',
        },
        {
          key:'结束时间',
          value:'',
          type:'date',
        }
      ]
    },
    {
      name:'财务管理',
      params:['付款管理','挂账还款','调拨发起','调拨接收','日常盘点'],
      list:[
        {
          key:'订单号',
          type:'default',
        },
        {
          key:'开始时间',
          type:'date',
        },
        {
          key:'结束时间',
          type:'date',
        }
      ],
    },
    {
      name:'供应商设置',
      params:['供应商设置'],
      list:[
        {
          key:'供应商名称',
          type:'default',
        },
        {
          key:'联系人姓名',
          type:'date',
        },
      ],
    },
    {
      name:'仓库设置',
      params:['仓库设置'],
      list:[
        {
          key:'仓库名称',
          type:'default',
        },
        {
          key:'联系电话',
          type:'default',
        },
        {
          key:'仓库管理员',
          type:'default',
        },
        {
          key:'地址',
          type:'default',
        },
      ],
    },
    {
      name:'商品分类设置',
      params:['商品分类设置'],
      list:[
        {
          key:'商品类型',
          type:'default'
        }
      ]
    },
    {
      name:'商品设置',
      params:['商品设置'],
      list:[
        {
          key:'商品类型',
          type:'default'
        },
        {
          key:'商品名称',
          type:'default'
        },
        {
          key:'是否展示',
          type:'select',
          list:[
            {
              label:'是',
              value:1
            },
            {
              label:'否',
              value:0
            }
          ]
        },
      ]
    },
    {
      name:'项目分类设置',
      params:['项目分类设置'],
      list:[
        {
          key:'项目类型',
          type:'default'
        }
      ]
    },
    {
      name:'项目设置',
      params:['项目设置'],
      list:[
        {
          key:'项目类型',
          type:'default',
        },
        {
          key:'项目名称',
          type:'default',
        }
      ]
    },
    {
      name:'物流公司配置',
      params:['物流公司配置'],
      list:[
        {
          key:'物流公司名称',
          type:'default',
        },
        {
          key:'联系电话',
          type:'default',
        },
        {
          key:'仓库管理员',
          type:'default',
        },
        {
          key:'地址',
          type:'default',
        }
      ]
    },
    {
      name:'支付方式配置',
      params:['支付方式配置'],
      list:[
        {
          key:'支付方式名称',
          type:'default',
        }
      ]
    },
  ],
  btnList:[
    {
      name:'门店管理',
      type:'',
      params:['门店管理'],
      list:[
        {
          text:'查询',
          type:'default',
          size:'small',
          click:'',
        },
        {
          text:'重置',
          type:'default',
          size:'small',
          click:clearSearchForm,
        },
        {
          text:'当前机构',
          type:'default',
          size:'small',
          click:''
        }
      ]
    },
    {
      name:'查询重置类别',
      params:['员工列表','快捷回复设置','汽车精品管理','精品订单管理','配件大类管理','会员列表','车辆管理','会员充值','积分管理','充值明细','消费明细','奖品卡券管理','用户卡券管理','用户卡券发放','用户奖励','员工奖励','用户提现记录','查看领取明细','用户佣金提现','普通活动','精准获客','活动抽奖','推荐有礼','预约管理','意见反馈','业务开单','业务结算','套餐销售','会员套餐记录'],
      type:'',
      list:[
        {
          text:'查询',
          type:'default',
          size:'small',
          click:handleSearchList,
        },
        {
          text:'重置',
          type:'default',
          size:'small',
          click:clearSearchForm,
        }
      ]
    },
    
  ]
}

const actions = {}

const mutations = {}

const getters = {
  getSearchListByPrams : (state, rootGetters, rootState) => parmas => {
    let arr =  state.types.filter(item => item.params && item.params.includes(parmas.name))
    arr.map(item => {
      item.list.map(sub => {
        if(sub.key === '请选择精品大类' && sub.type === 'select'){
          sub.list = rootGetters.formatCarTypeList
        }else if(sub.key === '卡券类型' && sub.type === 'select'){
          sub.list = rootGetters.formatCouponList
        }else if(sub.key === '会员等级'){
          sub.list = rootGetters.formatMemberList
        }else if(sub.key === '业务类型'){
          sub.list = rootState.Member.tempArr1
        }else if(sub.key === '充值方式'){
          sub.list = rootState.Member.tempArr1
        }else if(sub.key === '活动卡券'){
          sub.list = rootGetters.formatCouponActivityList
        }else if(sub.key === '保养顾问'){
          sub.list = rootState.upKeepList
        }else if(sub.key === '保险顾问'){
          sub.list = rootState.inSuranceList
        }else if(sub.key === '续保顾问'){
          sub.list = rootState.renewList
        }else if(sub.key === '卡券来源'){
          sub.list = rootGetters.formatCouponSrouce
        }
        return {...sub}
      })
      return {...item}
    })
    return arr[0] ? arr[0].list : []
    // return state.types.find(item => item.params && item.params.includes(parmas.name) ? item : []).list
  },
  getSearchBtnsByParams :state => params => {
    const arr = state.btnList.filter(item => item.params && item.params.includes(params.name))
    return arr[0] ? arr[0].list : []
    // return state.btnList.find(item => item.params && item.params.includes(params.name) ? item : []).list
  }
}

export default {
  state , actions , mutations , getters
}