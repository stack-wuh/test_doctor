<template>
  <section class="wrapper">
    <section v-if="type == '' || type == 'pagination' || !type " class="pagination">
      <el-pagination background :total="100" layout="total,prev,pager,next,jumper" ></el-pagination>
    </section>
    <section v-if="type == 'button'" class="btn-area">
      <el-button v-for="(item,index) in btnList" :key="index" :type="item.type" :size="item.size" @click="item.click" >{{item.text}}</el-button>
    </section>
  </section>
</template>

<script>
export default {
  name: 'myBottom',
  props:['type'],
  data () {
    return {
      btnList:[
        {
          text:'取消',
          type:'danger',
          size:'small',
          click:this.handleClickBackPrev,
        },
        {
          text:'确定',
          type:'success',
          size:'small',
          click:''
        }
      ]
    }
  },

  methods: {
    handleClickBackPrev(){
      this.$router.go(-2)
    }
  }
}
</script>

<style scoped lang='scss' >
.wrapper{
  height: 50px !important;
  .pagination{
    text-align: center;
  }
  .btn-area{
    padding: 15px 0;
    text-align: center;
  }
}
</style>
