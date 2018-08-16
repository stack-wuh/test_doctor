<template>
  <section class="wrapper">
    <section class="content">
        <el-form class="my-form" label-width="120px" >
          <section class="inline-block">
            <el-form-item label="姓名">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="车型">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="车辆年限">
              <el-input></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="裸车价格">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="出险次数">
              <el-input></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="保险公司">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="出强险">
              <el-input></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="损失险">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="不计免赔">
              <el-input></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="盗抢险">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="玻璃险">
              <el-input></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="自燃险">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="涉水险">
              <el-input></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="车身划痕">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="司机座位责任险">
              <el-input></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="第三方责任险">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="报价">
              <el-input></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="备注">
              <el-input type="textarea" :rows="3" ></el-input>
            </el-form-item>
          </section>      
        </el-form>
    </section>
  </section>
</template>

<script>
export default {
  name: 'insurePub',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >
.wrapper{
  height: 100%;
  .content{
    height: 100%;
    background-color: #fff;
    .my-form{
      width: 80%;
      margin:0 auto;
      padding: 15px 0;
      .inline-block{
        display: flex;
        .el-form-item{
          flex:1;
        }
      }
    }
  }
}
</style>
