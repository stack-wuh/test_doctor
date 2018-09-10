<template>
  <section class="wrapper">
      <section class="content">
        <Search />
        <section class="info">
          <p class="c999 nav-title">会员信息</p>
          <el-form class="my-form" label-width="90px" >
            <section class="inline-box">
              <el-form-item label="会员姓名">
                <el-input placeholder="占位符" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input placeholder="占位符" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="车牌号">
                <el-input placeholder="占位符" :disabled="inputDis"></el-input>
              </el-form-item>
            </section>
            <section class="inline-box">
              <el-form-item label="积分">
                <el-input placeholder="占位符" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="余额">
                <el-input placeholder="占位符" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="会员等级">
                <el-input placeholder="占位符" :disabled="inputDis"></el-input>
              </el-form-item>
            </section>
          </el-form>
        </section>
        <section class="info">
          <p class="nav-title c999">会员充值</p>
          <el-form class="my-form">
            <section class="inline-box inline-other">
              <el-form-item class="box-item" label="充值金额" label-width="90px" >
                <el-select placeholder="请选择充值金额"></el-select>
              </el-form-item>
              <section class="box-item">
                <el-form-item label="赠送金额">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="赠送积分">
                  <el-input></el-input>
                </el-form-item>
              </section>
              <section class="box-item">
                <el-form-item label="请选择赠送卡券">
                  <el-select></el-select>
                </el-form-item>
                <el-form-item label="请选择赠送卡券">
                  <el-select></el-select>
                </el-form-item>
              </section>
            </section>
          </el-form>
        </section>
      </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import {mapActions} from 'vuex'

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
  computed:{
    pathChange(){
      return this.$route.query.child || this.$route.query.subMenu
    }
  },
  methods: {
    ...mapActions({
      'getList': 'getMemberStore'
    })
  },
  created(){
    this.getList({path: this.pathChange})
  }
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
        }
        .inline-other{
          justify-content: flex-start;
          .box-item{
            flex:.5;
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
