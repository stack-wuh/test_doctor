<template>
  <section class="wrapper">
    <section class="search-area">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="condition" placeholder="请搜索车牌或手机号" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSearch" type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section class="form-area">
      <el-form class="my-form" label-width="100px" >
        <section class="my-form__item">
          <el-form-item label=客户名>
            <el-input disabled v-model="temp_form.userName" placeholder="占位符" ></el-input>
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
          <el-form-item label="会员等级">
            <el-input disabled v-model="temp_form.memberName" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="会员折扣">
            <el-input disabled v-model="temp_form.discountRatio" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="会员余额">
            <el-input disabled v-model="temp_form.money" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="推荐人">
            <el-input disabled v-model="temp_form.refereeName" placeholder="占位符" ></el-input>
          </el-form-item>
        </section>
        <section class="my-form__item">
          <el-form-item label="历史消费">
            <el-input disabled v-model="temp_form.historyMoney" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="历史单数">
            <el-input disabled v-model="temp_form.accountNumber" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="未结算">
            <el-input disabled v-model="temp_form.unPay" placeholder="占位符" ></el-input>
          </el-form-item>
          <el-form-item label="剩余挂账">
            <el-input disabled v-model="temp_form.surplusAccount" placeholder="占位符" ></el-input>
          </el-form-item>
        </section>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="form.remark" :rows="3" style="width: 80%;"></el-input>
        </el-form-item>
      </el-form>
    </section> 

    <section class="table-area">
      <p class="table__title">
        <span>商品列表</span>
        <el-button @click="handleOpenDialog" type="primary">添加</el-button>
      </p>
      <el-table :data="temp_list" border stripe>
        <el-table-column align="center" label="名称"></el-table-column>
        <el-table-column align="center" label="数量"></el-table-column>
        <el-table-column align="center" label="售价"></el-table-column>
        <el-table-column align="center" label="备注"></el-table-column>
        <el-table-column align="center" label="操作">
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>

    </section>

    <section class="table-area">
      <p class="table__title">
        <span>项目列表</span>
        <el-button @click="handleOpenDialog" type="primary">添加</el-button>
      </p>
      <el-table :data="temp_list" border stripe>
        <el-table-column align="center" label="名称"></el-table-column>
        <el-table-column align="center" label="数量"></el-table-column>
        <el-table-column align="center" label="售价"></el-table-column>
        <el-table-column align="center" label="备注"></el-table-column>
        <el-table-column align="center" label="操作">
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>

    </section>

    <section class="btm-area">
      <section class="msg-area">
        <el-select placeholder="请选择消费类型" >
          <el-option label="aa" value="1" ></el-option>
        </el-select>
        <p class="margin-lf-15">
          <span>合计消费: </span>
          <storage class="danger">0</storage>元
        </p>
      </section>
      <section class="btn-area">
        <el-button @click="handleClickSubmit(0)" size="small" type="warning">保存草稿</el-button>
        <el-button @click="handleClickSubmit(1)" size="small" type="primary">提交</el-button>
        <el-button @click="handleClickCancel" size="small" type="danger">返回</el-button>
      </section>
    </section>

    <el-dialog title="套餐列表" :visible.sync="visibleDialog">
      <el-table :data="sellingSaleList" border stripe @selection-change="handleSeletion" >
        <el-table-column align="center" type="selection" width="90px"></el-table-column>
        <el-table-column align="center" label="套餐名称" prop="name"></el-table-column>
        <el-table-column align="center" label="单价" prop="packagePrice"></el-table-column>
        <el-table-column align="center" label="备注" prop="remark"></el-table-column>
      </el-table>
      <pagination :total="total" @getCurrent="getCurrent" ></pagination>
      <span slot="footer">
        <el-button @click="handleDialogCancel" >取消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">确定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import MyBottom from '@/components/common/subButton';
import Pagination from '@/components/common/bottom'
import {mapActions, mapState} from 'vuex'

const rules = {
  startDates: [{required: true, message: '请选择开始日期', trigger: 'change'}],
  endDates: [{required: true, message: '请选择结束日期', trigger: 'change'}],
  salerId: [{required: true, message: '请选择销售人员', trigger: 'change'}],
  packagePrice: [{required: true, message: '请编辑套餐售价', trigger: 'blur'}],
  takeMoney: [{required: true, message: '请编辑实收金额', trigger: 'blur'}],
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
        startDates: '',
        endDates:'',
        salerId: '',
        takeMoney: '',
        packagePrice: '',
        takeMoney: '',
        payType: '',

      },
      condition: '',
      temp_form:{},
      visibleDialog: false,
      temp_dialog: [],
      temp_list: [],
      rules,
    }
  },
  computed:{
    ...mapState({
      'sellingSaleList': state => state.Select.sellingSale && state.Select.sellingSale.salesList,
      'total': state => state.Select.sellingSale && state.Select.sellingSale.total,
      'currPageNo': state => state.Select.sellingSale && state.Select.sellingSale.currPageNo,
      'payTypeList': state => state.Select.payTypeList,
      'employeeList': state => state.Select.employeeList
    }),
    pathChange(){
      let path = this.$route.query
      return path.child || path.subMenu
    }
  },
  methods: {
    ...mapActions({
      'getSellingMealSaleInfo': 'getSellingMealSaleInfo',
      'getSalesList': 'getSalesList',
      'getPayTypeList': 'getPayTypeList',
      'getEmployeeList': 'getEmployeeList',
      'sellingMealSalePost': 'sellingMealSalePost'
    }),
    /**
     * 新增页 -- 获取用户的具体信息
     */
    handleSearch(){
      if(!this.condition) return _g.toastMsg({type: 'error', msg: '请编辑车牌或手机号后搜索'})
      this.getSellingMealSaleInfo({condition: this.condition}).then(res => {
        this.temp_form = res.data
      })
    },
    /**
     * 显示dialog对话框 
     * 选择套餐列表
     */
    handleOpenDialog(){
      if(this.pathChange === '编辑套餐销售'){
        this.getSalesList({currPageNo: 1}).then(res => {
          this.visibleDialog = true
        })
      }

    },
    handleDialogCancel(){
      this.visibleDialog = false
      this.temp_dialog = []
    },
    /**
     * 分页器
     */
    getCurrent(e){
      if(this.pathChange === '编辑套餐销售'){
        this.getSalesList({currPageNo: e})
      }
    },
    /**
     * dialog中选择的表格内容
     */
    handleSeletion(e){
      if(this.pathChange === '编辑套餐销售'){
        this.temp_dialog = e
      }
    },
    handleDialogSubmit(){
      setTimeout(() => {
        this.visibleDialog = false
        this.temp_list = this.temp_dialog
      }, 500)
    },
    handleClickCancel(){
      setTimeout(() => {
        this.$router.go(-2)
      }, 1000)
    },
    handleClickSubmit(status){
      let data = this.temp_list.map(item => {
        return {packageId: item.id, saleNum: item.saleNum}
      })
      this.$refs.myForm.validate(valid => {
        if(valid){
          let form = {...this.form, ids: JSON.stringify(data), status: status, userId: this.temp_form.userId}
          this.sellingMealSalePost({form}).then(res => {
            console.log(res)
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请编辑必填项之后提交'
          })
        }
      })
    }
  },
  created(){
    this.getPayTypeList()
    this.getEmployeeList()
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
    padding: 20px;
    padding-left: 0;
    .btn-area{
      @include flex-box;
    }
    .msg-area{
      @include flex-box;
    }
  }
}
</style>
