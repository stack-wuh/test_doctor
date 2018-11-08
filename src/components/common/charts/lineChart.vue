<template>
  <section class="line-wrapper">
    <section id="line" class="lineChart" :class="'lineChart' + index"></section>
  </section>
</template>

<script>
const option = {
    title:{
      text:'这里是标题',
      top:'20',
      left:'20',
    },
    tooltip:{
      trigger: 'axis'
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        },
        right:40,
        top:20,
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value',
        minInterval: 1,
    },
    series: [{
        data: [],
        type: 'line',
        smooth: true,
        name: '直接访问'
    }]
};



export default {
  name: '',
  props:{
    index:{
      type:Number,
      default:1
    },
    xAxis:{
        type: Array,
        default: [],
    },
    series:{
        type: Array,
        default: []
    },
    title:{
        type: String,
        default: ''
    }
  },
  data () {
    return {
      option,
    }
  },

  computed:{
    path(){
      let _path = this.$route.query
      return _path.child || _path.subMenu
    },
    seriesName(){
      switch(this.path){
          case '客户资料完整度' : return '完整度'
          case '业务统计' : return '人次'
          default: return '标题'
      }
    },
    mapTitle(){
        if(this.title) return this.title
        switch(this.path){
            case '客户资料完整度' : return '客户资料完整度'
            default: return '标题'
        }
    }
  },

  watch:{
    xAxis(){
      this.init()
    }
  },

  methods: {
    /**
     * init echarts
     */
    init(){
      let myChart = echarts.init(document.getElementById('line'))
      this.option.xAxis.data = this.xAxis
      this.option.series[0].data = this.series
      this.option.series[0].name = this.seriesName
      this.option.title.text = this.mapTitle
      myChart.setOption(this.option)
    }
  },
  created(){
    setTimeout(()=> {
      this.init()
    })
  }
}
</script>

<style scoped lang='scss' >
.line-wrapper{
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
  margin-top:20px;
  background-color: #fff;
  .lineChart{
    position: absolute;
    top:0;
    right: 0;
    left: 0;
    bottom: 0;
  }
}
</style>
