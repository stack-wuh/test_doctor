<template>
  <section class="father">
      <section class="content">
        <Search @inputChange="getList({path:changePath})"  />
        <my-table v-if="isShow" :list="list" header="true" >
          <span slot="title">{{$route.query.child || $route.query.subMenu}}列表</span>
          <div slot="right">
            <my-button />
          </div>
        </my-table>
        <my-bottom :total="total" :currentPage="currentPage" />
      </section>
  </section>
</template>

<script>
/**
 * 用品管理子模块的全部列表
 */
import MyTable from '@/components/common/myTable'
import Search from '@/components/common/search'
import MyButton from '@/components/common/myButton'
import MyBottom from '@/components/common/bottom'

import {mapActions ,mapState ,mapGetters} from 'vuex'
export default {
  name: 'store',
  components:{
    MyTable , 
    Search ,
    MyButton ,
    MyBottom ,
  },
  data () {
    return {
      isShow:true,
    }
  },
  computed:{
    ...mapState({
      'testlist' : state => state.Use.data,
      'total' : state => state.Use.total,
      'currentPage' : state => state.Use.currentPage
    }),
    ...mapGetters({
      'formatUseData':'formatUseData'
    }),
    changePath(){
      return this.$route.query.child || this.$route.query.subMenu
    },
    list(){
      return this.formatUseData({path:this.changePath})
    }
  },
  watch:{
    changePath(){
      this.isShow = false
      this.getList({path:this.changePath})
      setTimeout(()=>{
        this.isShow = true
      })
    }
  },
  methods: {
    ...mapActions({
      'getList' : 'getUseStore'
    })
  },
  created(){
    this.getList({path:this.changePath})
  }
}
</script>

<style scoped lang='scss' >

</style>
