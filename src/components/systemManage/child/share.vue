<template>
  <section class="wrapper">
    <my-table header="true" :list="list">
      <span slot="title">用户分享</span>
      <div slot="right">
        <my-button></my-button>
      </div>
    </my-table>
    
    <section class="flex flex-justify-between nav-btn">
      <p>用户消费</p>
      <el-button>保存</el-button>
    </section>
    <el-table :data="data" stripe border>
      <el-table-column align="center" label="会员等级"></el-table-column>
      <el-table-column align="center" label="提成系数"></el-table-column>
    </el-table>
    <small class="c999">注：用户提成即为用户消费金额乘以相应提成系数</small>
  </section>
</template>

<script>
import MyTable from '@/components/common/myTable'
import MyButton from '@/components/common/myButton'
import {mapGetters, mapState, mapActions} from 'vuex'
export default {
  name: 'share',
  components:{
    MyTable,
    MyButton,
  },
    computed:{
    ...mapState({
      'total': state => state.Market.total,
      'currPageNo': state => state.Market.currPageNo,
      'list': state => state.System.temp_list
    }),
    changePath(){
      return this.$route.query.child || this.$route.query.subMenu
    }
  },
  data () {
    return {
      // list:[],
      data:[]
    }
  },

  methods: {
    ...mapActions({
      'getShareList': 'getShareList',
      'getSalesRuleList':'getSalesRuleList'
    })
  },
  created(){
    this.getShareList()
    this.getSalesRuleList().then(res => {
      this.data = res.data
    })
  }
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/color.scss';
.wrapper{
  .nav-btn{
    height: 50px;
    padding: 20px;
    color: #999;
    background-color: $tb-tl-bg;
  }
}
</style>
