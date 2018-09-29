import {MaxNumberValue, MaxCouponNumber, validPhone, validNoNum, validEmail, validDate, positiveNumber, validIntegral} from '../../../utils/valid'

export const forms = [
  {
    name:'部门管理',
    list:[
      {
        key:'部门名称',
        type:'input',
        prop:'depName',
        rules:[
          {
            required:true,
            message:'请编辑部门名称',
            trigger:'blur'
          }
        ]
      },
      {
        key:'上级部门',
        type:'select',
        prop:'parentId',
        list:[
          {
            label:'总经办',
            value:1,
          },
          {
            label:'销售部',
            value:2
          },
          {
            label:'客服部',
            value:3
          },
          {
            label:'保险部',
            value:4,
          },
          {
            label:'市场部',
            value:5
          }
        ],
        rules:[
          {
            required:false,
            message:'请选择上级部门',
            trigger:['blur','change']
          }
        ]
      },
      {
        key:'状态',
        type:'select',
        prop:'state',
        list:[
          {
            label:'启用',
            value:1,
          },
          {
            label:'禁用',
            value:0,
          }
        ],
        rules:[
          {
            required:true,
            message:'请选择状态',
            trigger:['change','blur'],
          }
        ]
      },
      {
        key:'描述',
        type:'input',
        prop:'descInfo',
        rules:[
          {
            required:false,
            message:'请编辑部门名称',
            trigger:'blur'
          }
        ]
      }
    ],
    myForm:{
      depName:'',
      parentId:'',
      descInfo:'',
      state:'',
    }
  },
  {
    name:'角色权限',
    list:[
      {
        key:'名称',
        prop:'name',
        type:'input',
        rules:[
          {
            required:true,
            message:'请编辑',
            trigger:'blur'
          }
        ],
      },
      {
        key:'类型',
        prop:'type',
        type:'select',
        rules:[
          {
            required:true,
            message:'请编辑',
            trigger:['change','blur']
          }
        ],
      },
      {
        key:'描述',
        prop:'desc',
        type:'input',
        rules:[
          {
            required:true,
            message:'请编辑',
            trigger:'blur'
          }
        ],
      }
    ],
    myForm:{
      name:'',
      type:'',
      desc:'',
    }
  },
  {
    name:'员工列表',
    list:[
      {
        key:'所属部门',
        type:'select',
        prop:'departmentId',
        rules:[
          {
            required:true,
            message:'请选择所属部门',
            trigger:'change'
          }
        ],
        list:[
          {
            value:'1',
            label:'销售部',
          }
        ],
      },
      {
        key:'员工角色',
        type:'select',
        prop:'roleId',
        rules:[
          {
            required:true,
            message:'请选择员工角色',
            trigger:'change'
          }
        ],
        list:[
          {
            label:'普通用户',
            value:0,
          },
          {
            label:'保养顾问',
            value:1
          },
          {
            label:'续保顾问',
            value:2
          },
          {
            label:'保险顾问',
            value:3
          }
        ],
      },
      {
        key:'员工姓名',
        type:'input',
        prop:'realName',
        rules:[
          {
            required:true,
            message:'请编辑员工姓名',
            trigger:'blur'
          }
        ],
      },
      {
        key:'员工性别',
        type:'select',
        prop:'sex',
        rules:[
          {
            required:true,
            message:'请选择员工性别',
            trigger:'change'
          }
        ],
        list:[
          {
            label:'男',
            value:1,
          },
          {
            label:'女',
            value:0
          }
        ],
      },
      {
        key:'手机号码',
        type:'input',
        prop:'phone',
        rules:[
          {
            required:true,
            validator:validPhone,
            trigger:'change'
          }
        ],
      },
      {
        key:'出生日期',
        type:'date',
        prop:'birthday',
        rules:[
          {
            required:true,
            validator:validDate,
            trigger:'change'
          }
        ],
      },
      {
        key:'登录账号',
        type:'input',
        prop:'username',
        rules:[
          {
            required:true,
            message:'请编辑登录账号',
            trigger:'input'
          }
        ],
      },
      {
        key:'登录密码',
        type:'input',
        prop:'password',
        rules:[
          {
            required:false,
            message:'请编辑登录密码',
            trigger:'input'
          }
        ],
      },
      {
        key:'电子邮箱',
        type:'input',
        prop:'email',
        rules:[
          {
            required:true,
            validator:validEmail,
            trigger:'input'
          }
        ],
      },
      {
        key:'身份证号',
        type:'input',
        prop:'idNum',
        rules:[
          {
            required:true,
            validator:validNoNum,
            trigger:'input'
          }
        ],
      },
      {
        key:'每日预约',
        type:'input',
        prop:'reservation',
      }
    ],
    myForm:{
      departmentId:'',
      roleId:'',
      realName:'',
      sex:'',
      phone:'',
      birthday:'',
      username:'',
      password:'',
      email:'',
      idNum:'',
      reservation:'',
    },
  },
  {
    name:'关注用户列表',
    list:[
      {
        key:'所属部门',
        type:'select',
        prop:'departmentId',
        list:[],
        rules:[
          {
            required: true, 
            message:'新选择所属部门',
            trigger:'change',
          }
        ]
      },
      {
        key:'员工角色',
        type:'select',
        prop:'roleId',
        picker: true,
        list:[
          {
            label:'普通用户',
            value:0,
          },
          {
            label:'保养用户',
            value:1
          },
          {
            label:'续保顾问',
            value:2
          },
          {
            label:'保险顾问',
            value:3
          }
        ],
        rules:[
          {
            required: true,
            message: '请选择员工角色',
            trigger:'change'
          }
        ]
      },
      {
        key:'员工姓名',
        type:'input',
        prop:'realName',
        rules:[
          {
            required: true,
            message:'请编辑员工姓名',
            trigger: 'blur'
          }
        ]
      },
      {
        key:'员工性别',
        type:'select',
        prop:'sex',
        list:[
          {
            label:'男',
            value:1,
          },
          {
            label:'女',
            value:0
          }
        ],
        rules:[
          {
            required: true,
            message:'请选择员工性别',
            trigger: 'change'
          }
        ]
      },
      {
        key:'手机号码',
        type:'input',
        prop:'phone',
        rules:[
          {
            required: true,
            validator: validPhone,
            trigger: 'blur'
          }
        ]
      },
      {
        key:'出生日期',
        type:'date',
        prop:'birthday',
        rules:[
          {
            required: true,
            validator: validDate,
            trigger: 'change'
          }
        ]
      },
      {
        key:'登录账号',
        type:'input',
        prop:'username',
        rules:[
          {
            required: true,
            message:'请编辑登录账号',
            trigger: 'blur'
          }
        ]
      },
      {
        key:'登录密码',
        type:'input',
        prop:'password',
        rules:[
          {
            required: true,
            message:'请编辑登陆密码',
            trigger: 'blur'
          }
        ]
      },
      {
        key:'电子邮箱',
        type:'input',
        prop:'email',
        rules:[
          {
            required: true,
            validator: validEmail,
            trigger: 'blur'
          }
        ]
      },
      {
        key:'身份证号',
        type:'input',
        prop:'idNum',
        rules:[
          {
            required: true,
            validator: validNoNum,
            trigger: 'blur'
          }
        ]
      },
      {
        key:'每日预约',
        type:'input',
        prop:'reservation',
        rules:[
          {
            required: true,
            message:'请编辑每日预约',
            trigger: 'blur'
          }
        ]
      }
    ],
    myForm:{
      departmentId:'',
      roleId:'',
      realName:'',
      sex:'',
      phone:'',
      birthday:'',
      username:'',
      password:'',
      email:'',
      idNum:'',
      reservation:'',
    },
  },
  {
    name:'角色管理',
    list:[
      {
        key:'角色名称',
        value:'',
        type:'input',
        prop:'roleTitle',
        rules:[
          {
            required:true,
            message:'请编辑角色名称',
            trigger:'blur',
          }
        ],
      },
      {
        key:'角色类型',
        value:'',
        type:'select',
        prop:'type',
        picker:true ,
        list:[
          {
            label:'普通用户',
            value:0,
          },
          {
            label:'保养用户',
            value:1
          },
          {
            label:'续保顾问',
            value:2
          },
          {
            label:'保险顾问',
            value:3
          }
        ],
        rules:[
          {
            required:true,
            message:'请选择角色类型',
            trigger:['change','blur']
          }
        ]
      },
      {
        key:'角色描述',
        value:'',
        type:'textarea',
        rows:3,
        prop:'description',
        rules:[
          {
            required:true,
            message:'请编辑角色描述',
            trigger:'blur',
          }
        ]
      },
    ],
    myForm:{
      roleTitle:'',
      type:'',
      description:'',
    }
  },
  {
    name:'会员卡等级设置',
    list:[
      {
        key:'等级',
        type:'input',
        prop:'grade',
        tips:'为保证系统使用正常,请保证会员等级从1开始递增',
        rules:[
          {
            required:true,
            message:'请编辑等级',
            trigger:'blur',
          }
        ],
      },
      {
        key:'等级名称',
        type:'input',
        prop:'name',
        tips:'',
        rules:[
          {
            required:true,
            message:'请编辑等级名称',
            trigger:'blur',
          }
        ],
      },
      {
        key:'折扣比例',
        type:'input',
        prop:'discountRatio',
        tips:'注: 达到此等级时,所能享受的折扣率,如0.80表示八折,最大为1.00,最小为0.10',
        rules:[
          {
            required:true,
            validator: MaxNumberValue,
            trigger:'blur',
          }
        ],
      },
      {
        key:'充值金额',
        type:'input',
        prop:'amount',
        tips:'注: 达到此金额且未满足下一个金额数,会员卡自动升级到此级别',
        rules:[
          {
            required:true,
            validator:positiveNumber,
            trigger:'blur',
          }
        ],
      },
      {
        key:'累计金额',
        type:'input',
        prop:'accumulativeMoney',
        tips:'累计总充值金额达到此值时,会等等级会提升到改等级',
        rules:[
          {
            required:true,
            validator:positiveNumber,
            trigger:'blur',
          }
        ],
      },
      {
        key:'用户积分',
        type:'input',
        prop:'achieveGiveIntegral',
        tips:'注: 用户积分达到此数值时,会员卡升至此级别,积分则不限时间,最大为99999999',
        rules:[
          {
            required:true,
            message:'请编辑用户积分',
            trigger:'blur',
          }
        ],
      }
    ],
    myForm:{
      grade:'',
      name:'',
      discountRatio:'',
      amount:'',
      accumulativeMoney:'',
      achieveGiveIntegral:'',
    }
  },
  {
    name:'会员充值设置',
    list:[
      {
        key:'充值金额',
        type:'input',
        prop:'rechargeAmount',
        rules:[
          {
            required:true,
            validator:positiveNumber,
            trigger:'blur',
          }
        ],
      },
      {
        key:'赠送金额',
        type:'input',
        prop:'donationAmount',
        rules:[
          {
            required:true,
            validator:positiveNumber,
            trigger:'blur',
          }
        ],
      },
      {
        key:'赠送积分',
        type:'input',
        prop:'giftIntegral',
        rules:[
          {
            required:true,
            validator:validIntegral,
            trigger:'blur',
          }
        ],
      },
      {
        key:'赠送卡券',
        type:'select',
        prop:'couponId',
        multiple:true,
        list:[
          {
            label:'普通卡券',
            value:1,
          }
        ],
        rules:[
          {
            required:true,
            validator: MaxCouponNumber,
            trigger:'blur',
          }
        ],
      }
    ],
    myForm:{
      price:'',
      send:'',
      coupon:'',
    }
  },
  {
    name:'分享与消费奖励规则',
    list:[
      {
        key:'分享类型',
        type:'select',
        prop:'type',
        list:[
          {
            label:'套餐',
            value:1
          },
          {
            label:'活动',
            value:2
          },
          {
            label:'卡券',
            value:3
          }
        ],
        rules:[
          {
            required:true,
            message:'请编辑选择分享类型',
            trigger:'change',
          }
        ],
      },
      {
        key:'一级分享奖励',
        type:'input',
        prop:'firstAward',
        rules:[
          {
            required:true,
            message:'请编辑一级分享奖励',
            trigger:'blur',
          }
        ],
      },
      {
        key:'二级分享奖励',
        type:'input',
        prop:'secondAward',
        rules:[
          {
            required:true,
            message:'请编辑二级分享奖励',
            trigger:'blur',
          }
        ],
      },
      {
        key:'最大一级分享',
        type:'input',
        prop:'firstCount',
        rules:[
          {
            required:true,
            message: '请编辑一级分享',
            trigger:'blur',
          }
        ],
      },
      {
        key:'最大二级分享',
        type:'input',
        prop:'secondCount',
        rules:[
          {
            required:true,
            message: '请编辑二级分享',
            trigger:'blur',
          }
        ],
      },
    ],
    myForm:{
      price:'',
      send:'',
      coupon:'',
    }
  },
  {
    name:'保养提醒设置',
    list:[
      {
        key:'提醒天数',
        type:'input',
        prop:'days',
        rules:[
          {
            required:true,
            message:'请编辑',
            trigger:'blur',
          }
        ],
      },
      {
        key:'提醒内容',
        type:'input',
        prop:'content',
        rules:[
          {
            required:true,
            message:'请编辑',
            trigger:'blur',
          }
        ],
      },
      {
        key:'类型',
        type:'select',
        prop:'type',
        list:[
          {
            label:'已到店',
            value:1,
          },
          {
            label:'未到店',
            value:0
          }
        ],
        rules:[
          {
            required:true,
            message:'请编辑',
            trigger:'blur',
          }
        ],
      }
    ],
    myForm:{
      days:'',
      content:'',
      type:'',
    }
  },
  {
    name:'保险公司',
    list:[
      {
        key:'排序',
        type:'input',
        prop:'sort',
        rules:[
          {
            required:true,
            message:'请编辑排序内容',
            trigger:['blur'],
          }
        ],
      },
      {
        key:'公司名称',
        type:'input',
        prop:'name',
        rules:[
          {
            required:true,
            message:'请编辑公司名称',
            trigger:['blur'],
          }
        ],
      },
      {
        key:'折扣率',
        type:'input',
        prop:'discountRate',
        tips:'请输入0~1之间的小数,如:0.25',
        rules:[
          {
            required:true,
            validator: MaxNumberValue,
            trigger:['blur'],
          }
        ],
      }
    ],
    myForm:{
      sort:'',
      company:'',
      rate:'',
    }
  },
  {
    name:'快捷回复设置',
    list:[
      {
        key:'使用角色类型',
        type:'select',
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
        ],
        rules:[
          {
            required:true,
            message:'请编辑角色类型',
            trigger:['blur'],
          }
        ],
      },
      {
        key:'序列号',
        type:'input',
        prop:'serialNum',
        rules:[
          {
            required:true,
            message:'请编辑排序内容',
            trigger:['blur'],
          }
        ],
      },
      {
        key:'消息内容',
        type:'textarea',
        rows:3,
        prop:'messageContent',
        rules:[
          {
            required:true,
            message:'请编辑消息内容',
            trigger:['blur'],
          }
        ],
      },
    ],
    myForm:{
      content:'',
      port:'',
      sort:'',
    }
  },
  {
    name:'配件大类管理',
    list:[
      {
        key:'名称',
        type:'input',
        prop:'category',
        rules:[
          {
            required:true,
            message:'请编辑配件大类名称',
            trigger:'blur',
          }
        ]
      }
    ],
    myForm:{
      category:'',
    },
  },
  {
    name:'用户卡券管理',
    list:[
      {
        key:'姓名',
        type:'input',
        prop:'realNameByUser',
        rules:[
          {
            required:false,
            message:'请编辑姓名',
            trigger:'blur',
          }
        ],
      },
      {
        key:'手机号',
        type:'input',
        prop:'phone',
        rules:[
          {
            required:false,
            message:'请编辑手机号',
            trigger:'blur',
          }
        ],
      },
      {
        key:'卡券名称',
        type:'input',
        prop:'counponName',
        rules:[
          {
            required:false,
            message:'请编辑卡券名称',
            trigger:'blur',
          }
        ],
      },
      {
        key:'卡券编号',
        type:'input',
        prop:'codeNum',
        rules:[
          {
            required:false,
            message:'请编辑卡券编号',
            trigger:'blur',
          }
        ],
      },
    ],
    myForm:{
      name:'',
      phone:'',
      cid:'',
      number:'',
      cname:'',
      cnumber:'',
    }
  },
  {
    name:'用户佣金提现',
    list:[
      {
        key:'金额',
        prop:'money',
        rules:[{
          required:true,
          message:'请编辑e',
          trigger:'blur',
        }],
      },
      {
        key:'备注',
        prop:'remark',
        rules:[{
          required:true,
          message:'请编辑e',
          trigger:'blur',
        }],
      }
    ],
    myForm:{

    },
  },
  {
    name:'预约时间管理',
    list:[
      {
        key:'预约类型',
        type:'select',
        prop:'type',
        rules:[
          {
            required:true,
            message:'请选择类型',
            trigger:['change','blur'],
          }
        ],
        list:[
          {
            label:'爱车保养',
            value:1
          },
          {
            label:'事故维修',
            value:2
          },
          {
            label:'故障检查',
            value:3
          },
          {
            label:'购买保险',
            value:4
          },
          {
            label:'爱车美容',
            value:5
          },
          {
            label:'其他',
            value:6
          },
        ],
      },
      {
        key:'开始时间',
        type:'date',
        prop:'startTime',
        rules:[
          {
            required:true,
            message:'请选择开始时间',
            trigger:['change','blur'],
          }
        ],
      },
      {
        key:'结束时间',
        type:'date',
        prop:'endTime',
        rules:[
          {
            required:true,
            message:'请选择结束时间',
            trigger:['change','blur'],
          }
        ],
      },
      {
        key:'默认人数',
        type:'input',
        prop:'number',
        tips:'默认人数为0时,不限制人数',
        rules:[
          {
            required:true,
            message:'请编辑人数',
            trigger:'blur',
          }
        ],
      },
      {
        key:'备注',
        type:'input',
        prop:'remark',
        rules:[
          {
            required:true,
            message:'请编辑备注',
            trigger:'blur',
          }
        ],
      },
    ],
    myForm:{
      type:'',
      start:'',
      end:'',
      number:'',
      content:'',
    }
  },
  {
    name:'意见反馈',
    list:[
      {
        key:'姓名',
        type:'input',
        prop:'userName',
        disabled: true,
        rules:[
          {
            required:false,
            message:'请编辑用户姓名',
            trigger:'blur',
          }
        ],
      },
      {
        key:'联系电话',
        type:'input',
        prop:'phone',
        disabled: true,
        rules:[
          {
            required:false,
            message:'请编辑联系电话',
            trigger:'blur',
          }
        ],
      },
      {
        key:'反馈类型',
        type:'select',
        prop:'feedbackType',
        disabled: true,
        list:[
          {
            label:'保险',
            value:0
          },
          {
            label:'续保',
            value:1
          },
          {
            label:'保养',
            value:2
          },
          {
            label:'其他',
            value:3
          }
        ],
        rules:[
          {
            required:false,
            message:'请选择反馈类型',
            trigger:'change',
          }
        ],
      },
      {
        key:'反馈时间',
        type:'date',
        prop:'feedbackTimes',
        disabled: true,
        rules:[
          {
            required:false,
            message:'请选择反馈时间',
            trigger:'change',
          }
        ],
      },
      {
        key:'回复时间',
        type:'input',
        prop:'recoveryTimes',
        disabled: true,
        rules:[
          {
            required:false,
            message:'请编辑用户姓名',
            trigger:'change',
          }
        ],
      },
      {
        key:'反馈内容',
        type:'input',
        prop:'feedbackContent',
        disabled: true,
        rules:[
          {
            required:false,
            message:'请编辑用户姓名',
            trigger:'blur',
          }
        ],
      },
      {
        key:'回复内容',
        type:'input',
        prop:'replyContent',
        rules:[
          {
            required:true,
            message:'请编辑回复内容',
            trigger:'blur',
          }
        ],
      },
    ],
    myForm:{
      type:'',
      start:'',
      end:'',
      number:'',
      content:'',
    }
  },
  {
    name:'养车知识分类',
    list:[
      {
        key:'分类名称',
        type:'input',
        prop:'name',
        disabled: false,
        rules:[
          {
            required:true,
            message:'请编辑用户姓名',
            trigger:'blur',
          }
        ],
      },
      {
        key: '排序',
        type:'input',
        prop:'ranl',
        disabled: false,
        rules:[
          {
            required: true,
            message:'请编辑联系电话',
            trigger:'blur',
          }
        ],
      },
    ],
    myForm:{
      name:'',
      ranl:'',
    }
  },
]