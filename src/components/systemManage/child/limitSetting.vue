<template>
  <section class="wrapper">
    <section class="list">
      <section class="list-item" v-for="(item,index) in limit" :key="index">
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
      </section>
      <my-bottom type="button" />
    </section>
  </section>
</template>

<script>
import {limit , baseObj} from '../../../utils/limit.js'
import MyBottom from '@/components/common/bottom'
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
          child:[
            {
              name:'查看',
              prop:'read',
            },
            {
              name:'编辑',
              prop:'update',
            },
            {
              name:'删除',
              prop:'remove',
            },
            {
              name:'新增',
              prop:'create',
            } 
          ]
        }
      ],
      limit ,
      baseObj , 
      isFatherChange:true,
    }
  },
  methods: {
    /**
     * 一级权限管理
     */
    handleClickChangeForFirst(index,lindex,val){
      this.isFatherChange = false
      let data = this.limit[index].children[lindex]
      data.checks = val ? ['查看','编辑','删除','新增'] : []
      data.isIndeterminate = false
      this.isFatherChange = true
    },
    handleClickOneChose(index,lindex,val){  
      this.isFatherChange = false
      let data = this.limit[index].children[lindex]
      let checkedCount = val.length
      data.checkAll = checkedCount == 3
      data.isIndeterminate = checkedCount > 0 && checkedCount < 3
      this.isFatherChange = true
    },

    /**
     * 二级权限管理
     */
    handleClickChangeForChild(index,lindex,sid,val){
      this.isFatherChange = false
      let data = this.limit[index].children[lindex].children[sid]
      data.checks = val ? ['查看','编辑','删除','新增'] :[]
      data.isIndeterminate = false
      this.isFatherChange = true
    },
    handleClickOneChoseForChild(index,lindex,sid,val){
      this.isFatherChange = false
      let data = this.limit[index].children[lindex].children[sid]
      let checkedCount = val.length
      data.checkAll = checkedCount == 3
      data.isIndeterminate = checkedCount > 0 && checkedCount < 3
      this.isFatherChange = true
    },

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
    this.formatList()
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
