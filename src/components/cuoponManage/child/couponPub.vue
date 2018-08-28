<template>
  <section class="wrapper" >
      <section class="content">
        <el-form class="my-form" label-width="120px" :model="form" :rules="rules" >
          <section class="inline-box" >
            <el-form-item label="卡券类型" prop="couponType" >
              <el-select v-model="form.couponType">
                <el-option label="111" value="0" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="卡券名称" prop="couponName">
              <el-input v-model="form.couponName"></el-input>
            </el-form-item>
          </section>
          <section class="inline-box" >
            <!-- <el-form-item label="卡券面值">
              <el-select v-model="form.price" >
                <el-option label="100" value="100" ></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="卡券数量" prop="number" >
              <el-input v-model="form.number" ></el-input>
            </el-form-item>
          </section>
          <section class="inline-box" >
            <el-form-item label="消费满" prop="consumptionFull" >
              <el-select v-model="form.consumptionFull">
                <el-option label="100" value="100"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有效期" prop="validTill">
              <el-date-picker v-model="form.validTill" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </section>
          <el-form-item label="领取规则" prop="receiveType">
            <el-checkbox-group v-model="form.receiveType" >
              <el-checkbox label="0" >允许重复领取</el-checkbox>
              <el-checkbox label="1">首次分享后领取</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="员工推荐权限" prop="roleId">  
            <el-checkbox-group v-model="form.roleId">
              <el-checkbox label="0" >所有员工</el-checkbox>
              <el-checkbox label="1" >销售顾问</el-checkbox>
              <el-checkbox label="2" >售后顾问</el-checkbox>
              <el-checkbox label="3" >续保顾问</el-checkbox>
              <el-checkbox label="4" >保险顾问</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="使用说明" prop="instructions" >
            <el-input v-model="form.instructions" type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-form>
        <my-bottom type="button" :formData="form" />
      </section>
  </section>
</template>

<script>
import MyBottom from '@/components/common/bottom'

const rules = {
  couponType:[{required:true,message:'请选择卡券类型',trigger:['change','blur']}],
  couponName:[{required:true,message:'请编辑卡券名称',trigger:'blur'}],
  price:[{required:true,message:'请选择卡券面额',trigger:'blur'}],
  number:[{required:true,message:'请编辑卡券数量',trigger:'blur'}],
  consumptionFull:[{required:true,message:'请选择消费满额',trigger:'blur'}],
  validTill:[{required:true,message:'请选择有效期',trigger:'blur'}],
  instructions:[{required:false}],
  receiveType:[{required:true,message:'请选择领取规则',trigger:'change'}],
  roleId:[{required:true,message:'请选择员工使用权限',trigger:'change'}],
}
export default {
  name: 'couponPub',
  components:{
    MyBottom,
  },
  data () {
    return {
      form:{
        couponType:'',
        couponName:'',
        number:'',
        // price:'',
        consumptionFull:'',
        validTill:'',
        receiveType:[],
        instructions:'',
        roleId:[],
      },
      rules,
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
