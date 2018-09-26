<template>
  <section class="wrapper">
    <section class="content">
        <el-form ref="myForm" :model="form" :rules="rules" class="my-form" label-width="120px" >
          <section class="inline-block">
            <el-form-item label="姓名" prop="userName">
              <el-input disabled v-model="form.userName" placeholder="请编辑姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input disabled v-model="form.phone" placeholder="请编辑联系电话"></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="车型" prop="carType">
              <el-input disabled v-model="form.carType" placeholder="请编辑车型" ></el-input>
            </el-form-item>
            <el-form-item label="车辆年限" prop="carAge">
              <el-input disabled v-model="form.carAge" placeholder="请编辑车辆年限"></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="裸车价格" prop="carPrice">
              <el-input disabled v-model="form.carPrice" placeholder="请编辑裸车价格"></el-input>
            </el-form-item>
            <el-form-item label="出险次数" prop="risksNum">
              <el-input disabled v-model="form.risksNum" placeholder="请编辑出险次数" ></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="保险公司" prop="insuranceCompanyId">
              <el-select disabled v-model="form.insuranceCompanyId" placeholder="请选择保险公司">
                <el-option label="aaa" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出强险" prop="strongInsurance">
              <el-input disabled v-model="form.strongInsurance" placeholder="请编辑出强险"></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="损失险" prop="lossInsurance">
              <el-input disabled v-model="form.lossInsurance" placeholder="请编辑损失险"></el-input>
            </el-form-item>
            <el-form-item label="不计免赔" prop="noDeductibles">
              <el-input disabled v-model="form.noDeductibles" placeholder="请编辑不计免赔险"></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="盗抢险" prop="theftInsurance">
              <el-input disabled v-model="form.theftInsurance" placeholder="请编辑盗抢险"></el-input>
            </el-form-item>
            <el-form-item label="玻璃险" prop="glassInsurance">
              <el-input disabled v-model="form.glassInsurance" placeholder="请编辑玻璃险"></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="自燃险" prop="autoignitionInsurance">
              <el-input disabled v-model="form.autoignitionInsurance" placeholder="请编辑自燃险"></el-input>
            </el-form-item>
            <el-form-item label="涉水险" prop="wadingInsurance">
              <el-input disabled v-model="form.wadingInsurance" placeholder="请编辑涉水险"></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="车身划痕" prop="carScratch">
              <el-input disabled v-model="form.carScratch" placeholder="请编辑车身划痕险" ></el-input>
            </el-form-item>
            <el-form-item label="司机座位责任险" prop="seatInsurance">
              <el-input disabled v-model="form.seatInsurance" placeholder="请编辑座位责任险"></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="第三方责任险" prop="thirdLiabilityInsurance">
              <el-input disabled v-model="form.thirdLiabilityInsurance" placeholder="请变比第三方责任险"></el-input>
            </el-form-item>
            <el-form-item label="报价" prop="offer">
              <el-input  v-model="form.offer" placeholder="请编辑报价"></el-input>
            </el-form-item>
          </section>
          <section class="inline-block">
            <el-form-item label="备注" prop="remarks">
              <el-input type="textarea" :rows="3" v-model="form.remarks" placeholder="请编辑备注" ></el-input>
            </el-form-item>
          </section>      
        </el-form>
        <my-sub-button @handleSubmit="submit" @handleCancel="cancel"></my-sub-button>
    </section>
  </section>
</template>

<script>
import MySubButton from '@/components/common/subButton'
import {mapActions} from 'vuex'
const rules = {
  userName:[{required: false, message:'请编辑用户姓名', trigger: 'blur'}],
  phone:[{required: false, message:'请编辑联系电话', trigger: 'blur'}],
  carType:[{required: false, message:'请编辑车型', trigger: 'blur'}],
  carAge:[{required: false, message:'请编辑车辆年限', trigger: 'blur'}],
  carPrice:[{required: false, message:'请编辑裸车价格', trigger: 'blur'}],
  risksNum:[{required: false, message:'请编辑出险次数', trigger: 'blur'}],
  insuranceCompanyId:[{required: false, message:'请选择保险公司', trigger: ['change','blur']}],
  strongInsurance:[{required: false, message:'请编辑出强险', trigger: 'blur'}],
  noDeductibles:[{required: false, message:'请编辑不计免赔险', trigger: 'blur'}],
  theftInsurance:[{required: false, message:'请编辑盗抢险', trigger: 'blur'}],
  glassInsurance:[{required: false, message:'请编辑玻璃险', trigger: 'blur'}],
  autoignitionInsurance:[{required: false, message:'请编辑自燃险', trigger: 'blur'}],
  wadingInsurance:[{required: false, message:'请编辑涉水险', trigger: 'blur'}],
  carScratch:[{required: false, message:'请编辑车身划痕险', trigger: 'blur'}],
  seatInsurance:[{required: false, message:'请编辑座位责任险', trigger: 'blur'}],
  thirdLiabilityInsurance:[{required: false, message:'请编辑第三方责任险', trigger: 'blur'}],
  offer:[{required: true, message:'请编辑报价', trigger: 'blur'}],
  remarks:[{required: false, message:'请编辑备注', trigger: 'blur'}],
  lossInsurance:[{required: false, message:'请编辑损失险', trigger: 'blur'}],
}
export default {
  name: 'insurePub',
  components:{
    MySubButton,
  },
  data () {
    return {
      form:{
        userName:'',
        phone:'',
        carType:'',
        carAge:'',
        carPrice:'',
        risksNum:'',
        strongInsurance:'',
        noDeductibles:'',
        theftInsurance:'',
        glassInsurance:'',
        autoignitionInsurance:'',
        wadingInsurance:'',
        carScratch:'',
        seatInsurance:'',
        thirdLiabilityInsurance:'',
        offer:'',
        remarks:'',
        lossInsurance:'',
      },
      rules,
    }
  },

  methods: {
    ...mapActions({
      'handleSubmit':'serverInsuracePutAndFresh'
    }),
    submit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.handleSubmit({form: this.form}).then(res => {
            setTimeout(()=>{
              this.cancel()
            },1000)
          })
        }else{
          _g.toastMsg({
            type:'error',
            msg:'请编辑必填项目之后提交'
          })
        }
      })
    },
    cancel(){
      this.$refs.myForm.resetFields()
      this.$router.go(-2)
    }
  },
  created(){
    let data = this.$route.query.data && JSON.parse(this.$route.query.data)
    console.log(data)
    if(data){
      this.form = {...this.form, ...data}
    }
  }
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
