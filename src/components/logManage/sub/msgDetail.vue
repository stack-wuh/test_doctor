<template>
  <section class="wrapper">
    <section class="info">
      <header class="header">
        <p>系统{{info.typeText}}</p>
        <el-button @click="goBack" type="danger">返回</el-button>
      </header>
      <time class="c666 f14" >{{info.publishTime}}</time><span class="margin-lf-15">{{info.organizationName}}</span>
      <h4 class="margin-tp-15">{{info.title}}</h4>
      <article class="article" v-html="info.content"></article>
    </section>
  </section>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      info:{}
    }
  },

  methods: {
    goBack(){
      this.$router.go(-2)
    }
  },
  created(){
    let data = this.$route.query.data && JSON.parse(this.$route.query.data)
    this.info = data
  }
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/mixin.scss';
.wrapper{
  header.header{
    @include flex-box(row, nowrap, space-between, center);
  }
  .info{
    padding:20px;
    background-color: #fff;
  }
}
</style>
