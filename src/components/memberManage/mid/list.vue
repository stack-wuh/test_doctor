<template>
  <section class="wrapper">
    <section class="content">
      <search @inputChange="getList({path:pathChange})" v-if="isShow" :name="pathChange" />
      <my-table v-if="isShow" :list="list({path: pathChange})"  header="true" :params="pathChange" >
        <span slot="title">{{pathChange}}列表</span>
        <div slot="right">
            <my-button  ></my-button>
        </div>
      </my-table>
      <bottom @getCurrent="getCurrent" :total="total" :currentPage="currentPage" />
      <dialog-with-import @handleHideDialog="handleHideDialog" :visibleDialog="visibleDialog" title="导入文件1" />
    </section>
  </section>
</template>

<script>
import MyTable from '@/components/common/myTable'
import Search from '@/components/common/search'
import MyButton from '@/components/common/myButton'
import Bottom from '@/components/common/bottom'
import DialogWithImport from '../child/dialogWithImport'

import {mapActions , mapGetters , mapState} from 'vuex'
export default {
  name: 'store',
  components:{
    MyTable , 
    Search ,
    MyButton ,
    Bottom ,
    DialogWithImport,
  },
  data () {
    return {
      isShow:true,
      visibleDialog:false,
    }
  },
  computed:{
    pathChange(){
      return  this.$route.query.child || this.$route.query.subMenu
    },
    ...mapGetters({
      'list':'memberStore',
    }),
    ...mapState({
      total:state => state.Member.total,
      currentPage:state => state.Member.currentPage,
    })
  },
  watch:{
    pathChange(){
      this.isShow = false
      this.getList({path: this.pathChange})
      setTimeout(()=>{
        this.isShow = true
        this.$store.commit('clearSearchForm')
      })
    }
  },
  methods: {
    ...mapActions({
      'getList':'getMemberStore'
    }),
    inputChange(e){
      console.log(e)
    },
    getCurrent(value){
      this.getList({path: this.pathChange, currPageNo: value})
    },
    handleHideDialog(val){
      this.visibleDialog = val.isShow
    },
  },
  created(){
    this.getList({path:this.pathChange})
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
