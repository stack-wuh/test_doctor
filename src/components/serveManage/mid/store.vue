<template>
  <section class="wrapper">
    <section class="content">
      <search @inputChange="getServerStore({path:pathChange})" v-if="isShow" :name="$route.query.child || $route.query.subMenu" />
      <my-table v-if="isShow" :list="formatServerStore({path: pathChange})"  header="true" :params=" $route.query.child ||$route.query.subMenu" >
        <span slot="title">{{$route.query.subMenu}}列表</span>
        <div slot="right">
            <my-button ></my-button>
        </div>
      </my-table>
      <my-bottom @getCurrent="getCurrent" type="pagination" :total="total" :currentPage="currentPage" />
    </section>
  </section>
</template>

<script>
import MyTable from '@/components/common/myTable'
import Search from '@/components/common/search'
import MyButton from '@/components/common/myButton'
import MyBottom from '@/components/common/bottom'
import {mapActions, mapGetters, mapState} from 'vuex'
export default {
  name: 'store',
  components:{
    MyTable , 
    Search ,
    MyButton ,
    MyBottom,
  },
  data () {
    return {
      isShow:true,
    }
  },
  computed:{
    ...mapState({
      'data': state => state.Server.data,
      'total': state => state.Server.total,
      'currentPage': state => state.Server.currPageNo
    }),
    ...mapGetters({
      'formatServerStore':'formatServerStore'
    }),
    pathChange(){
      return  this.$route.query.child || this.$route.query.subMenu
    },
  },
  watch:{
    pathChange(){
      this.getServerStore({path: this.pathChange})
      this.isShow = false
      setTimeout(()=>{
        this.isShow = true
        this.$store.commit('clearSearchForm')
      })
    }
  },
  methods: {
    ...mapActions({
      'getServerStore':'getServerStore'
    }),
    getCurrent(value){
      this.getServerStore({path: this.pathChange, currPageNo: value})
    }
  },
  created(){
    this.getServerStore({path: this.pathChange})
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
