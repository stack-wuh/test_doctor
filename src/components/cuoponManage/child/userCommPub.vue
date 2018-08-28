<template>
  <section class="wrapper">
      <section class="content">
        <Search />
        <section class="info">
          <my-table :list="[{}]" header="true">
            <span slot="title">佣金信息</span>
          </my-table>
        </section>
        <!-- <section class="info">
          <p class="nav-title c999">佣金提现</p>
          <el-form class="my-form" label-width="90px">
              <el-form-item  label="提现金额" >
                  <el-input class="my-input-320"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input class="my-input-320"></el-input>
              </el-form-item>
          </el-form>
        </section> -->
        <!-- <my-bottom type="button" /> -->
      </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import MyBottom from '@/components/common/bottom'
import MyTable from '@/components/common/myTable'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'memberPay',
  components:{
    Search ,
    MyBottom ,
    MyTable ,
  },
  data () {
    return {
      inputDis:true,
    }
  },

  methods: {
    ...mapActions({
      'getList':'getCouponStore'
    })
  },
  created(){
    this.getList({path: this.$route.query.child || this.$route.query.subMenu})
  }
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/color.scss';
.wrapper{
  .content{
    height: 100%;
    background-color: #fff;
    .info{
      p.nav-title{
        height: 50px;
        padding-left: 15px;
        background-color: $search-bg;
        color: $search-cl;
        font-size: 15px;
        line-height: 50px;
      }
      .my-form{
        margin-top:15px;
        .inline-box{
          display: flex;
          .el-form-item{
            width:24%;
          }
        }
        .inline-other{
          justify-content: flex-start;
          .box-item{
            flex:.2;
            .el-input ,
            .el-select{
              width:60%;
            }
          }
        }
      }
    }
  }
}
</style>
