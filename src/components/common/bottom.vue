<template>
  <section class="wrapper">
    <section v-if="type == '' || type == 'pagination' || !type " class="pagination">
      <el-pagination background :total="total || 0" :current-page="currentPage || 1" layout="total,prev,pager,next,jumper" ></el-pagination>
    </section>
    <section v-if="type == 'button'" class="btn-area">
      <el-button ref="botton" v-for="(item,index) in btnList" :key="index" :type="item.type" :size="item.size" @click="item.click" >{{item.text}}</el-button>
    </section>
  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'myBottom',
  props:['type' , 'total' , 'currentPage'],
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
          click:this.handleSubmit,
        }
      ]
    }
  },
  computed:{
    ...mapState({
      form: state => state.form
    })
  },
  methods: {
    handleClickBackPrev(){
      this.$router.go(-2)
    },
    handleSubmit(){
      this.$store.dispatch('pubStoreList')
    },
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
