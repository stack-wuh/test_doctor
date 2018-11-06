<template>
  <section class="wrapper">
      <section class="content">
        <el-form :model="form" :rules="rules" ref="myForm" class="my-form" label-width="130px" >
          <el-form-item label="活动标题" prop="title">
            <el-input v-model="form.title" placeholder="请编辑活动标题"></el-input>
          </el-form-item>
          <el-form-item label="图片(750*300)" prop="picture">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              name="upload_file"
              :on-success="handleAvatarSuccess"
              :show-file-list="false">
              <img v-if="form.picture" :src="form.picture" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="首页推广" prop="isPush">
            <el-checkbox label="1" v-model="form.isPush">勾选时表示上传的照片会在首页轮播显示</el-checkbox>
          </el-form-item>
          <el-form-item label="报名费" prop="enrollFee">
            <el-input v-model="form.enrollFee" placeholder="请编辑报名费" class="my-input-220" ></el-input>
          </el-form-item>
          <el-form-item label="报名数" prop="registNum">
            <el-input v-model="form.registNum" placeholder="请编辑报名数" class="my-input-220" ></el-input>
          </el-form-item>
          <el-form-item label="参与时强制支付" prop="isPay" >
            <el-checkbox label="1" v-model="form.isPay">勾选时表示参与时报名费用强制支付</el-checkbox>
          </el-form-item>
          <el-form-item label="活动日期" prop="date">
            <el-date-picker v-model="form.date" value-format="yyyy-MM-dd"  type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
          </el-form-item>
          <el-form-item label="活动参与次数" >
              <section class="inline-box">
                <el-form-item prop="type">
                  <el-select placeholder="参与类型" v-model="form.type">
                    <el-option label="次/每日" :value="1"></el-option>
                    <el-option label="次/活动全程" :value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="number">
                  <el-input v-model="form.number" class="my-input-220" placeholder="请编辑参与次数">
                    <template slot="append">次/人</template>
                  </el-input>
                </el-form-item>
              </section>
          </el-form-item>
          <el-form-item label="奖项设置" prop="lotteryTemplateId">
            <el-select placeholder="请选择奖项设置" v-model="form.lotteryTemplateId">
              <el-option v-for="(item,index) in activesList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <my-sub-button @handleSubmit="submit" @handleCancel="cancel" ></my-sub-button>
      </section>
  </section>
</template>

<script>
import MyBottom from '@/components/common/bottom'
import MySubButton from '@/components/common/subButton'
import {mapActions, mapState} from 'vuex'
const rules = {
  title:[{required: true, message:'请编辑活动标题', trigger: 'blur'}],
  picture:[{required: true, message:'请上传活动封面', trigger: 'change'}],
  isPush:[{required: false, message:'请勾选是否首页推广', trigger: 'change'}],
  enrollFee:[{required: true, message:'请编辑报名费', trigger: 'blur'}],
  registNum:[{required: true, message:'请编辑报名数', trigger: 'blur'}],
  isPay:[{required: false, message:'请勾选报名费用是否强制支付', trigger: 'change'}],
  date:[{required: true, message:'请选择有效日期', trigger: 'change'}],
  type:[{required: true, message:'请选择奖励卡券', trigger: 'change'}],
  number:[{required: true, message:'请编辑初始报名数', trigger: 'change'}],
  lotteryTemplateId:[{required: false, message:'请勾选是否允许报名', trigger: 'change'}],
}
export default {
  name: 'activePub',
  components:{
    MyBottom , 
    MySubButton,
  },
  data () {
    return {
      uploadUrl:rootPath + '/store/uploadPictures.do',
      form:{
        title:'',
        picture:'',
        isPush:'',
        enrollFee:'',
        isPay:'',
        type:'',
        number:'',
        lotteryTemplateId:'',
        date:[],
        registNum:'',
      },
      rules,
    }
  },
  computed:{
    ...mapState({
      'activesList':'activesList'
    })
  },
  methods: {
    ...mapActions({
      'getActiveList':'getActiveList',
      'handleSubmit': 'marketOtherActivePub'
    }),
    submit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.handleSubmit({form: this.form}).then(res => {
           setTimeout(()=>{
              res.status === 0 && this.cancel()
           },1000)  
          })
        }else{
          _g.toastMsg({
            type:'error',
            msg:'请编辑必填项之后提交'
          })
        }
      })
    },
    cancel(){
      this.$refs.myForm.resetFields()
      this.$router.go(-2)
    },
    handleAvatarSuccess(res){
      this.form.picture = res && res.data
    }
  },
  created(){
    this.getActiveList()
    let data = this.$route.query.data && (JSON.parse(this.$route.query.data))
    if(data){
      this.form = {
        ...this.form,
        ...data,
        date:[data.startTimeForString, data.endTimeForString],
        homePagePromotion: data.homePagePromotion === 1 ? true : false,
        partakeCompulsoryPayment: data.partakeCompulsoryPayment === 1 ? true : false,
        whetherAllowEnroll: data.whetherAllowEnroll === 1 ? true : false,
        conditionStatus: data.conditionStatus === 1 ? true : false
      }
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
      padding: 15px 0;
      width: 90%;
      margin:0 auto;
      .el-input{
        width: 65%;
      }
      .el-select{
        margin-right: 15px;
      }
      .inline-box{
        .el-select{
          width: 30%;
        }
      }
    }
  }
}
</style>
