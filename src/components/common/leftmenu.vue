<template>
  <section class="leftmenu">
    <el-menu class="my-menu" unique-opened collapse-transition router >
      <section v-for="(item,index) in data" :key="index">
        <el-submenu v-if="item.children" :index="item.path || item.label">
          <template slot="title">
            <img :src="item.icon" class="icon-img" alt="icon" />
            <span>{{item.label}}</span>
          </template>
          <section v-for="(list,lindex) in item.children" :key="lindex">
            <el-submenu v-if="list.children" :index="list.path || list.label" >
              <template slot="title">
                  <span>{{list.label}}</span>
              </template>
              <section v-for="(sub,sindex) in list.children" :key="sindex">
                <el-menu-item :route="{path:sub.mid_path,query:{menu:item.label, subMenu:list.label,child:sub.label,path:sub.path}}" :index="sub.label">
                  <span slot="title">{{sub.label}}</span>
                </el-menu-item>
              </section>
            </el-submenu>
            <el-menu-item  :route="{path:list.mid_path,query:{menu:item.label,subMenu:list.label,path:list.path}}" v-if="!list.children" :index="list.label">
              <span slot="title">{{list.label}}</span>
            </el-menu-item>
          </section>
        </el-submenu>
        <el-menu-item v-if="!item.children" :index="item.path">
          <template slot="title">
            <img :src="item.icon" alt="icon" class="icon-img">
            <span>{{item.label}}</span>
          </template>
        </el-menu-item>
      </section>
    </el-menu>
  </section>
</template>

<script>
export default {
  name: "leftmenu",

  data() {
    return {
      data: [
        {
          label: "首页",
          icon: require("../../assets/img/icon-home.png"),
          path: "/index"
        },
        {
          label: "系统管理",
          icon: require("../../assets/img/icon-setting.png"),
          children: [
            {
              label: "门店管理",
              mid_path: "/mid/container",
              path: "/system/store"
            },
            {
              label: "部门管理",
              mid_path: "/mid/container",
              path:"/system/store"
            },
            {
              // label: "角色管理",
              label:'角色管理',
              mid_path: "/mid/container",
              path:'/system/store',
              // children: [
              //   {
              //     label: "角色权限",
              //     mid_path: "/mid/container",
              //     path: "/system/store"
              //   },
              //   {
              //     label: "权限设置",
              //     mid_path: "/mid/container",
              //     path: "/system/limit/setting"
              //   }
              // ]
            },
            {
              // label: "员工管理",
              label:'员工列表',
              mid_path: "/mid/container",
              path:'/system/store',
              // children: [
              //   {
              //     label: "员工列表",
              //     mid_path: "/mid/container",
              //     path: "/system/store"
              //   },
              //   {
              //     label: "新增员工",
              //     mid_path: "/mid/container",
              //     path: "/system/store"
              //   }
              // ]
            },
            {
              label: "平台配置",
              mid_path: "/mid/container",
              children: [
                {
                  label: "会员卡等级设置",
                  mid_path: "/mid/container",
                  path: "/system/store"
                },
                {
                  label: "会员卡积分规则",
                  mid_path: "/mid/container",
                  path: "/system/curb/pub"
                },
                {
                  label: "会员充值设置",
                  mid_path: "/mid/container",
                  path: "/system/store"
                },
                {
                  label: "保养提醒设置",
                  mid_path: "/mid/container",
                  path: "/system/store"
                },
                {
                  label: "自动回复配置",
                  mid_path: "/mid/container",
                  path: "/system/store"
                },
                {
                  label: "保险公司",
                  mid_path: "/mid/container",
                  path: "/system/store"
                },
                {
                  label: "快捷回复设置",
                  mid_path: "/mid/container",
                  path: "/system/store"
                },
                {
                  label: "关注后消息推送",
                  mid_path: "/mid/container",
                  path: "/system/curb/pub"
                }
              ]
            }
          ]
        },
        {
          label: "用品管理",
          icon: require("../../assets/img/icon-use.png"),
          mid_path: "/mid/container",
          children: [
            {
              label: "汽车精品管理",
              mid_path: "/mid/container",
              path: "/use/store"
            },
            {
              label: "精品订单管理",
              mid_path: "/mid/container",
              path: "/use/store"
            },
            {
              label: "配件大类管理",
              mid_path: "/mid/container",
              path: "/use/store"
            }
          ]
        },
        {
          label: "会员管理",
          icon: require("../../assets/img/icon-member.png"),
          children: [
            {
              label: "会员列表",
              mid_path: "/mid/container",
              path: "/member/list"
            },
            {
              label: "车辆管理",
              mid_path: "/mid/container",
              path: "/member/list"
            },
            {
              label: "积分管理",
              mid_path: "/mid/container",
              path: "/member/list"
            },
            {
              label: "会员充值",
              mid_path: "/mid/container",
              path: "/member/pay"
            },
            {
              label: "充值明细",
              mid_path: "/mid/container",
              path: "/member/list"
            },
            {
              label: "消费明细",
              mid_path: "/mid/container",
              path: "/member/list"
            }
          ]
        },
        {
          label: "日志管理",
          icon: require("../../assets/img/icon-log.png"),
          children: [
            {
              label: "操作日志"
            },
            {
              label: "消息中心"
            },
            {
              label: "联系我们"
            },
            {
              label: "版本更新"
            }
          ]
        },
        {
          label: "卡券管理",
          icon: require("../../assets/img/icon-card.png"),
          children: [
            {
              label: "奖品卡券管理",
              mid_path: "/mid/container",
              path: "/coupon/store"
            },
            {
              label: "抽奖模板设置",
              mid_path: "/mid/container",
              path: "/coupon/store"
            },
            {
              label: "用户卡券管理",
              mid_path: "/mid/container",
              path: "/coupon/store"
            },
            {
              label: "用户卡券发放",
              mid_path: "/mid/container",
              path: "/coupon/store",
            },
            {
              label: "用户奖励",
              mid_path: "/mid/container",
              path: "/coupon/store",
            },
            {
              label: "用户佣金提现",
              mid_path: "/mid/container",
              path: "/coupon/userComm/pub",
            },
            {
              label: "用户提现记录",
              mid_path: "/mid/container",
              path: "/coupon/store",
            },
            {
              label: "员工奖励",
              mid_path: "/mid/container",
              path: "/coupon/store",
            }
          ]
        },
        {
          label: "市场推广",
          icon:require('../../assets/img/icon-active.png'),
          children: [
            {
              label: "普通活动",
              mid_path: "/mid/container",
              path:'/market',
            },
            {
              label: "活动抽奖",
              mid_path: "/mid/container",
              path:'/market',
            },
            {
              label: "推荐有礼",
              mid_path: "/mid/container",
              path:'/market',
            },
            {
              label: "摇一摇活动",
              mid_path: "/mid/container",
              path:'/market',
            }
          ]
        },
        {
          label: "客户服务",
          icon: require("../../assets/img//icon-server.png"),
          children: [
            {
              label: "预约管理",
              mid_path: "/mid/container",
              path:'/serve',
            },
            {
              label: "预约时间管理",
              mid_path: "/mid/container",
              path:'/serve',
            },
            {
              label: "保险服务",
              mid_path: "/mid/container",
              path:'/serve',
            },
            {
              label: "救援服务",
              mid_path: "/mid/container",
              path:'/serve',
            },
            {
              label: "意见反馈",
              mid_path: "/mid/container",
              path:'/serve',
            },
            {
              label: "问卷调查",
              mid_path: "/mid/container",
              path:'/serve',
            },
            {
              label: "养车知识",
              mid_path: "/mid/container",
              path:'/serve',
            },
            {
              label: "养车知识分类",
              mid_path: "/mid/container",
              path:'/serve',
            },
            {
              label: "车辆检测",
              children: [
                {
                  label: "检修记录",
                  mid_path: "/mid/container",
                  path:'/serve',
                },
                {
                  label: "检修项配置",
                  mid_path: "/mid/container",
                  path:'/serve',
                },
                {
                  label: "专项检测配置",
                  mid_path: "/mid/container",
                  path:'/serve',
                }
              ]
            }
          ]
        },
        {
          label: "统计分析",
          icon: require("../../assets/img//icon-shows.png"),
          children: [
            {
              label: "用户统计",
              mid_path: "/mid/container"
            },
            {
              label: "车辆统计",
              mid_path: "/mid/container"
            },
            {
              label: "业务统计",
              mid_path: "/mid/container"
            },
            {
              label: "活动统计",
              mid_path: "/mid/container"
            },
            {
              label: "会员统计",
              mid_path: "/mid/container"
            },
            {
              label: "提成日报",
              mid_path: "/mid/container"
            },
            {
              label: "门店经营诊断",
              mid_path: "/mid/container"
            }
          ]
        },
        // {
        //   label:'股东分红',
        //   children:[
        //     {
        //       label:'员工分红设置',
        //       mid_path:'/mid/container',
        //     },
        //     {
        //       label:'员工客户分配',
        //       mid_path:'/mid/container',
        //     },
        //     {
        //       label:'惩罚设置',
        //       mid_path:'/mid/container',
        //     },
        //     {
        //       label:'效果分析',
        //       mid_path:'/mid/container',
        //     },
        //     {
        //       label:'员工贡献报表',
        //       mid_path:'/mid/container',
        //     },
        //     {
        //       label:'员工分红汇总',
        //       mid_path:'/mid/container',
        //     },
        //     {
        //       label:'员工提现明细',
        //       mid_path:'/mid/container',
        //     },
        //     {
        //       label:'员工释放报表',
        //       mid_path:'/mid/container',
        //     },
        //   ]
        // },
        // {
        //   label:'门店经营分析',
        //   children:[
        //     {
        //       label:'经营报表',
        //       mid_path:'/mid/container',
        //     },
        //     {
        //       label:'会员报表',
        //       mid_path:'/mid/container',
        //     },
        //     {
        //       label:'卡券报表',
        //       mid_path:'/mid/container',
        //     },
        //     {
        //       label:'应收款报表',
        //       mid_path:'/mid/container',
        //     },
        //     {
        //       label:'库存报表',
        //       mid_path:'/mid/container',
        //     },
        //     {
        //       label:'股东报表',
        //       mid_path:'/mid/container',
        //     },
        //   ]
        // },
        {
          label: "进存销",
          icon: require("../../assets/img/icon-shop.png"),
          children: [
            {
              label: "业务管理",
              children: [
                {
                  label: "业务开单",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "业务结算",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "业务出库",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "业务退货",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                }
              ]
            },
            {
              label: "套餐管理",
              children: [
                {
                  label: "套餐管理",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "套餐销售",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "会员套餐记录",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                }
              ]
            },
            {
              label: "采购管理",
              children: [
                {
                  label: "采购订单",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "采购入库",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "采购退货",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                }
              ]
            },
            {
              label: "财务管理",
              children: [
                {
                  label: "付款管理",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "挂账还款",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                }
              ]
            },
            {
              label: "仓库管理",
              children: [
                {
                  label: "调拨发起",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "调拨接收",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "日常盘点",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                }
              ]
            },
            {
              label: "平台配置管理",
              children: [
                {
                  label: "供应商设置",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "仓库设置",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "商品分类设置",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "项目分类设置",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "项目配置",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "物流公司配置",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "支付方式配置",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                }
              ]
            },
            {
              label: "报表管理",
              children: [
                {
                  label: "库存报表",
                  mid_path: "/mid/container"
                },
                {
                  label: "出入库明细表",
                  mid_path: "/mid/container"
                },
                {
                  label: "盘点明细表",
                  mid_path: "/mid/container"
                },
                {
                  label: "日报月报",
                  mid_path: "/mid/container"
                },
                {
                  label: "员工绩效表",
                  mid_path: "/mid/container"
                },
                {
                  label: "销售统计表",
                  mid_path: "/mid/container"
                },
                {
                  label: "商品销售统计",
                  mid_path: "/mid/container"
                },
                {
                  label: "项目销售统计",
                  mid_path: "/mid/container"
                },
                {
                  label: "采购明细表",
                  mid_path: "/mid/container"
                },
                {
                  label: "挂账单据明细表",
                  mid_path: "/mid/container"
                },
                {
                  label: "挂账还款明细表",
                  mid_path: "/mid/container"
                },
                {
                  label: "营业额统计表",
                  mid_path: "/mid/container"
                },
                {
                  label: "收款统计",
                  mid_path: "/mid/container"
                },
                {
                  label: "付款统计",
                  mid_path: "/mid/container"
                }
              ]
            }
          ]
        }
      ]
    };
  },

  methods: {}
};
</script>

<style scoped lang='scss' >
.leftmenu {
  background-color: #fff;
  .my-menu {
    height: 100%;
    .icon-img {
      margin-right: 15px;
    }
  }
}
</style>
