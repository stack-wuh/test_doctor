<template>
  <section class="wrapper">
    <section class="form-area">
      <el-form class="my-form" label-width="100px" >
        <section class="my-form__item">
          <el-form-item label="销售订单">
            <el-input disabled v-model="temp_form.orderCode" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input disabled v-model="temp_form.phone" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="车牌" >
            <el-input disabled v-model="temp_form.plateNum" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="车型" >
            <el-input disabled v-model="temp_form.carModel" placeholder="占位符" ></el-input>
          </el-form-item>
        </section>
        <section class="my-form__item">
          <el-form-item label="客户名称">
            <el-input disabled v-model="temp_form.realName" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="会员折扣">
            <el-input disabled v-model="temp_form.discountRatio" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="会员余额">
            <el-input disabled v-model="temp_form.userMoney" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="推荐人">
            <el-input disabled v-model="temp_form.refereeName" placeholder="占位符" ></el-input>
          </el-form-item>
        </section>
        <section class="my-form__item">
          <el-form-item label="会员等级">
            <el-input disabled v-model="temp_form.memberId" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="历史单数">
            <el-input disabled v-model="temp_form.historyAccountNum" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="未结算">
            <el-input disabled v-model="temp_form.unCount" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="剩余挂账">
            <el-input disabled v-model="temp_form.surplusAccount" placeholder="占位符" ></el-input>
          </el-form-item>
        </section>
        <section class="my-form__item">
          <el-form-item label="历史消费">
            <el-input disabled v-model="temp_form.historyMoney" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="开单日期">
            <el-input disabled v-model="temp_form.orderDate" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="总金额">
            <el-input disabled v-model="temp_form.totalMoney" placeholder="占位符" ></el-input>
          </el-form-item>
        </section>
        <el-form-item label="备注" prop="remark">
          <el-input disabled type="textarea" v-model="form.remark" :rows="3" ></el-input>
        </el-form-item>
      </el-form>
    </section> 

    <section class="table-area">
      <p class="table__title">
        <span>商品列表</span>
      </p>
      <el-table :data="temp_list" border stripe>
        <el-table-column align="center" prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column align="center" prop="carType" label="规格"></el-table-column>
        <el-table-column align="center" prop="goodsUnit" label="单位"></el-table-column>
        <el-table-column align="center" prop="num" label="销售数量"></el-table-column>
        <el-table-column align="center" prop="salePrice" label="销售单价"></el-table-column>
        <el-table-column align="center" prop="discount" label="优惠金额"></el-table-column>
        <el-table-column align="center" prop="saleMoney" label="销售金额"></el-table-column>
      </el-table>
    </section>

    <section class="table-area">
      <p class="table__title">
        <span>项目列表</span>
      </p>
      <el-table :data="obj_list" border stripe>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="time" label="工时"></el-table-column>
        <el-table-column align="center" prop="salePriceUnit" label="售价单价"></el-table-column>
        <el-table-column align="center" prop="num" label="销售数量"></el-table-column>
        <el-table-column align="center" prop="discount" label="优惠金额"></el-table-column>
        <el-table-column align="center" prop="totalPrice" label="销售金额"></el-table-column>
      </el-table>
    </section>
    <section class="form-area">
      <el-form :rules="rules" class="my-form" ref="myForm" :model="form" label-width="100px" >
        <section class="my-form__item">
          <el-form-item label="可用卡券" prop="couponId">
            <el-select v-model="form.couponId">
              <el-option  v-for="(item, index) in sellingCouponList" :key="index" :label="item.label" :value="item.value" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用折扣" prop="isDiscount">
            <el-checkbox v-model="form.isDiscount" >是否使用会员折扣</el-checkbox>
          </el-form-item>
          <el-form-item label="卡余额支付" prop="cardPay">
            <el-input v-model="form.cardPay" placeholder="请编辑卡余额支付"></el-input>
          </el-form-item>
        </section>
        <section class="my-form__item">
          <el-form-item label="优惠金额" prop="discountAmount">
            <el-input disabled v-model="form.discountAmount"></el-input>
          </el-form-item>
          <el-form-item label="是否挂账" prop="isOnAccount">
            <el-select v-model="form.isOnAccount">
              <el-option label="是" :value="1" ></el-option>
              <el-option label="否" :value='0' ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式" prop="payType">
            <el-select v-model="form.payType" >
              <el-option v-for="(item, index) in payTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </section>
      </el-form>
    </section>

    <section class="btm-area">
      <section class="msg-area">
        <p class="margin-rg-15">
          <span>应收金额: </span>
          <strong class="danger">{{prevTotal}} </strong>(元)
        </p>
        <p class="margin-rg-15">
          <span>实收金额: </span>
          <strong class="danger">{{totalMoney}} </strong>(元)
        </p>
        <p class="margin-rg-15">
          <span>可用余额: </span>
          <strong class="danger">{{this.temp_form.userMoney}} </strong>(元)
        </p>
      </section>
      <section class="btn-area">
        <el-button @click="handleClickPrint" size="small" type="warning">打印结算单</el-button>
        <el-button @click="handleClickSubmit" size="small" type="primary">结算</el-button>
        <el-button @click="handleClickCancel" size="small" type="danger">返回</el-button>
      </section>
    </section>

  </section>
</template>


<script>
import MyBottom from '@/components/common/subButton';
import Pagination from '@/components/common/bottom'
import {mapActions, mapState} from 'vuex'

const rules = {
  couponId: [{required: true, message: '请选择可用卡券', trigger: 'change'}],
  isDiscount: [{required: true, message: '请选择是否使用折扣', trigger: 'change'}],
  cardPay: [{required: true, message: '请编辑支付金额', trigger: 'blur'}],
  discountAmount: [{required: false, message: '请编辑优惠金额', trigger: 'blur'}],
  isOnAccount: [{required: true, message: '请选择是否挂账', trigger: 'change'}],
  payType: [{required: true, message: '请选择结算方式', trigger: 'change'}],

}

export default {
  name: '',
  components:{
    MyBottom,
    Pagination,
  },
  data () {
    return {
      form:{
        couponId: '',
        isDiscount: false,
        cardPay: '',
        discountAmount: 0,
        isOnAccount: '',
        payType: '',
        payMoney: 0,
      },
      condition: '',
      temp_form:{},
      visibleDialog: false,
      temp_dialog: [],
      temp_list: [],
      obj_list: [],
      rules,

      prevTotal: 0, // 应收金额
    }
  },
  computed:{
    ...mapState({
      'sellingSaleList': state => state.Select.sellingSale && state.Select.sellingSale.salesList,
      'total': state => state.Select.sellingSale && state.Select.sellingSale.total,
      'currPageNo': state => state.Select.sellingSale && state.Select.sellingSale.currPageNo,
      'payTypeList': state => state.Select.payTypeList,
      'employeeList': state => state.Select.employeeList,
      'sellingCouponList': state => state.Select.sellingCouponList,
    }),
    pathChange(){
      let path = this.$route.query
      return path.child || path.subMenu
    },
    query(){
      let data = this.$route.query.data
      data = data && JSON.parse(data)
      return data
    },
    couponValue(){
      let data = this.sellingCouponList.find(item => item.value === this.form.couponId)
      return data &&  Number.parseFloat(data.couponValue)
    },
    totalMoney(){
      if(this.couponValue > this.prevTotal){
        if(this.prevTotal > this.form.discountAmount){
          if(this.form.isDiscount){
            return ((this.prevTotal - this.form.discountAmount) * this.temp_form.discountRatio).toFixed(2)
          }else {
            return (this.prevTotal - this.form.discountAmount).toFixed(2)
          }
        }else {
          if(this.form.isDiscount){
            return (this.prevTotal * Number.parseFloat(this.temp_form.discountRatio)).toFixed(2)
          }else{
            return this.prevTotal.toFixed(2)
          }
        }
      }else if(this.couponValue < this.prevTotal) {
        let _prev = this.prevTotal - this.couponValue
        if(_prev > this.form.discountAmount){
          if(this.form.isDiscount){
            return ((_prev - this.form.discountAmount) * this.temp_form.discountRatio).toFixed(2)
          }else{
            return (_prev - this.form.discountAmount).toFixed(2)
          }
        }else {
          if(this.form.isDiscount){
            return (_prev * Number.parseFloat(this.temp_form.discountRatio)).toFixed(2)
          }else {
            return _prev.toFixed(2)
          }
        }
      }else{
        return this.prevTotal
      }
    },
  },
  methods: {
    ...mapActions({
      'getSellingMealSaleInfo': 'getSellingMealSaleInfo',
      'getSalesList': 'getSalesList',
      'getPayTypeList': 'getPayTypeList',
      'getEmployeeList': 'getEmployeeList',
      'sellingMealSalePost': 'sellingMealSalePost',
      'sellingBusinessAccount': 'sellingBusinessAccount',
      'getSellingCouponList' : 'getSellingCouponList',
      'sellingBusinessAccountPost': 'sellingBusinessAccountPost'
    }),

    /**
     * 处理可用卡券 减免额度
     */

    handleClickCancel(){
      this.$refs.myForm.resetFields()
      setTimeout(() => {
        this.$router.go(-2)
      }, 1000)
    },
    handleClickSubmit(){
      let data = {...this.form, payMoney: this.totalMoney, orderId: this.temp_form.orderId}
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.sellingBusinessAccountPost({form: data}).then(res => {
            res.status === 0 && this.handleClickCancel()
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请编辑必填项后提交'
          })
        }
      })
    },
    handleClickPrint(){},
  },
  created(){
    this.getPayTypeList()
    this.getEmployeeList()
    this.sellingBusinessAccount({id: this.query.id}).then(res => {
      this.temp_form = res.data['客户信息回显']
      this.temp_list = res.data['商品列表']
      this.obj_list = res.data['项目列表']
      this.temp_list.map(item => {
        this.form.discountAmount += Number.parseInt(item.discount)
        this.prevTotal += Number.parseInt(item.saleMoney)
      })
      this.obj_list.map(item => {
        this.form.discountAmount += Number.parseInt(item.discount)
        this.prevTotal += Number.parseInt(item.totalPrice)

      })
      this.getSellingCouponList({userId: this.temp_form.userId, totalMoney: this.temp_form.totalMoney})
      console.log(this.temp_form, this.temp_list, this.obj_list)
    })
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/mixin.scss';
.wrapper{
  .form-area{
    padding: 20px;
    background-color: #fff;
    box-sizing: border-box;
    .my-form__item{
      @include flex-box;
      .el-form-item{
        width: 40%;
        .el-input,
        .el-select{
          width: 100%;
        }
      }
    }
  }
  .table-area{
    padding: 20px;
    margin-top:20px;
    background-color:  #fff;
    p.table__title{
      @include flex-box(row, nowrap, space-between, center);
      height: 50px;
      margin-bottom: 15px;
      line-height: 50px;
      border-bottom: 1px solid #eee;
    }
  }
  .btm-area{
    @include flex-box(row, nowrap, space-between, center);
    padding: 20px ;
    .btn-area{
      @include flex-box;
    }
    .msg-area{
      @include flex-box;
    }
  }
}
</style>
