<template>
  <section class="over-detail-wrapper">
    <header class="header">
      <p class="top__title">会员信息</p>
      <el-form :inline="true"  class="my-form" >
        <el-form-item label="姓名">
          <el-input v-model="info.userName" placeholder="占位符" disabled ></el-input>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="info.plateNum" placeholder="占位符" disabled ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="info.phone" placeholder="占位符" disabled ></el-input>
        </el-form-item>
      </el-form>
    </header>
    <section class="over-content">
      <p class="top__title margin-bm-15">检测记录详情列表</p>
      <section style="padding: 15px; padding-top:0;">
      <el-table :data="data" border stripe >
        <el-table-column align="center" v-if="item.type === 'default'" v-for="(item, index) in tables" :key="index" :label="item.label" :prop="item.field" ></el-table-column>
        <el-table-column align="center" v-if="item.type === 'button'" v-for="(item, index) in tables" :key="index" :label="item.label">
          <template slot-scope="scope">
            <el-button v-for="(btn, bid) in item.list" :key="bid" :type="btn.type" @click="handleClickShowImgs(scope.row)" >{{btn.text}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      </section>
    </section>
    <section>
      <p class="my-form__item">
        <span class="margin-rg-15">当前里程:</span>
        <el-input v-model="info.currentMileage" class="my-input-220" placeholder="占位符" disabled></el-input>
      </p>
      <p class="my-form__item">
        <span class="margin-rg-15 margin-tp-10">检测日期:</span>
        <el-input v-model="info.detectionTimeStr" class="my-input-220" placeholder="占位符" disabled></el-input>
      </p>
    </section>
    
    <el-dialog title="图片展示" :visible.sync="dialogVisible">
      <my-carousel :autoplay="false" position="none" arrow="hover" :list="imgs" ></my-carousel>
    </el-dialog>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
import MyCarousel from '@/components/common/imgsPanel'
const tables = [
  {
    label:'类型',
    type: 'default',
    field:'detectionName'
  },
  {
    label:'项目状态',
    type: 'default',
    field:'detectionStatus'
  },
  {
    label:'建议操作',
    type: 'default',
    field:'advice'
  },
  {
    label:'下次提醒天数',
    type: 'default',
    field:'days'
  },
  {
    label:'维修预估费用',
    type: 'default',
    field:'price'
  },
  {
    label:'检修技师',
    type: 'default',
    field:'employeeName'
  },
  {
    label:'用户是否确认维修',
    type: 'default',
    field:'isService'
  },
  {
    label:'维修状态',
    type: 'default',
    field:'serviceStatus'
  },
  {
    label:'检测图片',
    type: 'button',
    list:[
      {
        text:'查看',
        type:'text',
        click:'handleClickShowImgs',
      }
    ]
  },
]
export default {
  name: '',
  components:{
    MyCarousel
  },
  data () {
    return {
      tables,
      info:{},
      data:[],
      dialogVisible: false,
      imgs:[]
    }
  },

  methods: {
    ...mapActions({
      'getStoreServeList': 'getServerStore'
    }),
    handleClickShowImgs(item){
      this.dialogVisible = true
      this.imgs = item.picture ? (item.picture && item.picture.split(',')) : []
    }
  },
  created(){
    let data = this.$route.query && this.$route.query.data && JSON.parse(this.$route.query.data)
    this.getStoreServeList({path:'检修记录详情', search: {id: data.id}}).then(res => {
      this.info = res.data.vo
      this.data = res.data.list
    })
  }
}
</script>

<style scoped lang='scss' >
.over-detail-wrapper{
  padding-bottom: 15px;
  background-color: #fff;
  .top__title{
    height:40px;
    padding-left: 15px;
    line-height: 40px;
    background-color: #ccc;
    color: #999;
    border-bottom: 1px solid #eee;
  }
  .my-form{
    margin:15px;
  }
  .my-table{
    margin:15px;
  }
  .my-form__item{
    margin-bottom: 15px;
    padding-left: 15px;
    font-size: 15px;
    color: #333;
  }
  .my-carousel__img{
    width: 100%;
    height: 100%;
  }
}
</style>
