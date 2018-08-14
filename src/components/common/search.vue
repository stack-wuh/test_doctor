<template>
  <section class="search">
    <section class="content" v-if="SearchList.length">
      <section class="list-top">
        <span class="nav-title">条件查询</span>
        <section class="search-btn-list">
          <div class="btn-item" v-for="(item,index) in getBtnList" :key="index">
            <el-button :size="item.size || 'mini'" :type="item.type || ''" >{{item.text}}</el-button>
          </div>
        </section>
      </section>
      <section class="list-box">
        <section class="list-item" v-for="(item,index) in SearchList">
          <el-input clearable class="item" v-if="item.type == 'input' || item.type == 'default'" :placeholder="item.key" v-model="item.value"></el-input>
          <el-select clearable class="item" v-if="item.type == 'select'" :placeholder="item.key" v-model="item.value">
            <el-option label="aaa" value="bbb"></el-option>
          </el-select>
          <el-date-picker  class="item" v-if="item.type == 'date'" :placeholder="item.key" :type="item.type" v-model="item.value"></el-date-picker>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import mapGetters from 'vuex'
export default {
  name: 'search',
  props:['name'],
  data () {
    return {
    }
  },
  computed:{
    btnList(){
      return this.$store.getters.getSearchBtnListByParams({name:this.name}) || []
    },
    SearchList(){
      return this.$store.getters.getSearchListByPrams({name:this.name || this.$route.query.child || this.$route.query.subMenu}) || []
    },
    getBtnList(){
      return this.$store.getters.getSearchBtnsByParams({name:this.name || this.$route.query.child || this.$route.query.subMenu}) || []
    }
  },
  methods: {

  },
  created(){
    console.log(this.SearchList,'this is searchlist')
    console.log(this.getBtnList,'this is getsearc')
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/mixin.scss';
@import '../../assets/style/color.scss';
.search{
  width:100%;
  background-color: #fff;
  box-sizing: border-box;
  .content{
    @include flex-box(column,wrap,flex-start,flex-start);
    .list-top{
      @include flex-box(row,nowrap,space-between,center);
      width: 100%;
      height: 50px;
      padding-left: 15px;
      line-height: 50px;
      color: $search-cl;
      background-color: $search-bg;
      .nav-title{
        font-size: 15px;
      }
      .search-btn-list{
        @include flex-box(row,nowrap);
        .btn-item{
          margin-right: 15px;
        }
      }
    }
    .list-box{
      @include flex-box(row,wrap,flex-start,flex-start);
      width: 100%;
      // min-height: 80px;
      padding: 15px;
      padding-bottom: 0;
      background-color: #fff;
      box-sizing: border-box;
      .list-item , .item{
        width: 220px;
        margin-right: 15px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
