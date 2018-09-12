<template>
  <section class="wrapper">
      <section class="content">
        <Search />
        <section class="info">
          <p class="c999 nav-title">会员信息</p>
          <el-form class="my-form" :model="tempForm" label-width="90px" >
            <section class="inline-box">
              <el-form-item label="会员姓名">
                <el-input placeholder="占位符" v-model="tempForm.realName" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input placeholder="占位符" v-model="tempForm.phone" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="车牌号">
                <el-input placeholder="占位符" v-model="tempForm.plateNum" :disabled="inputDis"></el-input>
              </el-form-item>
            </section>
            <section class="inline-box">
              <el-form-item label="积分">
                <el-input placeholder="占位符" v-model="tempForm.integral" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="余额">
                <el-input placeholder="占位符" v-model="tempForm.money" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="会员等级">
                <el-input placeholder="占位符" v-model="tempForm.member" :disabled="inputDis"></el-input>
              </el-form-item>
            </section>
          </el-form>
        </section>
        <section class="info">
          <p class="nav-title c999">会员充值</p>
          <el-form class="my-form" :model="form">
            <section class="inline-box inline-other">
              <el-form-item class="box-item" label="充值金额" label-width="90px" >
                <el-input placeholder="请编辑充值金额" v-model="form.price"></el-input>
              </el-form-item>
              <section class="box-item">
                <el-form-item label="赠送金额">
                  <el-input placeholder="请编辑赠送金额" v-model="form.sendPrice" ></el-input>
                </el-form-item>
                <el-form-item label="赠送积分">
                  <el-input placeholder="请编辑赠送积分" v-model="form.sendPoint" ></el-input>
                </el-form-item>
              </section>
              <section class="box-item">
                <el-form-item label="请选择赠送卡券">
                  <el-select placeholder="请选择赠送的卡券" v-model="form.coupon1">
                    <el-option label="aaa" value="111" ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="请选择赠送卡券">
                  <el-select placeholder="请选择赠送的卡券" v-model="form.coupon2">
                    <el-option label="bbb" value="111" ></el-option>
                  </el-select>
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
      tempForm:{
        realName:'',
        phone:'',
        plateNum:'',
        integral:'',
        money:'',
        member:'',
      },
      form:{

      }
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
    // this.getList({path: this.pathChange})
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
