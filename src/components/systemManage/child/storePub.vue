<template>
  <section class="wrapper">
    <section class="content">
      <section class="form-box">
        <el-form class="my-form" :modal="form" label-width="140px" >
          <el-form-item label="组织描述">
            <el-input :rows="3" type="textarea" placeholder="编辑组织描述" ></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input class="my-input-220 margin-rg-15" placeholder="编辑地址"></el-input><el-button class="margin-rg-15">自动获取经纬度</el-button><span class="c999">为确保经纬度信息准确,请认真核对</span>
          </el-form-item>
          <section class="inline-box">
            <el-form-item class="box-item" label="地理经纬度">
              <section class="box-input" >
                <el-input placeholder="编辑纬度"></el-input>
                <el-input placeholder="编辑经度"></el-input>
              </section>
            </el-form-item>
            <el-form-item class="box-item" label="销售热线">
              <el-input placeholder="编辑销售热线"></el-input>
            </el-form-item>
          </section>
          <section class="inline-box" >
            <el-form-item class="box-item" label="售后热线">
              <el-input placeholder="编辑售后热线"></el-input>
            </el-form-item>
            <el-form-item class="box-item" label="续保热线">
              <el-input placeholder="编辑售后热线"></el-input>
            </el-form-item>
          </section>
          <section class="inline-box">
            <el-form-item class="box-item" label="救援热线">
              <el-input placeholder="编辑救援热线"></el-input>
            </el-form-item>
            <el-form-item class="box-item" label="联系人">
              <el-input placeholder="编辑救援热线"></el-input>
            </el-form-item>
          </section>
          <el-form-item label="手机号">
            <el-input class="my-input-220" placeholder="编辑手机号"></el-input>
          </el-form-item>
          <el-form-item label="积分比例">
            <el-input class="my-input-220 margin-rg-15" placeholder="编辑积分比例"></el-input>
            <span class="c999">积分比例取值范围:大于0且小于1</span>
          </el-form-item>
          <section class="inline-box">
            <el-form-item class="box-item" label="wifi名称">
              <el-input placeholder="编辑名称"></el-input>
            </el-form-item>
            <el-form-item class="box-item" label="wifi密码">
              <el-input placeholder="编辑密码"></el-input>
            </el-form-item>
          </section>
          <el-form-item label="logo">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false">
              <img v-if="imgUrl" :src="imgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="二维码">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false">
              <img v-if="imgUrl" :src="imgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <Bottom type="button" />
      </section>
    </section>
  </section>
</template>

<script>
import Bottom from '@/components/common/bottom'
export default {
  name: 'storePub',
  components:{
    Bottom ,
  },
  data () {
    return {
      form:{},
      uploadUrl:'',
      imgUrl:'',
    }
  },

  methods: {}
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
