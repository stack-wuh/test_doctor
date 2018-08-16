<template>
  <section class="wrapper">
      <section class="content">
        <Search />
        <section class="info">
          <p class="c999 nav-title">佣金信息</p>
          <el-form class="my-form" label-width="90px" >
            <section class="inline-box">
              <el-form-item label="车牌号">
                <el-input placeholder="占位符" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input placeholder="占位符" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input placeholder="占位符" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="会员等级">
                <el-input placeholder="占位符" :disabled="inputDis"></el-input>
              </el-form-item>
            </section>
            <section class="inline-box">
              <el-form-item label="佣金">
                <el-input placeholder="占位符" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="余额">
                <el-input placeholder="占位符" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="会员积分">
                <el-input placeholder="占位符" :disabled="inputDis"></el-input>
              </el-form-item>
            </section>
          </el-form>
        </section>
        <section class="info">
          <p class="nav-title c999">佣金提现</p>
          <el-form class="my-form" label-width="90px">
              <el-form-item  label="提现金额" >
                  <el-input class="my-input-320"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input class="my-input-320"></el-input>
              </el-form-item>
          </el-form>
        </section>
      </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'

export default {
  name: 'memberPay',
  components:{
    Search ,
  },
  data () {
    return {
      inputDis:true,
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/color.scss';
.wrapper{
  .content{
    height: 100%;
    background-color: #fff;
    .info{
      p.nav-title{
        height: 50px;
        padding-left: 15px;
        background-color: $search-bg;
        color: $search-cl;
        font-size: 15px;
        line-height: 50px;
      }
      .my-form{
        margin-top:15px;
        .inline-box{
          display: flex;
          .el-form-item{
            width:24%;
          }
        }
        .inline-other{
          justify-content: flex-start;
          .box-item{
            flex:.2;
            .el-input ,
            .el-select{
              width:60%;
            }
          }
        }
      }
    }
  }
}
</style>
