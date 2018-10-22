<template>
  <section class="line-wrapper">
    <section class="lineChart" :class="'lineChart' + index"></section>
  </section>
</template>

<script>
const option = {
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
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value',
        minInterval: 1,
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
    }]
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
      let els = document.querySelectorAll('.lineChart' + this.index)
      let chart = echarts.init(els[0])
      chart.setOption(this.option)      
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
