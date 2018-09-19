<template>
  <section class="wrapper">
      <section class="content">
        <Search  />
        <section class="info">
          <p class="c999 nav-title">会员信息</p>
          <el-form class="my-form" label-width="90px" >
            <section class="inline-box">
              <el-form-item label="会员姓名">
                <el-input placeholder="占位符" v-model="tempObj.realName" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input placeholder="占位符" v-model="tempObj.phone" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="车牌号">
                <el-input placeholder="占位符" v-model="tempObj.plateNum" :disabled="inputDis"></el-input>
              </el-form-item>
            </section>
            <section class="inline-box">
              <el-form-item label="积分">
                <el-input placeholder="占位符" v-model="tempObj.integral" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="余额">
                <el-input placeholder="占位符" v-model="tempObj.money" :disabled="inputDis"></el-input>
              </el-form-item>
              <el-form-item label="会员等级">
                <el-input placeholder="占位符" v-model="tempObj.member" :disabled="inputDis"></el-input>
              </el-form-item>
            </section>
          </el-form>
        </section>
        <section class="info">
          <p class="nav-title c999">会员充值</p>
          <el-form class="my-form" :model="form" :rules="rules" ref="myForm">
            <section class="inline-box inline-other">
              <section class="box-item">
                <el-form-item class="box-item" label="充值金额" label-width="90px" prop="money">
                  <el-input placeholder="请编辑充值金额" v-model="form.money"></el-input>
                </el-form-item>
                <el-form-item class="box-item" label="赠送积分" label-width="90px" prop="integral">
                  <el-input placeholder="请编辑赠送积分" v-model="form.integral"></el-input>
                </el-form-item>
              </section>
              <section class="box-item">
                <el-form-item label="赠送金额" prop="giveMoney">
                  <el-input placeholder="请编辑赠送金额" v-model="form.giveMoney"></el-input>
                </el-form-item>
              </section>
              <section class="box-item">
                <el-form-item label="请选择赠送卡券" prop="ids">
                  <el-select multiple placeholder="请选择赠送的卡券" v-model="form.ids">
                    <el-option v-for="(item,index) in couponList" :key="index"  :label="item.label" :value="item.value" ></el-option>
                  </el-select>
                </el-form-item>
              </section>
            </section>
          </el-form>
        </section>
        <sub-button @handleCancel="cancel" @handleSubmit="submit" />
      </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import SubButton from '@/components/common/subButton'
import {mapActions, mapGetters, mapState} from 'vuex'
import {MaxCouponNumber} from '../../../utils/valid.js'
const rules = {
  money:[{required: true, message:'请编辑充值金额', trigger:'blur'}],
  giveMoney:[{required: true, message:'请编辑赠送金额', trigger:'blur'}],
  integral:[{required: true, message:'请编辑赠送积分', trigger:'blur'}],
  ids:[{required: true, validator: MaxCouponNumber, trigger:'change'}],
}

export default {
  name: 'memberPay',
  components:{
    Search,
    SubButton,
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
        money:'',
        giveMoney:'',
        integral:'',
        ids:[],
      },
      rules,
    }
  },
  computed:{
    ...mapState({
      'tempObj': state => state.Member.tempObj.data,
      'search': state => state.search
    }),
    ...mapGetters({
      'couponList': 'formatCouponList'
    }),
    pathChange(){
      return this.$route.query.child || this.$route.query.subMenu
    }
  },
  methods: {
    ...mapActions({
      'getCouponList': 'getCouponList',
      'handleSubmit': 'memberRechargeDo'
    }),
    submit(){
      let form = {...this.form, phone: this.search.phone}
      if(!form.phone){
        _g.toastMsg({
          type:'error',
          msg:'请选择编辑会员手机号之后提交'
        })
        return
      }
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.handleSubmit({form})
        }else{
          _g.toastMsg({
            type:'error',
            msg: '请编辑必填项之后提交'
          })
        }
      })
    },
    cancel(){
      this.$refs.myForm.resetFields()
      this.$store.commit('clearSearchForm')
      setTimeout(()=>{
        this.$router.push({path:'/member/list', query:{subMenu:'充值明细'}})
      },1000)
    }
  },
  created(){
    this.getCouponList()
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
