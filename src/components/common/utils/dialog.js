export const forms = [
  {
    name:'部门管理',
    list:[
      {
        key:'部门名称',
        type:'input',
        prop:'name',
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
        list:[],
        prop:'dep',
        rules:[
          {
            required:true,
            message:'请选择上级部门',
            trigger:['blur','change']
          }
        ]
      },
      {
        key:'描述',
        type:'input',
        prop:'desc',
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
      name:'',
      dep:'',
      desc:'',
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
        type:'input',
        prop:'dep',
      },
      {
        key:'员工角色',
        type:'select',
        prop:'port',
      },
      {
        key:'员工姓名',
        type:'input',
        prop:'name',
      },
      {
        key:'员工性别',
        type:'select',
        prop:'gender',
      },
      {
        key:'手机号码',
        type:'input',
        prop:'phone',
      },
      {
        key:'出生日期',
        type:'date',
        prop:'birth',
      },
      {
        key:'登录账号',
        type:'input',
        prop:'account',
      },
      {
        key:'电子邮箱',
        type:'input',
        prop:'email',
      },
      {
        key:'身份证号',
        type:'input',
        prop:'id',
      },
      {
        key:'每日预约',
        type:'input',
        prop:'count',
      }
    ],
    myForm:{
      dep:'',
      port:'',
      name:'',
      gender:'',
      phone:'',
      birth:'',
      account:'',
      email:'',
      id:'',
      count:'',
    },
  },
  {
    name:'会员卡等级设置',
    list:[
      {
        key:'等级',
        type:'input',
        prop:'level',
        tips:'为保证系统使用正常,请保证会员等级从1开始递增',
      },
      {
        key:'等级名称',
        type:'input',
        prop:'levelName',
        tips:'',
      },
      {
        key:'折扣比例',
        type:'input',
        prop:'rate',
        tips:'注: 达到次等级时,所能享受的折扣率,如0.80表示八折,最大为1.00,最小为0.10',
      },
      {
        key:'充值金额',
        type:'input',
        prop:'price',
        tips:'注: 达到此金额且为满足下一个金额数,会员卡自动升级到此级别',
      },
      {
        key:'累计金额',
        type:'input',
        prop:'total',
        tips:'累计总充值金额达到此值时,会等等级会提升到改等级',
      },
      {
        key:'用户积分',
        type:'input',
        prop:'interage',
        tips:'注: 用户积分达到此数值时,会员卡升至此级别,积分则不限时间,最大为99999999',
      }
    ],
    myForm:{
      level:'',
      levelName:'',
      rate:'',
      price:'',
      total:'',
      interage:'',
    }
  },
  {
    name:'会员充值设置',
    list:[
      {
        key:'充值金额',
        type:'input',
        prop:'price',
      },
      {
        key:'赠送金额',
        type:'input',
        prop:'send',
      },
      {
        key:'赠送卡券',
        type:'select',
        prop:'coupon'
      }
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
        prop:'day',
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
        type:'input',
        prop:'type',
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
      day:'',
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
        prop:'compnay',
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
        prop:'rate',
        rules:[
          {
            required:true,
            message:'请编辑折扣率',
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
        key:'消息内容',
        type:'input',
        prop:'sort',
        rules:[
          {
            required:true,
            message:'请编辑消息内容',
            trigger:['blur'],
          }
        ],
      },
      {
        key:'使用角色类型',
        type:'input',
        prop:'compnay',
        rules:[
          {
            required:true,
            message:'请编辑角色类型',
            trigger:['blur'],
          }
        ],
      },
      {
        key:'排序',
        type:'input',
        prop:'rate',
        rules:[
          {
            required:true,
            message:'请编辑排序内容',
            trigger:['blur'],
          }
        ],
      }
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
        prop:'name',
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
      name:'',
    },
  },
  {
    name:'用户卡券管理',
    list:[
      {
        key:'姓名',
        type:'input',
        prop:'name',
        rules:[
          {
            required:true,
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
            required:true,
            message:'请编辑手机号',
            trigger:'blur',
          }
        ],
      },
      {
        key:'车架号',
        type:'input',
        prop:'cid',
        rules:[
          {
            required:true,
            message:'请编辑车架号',
            trigger:'blur',
          }
        ],
      },
      {
        key:'车牌号',
        type:'input',
        prop:'number',
        rules:[
          {
            required:true,
            message:'请编辑车牌号',
            trigger:'blur',
          }
        ],
      },
      {
        key:'卡券名称',
        type:'input',
        prop:'cname',
        rules:[
          {
            required:true,
            message:'请编辑卡券名称',
            trigger:'blur',
          }
        ],
      },
      {
        key:'卡券编号',
        type:'input',
        prop:'cnumber',
        rules:[
          {
            required:true,
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
      },
      {
        key:'开始时间',
        type:'date',
        prop:'start',
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
        prop:'end',
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
        prop:'content',
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
  
]