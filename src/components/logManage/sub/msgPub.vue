<template>
  <section class="wrapper">
      <el-form label-width="120px">
        <el-form-item label="消息标题">
          <el-input placeholder="请编辑消息标题" class="my-input-220"></el-input>
        </el-form-item>
        <el-form-item label="消息类型">
          <el-select placeholder="请选择消息类型">
            <el-option label="公告" value="1"></el-option>
            <el-option label="提醒" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送对象">
          <el-select placeholder="请选择发送对象">
            <el-option label="系统管理员" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息内容">
          <template slot-scope="scope">
              <article id="editor"></article>
          </template>
        </el-form-item>
      </el-form>
      <my-sub-button @handleSubmit="submit" @handleCancel="cancel" />
  </section>
</template>

<script>
import MySubButton from '@/components/common/subButton'
export default {
  name: 'msgPub',
  components:{
    MySubButton
  },
  data () {
    return {
      text:'',
      editor:'',
    }
  },

  methods: {
    submit(){

    },
    cancel(){
      this.editor.txt.clear()
      setTimeout(() => {
        this.$router.go(-2)
      }, 1000);
    }
  },
  created(){
    this.$nextTick(()=>{
      let elem = document.getElementById('editor')
      this.editor = new this.$E(elem)
      this.editor.customConfig.zIndex = 100
      this.editor.customConfig.uploadImgShowBase64 = true  
      this.editor.customConfig.uploadImgServer = '/upload'
      this.editor.create()
    })
  }
}
</script>

<style scoped lang='scss' >
.wrapper{
  padding:20px;
  background-color: #fff;
  #editor{
    width: 90%;
    height:400px;
  }
}
</style>
