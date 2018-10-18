<template>
  <section class="store-wrapper">
    <header class="store-header">
      <span>{{$route.query.menu}}</span>
      <span v-if="$route.query.subMenu">>{{$route.query.subMenu}}</span>
      <span v-if="$route.query.child">>{{$route.query.child}}</span>
    </header>
    <section>
      <my-card v-if="canShowCards.includes(path)"></my-card>
      <my-search v-if="isShow" ></my-search>
      <my-table v-if="isShow" :header="true" :list="[{}]" >
        <span slot="title">{{ $route.query.child || $route.query.subMenu}}列表</span>
          <div slot="right">
            <my-button></my-button>
          </div>
      </my-table>
    </section>
  </section>
</template>

<script>
import MyCard from '../child/cards';
import MySearch from '@/components/common/search'
import MyTable from '@/components/common/myTable'
import MyButton from '@/components/common/myButton'

import {mapActions, mapState, mapGetters} from 'vuex'

const canShowCards = ['用户统计', '车辆统计', '会员统计']

export default {
  name: 'store',
  components:{
    MyCard,
    MySearch,
    MyTable,
    MyButton,
  },
  data () {
    return {
      canShowCards,
      isShow:true
    }
  },

  computed:{
    path(){
      return this.$route.query.child || this.$route.query.subMenu
    },
    ...mapGetters({
      'list': 'formatCouponStore'
    })
  },

  watch:{
    path(){
      this.isShow = false
      this.$store.commit('clearSearchForm')
      this.isShow = true
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >
.store-wrapper{
  header.store-header{
    height: 30px;
    color: #999;
    line-height: 30px;
  }
}
</style>
