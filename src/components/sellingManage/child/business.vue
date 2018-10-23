<template>
  <section class="bus-wrapper">
    <my-search @inputChange="inputChange" ></my-search>
    <section v-for="(item, index) in tables" :key="index" class="bus-table">
      <p class="table__title">{{item.title}}{{item.tips}}</p>
      <section class="table-area">
        <el-table border stripe :data="item.tables">
          <div v-for="(list, lid) in item.list" :key="lid">
            <el-table-column align="center" :label="list.key" :prop="list.prop" ></el-table-column>
          </div>
        </el-table>
      </section>
    </section>
  </section>
</template>

<script>
const tables = [
  {
    title:'营业额',
    tips:'(营业额 = 商品销售 + 项目销售 + 套餐销售 - 整单优惠)',
    list:[
      {
        key:'类型',
        prop:'label',
      },
      {
        key:'金额',
        prop:'value',
      }
    ],
    tables:[]
  },
  {
    title:'应收金额',
    tips:'(应收金额 = 已结算金额 + 未结算金额)',
    list:[
      {
        key:'类型',
        prop:'label',
      },
      {
        key:'金额',
        prop:'value',
      }
    ],
    tables:[]
  },
  {
    title:'采购金额',
    tips:'(采购金额 = 已结算金额 + 未结算金额)',
    list:[
      {
        key:'类型',
        prop:'label',
      },
      {
        key:'金额',
        prop:'value',
      }
    ],
    tables:[]
  }
]
const temp_arr = [
  {
    label:'商品销售',
    value: 0
  },
  {
    label:'项目销售',
    value: 0
  },
  {
    label:'套餐销售',
    value: 0
  },
  {
    label:'整单优惠',
    value: 0
  },
  {
    label:'总成本',
    value: 0 
  },
  {
    label: '营业额',
    value: 0
  },
  {
    label:'已结算金额',
    value: 0
  },
  {
    label:'未结算金额',
    value: 0
  },
  {
    label:'应收金额',
    value: 0
  },
  {
    label:'已结算金额',
    value:0
  },
  {
    label:'未结算金额',
    value: 0
  },
  {
    label:'采购金额',
    value: 0
  }
]

import MySearch from '@/components/common/search'

import {mapActions} from 'vuex'

export default {
  name: '',
  components:{
    MySearch,
  },
  data () {
    return {
      tables,
      data:[],
      temp_arr,
    }
  },

  methods: {
    ...mapActions({
      'getList': 'getSellingStore'
    }),
    inputChange(e){
      this.fetchData({search: e})
    },
    fetchData({search = {}}){
      let temp_table = JSON.parse(JSON.stringify(this.tables))
      this.getList({path: '营业额统计表'}, search).then(res => {
        this.temp_arr.map((item, index) => {
          item.value = res.data[index] ? res.data[index] : 0
        })
        temp_table[0].tables = this.temp_arr.slice(0, 5)
        temp_table[1].tables = this.temp_arr.slice(6, 9)
        temp_table[2].tables = this.temp_arr.slice(9, 12)
        this.tables = temp_table
      })
    }
  },
  created(){
    this.fetchData({search : {}})
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/color.scss';
.bus-wrapper{
  .bus-table{
    padding-bottom: 20px;
    margin-bottom: 20px;
    margin-top: 15px;
    background-color: #fff;
    p.table__title{
      height: 40px;
      padding-left: 15px;
      background-color: $tb-tl-bg;
      color: $tb-tl-cl;
      line-height: 40px;
    }
    .table-area{
      margin:0 15px;
      margin-top:15px;
    }
  }
}
</style>
