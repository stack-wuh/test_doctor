<template>
  <section class="bar-wrapper">
    <section :class="'barChart' + index"></section>
  </section>
</template>

<script>
const option = {
  xAxis:{
    type:'category',
    data:['1','2','3','4','5','6','7']
  },
  yAxis:{
    type:'value'
  },
  series:[{
    data:[100,100,100,11,22],
    type:'line',
    smooth: true
  }]
}

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
    }
  },

  methods: {},
  created(){
    this.$nextTick(()=> {
      let chart = echarts.init(document.querySelector('barChart' + this.index))
      chart.setOption(option)
    })
  }
}
</script>

<style scoped lang='scss' >

</style>
