export const list = [
  {
    label: "首页",
    icon: require("../assets/img/icon-home.png"),
    path: "/index"
  },
  {
    label: "系统管理",
    icon: require("../assets/img/icon-setting.png"),
    children: [
      {
        label: "门店管理",
        mid_path: "/mid/container",
        path: "/system/store",
        isAuth: 0,
      },
      {
        label: "部门管理",
        mid_path: "/mid/container",
        path:"/system/store",
        isAuth: 0,
      },
      {
        label:'角色管理',
        mid_path: "/mid/container",
        path:'/system/store',
        isAuth: 0,
      },
      {
        label:'员工列表',
        mid_path: "/mid/container",
        path:'/system/store',
        isAuth: 0,
      },
      {
        label: "平台配置",
        mid_path: "/mid/container",
        isAuth: 0,
        children: [
          {
            label: "会员卡等级设置",
            mid_path: "/mid/container",
            path: "/system/store",
            isAuth: 0,
          },
          {
            label: "会员卡积分规则",
            mid_path: "/mid/container",
            path: "/system/curb/pub",
            isAuth: 0,
          },
          {
            label: "会员充值设置",
            mid_path: "/mid/container",
            path: "/system/store",
            isAuth: 0,
          },
          {
            label: "分享与消费奖励规则",
            mid_path: "/mid/container",
            path: "/system/share",
            isAuth: 0,
          },
          {
            label: "保养提醒设置",
            mid_path: "/mid/container",
            path: "/system/store",
            isAuth: 0,
          },
          {
            label: "自动回复配置",
            mid_path: "/mid/container",
            path: "/system/store",
            isAuth: 0,
          },
          {
            label: "保险公司",
            mid_path: "/mid/container",
            path: "/system/store",
            isAuth: 0,
          },
          {
            label: "快捷回复设置",
            mid_path: "/mid/container",
            path: "/system/store",
            isAuth: 0,
          },
          {
            label: "关注后消息推送",
            mid_path: "/mid/container",
            path: "/system/curb/pub",
            isAuth: 0,
          }
        ]
      }
    ]
  },
  {
    label: "用品管理",
    icon: require("../assets/img/icon-use.png"),
    mid_path: "/mid/container",
    children: [
      {
        label: "汽车精品管理",
        mid_path: "/mid/container",
        path: "/use/store",
        isAuth: 0,
      },
      {
        label: "精品订单管理",
        mid_path: "/mid/container",
        path: "/use/store",
        isAuth: 0,
      },
      {
        label: "配件大类管理",
        mid_path: "/mid/container",
        path: "/use/store",
        isAuth: 0,
      }
    ]
  },
  {
    label: "会员管理",
    icon: require("../assets/img/icon-member.png"),
    children: [
      {
        label: "会员列表",
        mid_path: "/mid/container",
        path: "/member/list",
        isAuth: 0,
      },
      {
        label: "车辆管理",
        mid_path: "/mid/container",
        path: "/member/list",
        isAuth: 0,
      },
      {
        label: "积分管理",
        mid_path: "/mid/container",
        path: "/member/list",
        isAuth: 0,
      },
      {
        label: "会员充值",
        mid_path: "/mid/container",
        path: "/member/pay",
        isAuth: 0,
      },
      {
        label: "充值明细",
        mid_path: "/mid/container",
        path: "/member/list",
        isAuth: 0,
      },
      {
        label: "消费明细",
        mid_path: "/mid/container",
        path: "/member/list",
        isAuth: 0,
      }
    ]
  },
  {
    label: "日志管理",
    icon: require("../assets/img/icon-log.png"),
    children: [
      {
        label: "操作日志",
        mid_path:'/mid/container',
        path:'/log/store',
        isAuth: 0,
      },
      {
        label: "消息中心",
        mid_path:'/mid/container',
        isAuth: 0,
        children:[
          {
            label:'系统消息',
            mid_path:'/mid/container',
            path:'/log/store',
            isAuth:0,
          },
          {
            label:'待办事项',
            mid_path:'/mid/container',
            path:'/log/store',
            isAuth:0,
          },
          {
            label:'已办事项',
            mid_path:'/mid/container',
            path:'/log/store',
            isAuth:0,
          }
        ]
      },
      {
        label: "联系我们",
        mid_path:'/mid/container',
        path:'/log/concat',
        isAuth: 0,
      },
      {
        label: "版本更新",
        mid_path:'/mid/container',
        path:'/log/version',
        isAuth: 0,
      }
    ]
  },
  {
    label: "卡券管理",
    icon: require("../assets/img/icon-card.png"),
    children: [
      {
        label: "奖品卡券管理",
        mid_path: "/mid/container",
        path: "/coupon/store",
        isAuth: 0,
      },
      {
        label: "抽奖模板设置",
        mid_path: "/mid/container",
        path: "/coupon/store",
        isAuth: 0,
      },
      {
        label: "用户卡券管理",
        mid_path: "/mid/container",
        path: "/coupon/store",
        isAuth: 0,
      },
      {
        label: "用户卡券发放",
        mid_path: "/mid/container",
        path: "/coupon/store",
        isAuth: 0,
      },
      {
        label: "用户奖励",
        mid_path: "/mid/container",
        path: "/coupon/store",
        isAuth: 0,
      },
      {
        label: "用户佣金提现",
        mid_path: "/mid/container",
        path: "/coupon/userComm/pub",
        isAuth: 0,
      },
      {
        label: "用户提现记录",
        mid_path: "/mid/container",
        path: "/coupon/store",
        isAuth: 0,
      },
      {
        label: "员工奖励",
        mid_path: "/mid/container",
        path: "/coupon/store",
        isAuth: 0,
      }
    ]
  },
  {
    label: "市场推广",
    icon:require('../assets/img/icon-active.png'),
    children: [
      {
        label: "普通活动",
        mid_path: "/mid/container",
        path:'/market',
        isAuth: 0,
      },
      {
        label: "活动抽奖",
        mid_path: "/mid/container",
        path:'/market',
        isAuth: 0,
      },
      {
        label: "推荐有礼",
        mid_path: "/mid/container",
        path:'/market',
        isAuth: 0,
      },
      {
        label: "摇一摇活动",
        mid_path: "/mid/container",
        path:'/market',
        isAuth: 0,
      }
    ]
  },
  {
    label: "客户服务",
    icon: require("../assets/img//icon-server.png"),
    children: [
      {
        label: "预约管理",
        mid_path: "/mid/container",
        path:'/serve',
        isAuth:0,
      },
      {
        label: "预约时间管理",
        mid_path: "/mid/container",
        path:'/serve',
        isAuth:0,
      },
      {
        label: "保险服务",
        mid_path: "/mid/container",
        path:'/serve',
        isAuth:0,
      },
      {
        label: "救援服务",
        mid_path: "/mid/container",
        path:'/serve',
        isAuth:0,
      },
      {
        label: "意见反馈",
        mid_path: "/mid/container",
        path:'/serve',
        isAuth:0,
      },
      {
        label: "问卷调查",
        mid_path: "/mid/container",
        path:'/serve',
        isAuth:0,
      },
      {
        label: "养车知识",
        mid_path: "/mid/container",
        path:'/serve',
        isAuth:0,
      },
      {
        label: "养车知识分类",
        mid_path: "/mid/container",
        path:'/serve',
        isAuth:0,
      },
      {
        label: "车辆检测",
        isAuth: 0,
        children: [
          {
            label: "检修记录",
            mid_path: "/mid/container",
            path:'/serve',
            isAuth:0,
          },
          {
            label: "检修项配置",
            mid_path: "/mid/container",
            path:'/serve',
            isAuth:0,
          },
          {
            label: "专项检测配置",
            mid_path: "/mid/container",
            path:'/serve',
            isAuth:0,
          }
        ]
      }
    ]
  },
  {
    label: "统计分析",
    icon: require("../assets/img//icon-shows.png"),
    children: [
      {
        label: "用户统计",
        mid_path: "/mid/container",
        path:'/statistic/store',
        isAuth:0,
      },
      {
        label: "车辆统计",
        mid_path: "/mid/container",
        path:'/statistic/store',
        isAuth:0,
      },
      {
        label: "业务统计",
        mid_path: "/mid/container",
        path:'/statistic/store',
        isAuth:0,
      },
      {
        label: "活动统计",
        mid_path: "/mid/container",
        path:'/statistic/store',
        isAuth:0,
      },
      {
        label: "会员统计",
        mid_path: "/mid/container",
        path:'/statistic/store',
        isAuth:0,
      },
      {
        label: "提成日报",
        mid_path: "/mid/container",
        path:'/statistic/store',
        isAuth:0,
      },
      {
        label: "客户资料完整度",
        mid_path: "/mid/container",
        path:'/statistic/store',
        isAuth:0,
      }
    ]
  },
  {
    label: "进存销",
    icon: require("../assets/img/icon-shop.png"),
    children: [
      {
        label: "业务管理",
        isAuth: 0,
        children: [
          {
            label: "业务开单",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "业务结算",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "业务出库",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "业务退货",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          }
        ]
      },
      {
        label: "套餐管理",
        isAuth: 0,
        children: [
          {
            label: "套餐管理",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "套餐销售",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "会员套餐记录",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          }
        ]
      },
      {
        label: "采购管理",
        isAuth: 0,
        children: [
          {
            label: "采购订单",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "采购入库",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "采购退货",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          }
        ]
      },
      {
        label: "财务管理",
        isAuth: 0,
        children: [
          {
            label: "付款管理",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "挂账还款",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          }
        ]
      },
      {
        label: "仓库管理",
        isAuth:0,
        children: [
          {
            label: "调拨发起",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth:0,
          },
          {
            label: "调拨接收",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth:0,
          },
          {
            label: "日常盘点",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth:0,
          }
        ]
      },
      {
        label: "平台配置管理",
        isAuth:0,
        children: [
          {
            label: "供应商设置",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth:0,
          },
          {
            label: "仓库设置",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth:0,
          },
          {
            label: "商品分类设置",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth:0,
          },
          {
            label: "商品设置",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth:0,
          },
          {
            label: "项目分类设置",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth:0,
          },
          {
            label: "项目设置",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth:0,
          },
          {
            label: "物流公司配置",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth:0,
          },
          {
            label: "支付方式配置",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth:0,
          }
        ]
      },
      {
        label: "报表管理",
        isAuth:0,
        children: [
          {
            label: "库存报表",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "出入库明细表",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "盘点明细表",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "日报月报",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "销售统计表",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "商品销售统计",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "项目销售统计",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "采购明细表",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "挂账单据明细表",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "挂账还款明细表",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "营业额统计表",
            mid_path: "/mid/container",
            path:'/selling/business',
            isAuth: 0,
          },
          {
            label: "收款统计",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          },
          {
            label: "付款统计",
            mid_path: "/mid/container",
            path:'/selling/store',
            isAuth: 0,
          }
        ]
      }
    ]
  }
]