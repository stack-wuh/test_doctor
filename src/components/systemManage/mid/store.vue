<template>
  <section class="wrapper">
    <section class="content">
      <search v-if="isShow" :name="$route.query.child || $route.query.subMenu" />
      <my-table v-if="isShow" :list="[{}]"  header="true" :params=" $route.query.child ||$route.query.subMenu" >
        <span slot="title">{{$route.query.subMenu}}列表</span>
        <div slot="right">
            <my-button ></my-button>
        </div>
      </my-table>
    </section>
  </section>
</template>

<script>
import MyTable from '@/components/common/myTable'
import Search from '@/components/common/search'
import MyButton from '@/components/common/myButton'
export default {
  name: 'store',
  components:{
    MyTable , 
    Search ,
    MyButton ,
  },
  data () {
    return {
      isShow:true,
    }
  },
  computed:{
    pathChange(){
      return  this.$route.query.child || this.$route.query.subMenu
    }
  },
  watch:{
    pathChange(){
      this.isShow = false
      setTimeout(()=>{
        this.isShow = true
      })
    }
  },
  methods: {}
}
</script>

<style scoped lang='scss' >
.wrapper{
  .content{
    .right{
      height:60px;
    }
  }
}
</style>
