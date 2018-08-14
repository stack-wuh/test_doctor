<template>
  <section class="wrapper signup">
    <header class="header">
      <span>
        <img :src="headerLogo" alt="logo">
      </span>
      <span>我已注册,马上去
        <router-link to="/signin" ><span class="nav-title">登录</span></router-link>
      </span>
    </header>
    <section class="content">
      <h3>请填写您的注册信息</h3>
      <el-form class="my-form" label-width="140px" :model="form" ref="myForm" status-icon>
        <el-form-item v-for="(item,index) in list" :key="index" :label="item.name" :rules="item.rules" :prop="item.prop">
          <el-input v-model="form[item.prop]" class="my-input" v-if="item.type == 'input' && !item.child" :placeholder="'请编辑'+item.name" ></el-input>
          <section class="my-input" v-if="item.type == 'input' && item.child">
            <el-input v-model="form[item.prop]" v-if="item.type == 'input' && item.child" :placeholder="'请编辑' + item.name" :style="item.style">
            </el-input>
            <el-button type="primary" :style="item.sub[0].style">发送验证码</el-button>
          </section>
          <el-select v-model="form[item.prop]" v-if="item.type == 'select'" class="my-input" placeholder="请编辑提示问题"></el-select>
        </el-form-item>
      </el-form>
      <section class="check-list">
        <ul>
          <li>
            <el-checkbox>我已同意以下条约</el-checkbox>
          </li>
          <li>
            《系统手册》
          </li>
          <li>
            《会员手册》
          </li>
          <li>
            《股东协议》
          </li>
        </ul>
      </section>
      <section class="btn-area">
        <el-button class="btn">立即注册</el-button>
      </section>
    </section> 
  </section>
</template>

<script>
export default {
  name: 'signup',

  data () {
    var validatePwd2 = (rule,value,cb)=>{
      if(value === ''){
        cb(new Error('请再次输入密码'))
      }else if(value !== this.form.userpwd){
        cb(new Error('两次输入密码不一致'))
      }else{
        cb()
      }
    }
    var checkPhone = (rule,value,cb) => {
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if(value == ''){
        cb(new Error('请输入手机号码'))
      }else if(!reg.test(value)){
        cb(new Error('手机号码格式错误'))
      }else {
        cb()
      }
    }
    var checkEmail =(rule,value,cb) => {
      var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if(value == ''){
        cb(new Error('请编辑邮箱'))
      }else if(!reg.test(value)){
        cb(new Error('请编辑正确的邮箱地址'))
      }else {
        cb()
      }
    }
    var checkid = (rule,value,cb) => {
      var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
      if(value == ''){
        cb(new Error('请编辑身份证号码'))
      }else if(!reg.test(value)){
        cb(new Error('请输入正确的身份证号码'))
      }else{
        cb()
      }
    }
    return {
      list:[
        {
          name:'用户名',
          type:'input',
          child:false,
          prop:'username',
          rules:[
            {
              required:true,
              message:'请编辑用户名',
              trigger:['blur'],
            }
          ]
        },
        {
          name:'密码',
          type:'input',
          child:false,
          prop:'userpwd',
          rules:[
            {
              required:true,
              message:'请编辑密码',
              trigger:'blur'
            }
          ]
        },
        {
          name:'重复密码',
          type:'input',
          child:false,
          prop:'checkpwd',
          rules:[
            {
              required:true,
              validator:validatePwd2,
              trigger:'blur'
            }
          ]
        },
        {
          name:'真实姓名',
          type:'input',
          child:false,
          prop:'realname',
          rules:[
            {
              required:true,
              message:'请编辑真实姓名',
              trigger:'blur'
            }
          ]
        },
        {
          name:'身份证号',
          type:'input',
          child:false,
          prop:'pid',
          rules:[
            {
              required:true,
              validator:checkid,
              trigger:'blur'
            }
          ]
        },
        {
          name:'电子邮箱',
          type:'input',
          child:false,
          prop:'email',
          rules:[
            {
              required:true,
              validator:checkEmail,
              trigger:'blur'
            }
          ]
        },
        {
          name:'手机号',
          type:'input',
          child:true,
          style:'width:60%;',
          prop:'phone',
          sub:[
            {
              text:'发送验证码',
              type:'button',
              style:'width:90px;margin-left:20px;'
            }
          ],
          rules:[
            {
              required:true,
              validator:checkPhone,
              trigger:'blur'
            }
          ]
        },
        {
          name:'验证码',
          type:'input',
          child:false,
          prop:'code',
          rules:[
            {
              required:true,
              message:'请编辑验证码',
              trigger:'blur'
            }
          ]
        },
        {
          name:'提示问题',
          type:'select',
          child:false,
          prop:'question',
          rules:[
            {
              required:false,
              message:'请选择问题',
              trigger:['change','blur'],
            }
          ]
        },
        {
          name:'问题回答',
          type:'input',
          child:false,
          text:'密码找回问题提示',
          prop:'answer',
          rules:[
            {
              required:false,
              message:'请编辑问题回答',
              trigger:'blur'
            }
          ]
        },
      ],
      form:{
        username:'',
        userpwd:'',
        checkpwd:'',
        realname:'',
        pid:'',
        email:'',
        phone:'',
        code:'',
        question:'',
        answer:'',
      },
      headerLogo:require('../../../src/assets/img/h-logo.png')
    }
  },

  methods: {
    submit(){
      this.$refs.myForm.validate(valid=>{
        if(valid){
          console.log(this.form)
        }else{
          new Error('is error')
        }
      })
    },
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/color.scss';
@import '../../assets/style/mixin.scss';
.wrapper{
  height:100%;
  overflow: auto;
  header.header{
    @include flex-box(row,nowrap,space-between,center);
    height:80px;
    padding:0 20px;
    border-bottom: 1px solid #eee;
    span.nav-title{
      color: $a-color;
    }
  }
  section.content{
    @include flex-box(column,wrap,center,center);
    margin-top:15px;
    .my-form{
      @include flex-box(column,wrap,center,center);
      width:980px;
      margin:15px 0;
      .my-input{
        width: 280px;
        margin-left: 20px;
      }
    }
    .check-list{
      margin-left:-12%;
      color: $a-color;
      ul{
        font-size: 14px;
        li:first-of-type + li{
          margin-top:10px;
        }
        li:first-of-type ~ li{
          margin-bottom:5px;
        }
      }
    }
    .btn-area{
      .btn{
        width:320px;
        height:40px;
        margin-top:20px;
        margin-bottom:40px;
        margin-left:60px;
        border-radius: 10px;
        color: #fff;
        font-size: 16px;
        background-color: $a-color;
      }
    }
  }
}
</style>
