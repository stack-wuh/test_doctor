<template>
  <section class="wrapper">
    <section class="content">
      <search @inputChange="getList({path:pathChange})" v-if="isShow" :name="pathChange" />
      <my-table v-if="isShow" :list="list({path: pathChange})"  header="true" :params="pathChange" >
        <span slot="title">{{pathChange | formatTitle}}</span>
        <div slot="right">
            <my-button  ></my-button>
        </div>
      </my-table>
      <bottom @getCurrent="getCurrent" :total="total" :currentPage="currentPage" />
      <dialog-with-import @handleHideDialog="handleHideDialog" :visibleDialog="visibleDialog" title="导入文件" />
      <dialog-with-table :isShowDialog="isShowTable" :data="subData" :list="searchList" :text="text" />
    </section> 
  </section>
</template>

<script>
import MyTable from '@/components/common/myTable'
import Search from '@/components/common/search'
import MyButton from '@/components/common/myButton'
import Bottom from '@/components/common/bottom'
import DialogWithImport from '../child/dialogWithImport'
import DialogWithTable from '../child/dialogWithTable'

import {mapActions , mapGetters , mapState} from 'vuex'
export default {
  name: 'store',
  components:{
    MyTable , 
    Search ,
    MyButton ,
    Bottom ,
    DialogWithImport,
    DialogWithTable,
  },
  data () {
    return {
      isShow:true,
      visibleDialog:false,
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
      return  this.$route.query.child || this.$route.query.subMenu
    },
    ...mapGetters({
      'list':'memberStore',
    }),
    ...mapState({
      total:state => state.Member.total,
      currentPage:state => state.Member.currentPage,
      'isShowTable': state => state.Member.tempObj.isShowDialog,
      'subData': state => state.Member.tempObj.data,
      'searchList': state => state.Member.tempObj.list,
      'text': state => state.Member.tempObj.text
    })
  },
  watch:{
    pathChange(){
      this.isShow = false
      this.$store.commit('clearSearchForm')
      setTimeout(()=>{
        this.isShow = true
        this.getList({path: this.pathChange})  
      })
    },
  },
  methods: {
    ...mapActions({
      'getList':'getMemberStore'
    }),
    getCurrent(value){
      this.getList({path: this.pathChange, currPageNo: value})
    },
    handleHideDialog(val){
      this.visibleDialog = val.isShow
    },
  },
  created(){
    this.getList({path:this.pathChange})
  },
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
