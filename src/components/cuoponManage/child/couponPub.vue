<template>
  <section class="wrapper" >
      <section class="content">
        <el-form class="my-form" ref="myForm" label-width="120px" :model="form" :rules="rules" >
          <section class="inline-box" >
            <el-form-item label="卡券类型" prop="couponType" >
              <el-select v-model="form.couponType">
                <el-option label="实物奖品" :value="0" ></el-option>
                <el-option label="电子代金券" :value="1" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="卡券名称" prop="couponName">
              <el-input v-model="form.couponName" placeholder="请编辑卡券名称" ></el-input>
            </el-form-item>
          </section>
          <section class="inline-box" >
            <el-form-item label="卡券面值" prop="couponValue">
              <el-input v-model="form.couponValue" placeholder="请编辑卡券面值" ></el-input>
            </el-form-item>
            <el-form-item label="卡券数量" prop="number" >
              <el-input v-model="form.number" placeholder="请编辑卡券数量" ></el-input>
            </el-form-item>
          </section>
          <section class="inline-box" >
            <el-form-item label="消费额满" prop="consumptionFull" >
              <el-input v-model="form.consumptionFull" placeholder="请编辑消费额" ></el-input>
            </el-form-item>
            <el-form-item label="有效期" prop="validTill">
              <el-date-picker v-model="form.validTill" value-format="yyyy-MM-dd" placeholder="请选择有效期" ></el-date-picker>
            </el-form-item>
          </section>
          <el-form-item label="领取规则" prop="receiveType">
            <el-radio-group v-model="form.receiveType" >
              <el-radio :label="0" >允许重复领取</el-radio>
              <el-radio :label="1">首次分享后领取</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="员工推荐权限" prop="roleId">  
            <el-checkbox-group v-model="form.roleId">
              <el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.value">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="使用说明" prop="instructions" >
            <el-input v-model="form.instructions" type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-form>
        <my-sub-button @handleCancel="handleCancel" @handleSubmit="handleSubmit" />
      </section>
  </section>
</template>

<script>
const rules = {
  couponType:[{required:true,message:'请选择卡券类型',trigger:['change','blur']}],
  couponName:[{required:true,message:'请编辑卡券名称',trigger:'blur'}],
  price:[{required:true,message:'请选择卡券面额',trigger:'blur'}],
  number:[{required:true,message:'请编辑卡券数量',trigger:'blur'}],
  couponValue:[{required:true,message:'请编辑卡券面额',trigger:'blur'}],
  consumptionFull:[{required:true,message:'请选择消费满额',trigger:'blur'}],
  validTill:[{required:true,message:'请选择有效期',trigger:'blur'}],
  instructions:[{required:false}],
  receiveType:[{required:true,message:'请选择领取规则',trigger:'change'}],
  roleId:[{required:false,message:'请选择员工使用权限',trigger:'change'}],
}

import MySubButton from  '@/components/common/subButton'

import {mapState, mapActions} from 'vuex'
export default {
  name: 'couponPub',
  components:{
    MySubButton,
  },
  data () {
    return {
      form:{
        couponType:'',
        couponName:'',
        number:'',
        consumptionFull:'',
        validTill:'',
        receiveType:[],
        instructions:'',
        roleId:[],
        couponValue:'',
      },
      rules,
    }
  },
  computed:{
    ...mapState({
      'roleList': state => state.roleList
    })
  },
  methods: {
    ...mapActions({
      'getRoleList': 'getRoleList',
      'submit': 'couponPraisePubAndPut'
    }),
    handleCancel(){
      this.$refs.myForm.resetFields()
      setTimeout(() => {
        this.$router.go(-2)
      }, 1000);
    },
    handleSubmit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          let form = JSON.parse(JSON.stringify(this.form))
          form = {...form, roleId: form.roleId ? form.roleId.toString() : ''}
          this.submit({form}).then(res => {
            this.handleCancel()
          })
        }else{
          _g.toastMsg({
            type:'error',
            msg:'请填写必填项目后提交!'
          })
        }
      })
    }
  },
  created(){
    let data = this.$route.query.data && JSON.parse(this.$route.query.data)
    this.form = {...this.form, ...data, roleId: data ? (data.roleIds ? data.roleIds.split(',') : []) : []}
    this.getRoleList()
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
