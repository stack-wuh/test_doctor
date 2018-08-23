<template>
  <section class="wrapper">
    <section class="content">
      <section class="form-box">
        <el-form class="my-form" :modal="MyForm" label-width="140px" >
          <section class="inline-box">
            <el-form-item class="box-item" label="门店名称">
              <el-input v-model="MyForm['storeName']" placeholder="请编辑门店名称" class="box-input" ></el-input>
            </el-form-item>
            <el-form-item class="box-item" label="门店类型">
              <el-select class="box-input" v-model="MyForm['storeType']">
                <el-option value="0" label="集团" ></el-option>
                <el-option value="1" label="4s店" ></el-option>
                <el-option value="2" label="维修店" ></el-option>
              </el-select>
            </el-form-item>
          </section>
          <section class="inline-box">
            <el-form-item class="box-item" label="状态">
              <el-select class="box-input" v-model="MyForm['state']" placeholder="请选择状态" >
                <el-option label="禁用" value="0" ></el-option>
                <el-option label="正常" value="1" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="box-item" label="价格">
              <el-input v-model="MyForm['price']" placeholder="请编辑价格"></el-input>
            </el-form-item>
          </section>
          <el-form-item label="组织描述" prop="storeName">
            <el-input v-model="MyForm['descInfo']" :rows="3" type="textarea" placeholder="编辑组织描述" ></el-input>
          </el-form-item>  
          <el-form-item label="地址">
            <el-input v-model="MyForm['address']"  class="my-input-220 margin-rg-15" placeholder="编辑地址"></el-input><el-button class="margin-rg-15">自动获取经纬度</el-button><span class="c999">为确保经纬度信息准确,请认真核对</span>
          </el-form-item>
          <section class="inline-box">
            <el-form-item class="box-item" label="地理经纬度">
              <section class="box-input" >
                <el-input v-model="MyForm['longitude']" placeholder="编辑纬度"></el-input>
                <el-input v-model="MyForm['latitude']" placeholder="编辑经度"></el-input>
              </section>
            </el-form-item>
            <el-form-item class="box-item" label="销售热线">
              <el-input v-model="MyForm['salesHotline']" placeholder="编辑销售热线"></el-input>
            </el-form-item>
          </section>
          <section class="inline-box" >
            <el-form-item class="box-item" label="售后热线">
              <el-input v-model="MyForm['after']" placeholder="编辑售后热线"></el-input>
            </el-form-item>
            <el-form-item class="box-item" label="续保热线">
              <el-input v-model="MyForm['renewHotline']" placeholder="编辑续保热线"></el-input>
            </el-form-item>
          </section>
          <section class="inline-box">
            <el-form-item class="box-item" label="救援热线">
              <el-input v-model="MyForm['rescueHotline']" placeholder="编辑救援热线"></el-input>
            </el-form-item>
            <el-form-item class="box-item" label="联系人">
              <el-input v-model="MyForm['contacts']" placeholder="编辑联系人"></el-input>
            </el-form-item>
          </section>
          <section class="inline-box">
            <el-form-item  label="手机号" class="box-item" >
              <el-input  v-model="MyForm['telephone']" class="box-item" placeholder="编辑手机号"></el-input>
            </el-form-item>
            <el-form-item label="推荐人" class="box-item" >
              <el-input v-model="MyForm['referee']" class="box-input" ></el-input>
            </el-form-item>
          </section>
            <el-form-item  label="积分比例">
              <el-input v-model="MyForm['lntegralProportion']" class="my-input-220 margin-rg-15" placeholder="编辑积分比例"></el-input>
              <span class="c999">积分比例取值范围:大于0且小于1</span>
            </el-form-item>
          <section class="inline-box">
            <el-form-item class="box-item" label="服务开始时间">
              <el-date-picker class="box-input" v-model="MyForm['serviceStart']" value-format="yyyy-MM-dd" ></el-date-picker>
            </el-form-item>
            <el-form-item class="box-item" label="服务到期时间">
              <el-date-picker class="box-input" v-model="MyForm['serviceEnd']" value-format="yyyy-MM-dd" ></el-date-picker>
            </el-form-item>
          </section>
          <section class="inline-box">
            <el-form-item class="box-item" label="wifi名称">
              <el-input class="box-input" v-model="MyForm['wifiName']" placeholder="编辑名称"></el-input>
            </el-form-item>
            <el-form-item class="box-item" label="wifi密码">
              <el-input class="box-input" v-model="MyForm['wifiPassword']" placeholder="编辑密码"></el-input>
            </el-form-item>
          </section>
          <el-form-item label="logo">
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
          <el-form-item label="二维码">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false">
              <img v-if="form.qrCode" :src="form.qrCode" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <Bottom ref="bottom" type="button" />
      </section>
    </section>
  </section>
</template>

<script>
import Bottom from '@/components/common/bottom'
import {mapState} from 'vuex'
export default {
  name: 'storePub',
  components:{
    Bottom ,
  },
  data () {
    return {
      form:{
        storeName:'',
        address:'',
        longitude:'',
        latitude:'',
        salesHotline:'',
        renewHotline:'',
        rescueHotline:'',
        contacts:'',
        telephone:'',
        lntegralProportion:'',
        wifiName:'',
        wifiPassword:'',
        logourl:'',
        qrCode:'',
      },
      uploadUrl:rootPath + '/store/uploadPictures.do',
      imgUrl:'',
    }
  },
  computed:{
    ...mapState({
      MyForm:state => state.form
    })
  },
  methods: {
    handleUploadLogo($event){
      this.form.logourl = ($event.status == 0) && $event.data
    }
  }
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/mixin.scss';
.wrapper{
  height: 100%;
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
