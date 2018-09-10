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
        <el-table-column label="检查日期"></el-table-column>
        <el-table-column label="检测技师"></el-table-column>
        <el-table-column label="检测类型"></el-table-column>
        <el-table-column label="检测里程"></el-table-column>
        <el-table-column label="急需处理"></el-table-column>
        <el-table-column label="密切关注"></el-table-column>
        <el-table-column label="状态良好"></el-table-column>
        <el-table-column label="操作"></el-table-column>
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
          label:'检测次数',
          type:'input',
          prop:'',
        },
        {
          label:'继续处理',
          type:'input',
          prop:'',
        },
        {
          label:'密切关注',
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
