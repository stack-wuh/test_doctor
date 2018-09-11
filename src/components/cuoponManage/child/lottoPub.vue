<template>
  <section class="wrapper">
    <section class="content">
      <Search />
      <my-table header="true" :list="data" >
        <span slot="title">{{$route.query.child}}</span>
        <div slot="right">
          <my-button />
        </div>
      </my-table>
      <dialog-with-table @getData="getData" @getKeyWord="getKeyWord" :isShowDialog="isShowDialog" :list="subList" />
    </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import MyTable from '@/components/common/myTable'  
import MyButton from '@/components/common/myButton'
import DialogWithTable from '../subchild/dialogTable'
import {mapActions, mapGetters, mapState} from 'vuex'
export default {
  name: 'lottoPub',
  components:{
    Search ,
    MyTable , 
    MyButton ,
    DialogWithTable,
  },
  data () {
    return {
      data:[]
    }
  },
  computed:{
    ...mapState({
      'isShowDialog': state => state.Coupon.tempObj.isShowDialog,
      'subList': state => state.Coupon.tempObj.list 
    }),
    ...mapGetters({
      'list': 'formatCouponStore',
      'newSubList': 'formatCouponModel'
    }),
    changePath(){
      return this.$route.query.child || this.$route.query.subMenu
    }
  },
  methods: {
    ...mapActions({
      'getList':'getCouponStore'
    }),
    getKeyWord(){
      console.log('is ok')
    },
    getData(val){
      this.data = val.data 
    }
  },
  created(){
    this.getList({path: this.$route.query.child || this.$route.query.subMenu})
  }
}
</script>

<style scoped lang='scss' >

</style>
