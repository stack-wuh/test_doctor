<template>
  <section class="wrapper">
    <section class="content">
      <el-form class="my-form" :model="form" :rules="rules" ref="myForm" label-width="140px">
        <section class="inline-box">
          <el-form-item label="用户姓名" prop="realName" >
            <el-input placeholder="请编辑用户姓名" v-model="form.realName" ></el-input>
          </el-form-item>
          <el-form-item label="客户手机" prop="phone" >
            <el-input placeholder="请编辑客户手机" v-model="form.phone" ></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="性别" prop="sex" >
            <el-select placeholder="请选择性别" v-model="form.sex">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户生日"  prop="birthday" >
            <el-date-picker v-model="form.birthday" placeholder="请选择生日日期" value-format="yyyy-MM-dd" ></el-date-picker>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="车牌号" prop="plateNum" >
            <el-input placeholder="请编辑车牌号" v-model="form.plateNum" ></el-input>
          </el-form-item>
          <el-form-item label="车型" prop="carModel" >
            <el-input placeholder="请编辑车型" v-model="form.carModel" ></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="保养顾问" prop="upkeepEmployeeId" >
            <el-select v-model="form.upkeepEmployeeId" placeholder="请选择保养顾问">
              <el-option label="aaa" value="aaa"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="续保顾问" prop="renewEmployeeId" >
            <el-select v-model="form.renewEmployeeId" placeholder="请选择续保顾问">
              <el-option label="bbb" value="bbb"></el-option>
            </el-select>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="保险顾问" prop="safeEmployeeId" >
            <el-select v-model="form.safeEmployeeId"  placeholder="请选择保险顾问">
              <el-option label="ccc" value="ccc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保险购买日期" prop="insuranceStart" >
            <el-date-picker v-model="form.insuranceStart" placeholder="请选择保险购买日期" value-format="yyyy-MM-dd" ></el-date-picker>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="上次保养日期" prop="lastMaintainTime" >
            <el-date-picker v-model="form.lastMaintainTime" placeholder="请选择上次保养日期" value-format="yyyy-MM-dd" ></el-date-picker>
          </el-form-item>
          <el-form-item label="保养间隔公里数" prop="maintainIntervalKm" >
            <el-input v-model="form.maintainIntervalKm" placeholder="请编辑间隔公里数" ></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="会员等级" prop="memberId">
            <el-select v-model="form.memberId" placeholder="请选择会员等级">
              <el-option label="一级" value="1" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员积分" prop="integral" >
            <el-input v-model="form.integral" placeholder="请编辑会员积分" ></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="余额" prop="money" >
            <el-input v-model="form.money" placeholder="请编辑余额" ></el-input>
          </el-form-item>
          <el-form-item label="佣金" prop="brokerage" >
            <el-input v-model="form.brokerage" placeholder="请编辑佣金" ></el-input>
          </el-form-item>
        </section>
      </el-form>
      <my-sub-button @handleSubmit="handleSubmit" />

    </section>
  </section>
</template>

<script>
import MySubButton from  '../../common/subButton';
import {mapActions} from 'vuex'
const rules = {
  realName:[{required:true,message:'请编辑用户姓名',trigger:'blur'}],
  phone:[{required:true,message:'请编辑用户手机号码',trigger:'blur'}],
  sex:[{required:true,message:'请选择用户性别',trigger:['blur','change']}],
  birthday:[{required:true,message:'请选择用户生日',trigger:['blur','change']}],
  plateNum:[{required:true,message:'请编辑用户车牌',trigger:['blur']}],
  carModel:[{required:true,message:'请编辑用户车型',trigger:['blur']}],
  upkeepEmployeeId:[{required:true,message:'请选择保养顾问',trigger:['blur','change']}],
  renewEmployeeId:[{required:true,message:'请选择续保顾问',trigger:['blur','change']}],
  safeEmployeeId:[{required:true,message:'请选择保险顾问',trigger:['blur','change']}],
  insuranceStart:[{required:true,message:'请选择保险购买日期',trigger:['blur','change']}],
  lastMaintainTime:[{required:true,message:'请选择上次保养日期',trigger:['blur','change']}],
  maintainIntervalKm:[{required:true,message:'请编辑保养间隔公里数',trigger:['blur','change']}],
  memberId:[{required:true,message:'请选择会员等级',trigger:['blur','change']}],
  integral:[{required:true,message:'请编辑会员积分',trigger:['blur','change']}],
  money:[{required:true,message:'请编辑会员余额',trigger:['blur','change']}],
  brokerage:[{required:true,message:'请编辑会员佣金',trigger:['blur','change']}],
}

export default {
  name: 'memberPub',
  components:{
    MySubButton,
  },
  data () {
    return {
      form:{
        realName:'',
        phone:'',
        sex:'',
        birthday:'',
        plateNum:'',
        carModel:'',
        upkeepEmployeeId:'',
        renewEmployeeId:'',
        safeEmployeeId:'',
        insuranceStart:'',
        lastMaintainTime:'',
        maintainIntervalKm:'',
        memberId:'',
        integral:'',
        money:'',
        brokerage:'',
      },
      rules,
    }
  },

  methods: {
    ...mapActions({
      'handleSubMember':'memberInfoPubAndPut'
    }),
    handleSubmit({submit} = {}){
      if(submit){
        this.$refs.myForm.validate(valid => {
          if(valid){
            this.handleSubMember({path: this.$route.query.child || this.$route.query.subMenu, form: this.form}).then(res => {
              console.log(res)
            })
          }else{
            _g.toastMsg({
              type:'error',
              msg:'请编辑必填项后提交'
            })
          }
        })
      }
    }
  },
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
