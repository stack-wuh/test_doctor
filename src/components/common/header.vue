<template>
  <section class="wrapper">
    <header class="header">
      <section class="title">车医生后台管理系统</section>
      <section class="btn-nav">
        <span class="my-icon-remind">消息中心</span>
        <span class="my-icon-dianyuan" @click="signOut">退出</span>
      </section>
    </header>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'myHeader',

  data () {
    return {
    }
  },

  methods: {
    ...mapActions([
      'signOut'
    ])
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/mixin.scss';
.wrapper{
  header.header{
    @include flex-box(row,nowrap,space-between) ;
    width: 100%;
    height:100%;
    color: #fff;
    background-image: url('../../assets/img/bg-1.png');
    background-size: 100% 100% ;
    .title{
      margin-left: 20px;
      font-size: 28px;
    }
    .btn-nav{
      margin-right:40px;
      span{
        font-size: 18px;
        margin-right:15px;
        &::before{
          padding-right:10px;
        }
      }
    }
  }
}
</style>
