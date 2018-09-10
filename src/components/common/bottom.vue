<template>
  <section class="wrapper">
    <section v-if="type == '' || type == 'pagination' || !type " class="pagination">
      <el-pagination @current-change="getCurrentPage" background :total="total || 0" :current-page="currentPage || 1"  layout="total,prev,pager,next,jumper" ></el-pagination>
    </section> 
    <section v-if="type == 'button'" class="btn-area">
      <el-button ref="botton" v-for="(item,index) in btnList" :key="index" :type="item.type" :size="item.size" @click="item.click" >{{item.text}}</el-button>
    </section>
  </section>
</template>

<script>
import {mapState , mapActions} from 'vuex'
export default {
  name: 'myBottom',
  props:['type' , 'total' , 'currentPage' , 'formData' ],
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
    }),
    Path(){
      return this.$route.query.child || this.$route.query.subMenu
    }
  },
  methods: {
    ...mapActions({
      'handleSubmitStore' : 'pubStoreList' , 
      'handleSubmitCoupon' : 'couponPubAndPut' , 
      'handleSubmitRelply' : 'replyPubAndPut' ,
      'handleClearForm' : 'clearForm',
      'handleSubmitPush' : 'pushPubAndPut',
      'handleSubmitCoupon' : 'couponPraisePubAndPut'
    }),
    handleClickBackPrev(){
      this.$router.go(-2)
      setTimeout(()=>{
        this.handleClearForm()
      },1000)
    },
    handleSubmit(){
      switch(this.Path){
        case '发布新店' : this.handleSubmitStore()
          break;
        case '会员卡积分规则' : this.handleSubmitCoupon({form: this.formData})
          break;
        case '自动回复配置' : this.handleSubmitRelply({form: this.formData , path: this.Path})
          break;
        case '关注后消息推送' : this.handleSubmitPush({form: this.formData, path: this.Path})
          break;
        case '编辑奖品卡券' : this.handleSubmitCoupon({form: this.formData, path: this.Path})
          break;
      }
    },
    getCurrentPage($event){
     this.$emit('getCurrent', $event)
    }
  }
}
</script>

<style scoped lang='scss' >
.wrapper{
  height: 50px !important;
  margin:15px 0;
  .pagination{
    text-align: center;
  }
  .btn-area{
    padding: 15px 0;
    text-align: center;
  }
}
</style>
