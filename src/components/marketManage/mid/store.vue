<template>
  <section class="father">
      <section class="content">
        <Search @inputChange="getMarketStore({path: changePath})" :name="changePath" />
        <my-table v-if="isShow" header="true" :list="formMarketStore({path: changePath})">
          <span slot="title">{{ $route.query.child || $route.query.subMenu}}列表</span>
          <div slot="right">
            <my-button></my-button>
          </div>
        </my-table>
        <my-bottom @getCurrentPage="getCurrentPage" :total="total" :currentPage="currPageNo" />
      </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import MyTable from '@/components/common/myTable'
import MyButton from '@/components/common/myButton'
import MyBottom from '@/components/common/bottom'
import {mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: 'store',
  components:{
    Search ,
    MyTable ,
    MyButton,
    MyBottom,
  },
  data () {
    return {
      isShow:true
    }
  },
  computed:{
    ...mapState({
      'total': state => state.Market.total,
      'currPageNo': state => state.Market.currPageNo
    }),
    ...mapGetters({
      'formMarketStore':'formMarketStore'
    }),
    changePath(){
      return this.$route.query.child || this.$route.query.subMenu
    }
  },
  watch:{
    changePath(){
      this.getMarketStore({path: this.changePath})
      this.isShow = false
      setTimeout(()=>{
        this.isShow = true
        this.$store.commit('clearSearchForm')
      })
    }
  },
  methods: {
    ...mapActions({
      'getMarketStore':'getMarketStore'
    }),
    getCurrentPage(val){
      this.getMarketStore({path: this.changePath, currPageNo: val})
    },
  },
  created(){
    let data = this.$route.query.data && JSON.parse(this.$route.query.data)
    this.getMarketStore({path: this.changePath, search:{data}})
  }
}
</script>

<style scoped lang='scss' >

</style>
