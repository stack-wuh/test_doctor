<template>
  <section class="wrapper">
    <section class="unlimit">
      <section class="bg-img"></section>
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

  methods: {}
}
</script>

<style scoped lang='scss' >
.wrapper{
  width: 100%;
  .bg-img{
    width: 100%;
    height: 200px;
    background-image: url(../../../src/assets/img/unlimit.png);
    background-position: center center;
  }
}
</style>
