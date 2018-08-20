<template>
  <section class="wrapper">
    {{RootPath}} -- {{RootName}}
    <header v-show="header" class="header">
      <div>
        <slot name="title"></slot>
      </div>
      <slot name="right"></slot>
    </header>
    <el-table :data="list" border  stripe>
      <el-table-column v-if="tableList && tableList.colType == 'select'" :fixed="tableList.fix || ''" :type="tableList.colValue || 'selection'" align="center" width="60px"></el-table-column>
      <el-table-column v-if="tableList && tableList.colType == 'index'" :type="tableList.colValue || 'index'" :label="tableList.colTitle" align="center" width="60px"></el-table-column>
      <el-table-column v-if="item.type === 'default'" align="center" v-for="(item,index) in tableList.list" :key="index" :label="item.key" :prop="item.prop" :width="item.width || '' " ></el-table-column>
      <el-table-column v-if="item.type === 'switch'" align="center" v-for="(item,index) in tableList.list" :key="index" :label="item.key" :prop="item.prop" :width="item.width || ''">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state" active-text="正常" inactive-text="禁用" inactive-color="#999999" :active-value="1" :inactive-value="0" ></el-switch>
        </template>
      </el-table-column>
      <el-table-column v-if="item.type === 'button'" :fixed="item.fix" :width="item.width" align="center" v-for="(item,index) in tableList.list" :key="index" :label="item.key">
        <template slot-scope="scope">
          <el-button v-for="(btn,bid) in item.list" v-on:click="btn.click(routers,btn.text,scope.row)" :type="btn.type || 'text'" :size="btn.size || 'mini'" :key="bid">{{btn.text}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  props:['list','params','header'],
  name: 'table1',

  data () {
    return {
      routers:{
       menu:this.$route.query.menu, 
       subMenu:this.$route.query.subMenu, 
       child:this.$route.query.child, 
      }
    }
  },
  computed:{
    RootPath(){
      return this.$route.path
    },
    RootName(){
      return this.$route.name
    },
    tableList(){
      return this.$store.getters.getTableListByparams({path:this.params || this.$route.query.child || this.$route.query.subMenu || this.$route.path })
    }
  },
  methods: {},
  created(){
    // console.log(this.params)
    // console.log(this.tableList , 'this is table')
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/mixin.scss';
@import '../../assets/style/color.scss';
.wrapper{
  width: 100%;
  margin:20px 0;
  background-color: #fff;
  box-sizing: border-box;
  header.header{
    @include flex-box(row,nowrap,space-between,center) ;
    height: 50px;
    padding:10px 20px;
    font-size: 15px;
    background-color: $tb-tl-bg;
    color: $tb-tl-cl;
    box-sizing: border-box;
  }
}

</style>
