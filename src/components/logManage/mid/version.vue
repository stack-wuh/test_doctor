<template>
  <section class="wrapper">
    <section class="list" v-for="(item,index) in formatLogStore({path:'版本更新'})" :key="index" >
      <p class="title">
        <span>版本更新记录</span>
        <span @click="handleDelForItem(item)" class="btn-nav-1 btn-nav">删除</span>
        <span @click="handleShowDialog(item)" class="btn-nav-2 btn-nav">编辑</span>
      </p>
      <section class="info">
        <h4>{{item.reserved2}}</h4>
        <p class="margin-bm-10">版本号: {{item.name}}</p>
        <p v-for="(list,lidx) in item.lists" :key="lidx">{{list}}</p>
      </section>
    </section>
    <section class="btn-area">
      <el-button @click="visibleDialog = true" type="primary" style="width:160px">新增</el-button>
    </section>
    <el-dialog title="编辑" :visible.sync="visibleDialog">
      <el-form :model="form" ref="myForm" :rules="rules" label-width="120px">
        <el-form-item label="更新主题" prop="reserved2">
          <el-input placeholder="请编辑本次更新主题" v-model="form.reserved2" class="my-input"></el-input>
        </el-form-item>
        <el-form-item label="版本编号" prop="name">
          <el-input v-model="form.name" placeholder="请编辑本次更新版本编号" class="my-input"></el-input>
        </el-form-item>
        <el-form-item label="更新内容" prop="content">
          <el-input v-model="temp_text" placeholder="请编辑更新内容" class="my-input"></el-input>
          <span class="margin-lf-15">
            <el-button 
            @click="handleAddItem" >添加</el-button>
          </span>
        </el-form-item>
        <el-form-item v-if="form['reserved1'].length" prop="reserved1" >
          <h6 v-if="form['reserved1'].length" v-for="(list,lindex) in form['reserved1']" :key="lindex">{{list}} <el-button @click="handleDelItem(lindex)" size="mini" type="danger" class="margin-lf-15">删除</el-button></h6>        
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="submit" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
const rules = {
  reserved2:[{required: true, message:'请编辑更新主题', trigger:'blur'}],
  reserved1:[{required: true, message:'请填写更新内容', trigger:'blur'}],
  name:[{required: true, message:'请编辑版本编号', trigger:'blur'}],
}
export default {
  name: 'version',

  data () {
    return {
      visibleDialog:false,
      form:{
        name:'',
        reserved2:'',
        reserved1:[]
      },
      temp_text:'',
      rules,
      list:[]
    }
  },
  computed:{
    ...mapGetters({
      'formatLogStore':'formatLogStore'
    }),
    pathChange(){
      return this.$route.query.child || this.$route.query.subMenu
    }
  },
  methods: {
    ...mapActions({
      'getList': 'getVersionList',
      'getLogStore': 'getLogStore',
      'handleSubmit': 'versionPubAndFresh',
      'logDelItemAndFresh': 'logDelItemAndFresh'
    }),

    handleAddItem(){
      if(this.temp_text){
        this.form.reserved1 = [...this.form.reserved1, this.temp_text]
        this.temp_text = ''
      }else{
        _g.toastMsg({
          type: 'error',
          msg:'请编辑内容之后添加'
        })
      }
    },
    handleDelItem(index){
      this.form.reserved1.splice(index,1)
    },

    handleShowDialog(item){
      this.visibleDialog = true
      this.form = {...this.form, ...item, reserved1: item.reserved1 && item.reserved1.split(',')}
    },
    handleDelForItem(item){
      this.logDelItemAndFresh({id: item.id, path: this.pathChange})
    },

    submit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          let form = JSON.parse(JSON.stringify(this.form))
          form.reserved1 = form.reserved1.toString()
          this.handleSubmit({form, path: this.pathChange}).then(res => {
            res.status == 0 && this.cancel()
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请填写必填项目后提交'
          })
        }
      })
    },

    cancel(){
      this.$refs.myForm.resetFields()
      this.visibleDialog = false
    }
  },
  created(){
    this.getLogStore({path: '版本更新'})
  }
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/color.scss';
@import '../../../assets/style/mixin.scss';
.wrapper{
  .title{
    @include flex-box(row, nowrap, space-between, center);
    position: relative;
    padding: 20px 25px;
    .btn-nav{
      position: absolute;
      right: 30px;
      top:0px;
      padding:2px 15px;
      color: #fff;
      background-color: $base;
      border:1px solid $base;
      border-top:none;
      visibility: hidden;
    }
    @for $i from 1 to 3{
      .btn-nav-#{$i} {
        right:$i*80px - 40px;
        @if $i == 1 {
          background-color: $text-danger;
          border:$text-danger;
        }
      }
    }
  }
  .info{
    margin-bottom: 15px;
    padding: 0 20px;
  }
  .list{
    margin-bottom: 15px;
    padding-bottom: 20px;
    background-color: #fff;
    &:hover{
      cursor: pointer;
      border:1px solid $base;
      .btn-nav{
        visibility: visible;
      }
    }
  }
  .btn-area{
    margin:15px 0;
    text-align: center;
  }
  .my-input{
    width:70%;
  }
}
</style>
