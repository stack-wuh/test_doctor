<template>
  <section class="wrapper">
      <section class="content">
          <el-form class="my-form" :rules="rules" :model="form" ref="myForm" label-width="120px" >
            <section class="inline-box">
              <el-form-item label="关键词" prop="keyword">
                <el-input v-model="form.keyword" placeholder="请编辑关键词(客服,咨询电话)"></el-input>
              </el-form-item>
              <el-form-item label="回复类型" prop="type">
                <el-select placeholder="请选择回复类型" v-model="form.type">
                  <el-option label="文本" :value="0"></el-option>
                  <el-option label="图文" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </section>
            <section class="inline-box">
              <el-form-item label="状态" prop="status">
                <el-select v-model="form.status" placeholder="请选择状态">
                  <el-option label="禁用" :value="0"></el-option>
                  <el-option label="启用" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </section>
            <el-form-item label="回复图片" prop="picture">
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
            <el-form-item label="回复内容" prop="content">
              <el-input placeholder="请编辑回复内容" type="textarea" :rows="3" v-model="form.content" ></el-input>
            </el-form-item>
          </el-form>
          <my-sub-button @handleSubmit="submit" @handleCancel="cancel" ></my-sub-button>
      </section>
  </section>
</template>

<script>
/**
 * 自动回复编辑
 */
import MyBottom from '@/components/common/bottom'
import MySubButton from '@/components/common/subButton'
import {mapActions} from 'vuex'
const rules = {
  keyword:[{required: true, message: '请编辑关键词', trigger: 'blur'}],
  type:[{required: true, message: '请编辑关键词', trigger: 'blur'}],
  picture:[{required: true, message: '请编辑关键词', trigger: 'blur'}],
  content:[{required: true, message: '请编辑关键词', trigger: 'blur'}],
  status:[{required: true, message: '请编辑关键词', trigger: 'blur'}],
}
export default {
  name: 'reply',
  components:{
    MyBottom ,
    MySubButton
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
        status:'',
      },
      rules,
    }
  },

  methods: {
    ...mapActions({
      'replyPubAndPut': 'replyPubAndPut'
    }),
    handleUploadPic(res){
      (res.status == 0) && (this.form.picture = res.data)
    },
    submit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.replyPubAndPut({form: this.form}).then(res => {
            this.cancel()
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请编辑必填项目之后提交'
          })
        }
      })
    },
    cancel(){
      this.$refs.myForm.resetFields()
      setTimeout(() => {
        this.$router.go(-2)
      }, 1000);
    }
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
