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
          <el-form-item v-for="(item,index) in list" :key="index">
            <el-input class="my-input" v-if="item.type == 'input'" :placeholder="'请编辑'+item.name" :style="item.style"></el-input>
            <span v-if="item.child" >this is code</span>
          </el-form-item>
        </el-form>
        <section class="nav-list">
          <el-checkbox>记住密码</el-checkbox>
          <span class="empty-flex"></span>
          <span class="item">忘记密码?</span>
          <span class="item">去注册</span>
        </section>
        <section class="btn-area">
          <el-button class="btn">登录</el-button>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      headerLogo:require('../../../src/assets/img/h-logo.png'),
      list:[
        {
          name:'用户名',
          type:'input',
          style:'',
          child:false,
        },
        {
          name:'密码',
          type:'input',
          style:'',
          child:false,
        },
        {
          name:'验证码',
          type:'input',
          child:true,
          style:'width:45%',
        }
      ]
    }
  },

  methods: {}
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
