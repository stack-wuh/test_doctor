<template>
  <section class="father">
      <section class="content">
        <Search v-if="isShow" :name="changePath" @inputChange="getSellingStore({path: changePath, query})" />
        <my-table v-if="isShow" :list="list({path: changePath})" header="true" :params="changePath" >
          <span slot="title">{{changePath}}列表</span>
          <div slot="right">
            <my-button></my-button>
          </div>
        </my-table>
        <my-bottom @getCurrent="getCurrentPage" :total="total" :currentPage="currPageNo"></my-bottom>
      </section>
      <import-with-dialog title="上传文件"></import-with-dialog>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import MyTable from '@/components/common/myTable'
import MyButton from '@/components/common/myButton'
import MyBottom from '@/components/common/bottom'
import ImportWithDialog from '@/components/memberManage/child/dialogWithImport'
import {mapActions, mapState, mapMutations, mapGetters} from 'vuex'

export default {
  name: 'list',
  components:{
    Search ,
    MyTable ,
    MyButton ,
    MyBottom,
    ImportWithDialog,
  },
  data () {
    return {
      isShow:true,
    }
  },
  computed:{
    ...mapState({
      'total': state => state.Selling.total,
      'currPageNo': state => state.Selling.currPageNo
    }),
    ...mapGetters({
      'list': 'sellingStoreFormat'
    }),
    changePath(){
      return this.$route.query.child ||  this.$route.query.subMenu
    },
    query(){
      let data = this.$route.query && this.$route.query.data
      data = data && JSON.parse(data)
      return data
    }
  },
  watch:{
    changePath(){
      this.isShow = false
      this.$store.commit('clearSearchForm')
      setTimeout(()=>{
        this.isShow = true
        this.getSellingStore({path: this.changePath, query: this.query})
      })
    }
  },
  methods: {
    ...mapActions({
      'getSellingStore': 'getSellingStore'
    }),
    getCurrentPage(e){
      this.getSellingStore({path: this.changePath, currPageNo: e, query: this.query})
    }
  },
  created(){
    this.getSellingStore({path: this.changePath, query: this.query})
  }
}
</script>

<style scoped lang='scss' >

</style>
