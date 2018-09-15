<template>
  <section class="wrapper">
    <section class="info" v-for="(item,index) in list" :key="index" >
      <p class="title">{{item.label}}</p>
      <p class="desc">{{item.value}}</p>
      <p class="desc">{{item.sub}}</p>
    </section>
  </section>
</template>

<script>
export default {
  name: 'concat',

  data () {
    return {
      list:[
        {
          label:'公司名称',
          value:'武汉把图科技有限公司'
        },
        {
          label:'预约热线(服务时间: 工作日全天候)',
          value:'手机号码: 1882739293'
        },
        {
          label:'电话及传真',
          value:'电话: 027-12311332',
          sub:'传真: 027-12311332'
        },
        {
          label:'公司地址及邮箱',
          value:'武汉市汉阳路18号',
          sub:'12312312@qq.com'
        }
      ]
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/color.scss';
.wrapper{
  .info{
    margin: 15px 0;
    padding:20px 15px 10px 15px;
    background-color: $search-bg;
    border-radius: 4px;
    box-shadow: 0 0 2px 2px #ccc;
    :nth-child(2){
      margin-top:20px;
    }
    .title{
      color: #999;
    }
    .desc{
      margin-bottom:10px;
      color: #333;
    }
  }
}
</style>
