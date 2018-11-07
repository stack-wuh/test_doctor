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
      <bar-chart v-if="canShowTopMap.includes(path)" :xAxis="xAxis" :series="series"></bar-chart>
      <my-table v-if="isShow && showType === 3" :header="true" :list="list({path})" >
        <span slot="title">{{ $route.query.child || $route.query.subMenu}}列表</span>
          <div slot="right">
            <my-button></my-button>
          </div>
      </my-table>
      <my-bottom v-if="canShowBottom.includes(path)" :total="total" :currPageNo="currPageNo" ></my-bottom>
      <bar-chart v-if="showType === 1" ></bar-chart>
      <line-chart v-if="showType === 2" ></line-chart>
    </section>
  </section>
</template>

<script>
import MyCard from '../child/cards';
import MySearch from '@/components/common/search'
import MyTable from '@/components/common/myTable'
import MyButton from '@/components/common/myButton'
import MyBottom from '@/components/common/bottom'

import BarChart from '@/components/common/charts/barChart'
import LineChart from '@/components/common/charts/lineChart'


import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'

const canShowCards = ['用户统计', '车辆统计', '会员统计']
const canShowTopMap = ['客户资料完整度']
const canShowBottom = ['提成日报']

export default {
  name: 'store',
  components:{
    MyCard,
    MySearch,
    MyTable,
    MyButton,
    MyBottom,
    BarChart,
    LineChart,
  },
  data () {
    return {
      canShowCards,
      canShowTopMap,
      canShowBottom,
      isShow:true
    }
  },

  computed:{
    ...mapState({
      'total': state => state.Statistic.total,
      'currPageNo': state => state.Statistic.currPageNo,
      'showType': state => {
        return state.search.showType ? state.search.showType : 3 
      },
      'xAxis': state => state.Statistic.xAxis,
      'series': state => state.Statistic.series
    }),
    path(){
      return this.$route.query.child || this.$route.query.subMenu
    },
    ...mapGetters({
      'list': 'formatStatistic'
    })
  },

  watch:{
    path(){
      this.isShow = false
      this.$store.commit('clearSearchForm')
      setTimeout(()=> {
        this.isShow = true
        this.getStore({path: this.path})
      })
    }
  },

  methods: {
    ...mapActions({
      'getStore': 'getStatisticStore'
    })
  },
  created(){
    this.getStore({path: this.path})
  }
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
