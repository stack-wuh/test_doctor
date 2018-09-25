<template>
  <section class="wrapper signin">
    <section class="left-content">
      <section :class="'img-item-' + index" class="img-list" v-for="(item,index) in imgs" :key="index">
        <img v-if="index < 4" :src="item.url" alt="logo">
      </section>
    </section>
    <section class="middle">
      <section class="content-wrap">
        <h3 class="title">车医生后台管理系统登录</h3>
        <section class="form-area">
          <h3 class="form-title">用户登录</h3>
          <el-form class="my-form">
            <el-form-item v-for="(item,index) in list" :key="index" >
              <el-input v-model="login[item.prop]" class="my-input" v-if="item.type == 'input'" :type="item.inputType" :style="item.style">
                <template slot="prepend">
                    <img :src="item.icon" ></img>
                </template>
              </el-input>
              <span v-if="item.child" style="width:40%;">
                <span v-if="item.child" class="code-box">
                  <small v-for="(sub, sid) in code" :key="sid" class="box-item" :style="styleList[sid]" >{{sub}}</small>
                </span>
                <span @click="handleRandomCode" class="code-btn">换一张</span>
              </span>
            </el-form-item>
            <p class="margin-bm-15">
              <el-checkbox v-model="isSavePwd" @change="savePwdInExpire">记住密码</el-checkbox>
            </p>
            <el-button @click="handleSubmit" class="submit-button">登录</el-button>
          </el-form>
        </section>
      </section>
    </section>
    <section class="right-content">
      <section :class="'img-item-' + index" class="img-list" v-for="(item,index) in imgs" :key="index">
        <img v-if="index > 3" :src="item.url" alt="logo">
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
          place:'请编辑用户名',
          icon:require('../../assets/img/icon-user.png')
        },
        {
          name:'密码',
          type:'input',
          prop:'password',
          inputType:'password',
          style:'',
          child:false,
          place:'请编辑登录密码',
          icon:require('../../assets/img/icon-password.png')
        },
        {
          name:'验证码',
          type:'input',
          prop:'code',
          child:true,
          style:'width:50%',
          place:'请编辑验证码',
          icon:require('../../assets/img/icon-check.png')
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
      imgs:[
        {
          url:require('../../assets/img/icon1.png'),
        },
        {
          url:require('../../assets/img/icon2.png'),
        },
        {
          url:require('../../assets/img/icon3.png'),
        },
        {
          url:require('../../assets/img/icon4.png'),
        },
        {
          url:require('../../assets/img/icon5.png'),
        },
        {
          url:require('../../assets/img/icon6.png'),
        },
        {
          url:require('../../assets/img/icon7.png'),
        }
      ]
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
        this.signIn({form: {username:this.login.username, password: this.login.password}}).catch(err => {
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
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  position: fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  background-image: url('../../assets/img/bg-list1.png');
  background-size: 100% 100%;
  background-position: center center;
  @for $i from 0 to 8{
    .img-item-#{$i} {
      position: relative;
      @if $i == 0{
        top:200px;
        left: 160px;
      }@else if $i == 1{
        top:500px;
        left: 120px;
      }@else if $i == 2{
        top:200px;
        left: 240px;
      }@else if $i == 3{
        top: 50px;
        left: 80px;
      }@else if $i == 4{
        top:200px;
        left: 100px;
      }@else if $i == 5{
        top:300px;
        left: 180px;
      }@else if $i == 6{
        top:400px;
        left: 150px;
      }
    }
  }
  .content-wrap{
    position: relative;
    top:40%;
    width: 460px;
    height: 460px;
    transform: translateY(-50%);
    h3.title{
      text-align: center;
      color: #fff;
      font-size: 32px;
    }
    .form-area{
      margin-top:50px;
      padding: 20px 30px;
      border-radius: 8px;
      background-color: #A4CBFB;
      h3.form-title{
        margin-bottom: 20px;
      }
      .my-form{
        .code-btn{
          position: relative;
          top:10px;
          margin-left: 10px;
          user-select: none;
          &:hover{
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .code-box{
          display: inline-block;
          width:30%;
          height: 40px;
          margin-left: 15px;
          background-color: #fff;
          user-select: none;
          .box-item{
            display: inline-block;
            width: 25%;
            text-align: center;
            font-size: 16px;
            
          }
        }
        .my-input{
          height: 50px;
        }
        .submit-button{
          width: 100%;
          height: 57px;
          font-size: 20px;
          background-color: #3D93F9;
          color: #fff;
          border-color: #3D93F9;
        }
      }
    }
  }
  .left-content, 
  .right-content{
    position: relative;
    width: 35%;
  }
  .content-wrap{
    flex:1;
  }
}
</style>
