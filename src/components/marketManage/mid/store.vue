<template>
  <section class="father">
      <section class="content">
        <Search @inputChange="getMarketStore({path: changePath, id: temp_data.id || ''})" :name="changePath" />
        <my-table v-if="isShow" header="true" :list="formMarketStore({path: changePath})">
          <span slot="title">{{ $route.query.child || $route.query.subMenu}}列表</span>
          <div slot="right">
            <my-button></my-button>
          </div>
        </my-table>
        <my-bottom @getCurrent="getCurrentPage" :total="total" :currentPage="currPageNo" />
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
      isShow:true,
      temp_data: {}
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
    },
    query(){
      let data = this.$route.query.data
      data = data && JSON.parse(data)
      return data
    }
  },
  watch:{
    changePath(){
      let data = this.$route.query.data && JSON.parse(this.$route.query.data)
      this.$store.commit('clearSearchForm')
      this.isShow = false
      setTimeout(()=>{
        this.isShow = true
        this.getMarketStore({path: this.changePath, id: data && data.id})
      })
    }
  },
  methods: {
    ...mapActions({
      'getMarketStore':'getMarketStore'
    }),
    getCurrentPage(val){
      this.getMarketStore({path: this.changePath, currPageNo: val, id: data.id})
    },
  },
  created(){
    let data = this.$route.query.data && JSON.parse(this.$route.query.data)
    data && (this.temp_data = data)
    this.getMarketStore({path: this.changePath, id: data && data.id})
  }
}
</script>

<style scoped lang='scss' >

</style>
