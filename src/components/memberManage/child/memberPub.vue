<template>
  <section class="wrapper">
    <section class="content">
      <el-form class="my-form" :model="form" label-width="140px">
        <section class="inline-box">
          <el-form-item label="用户姓名">
            <el-input placeholder="请编辑用户姓名" ></el-input>
          </el-form-item>
          <el-form-item label="客户手机">
            <el-input placeholder="请编辑客户手机"></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="性别">
            <el-select placeholder="请选择性别" >
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户生日">
            <el-date-picker ></el-date-picker>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="车牌号">
            <el-input placeholder="请编辑车牌号"></el-input>
          </el-form-item>
          <el-form-item label="车型">
            <el-input placeholder="请编辑车型"></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="保养顾问">
            <el-select placeholder="请选择保养顾问"></el-select>
          </el-form-item>
          <el-form-item label="续保顾问">
            <el-select placeholder="请选择续保顾问"></el-select>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="保险顾问">
            <el-select placeholder="请选择保险顾问"></el-select>
          </el-form-item>
          <el-form-item label="保险购买日期">
            <el-date-picker></el-date-picker>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="上次保养日期">
            <el-date-picker></el-date-picker>
          </el-form-item>
          <el-form-item label="保养间隔公里数">
            <el-input></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="会员等级">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="会员积分">
            <el-input></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="余额">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="佣金">
            <el-input></el-input>
          </el-form-item>
        </section>
      </el-form>
      <my-bottom type="button" />
    </section>
  </section>
</template>

<script>
import MyBottom from  '../../common/bottom';
export default {
  name: 'memberPub',
  components:{
    MyBottom ,
  },
  data () {
    return {
      form:{},
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/mixin.scss';
.wrapper{
  height: 100%;
  .content{
    height: 100%;
    background-color: #fff;
    .my-form{
      width: 80%;
      margin:0 auto;
      padding: 15px 0;
      .inline-box{
        @include flex-box;
        .el-form-item{
          flex:1;
          .el-input, 
          .el-select ,
          .el-date-picker{
            width: 80%;
          }
        }
      }
    }
  }
}
</style>
