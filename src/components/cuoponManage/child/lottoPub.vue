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
      <my-table v-if="isShow" header="true" :list="data" >
        <span slot="title">{{$route.query.child}}</span>
        <div slot="right">
          <my-button />
        </div>
      </my-table>
      <SubButton @handleCancel="cancel" @handleSubmit="submit" />
      <dialog-with-table @getCurrPageModel="getCurrPageModel"  @getData="getData" @getKeyWord="getKeyWord" :isShowDialog="isShowDialog" :list="temp_list || []" :total="temp_total || 0" :currPageNo="temp_currPageNo || 1" />
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
      temp_list: [],
      temp_total: 0,
      temp_currPageNo: 1,
      isShow: true,
      _id:'',
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
      'getPariseList': 'couponPariseList'
    }),
    getKeyWord(val){
      this.getPariseList({search: {couponName: val.keyWord}}).then(res => {
        this.temp_list = res.data.list
        this.temp_total = res.data.total
        this.temp_currPageNo = res.data.pageNum
      })
    },
    getCurrPageModel(e){
      this.getPariseList({currPageNo: e}).then(res => {
        this.temp_list = res.data.list
      })
    },
    getData(val){
      console.log(val)
      let _arr  = val.data && val.data.map((item,index) => {
        return {...item, rate: 0, quantity: 0}
      })
      let _arr1 = [], _arr2 = []
      this.data = [...this.data, ..._arr]
      for(var k in this.data){
        if(_arr1.includes(this.data[k].id)){
          continue
        }else{
          _arr1.push(this.data[k].id)
          _arr2.push(this.data[k])
        }
      }
      this.data = _arr2
      this.data.map((item,index) => {
        let list = ['一','二','三','四','五','六','七','八','九','十']
        this.$set(this.data[index], 'rank', list[index]+'等奖')
        return {...item, rate: item.rate ? item.rate: 0, quantity: item.quantity ? item.quantity : 0}
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
          name: item.name,
          total: item.total,
          quantity: item.quantity,
          rate: item.rate,
          id: item.id
        }
      })
      for(var k in data){
        if(data[k].total < data[k].quantity || data[k].quantity < 0){
          _g.toastMsg({
            type:'error',
            msg:'奖品数量编辑错误'
          })
          return
        }
      }
      let form = {...this.form, data: JSON.stringify(data)}
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.handleSubmit({form}).then(res => {
              res.status == 0 && this.cancel()
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
    this.getPariseList().then(res => {
      this.temp_list = res.data.list
      this.temp_total = res.data.total
      this.temp_currPageNo = res.data.pageNum
    })
    let data =  this.$route.query.data && JSON.parse(this.$route.query.data)
    this._id = data && data.id
    data && this.getModelList({id: data.id})
      .then(res => {
        this.form = {...this.form, ...res.data.template}
        this.data = res.data.pageInfo.list
      })
    window.$bus.$on('handleDelItemForModel', (e) => {
      this.data && this.data.splice(e,1)
      this.getData({data:[]})
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
