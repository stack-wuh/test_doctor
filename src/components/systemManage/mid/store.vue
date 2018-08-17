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
      <bottom />
    </section>
  </section>
</template>

<script>
import MyTable from '@/components/common/myTable'
import Search from '@/components/common/search'
import MyButton from '@/components/common/myButton'
import Bottom from '@/components/common/bottom'
import {mapActions} from 'vuex'
export default {
  name: 'store',
  components:{
    MyTable , 
    Search ,
    MyButton ,
    Bottom ,
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
  methods: {
    ...mapActions({
      'getStoresList':'getStoresList'
    }),
  },
  created(){
    this.getStoresList()
    // this.$store.dispatch('getStoresList')
  }
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
