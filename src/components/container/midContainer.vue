<template>
  <section class="container">
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'container',

  data () {
    return {
    }
  },
  watch:{
    '$route'(to,from){
      if(to.query.path){
        this.$router.push({path:to.query.path,query:{menu:to.query.menu , subMenu:to.query.subMenu , child:to.query.child}})
      }
    }
  },
  methods: {},
  created(){
    let { path , menu , subMenu , child} = this.$route.query
    if(path){
      this.$router.push({path:path,query:{menu , subMenu , child}})
    }
  }
}
</script>

<style scoped lang='scss' >
.container{
  width:100%;
  height:100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
