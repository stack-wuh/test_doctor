import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = resolve => require(['@/components/home'],resolve)

const SignIn = resolve => require(['@/components/signManage/signin'],resolve)
const SignUp = resolve => require(['@/components/signManage/signup'],resolve)
const NoLimit = resolve => require(['@/components/signManage/noLimit'], resolve)

const midContainer = resolve => require(['@/components/container/midContainer'],resolve)

const Index = resolve => require(['@/components/indexManage/index'],resolve)

const SystemIndex = resolve => require(['@/components/systemManage/index'],resolve)
const SystemStore = resolve => require(['@/components/systemManage/mid/store'],resolve)
const SystemCurbRule = resolve => require(['@/components/systemManage/child/curbRule'],resolve)
const SystemLimitSetting = resolve => require(['@/components/systemManage/child/limitSetting'],resolve)
const SystemStorePub = resolve => require(['@/components/systemManage/child/storePub'],resolve)
const SystemStoreReply = resolve => require(['@/components/systemManage/child/reply'],resolve)
const SystemShare = resolve => require(['@/components/systemManage/child/share'], resolve)

const UseIndex = resolve => require(['@/components/useManage/index'],resolve)
const UseStore = resolve => require(['@/components/useManage/mid/store'],resolve)
const UsePub = resolve => require(['@/components/useManage/child/usePub'],resolve)


const MemberIndex = resolve => require(['@/components/memberManage/index'],resolve)
const MemberStore = resolve => require(['@/components/memberManage/mid/list'],resolve)
const MemberPub = resolve => require(['@/components/memberManage/child/memberPub'],resolve)
const MemberPay = resolve => require(['@/components/memberManage/child/memberPay'],resolve)
const MemberCarInfo = resolve => require(['@/components/memberManage/child/carInfo'], resolve)


const CouponIndex = resolve => require(['@/components/cuoponManage/index'],resolve)
const CouponStore = resolve => require(['@/components/cuoponManage/mid/store'],resolve)
const CouponPub = resolve => require(['@/components/cuoponManage/child/couponPub'],resolve)
const CouponLottoPub = resolve => require(['@/components/cuoponManage/child/lottoPub'],resolve)
const CouponUserCommPub = resolve => require(['@/components/cuoponManage/child/userCommPub'],resolve)



const MarketIndex = resolve => require(['@/components/marketManage/index'],resolve)
const MarketStore = resolve => require(['@/components/marketManage/mid/store'],resolve)
const MarketActivePub = resolve => require(['@/components/marketManage/child/activePub'],resolve)
const MarketShakePub = resolve => require(['@/components/marketManage/child/shakePub'],resolve)
const MarketOtherActivePub = resolve => require(['@/components/marketManage/child/otherActivePub'], resolve)

const ServeIndex = resolve => require(['@/components/serveManage/index'],resolve)
const ServeStore = resolve => require(['@/components/serveManage/mid/store'],resolve)
const ServeInsurePub = resolve => require(['@/components/serveManage/child/insurePub'],resolve)
const ServeQuestionPub = resolve => require(['@/components/serveManage/child/questionPub'],resolve)
const ServeCarFeedPub = resolve => require(['@/components/serveManage/child/carFeed'], resolve)
const ServerOverhual = resolve => require(['@/components/serveManage/child/overhual'], resolve)
const ServerQuesStatic = resolve => require(['@/components/serveManage/child/quesStatic'], resolve)


const SellingStore = resolve => require(['@/components/sellingManage/mid/store'], resolve)
const SellingBusiness = resolve => require(['@/components/sellingManage/child/business'], resolve)


const LogStore = resolve => require(['@/components/logManage/mid/store'], resolve)
const LogConcat = resolve => require(['@/components/logManage/mid/concat'], resolve)
const LogVersion = resolve => require(['@/components/logManage/mid/version'], resolve)
const LogMsgPub = resolve => require(['@/components/logManage/sub/msgPub'], resolve)
const LogMsgDetail = resolve => require(['@/components/logManage/sub/msgDetail'], resolve)

const StatisticIndex = resolve => require(['@/components/statisticManage/mid/store'], resolve)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component:Home,
      redirect:'/signin'
    },
    {
      path:'/signin',
      name:'signin',
      component:SignIn, 
    },
    {
      path:'/signup',
      name:'signup',
      component:SignUp
    },
    {
      path:'/',
      name:'home',
      component:Home,
      children:[
        {
          path:'/index',
          name:'index',
          component:Index
        },
      ]
    },
    {
      path:'/',
      name:'home',
      component:Home,
      children:[
        {
          path:'/mid/container',
          name:'midContainer',
          component:midContainer,
          children:[
            {
              path:'/unlimit',
              name:'unlimit',
              component: NoLimit
            },
            {
              path:'/system',
              name:'system',
              component:SystemIndex,
              redirect:'/system/store',
              children:[
                {
                  path:'/system/store',
                  name:'systemStore',
                  component:SystemStore
                },
                {
                  path:'/system/curb/pub',
                  name:'systemCurbPub',
                  component:SystemCurbRule
                },
                {
                  path:'/system/limit/setting',
                  name:'SystemLimitSetting',
                  component:SystemLimitSetting,
                },
                {
                  path:'/system/store/pub',
                  name:'systemStorePub',
                  component:SystemStorePub,
                },
                {
                  path:'/system/store/reply',
                  name:'systemStoreReply',
                  component:SystemStoreReply,
                },
                {
                  path:'/system/share',
                  name:'systemShare',
                  component:SystemShare
                }
              ]
            },
            {
              path:'/system',
              name:'use',
              alias:'/use',
              component:SystemIndex,
              redicre:'/use/store',
              children:[
                {
                  path:'/use/store',
                  name:'useStore',
                  component:UseStore,
                },
                {
                  path:'/use/pub',
                  name:'usePub',
                  component:UsePub,
                }
              ]
            },
            {
              path:'/system',
              name:'member',
              alias:'/member',
              component:SystemIndex,
              redirect:'/member/list',
              children:[
                {
                  path:'/member/list',
                  name:'memberList',
                  component:MemberStore
                },
                {
                  path:'/member/pub',
                  name:'memberPub',
                  component:MemberPub
                },
                {
                  path:'/member/pay',
                  name:'memberPay',
                  component:MemberPay,
                },
                {
                  path:'/member/info',
                  name:'memberInfo',
                  component:MemberCarInfo
                }
              ]
            },
            {
              path:'/coupon',
              name:'coupon',
              component:CouponIndex,
              redicrect:'/coupon/store',
              children:[
                {
                  path:'/coupon/store',
                  name:'couponStore',
                  component:CouponStore,
                },
                {
                  path:'/coupon/pub',
                  name:'couponPub',
                  component:CouponPub,
                },
                {
                  path:'/coupon/lotto/pub',
                  name:'couponLottoPub',
                  component:CouponLottoPub,
                },
                {
                  path:'/coupon/userComm/pub',
                  name:'CouponUserCommPub',
                  component:CouponUserCommPub,
                }
              ]
            },
            {
              path:'/market',
              name:'market',
              component:MarketIndex,
              redirect:'/market/store',
              children:[
                {
                  path:'/market/store',
                  name:'marketStore',
                  component:MarketStore,
                },
                {
                  path:'/market/active/pub',
                  name:'marketActivePub',
                  component:MarketActivePub
                },
                {
                  path:'/market/shake/pub',
                  name:'marketShakePub',
                  component:MarketShakePub
                },
                {
                  path:'/market/active/other/pub',
                  name:'marketActiveOtherPub',
                  component:MarketOtherActivePub,
                }
              ]
            },
            {
              path:'/serve',
              name:'serve',
              component:ServeIndex,
              redirect:'/serve/store',
              children:[
                {
                  path:'/serve/store',
                  name:'serveStore',
                  component:ServeStore
                },
                {
                  path:'/serve/insure/pub',
                  name:'serveInsurePub',
                  component:ServeInsurePub,
                },
                {
                  path:'/serve/question/pub',
                  name:'serveQuestionPub',
                  component:ServeQuestionPub
                },
                {
                  path:'/serve/carfeed/pub',
                  name:'serveCarfeedPub',
                  component:ServeCarFeedPub
                },
                {
                  path: '/serve/overhual',
                  name:'serveOverhual',
                  component: ServerOverhual
                },
                {
                  path: '/serve/ques/static',
                  name:'SererQuesStatic',
                  component: ServerQuesStatic
                }
              ],
            },
            {
              path:'/system',
              component:SystemIndex,
              alias:'/selling',
              redirect:'/selling/store',
              children:[
                {
                  path:'/selling/store',
                  name:'sellingStore',
                  component:SellingStore
                },
                {
                  path: '/selling/business',
                  name:'sellingBusiness',
                  component: SellingBusiness
                }
              ],
            },
            {
              path:'/system',
              component:SystemIndex,
              alias:'/log',
              redirect:'/log/store',
              children:[
                {
                  path:'/log/store',
                  name:'logStore',
                  component:LogStore
                },
                {
                  path:'/log/concat',
                  name:'logConcat',
                  component:LogConcat
                },
                {
                  path:'/log/version',
                  name:'logVersion',
                  component:LogVersion
                },
                {
                  path:'/log/msg/pub',
                  name:'logMsgPub',
                  component:LogMsgPub
                },
                {
                  path:'/log/msg/detail',
                  name:'logMsgDetail',
                  component:LogMsgDetail,
                }
              ]
            },
            {
              path:'/statistic',
              component:StatisticIndex,
              redirect:'/statistic/store',
              children:[
                {
                  path:'/statistic/store',
                  components:StatisticIndex,
                }
              ]
            }
          ],
        }
      ]
    }
  ]
})
