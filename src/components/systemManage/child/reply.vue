<template>
  <section class="wrapper">
      <section class="content">
          <el-form class="my-form"  :model="form" ref="myForm" label-width="120px" >
            <section class="inline-box">
              <el-form-item label="关键词" >
                <el-input v-model="form.keyword" placeholder="请编辑关键词(客服,咨询电话)"></el-input>
              </el-form-item>
              <el-form-item label="回复类型">
                <el-select placeholder="请选择回复类型" v-model="form.type">
                  <el-option label="文本" :value="0"></el-option>
                  <el-option label="图文" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </section>
            <section class="inline-box">
              <el-form-item label="状态">
                <el-select v-model="form.status" placeholder="请选择状态">
                  <el-option label="禁用" :value="0"></el-option>
                  <el-option label="启用" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </section>
            <el-form-item label="回复图片">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                name="upload_file"
                :on-success="handleUploadPic">
                <img v-if="form.picture" :src="form.picture" class="avatar" style="width:100%;height:100%;" >
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="回复内容" >
              <el-input placeholder="请编辑回复内容" type="textarea" :rows="3" v-model="form.content" ></el-input>
            </el-form-item>
          </el-form>
          <MyBottom type="button" :formData="form" />
      </section>
  </section>
</template>

<script>
/**
 * 自动回复编辑
 */
import MyBottom from '@/components/common/bottom'
export default {
  name: 'reply',
  components:{
    MyBottom ,
  },
  data () {
    return {
      uploadUrl:window.rootPath + '/store/uploadPictures.do',
      type:0,
      form:{
        keyword:'',
        type:'',
        picture:'',
        content:'',
        state:'',
      }
    }
  },

  methods: {
    handleUploadPic(res){
      (res.status == 0) && (this.form.picture = res.data)
    },
  },
  created(){
    let data =  this.$route.query.data && JSON.parse(this.$route.query.data)
    this.form = Object.assign(this.form , data)
  }
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/mixin.scss';
.wrapper{
  padding-top:10px;
  .content{
    height: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    background-color: #fff;
    .inline-box{
      @include flex-box(row,nowrap,space-between,center);
      .el-form-item{
        width: 50%;
      }
    }
    .my-form{
      width: 80%;
    }
  }
}
</style>
