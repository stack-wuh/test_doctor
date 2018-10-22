<template>
  <section class="bar-wrapper">
    <section class="barChart" :class="'barChart' + index"></section>
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
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330, 220]
        }
    ],
    
};


export default {
  name: '',
  props:{
    index:{
      type:Number,
      default:1
    }
  },
  data () {
    return {
      option,
    }
  },

  methods: {},
  created(){
    this.$nextTick(()=> {
      let els = document.querySelectorAll('.barChart' + this.index)
      let chart = echarts.init(els[0])
      chart.setOption(this.option)      
    })
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
