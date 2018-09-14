<template>
  <section class="wrapper">
    <section class="content">
      <section class="header-form">
        <el-form ref="myForm" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="名称" prop="name">
            <el-input class="my-input-220" placeholder="请编辑抽奖模板" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="decription">
            <el-input class="my-input-220" placeholder="请编辑模板简介" v-model="form.decription"></el-input>
          </el-form-item>
        </el-form>
      </section>
      <my-table header="true" :list="data" >
        <span slot="title">{{$route.query.child}}</span>
        <div slot="right">
          <my-button />
        </div>
      </my-table>
      <SubButton @handleCancel="cancel" @handleSubmit="submit" />
      <dialog-with-table @getData="getData" @getKeyWord="getKeyWord" :isShowDialog="isShowDialog" :list="subList" />
    </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import MyTable from '@/components/common/myTable'  
import MyButton from '@/components/common/myButton'
import SubButton from '@/components/common/subButton'
import DialogWithTable from '../subchild/dialogTable'
import {mapActions, mapGetters, mapState} from 'vuex'

const rules = {
  name: [{required: true, message:'请编辑模板名称', trigger:'blur'}],
  decription: [{required: true, message:'请编辑模板名称', trigger:'blur'}]
}
export default {
  name: 'lottoPub',
  components:{
    Search ,
    MyTable , 
    MyButton ,
    DialogWithTable,
    SubButton,
  },
  data () {
    return {
      data:[],
      form:{
        name:'',
        decription:'',
      },
      rules,
    }
  },
  computed:{
    ...mapState({
      'isShowDialog': state => state.Coupon.tempObj.isShowDialog,
      'subList': state => state.Coupon.tempObj.list ,
      'tempForm': state => state.Coupon.tempForm
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
      'handleSubmit': 'couponPariseTake',
      'getModelList': 'getCouponModel',
      'getCouponStore': 'getCouponStore'
    }),
    getKeyWord(){
      console.log('is ok')
    },
    getData(val){
      this.data = val.data.map((item,index) => {
        let list = ['一','二','三','四','五','六','七','八','九','十']
        return {...item, rank: list[index] + '等奖', rate: 0, quantity: 0}
      }) 
    },
    cancel(){
      setTimeout(() => {
        this.$router.go(-2)
      }, 1000);
    },
    submit(){
      let data = this.data.map(item => {
        return {
          rank: item.rank,
          couponName: item.couponName,
          number: item.number,
          quantity: item.quantity,
          rate: item.rate
        }
      })
      let form = {...this.form, data: JSON.stringify(data)}
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.handleSubmit({form}).then(res => {
              this.cancel()
          })
        }else{
          _g.toastMsg({
            type:'error',
            msg: '请编辑必填项目后提交'
          })
        }
      })
    },
  },
  created(){
    this.getCouponStore({path: this.changePath})
    let data =  this.$route.query.data && JSON.parse(this.$route.query.data)
    data && this.getModelList({id: data.id})
      .then(res => {
        this.form = {...this.form, ...res.data.template}
        this.data = res.data.pageInfo.list
      })
    window.$bus.$on('handleDelItemForModel', (e) => {
      this.data && this.data.splice(e,1)
    })
  },
  destroyed(){
    window.$bus.$off('handleDelItemForModel')
  }
}
</script>

<style scoped lang='scss' >
.wrapper{
  .header-form{
    padding:20px 0 10px 0;
    background-color: #fff;
  }
}
</style>
