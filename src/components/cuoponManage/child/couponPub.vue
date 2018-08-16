<template>
  <section class="wrapper" >
      <section class="content">
        <el-form class="my-form" label-width="120px" >
          <section class="inline-box" >
            <el-form-item label="卡券类型">
              <el-select></el-select>
            </el-form-item>
            <el-form-item label="卡券名称">
              <el-input></el-input>
            </el-form-item>
          </section>
          <section class="inline-box" >
            <el-form-item label="卡券类型">
              <el-select></el-select>
            </el-form-item>
            <el-form-item label="卡券数量">
              <el-input></el-input>
            </el-form-item>
          </section>
          <section class="inline-box" >
            <el-form-item label="消费满">
              <el-select></el-select>
            </el-form-item>
            <el-form-item label="有效期">
              <el-date-picker></el-date-picker>
            </el-form-item>
          </section>
          <el-form-item label="领取规则">
            <el-checkbox-group>
              <el-checkbox label="允许重复领取"></el-checkbox>
              <el-checkbox label="首次分享后领取"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="员工推荐权限">
            <el-checkbox-group>
              <el-checkbox label="所有员工" ></el-checkbox>
              <el-checkbox label="销售顾问" ></el-checkbox>
              <el-checkbox label="售后顾问" ></el-checkbox>
              <el-checkbox label="续保顾问" ></el-checkbox>
              <el-checkbox label="保险顾问" ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="使用说明">
            <el-input type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-form>
      </section>
  </section>
</template>

<script>
export default {
  name: '',

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
      width: 60%;
      padding: 15px 0;
      .inline-box{
        display: flex;
        .el-input ,
        .el-select ,
        .el-date-picker{
          width: 220px;
        }
      }
    }
  }
}
</style>
