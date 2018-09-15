<template>
  <section class="wrapper signin">
    <header class="header">
      <span>
        <img :src="headerLogo" alt="logo">
      </span>
      <h3 class="title">车医生后台管理CRM</h3>
      <span></span>
    </header>
    <section class="content">
      <section class="form-area">
        <span class="nav-title">用户登录</span>
        <el-form class="my-form" ref="myForm">
          <el-form-item v-for="(item,index) in list" :key="index" prop="username">
            <el-input v-model="login[item.prop]" class="my-input" v-if="item.type == 'input'" :type="item.inputType" :placeholder="'请编辑'+item.name" :style="item.style"></el-input>
            <span v-if="item.child" class="code-box" >
              <small v-for="(sub,sid) in code" :key="sid" class="box-item" :style="styleList[sid]" >{{sub}}</small>
            </span>
          </el-form-item>
        </el-form>
        <section class="nav-list">
          <el-checkbox v-model="isSavePwd" @change="savePwdInExpire">记住密码</el-checkbox>
          <span class="empty-flex"></span>
          <span class="item">忘记密码?</span>
          <span class="item">去注册</span>
        </section>
        <section class="btn-area">
          <el-button class="btn" @click="handleSubmit">登录</el-button>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import {mapState , mapActions, mapMutations} from 'vuex'
const rules = {
  username: [{require: true, message: '请编辑用户名', trigger:'blur'}],
  password: [{require: true, message: '请编辑登录密码', trigger:'blur'}],
}

export default {
  name: 'signin',

  data () {
    return {
      headerLogo:require('../../../src/assets/img/h-logo.png'),
      list:[
        {
          name:'用户名',
          type:'input',
          prop:'username',
          inputType:'text',
          style:'',
          child:false,
        },
        {
          name:'密码',
          type:'input',
          prop:'password',
          inputType:'password',
          style:'',
          child:false,
        },
        {
          name:'验证码',
          type:'input',
          prop:'code',
          child:true,
          style:'width:45%',
        }
      ],
      code:'',
      styleStore:['#FFFF00','#FF6600','#33CC00','#6666FF','#0033FF','#6600CC'],
      textShadow:['#00FF00','	#00EE00','#00E5EE','#3A5FCD','#473C8B','#76EEC6'],
      styleList:[],
      isSavePwd:eval(localStorage.getItem('isSavePwdInExpire')) || false,
      login:{
        username:'',
        password:'',
        code:'',
      },
    }
  },
  computed:{
    ...mapState({
      'form':'form'
    })
  },
  methods: {
    ...mapActions({
      'signIn':'signIn', // 处理登录验证, 带有code验证码验证
      'handleSignIn':'handleSignInWidthoutCode' // 处理登录, 不带有code验证码
    }),
    ...mapMutations({
      'handleNameAndPwd':'handleNameAndPwd'
    }),
    /**
     * 随机验证码
     */
    handleRandomCode(){
      this.code = Math.random().toString().slice(-4).split('')
      for(var i=0;i<=4;i++){
        let index = Math.floor(Math.random() * (4-1)) + 1  // 出现的styleStore中的位置
        let degX = Math.floor(Math.random()* (50-1)) + 1 // 在X轴翻转的角度
        let offsetX = Math.floor(Math.random() * (15 - 0)) + 1 // 文字阴影在x轴偏移量
        let offsetY = Math.floor(Math.random() * (15 - 0)) + 1 // 文字阴影在y轴偏移量
        let style = `font-size:15px;color:${this.styleStore[index]};text-shadow:${offsetX}px ${offsetY}px 5px ${this.textShadow[index]};transform: rotateX(${degX}deg);`
        this.styleList = [...this.styleList, style]
      }
    },
    /**
     * 映射登录事件
     */
    handleSubmit(){
      let keys = Object.keys(this.login)
      let result = keys.every(item => this.login[item].toString()[0])
      let isSavePwdInExpire = localStorage.getItem('isSavePwdInExpire')
      if(result){
        if(this.code.join('') !== this.login['code']){
          _g.toastMsg({
            type: 'error',
            msg: '验证码错误,请重试!'
          })
          setTimeout(()=>{
            this.handleRandomCode()
          },500)
          return 
        }
        this.signIn({form: this.login})
        .catch(err => {
          this.handleRandomCode()
        })
      }else if(!this.login['username'] || !this.login['password']){
        _g.toastMsg({
          type: 'error',
          msg: '请编辑用户名或密码'
        })
      }else{
        _g.toastMsg({
          type: 'error',
          msg:'请填写验证码'
        })
      }
    },
    /**
     * 单击确定保存用户名与密码
     */
    savePwdInExpire(){
      let now = new Date().getTime(), expire = now + 7*24*60*60*1000 ; // 保质期七天
      localStorage.setItem('isSavePwdInExpire',this.isSavePwd)
      localStorage.setItem('saveObj',JSON.stringify({isSave:this.isSavePwd,now,expire,username: this.login.username, password: this.login.password}))
    },
    /**
     * 自动登录事件
     */
    handleSubmitSelf(){
      let isSavePwdInExpire = localStorage.getItem('isSavePwdInExpire'),
          _saveObj = localStorage.getItem('saveObj') && JSON.parse(localStorage.getItem('saveObj'))
      if(isSavePwdInExpire && (_saveObj.expire - new Date().getTime() > 0)){
        this.login = {...this.login, ..._saveObj}
        this.signIn({form: this.login}).catch(err => {
          localStorage.setItem('isSavePwdInExpire', false)
          localStorage.setItem('saveObj', JSON.stringify({}))
        })
      }
    }
  },
  created(){
    this.handleRandomCode()
    this.handleSubmitSelf()
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/mixin.scss';
@import '../../assets/style/color.scss';
.wrapper{
  height: 100%;
  background-image: url('../../assets/img/bg-2.jpg');
  background-size: 100% 100%;
  background-position: center center;
  header.header{
    @include flex-box(row ,nowrap ,space-between,center);
    height: 80px;
    padding:0 20px;
    h3.title{
      color: #FF0000;
      font-size: 28px;
    }
  }
  .content{
    position: relative;
    height: 100%;
    .form-area{
      position: absolute;
      right: 0;
      bottom: 200px;
      width: 300px;
      height: 350px;
      padding: 20px;
      .nav-title{
        font-weight: bold;
        font-size: 18px;
        color: $a-color;
      }
      .my-form{
        margin:15px 0;
        .code-box{
          display: inline-block;
          width:40%;
          margin-left: 15px;
          background-color: #fff;
          user-select: none;
          .box-item{
            display: inline-block;
            width: 25%;
            text-align: center;
            font-size: 14px;
            
          }
        }
      }
      .nav-list{
        @include flex-box(row,nowrap,space-between,center);
        color: $a-color !important;
        .item{
          margin-left: 10px;
          font-size: 14px;
          &:hover{
            cursor: pointer;
          }
        }
      }
      .btn-area{
        margin-top:15px;
        .btn{
          width: 100%;
          height: 40px;
          background-color: $a-color;
          color: #fff;
          font-size: 16px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
