<template>
  <section class="wrapper">
    <section class="list">
      <!-- <section class="list-item" v-for="(item,index) in limit" :key="index">
        <section class="item">{{item.label}}</section>
        <section class="item-nav" v-if="item.children" v-for="(list,lindex) in item.children" >
          <div v-if="isFatherChange">
            <span class="title"><el-checkbox :indeterminate="list.isIndeterminate" v-model="list.checkAll" @change="handleClickChangeForFirst(index,lindex,$event)" ></el-checkbox> {{list.label}} </span>
              <el-checkbox-group class="nav-list" v-model="list.checks" @change="handleClickOneChose(index,lindex,$event)" >
                <el-checkbox class="nav-item" v-for="(ll,ld) in list.child" :label="ll.name" :key="ld" ></el-checkbox>
              </el-checkbox-group>
          </div>
          <section class="sub-item-nav" v-if="list.children" v-for="(sub,sid) in list.children" :key="sid">
            <div v-if="isFatherChange" >
              <span class="title"><el-checkbox :indeterminate="sub.isIndeterminate" v-model="sub.checkAll" @change="handleClickChangeForChild(index,lindex,sid,$event)" ></el-checkbox> {{sub.label}}</span>
                <el-checkbox-group class="nav-list" v-model="sub.checks" @change="handleClickOneChoseForChild(index,lindex,sid,$event)"  >
                  <el-checkbox class="nav-item" v-for="(ss,sd) in sub.child" :label="ss.name" :key="sd" ></el-checkbox>
                </el-checkbox-group>
            </div>
          </section>
        </section>
      </section> -->
      <!-- {{list}} -->
      <section v-if="isFatherChange" class="list-item" v-for="(item,index) in list" :key="index">
        <section class="item">{{item.menuName}}</section>
        <section class="item-nav" v-if="item.subMenu" v-for="(list,lindex) in item.subMenu" >
          <div>
            <span class="title">
              <!-- <el-checkbox :indeterminate="list.isIndeterminate" v-model="list.checkAll" @change="handleClickChangeForFirst(index,lindex,$event)" ></el-checkbox> -->
              {{list.menuName}} 
            </span>
            <el-checkbox  v-for="(ll, ld) in list.authorityList" :key="ld" :label="ll.name" @change="handleClickOneChose(index, ld, $event, ll.id)" v-model="ll.isAuth" ></el-checkbox>
          </div>
          <section class="sub-item-nav" v-if="list.authorityMenuList" v-for="(sub,sid) in list.authorityMenuList" :key="sid">
            <div v-if="isFatherChange" >
              <span class="title">
                <!-- <el-checkbox :indeterminate="sub.isIndeterminate" v-model="sub.checkAll" @change="handleClickChangeForChild(index,lindex,sid,$event)" ></el-checkbox> -->
                {{sub.menuName}}
              </span>
                <el-checkbox v-for="(ll, ld) in sub.authorityList" @change="handleClickOneChose(index, ld, $event, ll.id)" :key="ld" :label="ll.name" v-model="ll.isAuth"></el-checkbox>
            </div>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import {limit , baseObj} from '../../../utils/limit.js'
import MyBottom from '@/components/common/bottom'
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
  },
  methods: {
    ...mapActions({
      'getLimitStore':'getLimitStore',
      'handleAccredit':'handleAccredit'
    }),
    /**
     * 一级权限管理
     */
    handleClickOneChose(index, lindex, val, id){
       this.handleAccredit({form:{authorityId: id, roleId: this.roleId}})
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

  },
  created(){
    let data = this.$route.query.data && JSON.parse(this.$route.query.data)
    this.roleId = data.id
    this.formatList()
    this.getLimitStore({form:{roleId: data.id}}).then(res => {
      this.list = res.data && res.data.map(item => {
        item.authorityMenuList && item.authorityMenuList.map(list => {
          list.authorityList && list.authorityList.map(sub => {
            sub.isAuth = sub.isAuth == 1 ? true : false
          })
          list.authorityMenuList && list.authorityMenuList.map(sub => {
              sub.authorityList && sub.authorityList.map(ss => {
                ss.isAuth = ss.isAuth == 1 ? true : false
              })
          })
        })
        return {id: item.id, menuName: item.menuName, subMenu: item.authorityMenuList}
      })
    })
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
}
</style>
