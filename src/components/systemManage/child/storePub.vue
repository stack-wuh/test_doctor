<template>
  <section class="wrapper">
    <section class="content">
      <section class="form-box">
        <el-form class="my-form" :rules="rules" ref="myForm" :model="form" label-width="140px" >
          <section class="inline-box">
            <el-form-item class="box-item" label="门店名称" prop="storeName">
              <el-input v-model="form['storeName']" placeholder="请编辑门店名称" class="box-input" ></el-input>
            </el-form-item>
            <el-form-item class="box-item" label="门店类型" prop="storeType">
              <el-select class="box-input" v-model="form['storeType']">
                <el-option :value="0" label="集团" ></el-option>
                <el-option :value="1" label="4s店" ></el-option>
                <el-option :value="2" label="维修店" ></el-option>
              </el-select>
            </el-form-item>
          </section>
          <section class="inline-box">
            <el-form-item class="box-item" label="状态" prop="state">
              <el-select class="box-input" v-model="form['state']" placeholder="请选择状态" >
                <el-option label="禁用" :value="0" ></el-option>
                <el-option label="正常" :value="1" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="box-item" label="价格" prop="price">
              <el-input v-model="form['price']" placeholder="请编辑价格"></el-input>
            </el-form-item>
          </section>
          <el-form-item label="组织描述"  prop="descInfo">
            <el-input v-model="form['descInfo']" :rows="3" type="textarea" placeholder="编辑组织描述" ></el-input>
          </el-form-item>  
          <el-form-item label="地址" prop="address">
            <el-input v-model="form['address']"  class="my-input-220 margin-rg-15" placeholder="编辑地址"></el-input><el-button class="margin-rg-15">自动获取经纬度</el-button><span class="c999">为确保经纬度信息准确,请认真核对</span>
          </el-form-item>
          <section class="inline-box">
            <el-form-item class="box-item" label="地理经纬度" prop="longitude">
              <section class="box-input" >
                <el-input v-model="form['longitude']" placeholder="编辑纬度"></el-input>
                <el-input v-model="form['latitude']" placeholder="编辑经度"></el-input>
              </section>
            </el-form-item>
            <el-form-item class="box-item" label="销售热线" prop="salesHotline">
              <el-input v-model="form['salesHotline']" placeholder="编辑销售热线"></el-input>
            </el-form-item>
          </section>
          <section class="inline-box" >
            <el-form-item class="box-item" label="售后热线" prop="after">
              <el-input v-model="form['after']" placeholder="编辑售后热线"></el-input>
            </el-form-item>
            <el-form-item class="box-item" label="续保热线" prop="renewHotline">
              <el-input v-model="form['renewHotline']" placeholder="编辑续保热线"></el-input>
            </el-form-item>
          </section>
          <section class="inline-box">
            <el-form-item class="box-item" label="救援热线" prop="rescueHotline">
              <el-input v-model="form['rescueHotline']" placeholder="编辑救援热线"></el-input>
            </el-form-item>
            <el-form-item class="box-item" label="联系人" prop="contacts">
              <el-input v-model="form['contacts']" placeholder="编辑联系人"></el-input>
            </el-form-item>
          </section>
          <section class="inline-box">
            <el-form-item  label="手机号" class="box-item" prop="telephone">
              <el-input  v-model="form['telephone']" class="box-item" placeholder="编辑手机号"></el-input>
            </el-form-item>
            <el-form-item label="推荐人" class="box-item" prop="referee">
              <el-input v-model="form['referee']" class="box-input" ></el-input>
            </el-form-item>
          </section>
            <el-form-item  label="积分比例" prop="lntegralProportion">
              <el-input v-model="form['lntegralProportion']" class="my-input-220 margin-rg-15" placeholder="编辑积分比例"></el-input>
              <span class="c999">积分比例取值范围:大于0且小于1</span>
            </el-form-item>
          <section class="inline-box">
            <el-form-item class="box-item" label="服务开始时间" prop="serviceStart">
              <el-date-picker class="box-input" v-model="form['serviceStart']" value-format="yyyy-MM-dd" ></el-date-picker>
            </el-form-item>
            <el-form-item class="box-item" label="服务到期时间" prop="serviceEnd">
              <el-date-picker class="box-input" v-model="form['serviceEnd']" value-format="yyyy-MM-dd" ></el-date-picker>
            </el-form-item>
          </section>
          <section class="inline-box">
            <el-form-item class="box-item" label="wifi名称" prop="wifiName">
              <el-input class="box-input" v-model="form['wifiName']" placeholder="编辑名称"></el-input>
            </el-form-item>
            <el-form-item class="box-item" label="wifi密码" prop="wifiPassword">
              <el-input class="box-input" v-model="form['wifiPassword']" placeholder="编辑密码"></el-input>
            </el-form-item>
          </section>
          <el-form-item label="logo" prop="logourl"> 
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleUploadLogo"
              name="upload_file">
              <img v-if="form.logourl" :src="form.logourl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="二维码" prop="qrCode">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleUploadCode"
              name="upload_file">
              <img v-if="form.qrCode" :src="form.qrCode" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <my-sub-button @handleSubmit="submit" @handleCancel="cancel" ></my-sub-button>
        <!-- <Bottom ref="bottom" type="button" /> -->
      </section>
    </section>
  </section>
</template>

<script>
import Bottom from '@/components/common/bottom'
import MySubButton from '@/components/common/subButton'
import {mapState, mapActions} from 'vuex'

const rules = {
  storeName:[{required: true, message: '请编辑门店名称', trigger: 'blur'}],
  storeType:[{required: true, message: '请选择门店类型', trigger: 'change'}],
  state:[{required: true, message: '请选择门店状态', trigger: 'change'}],
  price:[{required: true, message: '请选择门店状态', trigger: 'change'}],
  descInfo:[{required: true, message: '请编辑组织描述', trigger: 'blur'}],
  address:[{required: true, message: '请编辑门店地址', trigger: 'blur'}],
  longitude:[{required: true, message: '请编辑经纬度', trigger: 'blur'}],
  salesHotline:[{required: true, message: '请编辑销售热线', trigger: 'blur'}],
  renewHotline:[{required: true, message: '请编辑续保热线', trigger: 'blur'}],
  after:[{required: true, message: '请编辑售后热线', trigger: 'blur'}],
  rescueHotline:[{required: true, message: '请编辑救援热线', trigger: 'blur'}],
  contacts:[{required: true, message: '请编辑联系人', trigger: 'blur'}],
  telephone:[{required: true, message: '请编辑联系电话', trigger: 'blur'}],
  referee:[{required: true, message: '请编辑推荐人', trigger: 'blur'}],
  lntegralProportion:[{required: true, message: '请编辑积分比例', trigger: 'blur'}],
  serviceStart:[{required: true, message: '请选择服务开始日期', trigger: 'change'}],
  serviceEnd:[{required: true, message: '请选择服务结束日期', trigger: 'change'}],
  wifiName:[{required: true, message: '请编辑wifi名称', trigger: 'blur'}],
  wifiPassword:[{required: true, message: '请编辑wifi密码', trigger: 'blur'}],
  logourl:[{required: false, message: '请上传Logo图', trigger: 'change'}],
  qrCode:[{required: false, message: '请上传二维码', trigger: 'change'}],
}
export default {
  name: 'storePub',
  components:{
    Bottom ,
    MySubButton,
  },
  data () {
    return {
      form:{
        storeName:'',
        storeType:'',
        state:'',
        price:'',
        descInfo:'',
        address:'',
        longitude:'',
        latitude:'',
        salesHotline:'',
        renewHotline:'',
        after:'',
        rescueHotline:'',
        contacts:'',
        telephone:'',
        referee:'',
        lntegralProportion:'',
        serviceStart:'',
        serviceEnd:'',
        wifiName:'',
        wifiPassword:'',
        logourl:'',
        qrCode:'',
      },
      uploadUrl:rootPath + '/store/uploadPictures.do',
      rules,
    }
  },
  computed:{
    MyForm:{
      get(){
        return this.$store.state.form
      },
      set(value){
        let data = JSON.parse(this.$route.query.data)
        data && this.$store.commit('setFormData', value)
      }
    }
  },
  methods: {
    ...mapActions({
      'handleSumbit':'pubStoreList'
    }),
    handleUploadLogo($event){
      this.form.logourl = ($event.status == 0) && $event.data
    },
    handleUploadCode($event){
      this.form.qrCode = ($event.status == 0) && $event.data
    },
    submit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.handleSumbit({form: this.form}).then(res => {
            this.cancel()
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg:'请填写必填项目之后提交'
          })
        }
      })
    },
    cancel(){
      this.$refs.myForm.resetFields()
      setTimeout(()=>{
        this.$router.go(-2)
      },1000)
    }
  },
  created(){
    if(this.$route.query.data){
      let data = JSON.parse(this.$route.query.data)
      this.form = {...this.form, ...data}
      console.log(data)
    }
  }
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/mixin.scss';
.wrapper{
  height: 100%;
  margin-top:10px;
  .content{
    height: 100%;
    .form-box{
      height: 100%;
      background-color: #fff;
      .my-form{
        padding:15px 0;
        width: 90%;
        .inline-box{
          @include flex-box(row,nowrap,space-between,center);
          .box-item{
            flex:1;
            .box-input{
              @include flex-box;
              .el-input{
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
