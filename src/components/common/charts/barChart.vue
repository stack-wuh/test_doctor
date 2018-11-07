<template>
  <section class="bar-wrapper">
    <section id="bar" class="barChart" :class="'barChart' + index"></section>
  </section>
</template>

<script>
const option = {
    color: ['#3398DB'],
    title:{
      text:'图标标题',
      top:'20',
      left:'20',
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        },
        right:40,
        top:20,
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
            width: '20%'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : [],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            minInterval: 1
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '20%',
            data:[]
        }
    ],
    
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
 
  computed: {
      path(){
        let _path = this.$route.query
        return _path.child || _path.subMenu
      },
      seriesName(){
        switch(this.path){
            case '客户资料完整度' : return '完整度'
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
  methods: {
    init(){
        let myChart = echarts.init(document.getElementById('bar'))
        this.option.xAxis[0].data = this.xAxis
        this.option.series[0].data = this.series
        this.option.series[0].name = this.seriesName
        this.option.title.text = this.mapTitle
        myChart.setOption(this.option)
    }
  },
  created(){
      setTimeout(() => {
          this.init()
      }, 1000)
  }
}
</script>

<style scoped lang='scss' >
.bar-wrapper{
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
  margin-top:20px;
  background-color: #fff;
  .barChart{
    position: absolute;
    top:0;
    right: 0;
    left: 0;
    bottom: 0;
  }
}
</style>
