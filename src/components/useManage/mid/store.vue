<template>
  <section class="father">
      <section class="content">
        <Search @inputChange="getList({path:changePath, search: {data}})"  />
        <my-table v-if="isShow" :list="list" header="true" >
          <span slot="title">{{$route.query.child || $route.query.subMenu}}列表</span>
          <div slot="right">
            <my-button />
          </div>
        </my-table>
        <my-bottom @getCurrent="getCurrent" :total="total" :currentPage="currentPage" />
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
    },
    data(){
      let _data = this.$route.query.data
      _data = _data && JSON.parse(_data)
      return _data || []
    }
  },
  watch:{
    changePath(){
      this.isShow = false
      this.$store.commit('clearSearchForm')
      setTimeout(()=>{
        this.isShow = true
        this.getList({path:this.changePath, search: {data: this.data}})
      })
    }
  },
  methods: {
    ...mapActions({
      'getList' : 'getUseStore'
    }),
    getCurrent(value){
      this.getList({path: this.changePath, currPageNo: value, search: {data: this.data}})
    }
  },
  created(){
    this.getList({path:this.changePath, search: {data: this.data}})
  }
}
</script>

<style scoped lang='scss' >

</style>
