<template>
  <section class="wrapper">
    <section class="unlimit">
      <img :src="bgUrl" alt="unlimit" style="width:100%;height:100%;">
      <section class="btn-area">
        <el-button type="danger" @click="goBackPrev">返回上一页</el-button>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: 'nolimit',

  data () {
    return {
      bgUrl: require('../../../src/assets/img/unlimit.png')
    }
  },

  methods: {
    goBackPrev(){
      this.$router.go(-2)
    }
  }
}
</script>

<style scoped lang='scss' >
.wrapper{
  width: 100%;
  .btn-area{
    height: 50px;
    margin-top:20px;
    line-height: 50px;
    text-align: center;
  }
}
</style>
