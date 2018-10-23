<template>
  <section class="leftmenu">
    <el-menu class="my-menu" unique-opened collapse-transition router >
      <section v-for="(item,index) in list" :key="index">
        <el-submenu v-if="item.children" :index="item.path || item.label">
          <template slot="title">
            <img :src="item.icon" class="icon-img" alt="icon" />
            <span>{{item.label}}</span>
          </template>
          <section v-for="(list,lindex) in item.children" :key="lindex">
            <el-submenu v-if="list.children && list.isAuth == 1" :index="list.path || list.label" >
              <template slot="title">
                  <span>{{list.label}}</span>
              </template>
              <section v-for="(sub,sindex) in list.children" :key="sindex">
                <el-menu-item v-if="sub.isAuth === 1" :route="{path:sub.mid_path,query:{menu:item.label, subMenu:list.label,child:sub.label,path:sub.path}}" :index="sub.label">
                  <span slot="title">{{sub.label}}</span>
                </el-menu-item>
              </section>
            </el-submenu>
            <el-menu-item  :route="{path:list.mid_path,query:{menu:item.label,subMenu:list.label,path:list.path}}" v-if="!list.children && list.isAuth == 1 " :index="list.label">
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
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
import {list} from '../../utils/menu.js'
import {getQueryString} from '../../utils/global.js'
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
              label:'角色管理',
              mid_path: "/mid/container",
              path:'/system/store',
            },
            {
              label:'员工列表',
              mid_path: "/mid/container",
              path:'/system/store',
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
              label: "操作日志",
              mid_path:'/mid/container',
              path:'/log/store',
            },
            {
              label: "消息中心",
              mid_path:'/mid/container',
              children:[
                {
                  label:'系统消息',
                  mid_path:'/mid/container',
                  path:'/log/store',
                },
                {
                  label:'待办事项',
                  mid_path:'/mid/container',
                  path:'/log/store',
                },
                {
                  label:'已办事项',
                  mid_path:'/mid/container',
                  path:'/log/store'
                }
              ]
            },
            {
              label: "联系我们",
              mid_path:'/mid/container',
              path:'/log/concat',
            },
            {
              label: "版本更新",
              mid_path:'/mid/container',
              path:'/log/version',
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
                  label: "商品设置",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "项目分类设置",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "项目设置",
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
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "出入库明细表",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "盘点明细表",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "日报月报",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "销售统计表",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "商品销售统计",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "项目销售统计",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "采购明细表",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "挂账单据明细表",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "挂账还款明细表",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "营业额统计表",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "收款统计",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                },
                {
                  label: "付款统计",
                  mid_path: "/mid/container",
                  path:'/selling/store',
                }
              ]
            }
          ]
        }
      ],
      list,
    };
  },
  computed:{
    ...mapState({
      'store':state => state.Limit.data
    }),
  },
  methods: {
    ...mapActions({
      'getStore':'getUserLimit'
    }),
    formatLimit(argus){
      let _arr = argus && argus.filter(item => item.name === '查看').map(list => getQueryString(list.url))
      this.list.map(item => {
        _arr.map(list => {
          if(item.label === list.menu){
            item.children.map(subItem => {
              if(subItem.label == list.subMenu){
                subItem = Object.assign(subItem, {isAuth: 1})
              }
              if(subItem.children){
                subItem.children.map(si => {
                  if(si.label === list.child && list.child){
                    si = Object.assign(si, {isAuth: 1})
                  }
                })
              }
            })
          }
        })
      })
    }
  },
  created(){
    this.getStore().then(this.formatLimit)
  }
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
