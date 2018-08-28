<template>
  <section class="father">
      <section class="content">
        <Search  @inputChange="getList({path:changePath})" v-if="isShow" :name="changePath" />
        <my-table v-if="isShow" header="true" :list="list">
          <span slot="title">{{ $route.query.child || $route.query.subMenu}}列表</span>
          <div slot="right">
            <my-button></my-button>
          </div>
        </my-table>
        <my-bottom :total="total" :currentPage="currentPage" @getCurrent="getCurrent" />
      </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import MyTable from '@/components/common/myTable'
import MyButton from '@/components/common/myButton'
import MyBottom from '@/components/common/bottom'
import {mapActions ,mapState ,mapGetters} from 'vuex'
export default {
  name: 'store',
  components:{
    Search ,
    MyTable ,
    MyButton ,
    MyBottom ,
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
      this.isShow = false
      setTimeout(()=>{
        this.getList({path: this.changePath})
        this.isShow = true
      })
    }
  },
  methods: {
    ...mapActions({
      'getList':'getCouponStore'
    }),
    getCurrent(value){
      this.getList({path: this.changePath, currPageNo: value})
    }
  },
  created(){
    this.getList({path: this.changePath})
    console.log('is created')
  }
}
</script>

<style scoped lang='scss' >

</style>
