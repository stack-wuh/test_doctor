<template>
  <section class="card-wrapper">
    <section  class="card-list">
      <section v-for="(item, index) in getList" :key="index" class="card-item" :style="item.style" >
        <section class="card-left">
          <div class="card-left__box">
            <img class="card-left__img" :src="item.img" alt="logo">
          </div>
        </section>
        <section class="card-right">
          <p class="card-right__tips">{{item.label}}</p>
          <p class="card-right__tips" v-if="item.child" v-for="(ch, cd) in item.child" :key="cd" >
            <span>{{ch.label}}:</span>
            <span>{{params[ch.field] || ch.value}}{{ch.tips}}</span>
          </p>
          <p class="card-right__tips" v-if="!item.child">{{params[item.field] || item.total}}{{item.tips}}</p>
        </section>
      </section>
    </section>
  </section>
</template>

<script>

const colors = ['#6959CD','#87CEFF','#AB82FF','#CD950C', '#6CA6CD', '#3CB371']
const cards = [
  {
    name:'用户统计',
    params:['/statistic/user', '用户统计'],
    list:[
      {
        img:require('@/assets/img/icon-st-1.png'),
        label:'车主总数',
        total:0,
        tips:'(人)',
        style:'background-color:#CD950C;',
        field: 'userTotal'
      },
      {
        img:require('@/assets/img/icon-st-1.png'),
        label:'车主新增',
        child:[
          {
            label:'昨日',
            value:0,
            field:'userNew',
            tips:"(人)",
          },
          {
            label:'月累计',
            value:0,
            field:'userNewTotal',
            tips:"(人)",
          }
        ],
        style:'background-color:#6959CD;',
      },
      {
        img:require('@/assets/img/icon-st-1.png'),
        label:'车主流失',
        child:[
          {
            label:'昨日',
            value:0,
            field:'userLose',
            tips:"(人)",
          },
          {
            label:'月累计',
            value:0,
            field:'userLoseTotal',
            tips:"(人)",
          }
        ],
        style:'background-color:#9BCD9B;',
      },
    ]
  },
  {
    name:'车辆统计',
    params:['/statistic/user', '车辆统计'],
    list:[
      {
        img:require('@/assets/img/icon-st-2.png'),
        label:'总车辆',
        total:100,
        tips:'(台)',
        field: '',
        style:'background-color:#AB82FF;',
      },
      {
        img:require('@/assets/img/icon-st-2.png'),
        label:'保养到期',
        total:20,
        tips:'(台)',
        field: '',
        style:'background-color:#3CB371;',
      },
      {
        img:require('@/assets/img/icon-st-2.png'),
        label:'保险到期',
        total:10,
        tips:'(台)',
        field: '',
        style:'background-color:#6CA6CD;',
      },
    ]
  },
  {
    name:'会员统计',
    params:['/statistic/user', '会员统计'],
    list:[
      {
        img:require('@/assets/img/icon-st-3.png'),
        label:'剩余总额',
        total:0,
        tips:'(元)',
        field: 'sumMoney',
        style:'background-color:#87CEFF;',
      },
      {
        img:require('@/assets/img/icon-st-3.png'),
        label:'剩余积分',
        total:0,
        tips:'(个)',
        style:'background-color:#CD950C;',
        field: 'sumIntegral'
      },
    ]
  },
]
export default {
  name: '',
  props:{
    params:{
      type:[Array, Object],
      default:'',
    }
  },
  data () {
    return {
      cards,
      colors,
    }
  },
  computed:{
    getPath(){
      return this.$route.query.child || this.$route.query.subMenu
    },
    getList(){
      return this.cards.find(item => item.params.includes(this.getPath)) &&
                   this.cards.find(item => item.params.includes(this.getPath)).list
    }
  },

  methods: {},
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/mixin.scss';
.card-wrapper{
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
  padding:10px;
  background-color: #fff;
  .card-list{
    @include flex-box(row, wrap, flex-start, center);
    width:100%;
    height: 100%;
    .card-item{
      @include flex-box(row, nowrap, center, center);
      width: 30%;
      height: 100px;
      margin-right: 15px;
      border-radius: 4px;
      .card-left{
        width: 50px;
        height: 50px;
        margin-left: -20px;
        margin-right: 15px;
        overflow: hidden;
        .card-left__img{
          width: 100%;
          height: 100%;
        }
      }
      .card-right{
        @include flex-box(column, wrap, center, center);
        font-size: 14px;
        color: #fff;
        .card-right__tips{
          margin-bottom: 5px;
        }
      }
      &:hover{
        cursor: pointer;
        margin-left:20px;
        transition: all .5s linear;
      }
    }
  }
}
</style>
