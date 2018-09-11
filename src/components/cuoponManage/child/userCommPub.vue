<template>
  <section class="wrapper">
      <section class="content">
        <Search />
        <section class="info">
          <p class="nav-title c999">佣金信息</p>
          <el-form class="my-form" label-width="90px">
            <section class="inline-box">
              <el-form-item label="车辆">
                <el-input v-model="tempForm.carNumber" disabled></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="tempForm.realName" disabled></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="tempForm.phone" disabled></el-input>
              </el-form-item>
              <el-form-item label="会员等级">
                <el-input v-model="tempForm.memberId" disabled></el-input>
              </el-form-item>
            </section>
            <section class="inline-box">
              <el-form-item label="佣金">
                <el-input v-model="tempForm.brokerage" disabled></el-input>
              </el-form-item>
              <el-form-item label="余额">
                <el-input v-model="tempForm.money" disabled></el-input>
              </el-form-item>
              <el-form-item label="会员积分">
                <el-input v-model="tempForm.integral" disabled></el-input>
              </el-form-item>
            </section>
          </el-form>
        </section>
        <section class="info">
          <p class="nav-title c999">佣金提现</p>
          <el-form class="my-form" :rules="rules" :model="form"  ref="myForm" label-width="90px">
              <el-form-item  label="提现金额" prop="money" >
                  <el-input class="my-input-320" v-model="form.money"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input class="my-input-320" v-model="form.remark" ></el-input>
              </el-form-item>
          </el-form>
        </section>
        <my-sub-botton @handleCancel="cancel" @handleSubmit="submit"></my-sub-botton>
      </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import MyTable from '@/components/common/myTable'
import MySubBotton from '@/components/common/subButton'
import {mapActions, mapGetters, mapState} from 'vuex'
const rules = {
  money:[
    {
      required:true,
      message:'请编辑佣金提现的金额',
      trigger:'blur'
    },
  ],
  remark:[
    {
      required: false
    }
  ]
}
export default {
  name: 'memberPay',
  components:{
    Search ,
    MyTable ,
    MySubBotton,
  },
  data () {
    return {
      inputDis:true,
      form:{
        money:'',
        remark:'',
      },
      rules
    }
  },
  computed:{
    ...mapState({
      'tempForm': state => state.Coupon.tempForm
    })
  },
// 吴克 13294199207 鄂A 88888
  methods: {
    ...mapActions({
      'getList':'getCouponStore',
      'handleSubmit': 'couponMemberTakePut',
      'handleCancel' : 'clearCouponMemberTake'
    }),
    cancel(){
      this.$refs.myForm.resetFields()
      this.handleCancel()
    },
    submit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.form = {...this.form, id: this.tempForm.id}
          this.handleSubmit({form: this.form}).then(res => {
            this.cancel()
            setTimeout(()=>{
              this.$router.push({path:'/mid/container', query:{path: '/coupon/store', menu:'卡券管理', subMenu:'用户提现记录'}})
            },1000)
          })
        }else{
          _g.toastMsg({
            type:'error',
            msg:'请编辑必填项目后提交!'
          })
        }
      })
    }
  },
  created(){
    // this.getList({path: this.$route.query.child || this.$route.query.subMenu})
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
