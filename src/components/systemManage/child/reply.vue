<template>
  <section class="wrapper">
      <section class="content">
          <el-form :model="form" ref="myForm" label-width="120px" >
            <el-form-item label="关键词" >
              <el-input v-model="form.keyWord" placeholder="请编辑关键词(客服,咨询电话)"></el-input>
            </el-form-item>
            <el-form-item label="回复类型">
              <el-select placeholder="请选择" v-model="form.type" >
                <el-option label="aaa" value="aaa"></el-option>
              </el-select>
            </el-form-item>
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
              <el-input placeholder="请编辑回复内容" v-model="form.content" ></el-input>
            </el-form-item>
          </el-form>
          <MyBottom type="button" />
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
        keyWord:'',
        type:'',
        img:'',
        content:'',
      }
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
    padding: 20px 0;
    background-color: #fff;
  }
}
</style>
