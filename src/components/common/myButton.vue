<template>
  <section class="wrapper">
    <section class="content">
      <div class="btn-list" v-for="(item,index) in getBtnList" :key="index">
        <el-button v-if="item.type == '' || item.type =='button'" v-on:click="item.click({params , choose, text: item.text})" >{{item.text}}</el-button>
        <el-select @change="item.change({params, choose, text: item.text, key: item.key, value: form[item.key]})" v-if="item.type == 'select'" :placeholder="item.text" :size="item.size" :style="item.style" v-model="form[item.key]">
          <el-option v-for="(sub,sid) in item.list" :key="sid" :label="sub.label" :value="sub.value" ></el-option>
        </el-select>
      </div>
    </section>
  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'myButton',
  props:['name'],
  data () {
    return {
      params:{menu:this.$route.query.menu,subMenu:this.$route.query.subMenu,child:this.$route.query.child}
    }
  },
  
  computed:{
    ...mapState({
      'choose':'choose',
      'form': 'tableHeader'
    }),
    getBtnList(){
      return this.$store.getters.getBtnLists({name:this.name || this.$route.query.child || this.$route.query.subMenu})
    },
  },
  methods: {

  },
  created(){
 
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/color.scss';
@import '../../assets/style/mixin.scss';
.wrapper{
  background-color: $tb-tl-bg;
  .content{
    @include flex-box(row,nowrap);
    .btn-list{
      margin-left: 15px;
    }
  }
}
</style>
