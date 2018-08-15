import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = resolve => require(['@/components/home'],resolve)

const SignIn = resolve => require(['@/components/signManage/signin'],resolve)
const SignUp = resolve => require(['@/components/signManage/signup'],resolve)

const midContainer = resolve => require(['@/components/container/midContainer'],resolve)

const Index = resolve => require(['@/components/indexManage/index'],resolve)

const SystemIndex = resolve => require(['@/components/systemManage/index'],resolve)
const SystemStore = resolve => require(['@/components/systemManage/mid/store'],resolve)
const SystemCurbRule = resolve => require(['@/components/systemManage/child/curbRule'],resolve)
const SystemLimitSetting = resolve => require(['@/components/systemManage/child/limitSetting'],resolve)
const SystemStorePub = resolve => require(['@/components/systemManage/child/storePub'],resolve)
const SystemStoreReply = resolve => require(['@/components/systemManage/child/reply'],resolve)


const UseIndex = resolve => require(['@/components/useManage/index'],resolve)
const UseStore = resolve => require(['@/components/useManage/mid/store'],resolve)
const UsePub = resolve => require(['@/components/useManage/child/usePub'],resolve)


const MemberIndex = resolve => require(['@/components/memberManage/index'],resolve)
const MemberStore = resolve => require(['@/components/memberManage/mid/list'],resolve)

const CouponIndex = resolve => require(['@/components/cuoponManage/index'],resolve)
const CouponStore = resolve => require(['@/components/cuoponManage/mid/store'],resolve)

const MarketIndex = resolve => require(['@/components/marketManage/index'],resolve)
const MarketStore = resolve => require(['@/components/marketManage/mid/store'],resolve)

const ServeIndex = resolve => require(['@/components/serveManage/index'],resolve)
const ServeStore = resolve => require(['@/components/serveManage/mid/store'],resolve)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component:Home,
      redirect:'/index'
    },
    {
      path:'/signin',
      name:'singnin',
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
        }
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
                }
              ]
            },
            {
              path:'/use',
              name:'use',
              component:UseIndex,
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
              path:'/member',
              name:'member',
              component:MemberIndex,
              redirect:'/member/list',
              children:[
                {
                  path:'/member/list',
                  name:'memberList',
                  component:MemberStore
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
                }
              ],
            }
          ],
        }
      ]
    }
  ]
})
