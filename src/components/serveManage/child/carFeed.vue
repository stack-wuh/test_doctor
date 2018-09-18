<template>
  <section class="wrapper">
    <section class="form-area">
      <el-form :model="form" ref="myForm" :rules="rules" label-width="120px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请编辑文章标题" class="my-input-220"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="typeId">
          <el-select v-model="form.typeId" placeholder="请选择文章类别">
            <el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="picture">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            name="upload_file"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.picture" :src="form.picture" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <article id="editor"></article>
        </el-form-item>
      </el-form>
      <my-sub-button @handleSubmit="submit" @handleCancel="cancel" />
    </section>
  </section>
</template>

<script>
import MySubButton from '@/components/common/subButton'
import {mapActions, mapState} from 'vuex'
const rules = {
  title:[{required: true, message:'请编辑文章标题', trigger: 'blur'}],
  typeId:[{required: true, message:'请选择文章分类', trigger: 'change'}],
  picture:[{required: true, message:'请上传封面图片', trigger: 'change'}],
  content:[{required: true, message:'请编辑文章内容', trigger: 'change'}],
}
export default {
  name: 'carFeed',
  components:{
    MySubButton,
  },
  data () {
    return {
      uploadUrl: rootPath + '/store/uploadPictures.do',
      form:{
        title:'',
        typeId:'',
        picture:'',
        content:'',
      },
      rules,
      editor:'',
    }
  },
  computed:{
    ...mapState({
      'typeList': state => state.articleType
    })
  },
  methods: {
    ...mapActions({
      'handleSubmit': 'carFeedTotalPut',
      'getArtType' : 'getArtType',
      'getArtDetail':'carFeedArtDetail'
    }),
    handleAvatarSuccess(res){
      this.form.picture = res && res.data
    },
    beforeAvatarUpload(){},
    cancel(){
      this.$refs.myForm.resetFields()
      this.editor.txt.clear()
      setTimeout(()=>{
        this.$router.go(-2)
      },1000)
    },
    submit(){
      this.form.content = this.editor.txt.html()
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.handleSubmit({form: this.form}).then(res => {
            this.cancel()
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请编辑必填项目之后提交'
          })
        }
      })
    }
  },
  created(){
    this.getArtType()
    this.$nextTick(()=>{
      let elem = document.getElementById('editor')
      this.editor = new this.$E(elem)
      this.editor.customConfig.zIndex = 100
      this.editor.customConfig.uploadImgShowBase64 = true  
      this.editor.customConfig.uploadImgServer = rootPath + '/store/uploadPictures.do'
      this.editor.create()
    })
    let data = this.$route.query.data && JSON.parse(this.$route.query.data)
    if(data && data.id){
      this.getArtDetail({form:{id: data.id}}).then(res => {
        this.form = {...this.form, ...res.data}
        this.editor.txt.html(this.form.content)
      })
    }
  }
}
</script>

<style scoped lang='scss' >
.wrapper{
  .form-area{
    padding:20px;
    background-color: #fff;
  }
}
</style>
