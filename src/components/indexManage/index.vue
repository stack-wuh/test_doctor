<template>
  <section class="father">
    <header class="header">
      <div>当前时间: {{new Date().toLocaleDateString()}} {{timer}} {{getDay}}</div>
      <div>
        <p>系统到期时间:2030-09-28</p>
        <p>系统版本:v1.1</p>
      </div>
    </header>
    <section class="content">
      <div @click="jump2Other(item)" class="card" v-for="(item,index) in list" :key="index">
        <span class="title">{{item.title}}</span>
        <span class="tips">{{item.value}}</span>
      </div>
    </section>
    <section id="echarts" class="echarts"></section>
  </section>
</template>

<script>
const option = {
  color: ["#3398DB"],
  title:{
    text:'用户统计(单位: 人)',
    fontWeight:'normal',
    fontSize:'13'
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
            data : ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            minInterval:1
        }
    ],
    series : [
        {
            name:'新增用户',
            type:'bar',
            barWidth: '50%',
            data:[]
        },
       
    ]
};
import {mapActions} from 'vuex'
export default {
  name: "index",
  data() {
    return {
      list: [
        {
          title: "已有会员(人)",
          value: "1111",
          path: '/member/list',
          query: {
            menu: '会员管理',
            subMenu: '会员列表'
          }
        },
        {
          title: "昨日新增(人)",
          value: "80",
          path: '/member/list',
          query: {
            menu: '会员管理',
            subMenu: '昨日新增会员'
          }
        },
        {
          title: "本月累计(人)",
          value: "30",
          path: '/member/list',
          query: {
            menu: '会员管理',
            subMenu: '本月会员累计'
          }
        },
        {
          title: "总注册车辆(辆)",
          value: 20,
          path: '/member/list',
          query: {
            menu: '会员管理',
            subMenu: '车辆管理'
          }
        },
        {
          title: "保养到期(辆)",
          value: 20,
          path: '/member/list',
          query: {
            menu: '会员管理',
            subMenu: '车辆管理',
          }
        },
        {
          title: "保险到期(辆)",
          value: 20,
          path: '/member/list',
          query: {
            menu: '会员管理',
            subMenu: '车辆管理'
          }
        }
      ],
      option,
      timer:new Date().toLocaleTimeString(),
    };
  },

  computed:{
    getDay(){
      let date = new Date()
      switch(date.getDay()){
        case 0 : return '星期天'
        case 1 : return '星期一'
        case 2 : return '星期二'
        case 3 : return '星期三'
        case 4 : return '星期四'
        case 5 : return '星期五'
        case 6 : return '星期六'
        default : return '星期一'
      }
    }
  },
  methods: {
    ...mapActions({
      'getLimits': 'getLimitStore'
    }),
    /**
     * cdn引入echarts
     * 初始化echarts
     * 设置参数option
     */
    chartsInit() {
      let myChart = echarts.init(document.getElementById("echarts"));
      myChart.setOption(option);
    },

    jump2Other(item){
      console.log(item)
      this.$router.push({path: item.path, query: item.query})
    },
    /**
     * 首页时钟
     * 周期性定时器 
     */
    clock(){
      setInterval(()=>{
        this.timer = new Date().toLocaleTimeString()
      },1000)
    },
    /**
     * 
     */
  },
  created() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.chartsInit()
      }, 1000)
    });
    this.clock()
    // this.getLimits()
  }
};
</script>

<style scoped lang='scss' >
@import '../../assets/style/mixin.scss';
@import '../../assets/style/color.scss';
.father {
  @include flex-box(column, nowrap, flex-start, flex-start);
  width: 100%;
  height: 100%;
  header.header {
    @include flex-box(row, nowrap, space-between);
    width: 100%;
    height: 100px;
    padding: 0 20px;
    background-color: #fff;
    box-shadow: 0 -2px 5px inset $base-bg;
    div {
      p {
        display: inline;
        margin-left: 15px;
      }
    }
  }
  .content {
    @include flex-box(row, nowrap, space-between);
    width: 100%;
    margin-top: 20px;
    padding: 30px;
    div {
      @include flex-box(column, wrap, center, center);
      width: 15%;
      height: 105px;
      box-shadow: 0 0 4px 2px lightgray;
      border-radius: 4px;
      background-color: #fff;
      .title {
        order: 2;
        color: #999;
      }
      .tips {
        order: 1;
        margin-bottom: 10px;
        font-size: 20px;
        color: #3d93f9;
      }
      &:hover {
        cursor: pointer;
        transform: scale3d(1.1, 1.1, 1.1);
        transition: all 0.5s linear;
      }
    }
  }
  .echarts {
    width: 100%;
    height: inherit;
    min-height:400px;
    max-height:600px;
    padding:30px;
  }
}
</style>
