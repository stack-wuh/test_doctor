<template>
  <section class="wrapper">
    <section class="list">
      <section v-if="isFatherChange" class="list-item" v-for="(item,index) in list" :key="index">
        <section class="item">{{item.menuName}}</section>
        <section class="item-nav" v-if="item.subMenu" v-for="(list,lindex) in item.subMenu" >
          <div>
            <span class="title">
              <el-checkbox v-model="list.isAuthor"
                @change="handleTopChoose($event, list, index, lindex)"
                v-if="list.authorityList"></el-checkbox>
              {{list.menuName}}
            </span>
              <el-checkbox
                v-for="(ll, ld) in list.authorityList"
                :key="ld" :label="ll.name"
                @change="handleClickOneChose(list, ll, ld)"
                v-model="ll.isAuth">
              </el-checkbox>
          </div>
          <section class="sub-item-nav" v-if="list.authorityMenuList" v-for="(sub,sid) in list.authorityMenuList" :key="sid">
            <div v-if="isFatherChange" >
              <span class="title">
                <el-checkbox v-model="sub.isAuthor" @change="handleTopChoose($event, sub, index, lindex)"  ></el-checkbox>
                {{sub.menuName}}
              </span>
                <el-checkbox v-for="(ll, ld) in sub.authorityList" @change="handleClickOneChose(sub, ll, ld)" :key="ld" :label="ll.name" v-model="ll.isAuth"></el-checkbox>
            </div>
          </section>
        </section>
      </section>
    </section>
    <my-bottom @handleSubmit="handleSubmit" @handleCancel="handleCancel" style="padding: 20px 0;"></my-bottom>
  </section>
</template>

<script>
import {limit , baseObj} from '../../../utils/limit.js'
import MyBottom from '@/components/common/subButton'
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
import {throttle} from '@/utils/global.js'
export default {
  name: 'limitSetting',
  components:{
    MyBottom ,
  },
  data () {
    return {
      data:[
        {
          label:'名称',
          checkAll:false,
          isIndeterminate:true,
          checks:[],
        }
      ],
      limit ,
      baseObj ,
      isFatherChange:true,
      roleId:'',
      list:[
        {
          id: 22,
          menuName: '用品管理',
          subMenu:[
            {
              menuName: '汽车精品管理',
              id: 23,
              parentId: 22,
              authorityList:[
                {
                  isAuth: true,
                  name:'新增',
                  id: 18,
                },
                {
                  isAuth: true,
                  name: '删除',
                  id:19
                },
                {
                  isAuth: true,
                  name:'修改',
                  id: 20
                },
                {
                  isAuth: true,
                  name:'查看',
                },
              ]
            },
            {
              menuName: '精品订单管理',
              id: 23,
              parentId: 22,
              authorityList:[
                {
                  isAuth: true,
                  name:'新增',
                  id: 18,
                },
                {
                  isAuth: true,
                  name: '删除',
                  id:19
                },
                {
                  isAuth: true,
                  name:'修改',
                  id: 20
                },
                {
                  isAuth: true,
                  name:'查看',
                },
              ]
            },
            {
              menuName: '配件大类管理',
              id: 23,
              parentId: 22,
              authorityList:[
                {
                  isAuth: true,
                  name:'新增',
                  id: 18,
                },
                {
                  isAuth: true,
                  name: '删除',
                  id:19
                },
                {
                  isAuth: true,
                  name:'修改',
                  id: 20
                },
                {
                  isAuth: true,
                  name:'查看',
                },
              ]
            },
          ]
        },
        {
          id: 22,
          menuName: '系统管理',
          subMenu:[
            {
              menuName: '门店管理',
              id: 23,
              parentId: 22,
              authorityList:[
                {
                  isAuth: true,
                  name:'新增',
                  id: 18,
                },
                {
                  isAuth: true,
                  name: '删除',
                  id:19
                },
                {
                  isAuth: true,
                  name:'修改',
                  id: 20
                },
                {
                  isAuth: true,
                  name:'查看',
                },
              ]
            },
            {
              menuName: '部门管理',
              id: 23,
              parentId: 22,
              authorityList:[
                {
                  isAuth: true,
                  name:'新增',
                  id: 18,
                },
                {
                  isAuth: true,
                  name: '删除',
                  id:19
                },
                {
                  isAuth: true,
                  name:'修改',
                  id: 20
                },
                {
                  isAuth: true,
                  name:'查看',
                },
              ]
            },
            {
              menuName: '角色管理',
              id: 23,
              parentId: 22,
              authorityList:[
                {
                  isAuth: true,
                  name:'新增',
                  id: 18,
                },
                {
                  isAuth: true,
                  name: '删除',
                  id:19
                },
                {
                  isAuth: true,
                  name:'修改',
                  id: 20
                },
                {
                  isAuth: true,
                  name:'查看',
                },
              ]
            },
            {
              menuName: '员工列表',
              id: 23,
              parentId: 22,
              authorityList:[
                {
                  isAuth: true,
                  name:'新增',
                  id: 18,
                },
                {
                  isAuth: true,
                  name: '删除',
                  id:19
                },
                {
                  isAuth: true,
                  name:'修改',
                  id: 20
                },
                {
                  isAuth: true,
                  name:'查看',
                },
              ]
            },
            {
              menuName: '平台配置',
              id: 23,
              parentId: 22,
              authorityMenuList:[
                {
                  menuName: '会员卡等级设置',
                  authorityList:[
                                  {
                                    isAuth: true,
                                    name:'新增',
                                    id: 18,
                                  },
                                  {
                                    isAuth: true,
                                    name: '删除',
                                    id:19
                                  },
                                  {
                                    isAuth: true,
                                    name:'修改',
                                    id: 20
                                  },
                                  {
                                    isAuth: true,
                                    name:'查看',
                                  },
                                ]
                },
                {
                  menuName: '会员卡积分规则',
                  authorityList:[
                                  {
                                    isAuth: true,
                                    name:'新增',
                                    id: 18,
                                  },
                                  {
                                    isAuth: true,
                                    name: '删除',
                                    id:19
                                  },
                                  {
                                    isAuth: true,
                                    name:'修改',
                                    id: 20
                                  },
                                  {
                                    isAuth: true,
                                    name:'查看',
                                  },
                                ]
                },
                {
                  menuName: '会员充值设置',
                  authorityList:[
                                  {
                                    isAuth: true,
                                    name:'新增',
                                    id: 18,
                                  },
                                  {
                                    isAuth: true,
                                    name: '删除',
                                    id:19
                                  },
                                  {
                                    isAuth: true,
                                    name:'修改',
                                    id: 20
                                  },
                                  {
                                    isAuth: true,
                                    name:'查看',
                                  },
                                ]
                },
                {
                  menuName: '分享与消费奖励规则',
                  authorityList:[
                                {
                                  isAuth: true,
                                  name:'新增',
                                  id: 18,
                                },
                                {
                                  isAuth: true,
                                  name: '删除',
                                  id:19
                                },
                                {
                                  isAuth: true,
                                  name:'修改',
                                  id: 20
                                },
                                {
                                  isAuth: true,
                                  name:'查看',
                                },
                              ]
                },
                {
                  menuName: '保养提醒设置',
                  authorityList:[
                                  {
                                    isAuth: true,
                                    name:'新增',
                                    id: 18,
                                  },
                                  {
                                    isAuth: true,
                                    name: '删除',
                                    id:19
                                  },
                                  {
                                    isAuth: true,
                                    name:'修改',
                                    id: 20
                                  },
                                  {
                                    isAuth: true,
                                    name:'查看',
                                  },
                                ]
                },
                {
                  menuName: '自动回复设置',
                  authorityList:[
                                  {
                                    isAuth: true,
                                    name:'新增',
                                    id: 18,
                                  },
                                  {
                                    isAuth: true,
                                    name: '删除',
                                    id:19
                                  },
                                  {
                                    isAuth: true,
                                    name:'修改',
                                    id: 20
                                  },
                                  {
                                    isAuth: true,
                                    name:'查看',
                                  },
                                ]
                },
                {
                  menuName: '保险公司',
                  authorityList:[
                                  {
                                    isAuth: true,
                                    name:'新增',
                                    id: 18,
                                  },
                                  {
                                    isAuth: true,
                                    name: '删除',
                                    id:19
                                  },
                                  {
                                    isAuth: true,
                                    name:'修改',
                                    id: 20
                                  },
                                  {
                                    isAuth: true,
                                    name:'查看',
                                  },
                                ]
                },
                {
                  menuName: '快捷回复设置',
                  authorityList:[
                                  {
                                    isAuth: true,
                                    name:'新增',
                                    id: 18,
                                  },
                                  {
                                    isAuth: true,
                                    name: '删除',
                                    id:19
                                  },
                                  {
                                    isAuth: true,
                                    name:'修改',
                                    id: 20
                                  },
                                  {
                                    isAuth: true,
                                    name:'查看',
                                  },
                                ]
                },
                {
                  menuName: '关注后消息推送',
                  authorityList:[
                                  {
                                    isAuth: true,
                                    name:'新增',
                                    id: 18,
                                  },
                                  {
                                    isAuth: true,
                                    name: '删除',
                                    id:19
                                  },
                                  {
                                    isAuth: true,
                                    name:'修改',
                                    id: 20
                                  },
                                  {
                                    isAuth: true,
                                    name:'查看',
                                  },
                                ]
                }
              ]
            },
          ]
        },
      ],
      count:0
    }
  },
  computed:{
    ...mapState({
      'store': state => state.Limit.data
    }),
    query(){
      let data = this.$route.query.data
      data = data && JSON.parse(data)
      return data
    }
  },
  methods: {
    ...mapActions({
      'getLimitStore':'getLimitStore',
      'handleAccredit':'handleAccredit',
      'handleAccreditMore': 'handleAccreditMore',
    }),

    handleSubmit(){
      let form = {
        roleId: this.query.id,
        authorityIds: '',
        status: 1
      }
      let ids = [], lists = []
      let temp_arrs = this.list.reduce((curr, next) => {
        next.subMenu.map(ii => {
          Array.isArray(ii.authorityList) && curr.push(...ii.authorityList)
          if(Array.isArray(ii.authorityMenuList)){
            ii.authorityMenuList.map(ss => {
              Array.isArray(ss.authorityList) && curr.push(...ss.authorityList)
            })
          }
        })
        return curr
      }, []).filter(ii => ii.isAuth).map(ii => ii.id).toString()
      form.authorityIds = temp_arrs
      this.handleAccreditMore({form}).then(res => {
        if(res.status === 0){
          setTimeout(() => {
            this.fetchData()
          }, 1000)
        }
      })
    },
    handleCancel(){
      this.$router.go(-2)
    },

    /**
     * 一级权限管理
     */
    handleTopChoose(val, list){
      this.isFatherChange = false
      list.authorityList.forEach(ii => {
        ii.isAuth = val
      })
      this.isFatherChange = true
    },

    /**
     * 低级权限管理
     */
    handleClickOneChose(list, item, index){
      this.isFatherChange = false
      let result = list.authorityList.every(ii => ii.isAuth)
      list.isAuthor = result
      this.isFatherChange = true
    },

    /**
     * 二级权限管理
     */

    formatList(){
     let baseobj = JSON.parse(JSON.stringify(baseObj))
     this.limit.map(item => {
       if(item.rank == 'father'){
         item = Object.assign(item,baseobj)
         item.children.map(mid => {
           if(mid.rank == 'mid'){
             mid = Object.assign(mid,baseobj)
             mid.children && mid.children.map(sub => {
               sub = Object.assign(sub,baseobj)
             })
           }
         })
       }
     })
    },

    fetchData(){
      this.getLimitStore({form:{roleId: this.query.id}}).then(res => {
        this.list = res.data && res.data.map(item => {
          item.authorityMenuList && item.authorityMenuList.map(list => {
            list.authorityList && list.authorityList.map(sub => {
              sub.isAuth = sub.isAuth == 1 ? true : false
            })
            list.isAuthor = list.authorityList && list.authorityList.every(ss => ss.isAuth)
            list.authorityMenuList && list.authorityMenuList.map(sub => {
                sub.authorityList && sub.authorityList.map(ss => {
                  ss.isAuth = ss.isAuth == 1 ? true : false
                })
                sub.isAuthor = sub.authorityList && sub.authorityList.every(ss => ss.isAuth)
            })
          })
          return {id: item.id, menuName: item.menuName, subMenu: item.authorityMenuList}
        })
      })
    }
  },
  created(){
    this.formatList()
    this.fetchData()
  }
}
</script>

<style scoped lang='scss' >
.wrapper{
  margin:10px 0;
  background-color: #fff;
  color: #999;
  .list{
    width: 100%;
    .list-item {
      .item{
        width: 100%;
        padding:10px;
        background-color: lightgray;
      }
    }
  }
  .item-nav{
    padding-left:15px;
    font-size: 15px;
    .title{
      display: inline-block;
      margin-right: 15px;
      margin:2px 0;
      min-width:150px;
    }
    >div{
      display: flex;
      height: 30px;
      line-height: 30px;
      .nav-list{
        flex:1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .el-checkbox + .el-checkbox{
          margin-left: 0;
        }
        >.nav-item{
          flex:1;
        }
      }
    }
  }
  .sub-item-nav{
    margin-left:25px;
    font-size: 14px;
    .title{
      margin-right: 10px;
      margin:2px 0;
      min-width: 125px;
    }
    >div{
      display: flex;
      height: 30px;
      line-height: 30px;
      .nav-list{
        flex:1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .el-checkbox + .el-checkbox{
          margin-left: 0;
        }
        >.nav-item{
          flex:1;
        }
      }
    }
  }
  .my-bottom{

  }
}
</style>
