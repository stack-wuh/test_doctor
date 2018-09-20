<template>
  <section class="wrapper"> 
    <nav class="nav">
      <span @click="handleChange(index)" v-for="(item,index) in list" :key="index" :class="{'active': index === current}">{{item.label}}</span>
    </nav>
    <coupon-comm :id="form.id" :userId="form.userId" v-if="current === 0" />
    <car-comm :id="form.id" v-if="current === 1" />
    <order-comm v-if="current == 3" />
    <check-comm v-if="current == 4" />
  </section>
</template>

<script>
import couponComm from '../subchild/coupon'
import carComm from '../subchild/car'
import orderComm from '../subchild/order'
import checkComm from '../subchild/check'
export default {
  name: 'carInfo',
  components:{
    couponComm,
    carComm,
    orderComm,
    checkComm
  },
  data () {
    return {
      list:[
        {
          label:'会员卡',
        },
        {
          label:'车辆查询',
        },
        {
          label:'VIN查询',
        },
        {
          label:'开单查询',
        },
        {
          label:'检测记录',
        }
      ],
      current:0,
      form:{},
    }
  },

  methods: {
    handleChange(index){
      this.current = index
    }
  },
  created(){
    let data = JSON.parse(this.$route.query.data)
    this.form = {
      id: data && data.id && data.id,
      userId: data && data.userId && data.userId
    }
  }
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/color.scss';
.wrapper{
  .flex{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  nav.nav{
    width: 100%;
    height:60px;
    line-height: 60px;
    background-color: $search-bg;
    & > span{
      display: inline-block;
      width: 10%;
      height: 60px;
      color: #999;
      text-align: center;
      &:hover{
        cursor: pointer;
        color: #000;
        background-color: #fff;
        transition: all .5s linear;
      }
      &.active{
        color: #000;
        background-color: #fff;
      }
    }
  }
  .nav-title{
    margin:15px;
    padding-top:15px;
    color: #999;
  }

}
</style>

