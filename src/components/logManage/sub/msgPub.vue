<template>
  <section class="wrapper">
      <el-form label-width="120px" :model="form" :rules="rules" ref="myForm">
        <el-form-item label="消息标题" prop="title">
          <el-input v-model="form.title" placeholder="请编辑消息标题" class="my-input-220"></el-input>
        </el-form-item>
        <el-form-item label="消息类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择消息类型">
            <el-option label="公告" value="0"></el-option>
            <el-option label="提醒" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送对象" prop="roleId">
          <el-select v-model="form.roleId" placeholder="请选择发送对象">
            <el-option v-for="(item,index) in formatRoleList" :key="index" :label="item.label" :value="item.value"></el-option>
            <el-option label="全部对象" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息内容" prop="content">
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
import {mapActions, mapGetters} from 'vuex'
const rules = {
  title:[{required:true, message:'请编辑消息标题', trigger:'blur'}],
  type:[{required:true, message:'请选择消息类型', trigger:'change'}],
  roleId:[{required:true, message:'请选择发送对象', trigger:'change'}],
}
export default {
  name: 'msgPub',
  components:{
    MySubButton
  },
  data () {
    return {
      editor:'',
      form:{
        title:'',
        type:'',
        roleId:'',
        content:'',
      },
      rules,
    }
  },
  computed:{
    ...mapGetters({
      'formatRoleList':'formatRoleList'
    })
  },
  methods: {
    ...mapActions({
      'getRoleList':'getRoleList',
      'handleSubmit': 'logSystemMsgPub'
    }),
    submit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          let txt = this.editor.txt.html()
          this.form.content = txt
          this.handleSubmit({form: this.form}).then(res => {
            setTimeout(()=>{
              this.cancel()
            },1000)
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
      this.editor.txt.clear()
      this.form = {}
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
    this.getRoleList()
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
