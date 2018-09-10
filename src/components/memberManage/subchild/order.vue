<template>
  <section class="wrapper">
    <section class="search">
      <el-form :inline="true" :model="form" class="my-form">
        <el-form-item v-for="(item,index) in formList" :key="index" :label="item.label">
          <el-input v-model="form[item.prop]" :placeholder="'请编辑' + item.label"></el-input>
        </el-form-item>
      </el-form>
    </section>
    <section class="info">
      <p class="nav-title flex flex-justify-between"><span>基本信息</span></p>
      <el-table :data="[{}]" border stripe class="my-table">
        <el-table-column label="单号"></el-table-column>
        <el-table-column label="消费类型"></el-table-column>
        <el-table-column label="里程"></el-table-column>
        <el-table-column label="应收金额"></el-table-column>
        <el-table-column label="挂账金额"></el-table-column>
        <el-table-column label="开单日期"></el-table-column>
      </el-table>
    </section>
  </section>
</template>

<script>
export default {
  name: 'car',

  data () {
    return {
      form:{},
      formList:[
        {
          label:'历史单据',
          type:'input',
          prop:'',
        },
        {
          label:'单据总额',
          type:'input',
          prop:'',
        },
        {
          label:'挂账金额',
          type:'input',
          prop:'',
        }
      ]
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >
.wrapper{
  .search{
    padding:20px 0 0 10px;
    background-color: #fff;
  }
  .nav-title{
    margin:15px;
    padding-top:15px;
    padding-bottom:15px;
    color: #999;
    border-bottom:1px solid #eee;
  }
  .info{
    padding-bottom: 20px;
    background-color: #fff;
    .my-table{
      width: 90%;
      margin:0 auto;
    }
  }
}
</style>
