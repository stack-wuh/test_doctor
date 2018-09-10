<template>
  <section class="container">
    <router-view></router-view>
    <my-dialog />
  </section>
</template>

<script>
import MyDialog from  '@/components/common/myDialog';
export default {
  name: 'container',
  components:{
    MyDialog ,
  },
  data () {
    return {
    }
  },
  watch:{
    '$route'(to,from){
      console.log('aaa')
      if(to.query.path){
        this.$router.push({path:to.query.path,query:{menu:to.query.menu , subMenu:to.query.subMenu , child:to.query.child , data:to.query.data}})
      }
    }
  },
  methods: {},
  created(){
    let { path , menu , subMenu , child , data} = this.$route.query
    if(path){
      this.$router.push({path:path,query:{menu , subMenu , child , data}})
    }
  }
}
</script>

<style scoped lang='scss' >
.container{
  width:100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
