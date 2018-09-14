<template>
  <section class="father">
      <section class="content">
        <Search  @inputChange="getList({path:changePath})" v-if="isShow" :name="changePath" />
        <my-table v-if="isShow" header="true" :list="list({path: changePath})">
          <span slot="title">{{ $route.query.child || $route.query.subMenu}}列表</span>
          <div slot="right">
            <my-button></my-button>
          </div>
        </my-table>
        <my-bottom :total="total" :currentPage="currentPage" @getCurrent="getCurrent" />
        <import-with-dialog title="上传文件"></import-with-dialog>
      </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import MyTable from '@/components/common/myTable'
import MyButton from '@/components/common/myButton'
import MyBottom from '@/components/common/bottom'
import ImportWithDialog from '@/components/memberManage/child/dialogWithImport'
import {mapActions ,mapState ,mapGetters} from 'vuex'
export default {
  name: 'store',
  components:{
    Search,
    MyTable,
    MyButton,
    MyBottom,
    ImportWithDialog,
  },
  data () {
    return {
      isShow:true
    }
  },
  computed:{
    ...mapState({
      'total': state => state.Coupon.total,
      'currentPage': state => state.Coupon.currentPage
    }),
    ...mapGetters({
      'list':'formatCouponStore'
    }),
    changePath(){
      return this.$route.query.child || this.$route.query.subMenu
    }
  },
  watch:{
    changePath(){
      let data = this.$route.query.data && JSON.parse(this.$route.query.data)
      let search = {
        id: data && data.id
      }
      this.isShow = false
      setTimeout(()=>{
        this.getList({path: this.changePath, search})
        this.isShow = true
      })
    }
  },
  methods: {
    ...mapActions({
      'getList':'getCouponStore',
      
    }),
    getCurrent(value){
      this.getList({path: this.changePath, currPageNo: value})
    }
  },
  created(){
    let data = this.$route.query.data && JSON.parse(this.$route.query.data)
    let search = {
      id: data && data.id 
    }
    this.getList({path: this.changePath, search})
  }
}
</script>

<style scoped lang='scss' >

</style>
