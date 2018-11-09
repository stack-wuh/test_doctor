<template>
  <section class="store-wrapper">
    <header class="store-header">
      <span>{{$route.query.menu}}</span>
      <span v-if="$route.query.subMenu">>{{$route.query.subMenu}}</span>
      <span v-if="$route.query.child">>{{$route.query.child}}</span>
    </header>
    <section>
      <my-card v-if="canShowCards.includes(path)" :params="info" ></my-card>
      <my-search @inputChange="getInputChange" v-if="isShow" ></my-search>
      <bar-chart v-if="canShowTopMap.includes(path)" :xAxis="xAxis" :series="series"></bar-chart>
      <my-table v-if="isShow && showType === 3" :header="true" :list="list({path})" >
        <span slot="title">{{ $route.query.child || $route.query.subMenu}}列表</span>
          <div slot="right">
            <my-button></my-button>
          </div>
      </my-table>
      <my-bottom v-if="canShowBottom.includes(path)" @getCurrent="getCurrent" :total="total" :currPageNo="currPageNo" ></my-bottom>
      <bar-chart v-if="showType === 1" :xAxis="xAxis" :series="series" :title="title" ></bar-chart>
      <line-chart v-if="showType === 2" :xAxis="xAxis" :series="series" :title="title" ></line-chart>
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
const canShowBottom = ['配置项目提成', '配置员工提成']

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
        return state.search.dataType ? state.search.dataType : 3 
      },
      'xAxis': state => state.Statistic.xAxis,
      'series': state => state.Statistic.series,
      'title': state => state.Statistic.title,
      'info': state => state.Statistic.info
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
    },
    xAxis(){
      this.isShow = false
      this.isShow = true
    }
  },

  methods: {
    ...mapActions({
      'getStore': 'getStatisticStore'
    }),
    getInputChange(e){
      this.isShow = false
      this.isShow = true
      this.getStore({path: this.path})
    },
    getCurrent(e){
      this.getStore({currPageNo: e, path: this.path})
    }
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
