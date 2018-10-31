<template>
  <section class="store-wrapper">
    <section class="form-area">
      <el-form class="my-form" ref="myForm" :model="form" label-width="120px">
        <el-form-item label="收款单号">
          <el-input @change="handleChange" style="width: 34%;" v-model="payCode"></el-input>
        </el-form-item>
        <section class="form-list">
          <section class="form-item" v-if="item.type !== 'textarea'" v-for="(item, index) in formList" :key="index">
            <el-form-item :label="item.label" :prop="item.field" :rules="item.rules" >
              <el-input :disabled="item.disabled" v-if="item.type === 'default'" v-model="form[item.field]" :placeholder="'请编辑' + item.label"></el-input>
              <el-select :disabled="item.disabled" v-if="item.type === 'select'" v-model="form[item.field]" :placeholder="'请选择' + item.label">
                <el-option v-for="(sub, sid) in item.list" :label="sub.label" :value="sub.value"></el-option>
              </el-select>
            </el-form-item>
          </section>
        </section>
        <el-form-item v-if="item.type === 'textarea'" v-for="(item, index) in formList" :key="index" :label="item.label" :prop="item.field">
          <el-input :disabled="item.disabled" style="width: 78%;" type="textarea" :rows="3" v-model="form[item.field]" ></el-input>
        </el-form-item>
      </el-form>
    </section>
    <section v-if="query" class="btn-area">
      <el-button @click="cancel" type="danger" size="small" >返回</el-button>
    </section>
    <my-sub-button v-if="!query" @handleSubmit="submit" @handleCancel="cancel" ></my-sub-button>
  </section>
</template>

<script>
const forms = [
  {
    label: '姓名',
    field: 'realName',
    type: 'default',
    disabled: true,
    rules:[{required: false}]
  },
  {
    label: '手机',
    field: 'phone',
    type: 'default',
    disabled: true,
    rules:[{required: false}]
  },
  {
    label: '总挂账金额',
    field: 'totalMoney',
    type: 'default',
    disabled: true,
    rules:[{required: false}]
  },
  {
    label: '已还挂账金额',
    field: 'accountPayMoney',
    type: 'default',
    disabled: true,
    rules: [{required: false}]
  },
  {
    label: '支付方式',
    field: 'payType',
    type: 'select',
    disabled: false,
    rules:[{required: true, message: '请选择支付方式', trigger: 'change'}]
  },
  {
    label: '本次支付金额',
    field: 'price',
    type: 'default',
    disabled: false,
    rules: [{required: true, message: '请编辑支付金额', trigger: 'blur'}]
  },
  {
    label: '备注',
    field: 'remark',
    type: 'textarea',
    rows: 3,
    disabled: false,
    rules: [{required: true, message:'请编辑备注', trigger: 'blur'}]
  }
]
import MySubButton from '@/components/common/subButton'
import {mapActions, mapState} from 'vuex'
export default {
  name: '',
  components:{
    MySubButton,
  },
  data () {
    return {
      payCode:'',
      forms,
      form:{
        payType: '',
        price: '',
        remark: '',
      },
    }
  },

  computed:{
    ...mapState({
      'payTypeList': state => state.Select.payTypeList
    }),
    formList(){
      return this.forms.map(item => {
        if(item.field === 'payType'){
          return Object.assign(item, {list: this.payTypeList})
        }else{
          return {...item}
        }
      })
    },
    query(){
      let data = this.$route.query.data
      data = data && JSON.parse(data)
      return data
    }
  },
  methods: {
    ...mapActions({
      'getSellingFinance': 'getSellingFinance',
      'getPayTypeList': 'getPayTypeList',
      'getProviderList' : 'getProviderList',
      'sellingStoreRefundPost': 'sellingStoreRefundPost',
      'sellingStoreRefundPut': 'sellingStoreRefundPut'
    }),
    /**
     * 根据收款单号 搜索 挂账还款内容
     */
    handleChange(){
      this.getSellingFinance({payCode: this.payCode}).then(res => {
        this.form = {...this.form, ...res.data, payId: res.data.id}
      })
    },
    submit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.sellingStoreRefundPost({form: this.form}).then(res => {
            res.status === 0 && (
              this.cancel()
            )
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请填写必填项之后提交'
          })
        }
      })
    },
    cancel(){
      Object.keys(this.form).map(item => {
        this.form[item] = ''
      })
      setTimeout(() => {
        this.$router.go(-2)
      }, 1000)
    },
  },
  created(){
    this.getPayTypeList()
    this.getProviderList()
    if(this.query && this.query.id){
      let _arr = JSON.parse(JSON.stringify(this.formList)).map(item => {
        return {...item, disabled: true}
      })
      this.forms = _arr
      this.sellingStoreRefundPut({id: this.query.id}).then(res => {
        this.form = {...this.form, ...res.data}
        this.payCode = this.form.payCode
      })
    }
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/mixin.scss';
.store-wrapper{
  width: 100%;
  height: 100%;
  .form-area{
    width: 100%;
    padding: 15px 0;
    background-color: #fff;
    .form-list{
      @include flex-box(row, wrap, flex-start, center);
      width: 100%;
       .form-item{
         width: 40%;
       }
    }
  }

  .btn-area{
    height: 50px;
    padding-right: 20px;
    text-align: center;
    background-color: #fff;
  }
}
</style>
