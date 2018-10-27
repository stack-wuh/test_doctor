<template>
  <section class="wrapper">
    <section class="content">
      <search @inputChange="getStoresList({path:pathChange})" v-if="isShow" :name="$route.query.child || $route.query.subMenu" />
      <my-table v-if="isShow" :list="formatSystemStore({path: pathChange})"  header="true" :params=" $route.query.child ||$route.query.subMenu" >
        <span slot="title">{{pathChange === '员工列表' ? '关注用户' : pathChange | formatTitle}}</span>
        <div slot="right">
            <my-button  ></my-button>
        </div>
      </my-table>
      <bottom @getCurrent="getCurrent" :total="total" :currentPage="currentPage" />
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
  filters:{
    formatTitle(value){
      let reg = '列表'
      if(value.search(reg) === -1){
        value = value + '列表'
      }
      return value
    }
  },
  computed:{
    pathChange(){
      return this.$route.query.child || this.$route.query.subMenu
    },
    ...mapGetters({
      'list':'formatStoreDataList',
      'formatSystemStore':'formatSystemStore'
    }),
    ...mapState({
      total:state => state.System.total,
      currentPage:state => state.System.currentPage,
    })
  },
  watch:{
    pathChange(){
      this.isShow = false
      this.$store.commit('clearSearchForm')
      setTimeout(()=>{
        this.isShow = true
        this.getStoresList({path:this.pathChange})
      })
    }
  },
  methods: {
    ...mapActions({
      'getStoresList':'getStoresList',
    }),
    inputChange(e){
      console.log(e)
    },
    getCurrent(value){
      this.getStoresList({path: this.pathChange, currPageNo: value})
    }
  },
  created(){
    this.getStoresList({path:this.pathChange})
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
