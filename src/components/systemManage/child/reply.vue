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
                  <el-option label="文本" value="0"></el-option>
                  <el-option label="图文" value="1"></el-option>
                </el-select>
              </el-form-item>
            </section>
            <section class="inline-box">
              <el-form-item label="状态">
                <el-select v-model="form.state" placeholder="请选择状态">
                  <el-option label="禁用" value="0"></el-option>
                  <el-option label="启用" value="1"></el-option>
                </el-select>
              </el-form-item>
            </section>
            <el-form-item label="回复图片">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
      uploadUrl:'',
      imageUrl:'',
      form:{
        keyword:'',
        type:'',
        picture:'http://a4.att.hudong.com/50/35/01300000110309121921352591438.gif',
        content:'',
        state:'',
      }
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
    padding: 20px 0;
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
