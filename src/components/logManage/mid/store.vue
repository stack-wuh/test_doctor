<template>
  <section class="wrapper">
    <section class="content">
      <search @inputChange="getLogStore({path:pathChange})" v-if="isShow" :name="$route.query.child || $route.query.subMenu" />
      <my-table v-if="isShow" :list="list({path: pathChange})"  header="true" :params=" $route.query.child ||$route.query.subMenu" >
        <span slot="title">{{ $route.query.child || $route.query.subMenu}}列表</span>
        <div slot="right">
            <my-button></my-button>
        </div>
      </my-table>
      <bottom @getCurrent="getCurrent" type="pagination" :total="total" :currentPage="currentPage" />
    </section>
  </section>
</template>

<script>
import MyTable from '@/components/common/myTable'
import Search from '@/components/common/search'
import MyButton from '@/components/common/myButton'
import Bottom from '@/components/common/bottom'

import {mapActions , mapGetters , mapState} from 'vuex'
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
    },
    ...mapGetters({
      'list':'formatLogStore',
    }),
    ...mapState({
      total:state => state.Log.total,
      currentPage:state => state.Log.currentPage,
    })
  },
  watch:{
    pathChange(){
      this.isShow = false
      this.getLogStore({path:this.pathChange})
      setTimeout(()=>{
        this.isShow = true
        this.$store.commit('clearSearchForm')
      })
    }
  },
  methods: {
    ...mapActions({
      'getLogStore':'getLogStore'
    }),
    inputChange(e){
      console.log(e)
    },
    getCurrent(value){
      this.getLogStore({path: this.pathChange, currPageNo: value})
    }
  },
  created(){
    this.getLogStore({path:this.pathChange})
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
