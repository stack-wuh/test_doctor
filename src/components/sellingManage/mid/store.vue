<template>
  <section class="father">
      <section class="content">
        <Search />
        <my-table v-if="isShow" :list="list({path: changePath})" header="true" :params="changePath" >
          <span slot="title">{{changePath}}列表</span>
          <div slot="right">
            <my-button></my-button>
          </div>
        </my-table>
      </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import MyTable from '@/components/common/myTable'
import MyButton from '@/components/common/myButton'

import {mapActions, mapState, mapMutations, mapGetters} from 'vuex'

export default {
  name: 'list',
  components:{
    Search ,
    MyTable ,
    MyButton ,
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
    }
  },
  watch:{
    changePath(){
      this.isShow = false
      this.$store.commit('clearSearchForm')
      setTimeout(()=>{
        this.isShow = true
        this.getSellingStore({path: this.changePath})
      })
    }
  },
  methods: {
    ...mapActions({
      'getSellingStore': 'getSellingStore'
    })
  },
  created(){
    this.getSellingStore({path: this.changePath})
  }
}
</script>

<style scoped lang='scss' >

</style>
