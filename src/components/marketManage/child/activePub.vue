<template>
  <section class="wrapper">
      <section class="content">
        <el-form :model="form" :rules="rules" ref="myForm" class="my-form" label-width="130px" >
          <el-form-item label="活动标题" prop="activityTitle">
            <el-input v-model="form.activityTitle" placeholder="请编辑活动标题"></el-input>
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
          <el-form-item label="首页推广" prop="homePagePromotion">
            <el-checkbox label="1" v-model="form.homePagePromotion">勾选时表示上传的照片会在首页轮播显示</el-checkbox>
          </el-form-item>
          <el-form-item label="报名费" prop="enrollFee">
            <el-input v-model="form.enrollFee" placeholder="请编辑报名费" class="my-input-220" ></el-input>
          </el-form-item>
          <el-form-item label="参与时强制支付" prop="partakeCompulsoryPayment" >
            <el-checkbox label="1" v-model="form.partakeCompulsoryPayment">勾选时表示参与时报名费用强制支付</el-checkbox>
          </el-form-item>
          <el-form-item label="活动日期" prop="date">
            <el-date-picker v-model="form.date" value-format="yyyy-MM-dd"  type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
          </el-form-item>
            <el-form-item label="参与活动奖励" prop="couponId">
              <el-select v-model="form.couponId" placeholder="请选择活动奖励">
                <el-option v-for="(item, index) in couponList" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="初始报名数" prop="initialEnrollNum">
              <el-input v-model="form.initialEnrollNum" placeholder="请编辑初始报名数" class="my-input-220" ></el-input>
            </el-form-item>
            <el-form-item label="是否允许报名" prop="whetherAllowEnroll" >
              <el-checkbox label="1" v-model="form.whetherAllowEnroll">勾选时表示允许报名</el-checkbox>
            </el-form-item>
            <el-form-item label="精准用户设置" >
              <section class="inline-box">
                <el-form-item prop="viewCount">
                  <el-select placeholder="浏览次数" v-model.number="form.viewCount" clearable filterable allow-create default-first-option></el-select>
                </el-form-item>
                <el-form-item prop="minTime">
                    <el-select placeholder="平均单词浏览最小时间" v-model="form.minTime">
                      <el-option label="1分钟" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="maxTime">
                  <el-select placeholder="平均单词浏览最大时间" v-model="form.maxTime">
                    <el-option label="1小时" value="60"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="isok">
                  <el-checkbox label="勾选时表示两者都要满足" v-model="form.conditionStatus"></el-checkbox>
                </el-form-item>
              </section>
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
  activityTitle:[{required: true, message:'请编辑活动标题', trigger: 'blur'}],
  picture:[{required: true, message:'请上传活动封面', trigger: 'change'}],
  homePagePromotion:[{required: false, message:'请勾选是否首页推广', trigger: 'change'}],
  enrollFee:[{required: true, message:'请编辑报名费', trigger: 'blur'}],
  partakeCompulsoryPayment:[{required: false, message:'请勾选报名费用是否强制支付', trigger: 'change'}],
  date:[{required: true, message:'请选择有效日期', trigger: 'change'}],
  couponId:[{required: true, message:'请选择奖励卡券', trigger: 'change'}],
  initialEnrollNum:[{required: true, message:'请编辑初始报名数', trigger: 'change'}],
  whetherAllowEnroll:[{required: false, message:'请勾选是否允许报名', trigger: 'change'}],
  viewCount:[{required: true, message:'请选择浏览次数', trigger: 'change'},{type:'number', message:'请编辑内容为数字',trigger: 'change'}],
  conditionStatus:[{required: false, message:'请勾选是否同时满足要求', trigger: 'change'}],
}
const minTime = [
  {
    label:'1分钟',
    value:'1'
  }
]
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
        activityTitle:'',
        picture:'',
        homePagePromotion:'',
        enrollFee:'',
        partakeCompulsoryPayment:'',
        couponId:'',
        initialEnrollNum:'',
        whetherAllowEnroll:'',
        viewCount:'',
        minTime:'',
        maxTime:'',
        date:[],
      },
      rules,
    }
  },
  computed:{
    ...mapState({
      'activesList':'activesList',
      'couponList': state => state.couponList
    })
  },
  methods: {
    ...mapActions({
      'getActiveList':'getActiveList',
      'getCouponList':'getCouponList',
      'handleSubmit': 'marketActivePutAndPost'
    }),
    submit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.handleSubmit({form: this.form}).then(res => {
           setTimeout(()=>{
              res.status == 0 && this.cancel()
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
    this.getCouponList()
    let data = this.$route.query.data && (JSON.parse(this.$route.query.data))
    if(data){
      this.form = {
        ...this.form,
        ...data,
        date:[data.startDateStr, data.endDateStr],
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
