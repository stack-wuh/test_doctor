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
          <el-input disabled type="textarea" v-model="temp_form.remark" :rows="3" style="width: 80%;"></el-input>
        </el-form-item>
      </el-form>
    </section> 

    <section class="table-area">
      <p class="table__title">
        <span>商品列表</span>
        <el-button @click="handleOpenDialog(0)" type="primary">添加</el-button>
      </p>
      <el-table :data="temp_list" border stripe>
        <el-table-column align="center" type="selection" ></el-table-column>
        <el-table-column v-for="(item, index) in goodsTable" :key="index" align="center" :label="item.key" :prop="item.field"></el-table-column>
        <el-table-column align="center" label="操作">
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>

    </section>

    <section class="table-area">
      <p class="table__title">
        <span>项目列表</span>
        <el-button @click="handleOpenDialog(1)" type="primary">添加</el-button>
      </p>
      <el-table :data="temp_list" border stripe>
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column align="center" v-for="(item, index) in projectTable" :key="index" :label="item.key" :prop="item.field"></el-table-column>
        <el-table-column align="center" label="操作">
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>

    </section>

    <section class="btm-area">
      <section class="msg-area">
        <el-select v-model="form.type" placeholder="请选择消费类型" >
          <el-option label="aa" value="1" ></el-option>
        </el-select>
        <p class="margin-lf-15">
          <span>合计消费: </span>
          <strong class="danger">0</strong>元
        </p>
      </section>
      <section class="btn-area">
        <el-button @click="handleClickSubmit(0)" size="small" type="warning">保存草稿</el-button>
        <el-button @click="handleClickSubmit(1)" size="small" type="primary">提交</el-button>
        <el-button @click="handleClickCancel" size="small" type="danger">返回</el-button>
      </section>
    </section>

    <el-dialog title="商品列表" :visible.sync="visibleDialogGoods">
      <el-table @selection-change="e => {return handleSelection(0, e)}" :data="goodsList" border stripe>
        <el-table-column align="center" type="selection" width="90px"></el-table-column>
        <el-table-column align="center" v-for="(item, index) in goodsDialogTable" :key="index" :label="item.key" :prop="item.field"></el-table-column>
      </el-table>
      <pagination :total="goodsTotal" @getCurrent="e => {return getCurrent(0, e)}" ></pagination>
      <span slot="footer">
        <el-button @click="handleDialogCancel" >取消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">确定</el-button>
      </span>
    </el-dialog>
    
    <el-dialog title="项目列表" :visible.sync="visibleDialogProject">
      <el-table @selection-change="e => {return handleSelection(1, e)}" :data="projectList" border stripe>
        <el-table-column align="center" type="selection" width="90px"></el-table-column>
        <el-table-column align="center" v-for="(item, index) in projectDialogTable" :key="index" :label="item.key" :prop="item.field"></el-table-column>
      </el-table>
      <pagination :total="projectTotal" @getCurrent="getCurrent(1)" ></pagination>
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

const goodsTable = [
  {
    key: '商品编码',
    field: '',
  },
  {
    key: '商品名称',
    field: '',
  },
  {
    key: '规格',
    field: '',
  },
  {
    key: '单位',
    field: '',
  },
  {
    key: '销售数量',
    field: '',
  },
  {
    key: '销售单价',
    field: '',
  },
  {
    key: '优惠',
    field: '',
  },
  {
    key: '销售金额',
    field: '',
  },
  {
    key: '已出库数量',
    field: '',
  },
  {
    key: '销售人',
    field: '',
  },
  {
    key: '领料人',
    field: '',
  },
  {
    key: '实施人',
    field: '',
  },
]
const goodsDialogTable = [
  {
    key: '商品编码',
    field: 'goodsCode',
  },
  {
    key: '商品类名',
    field: 'goodsClassificationName',
  },
  {
    key: '商品名称',
    field: 'goodsName',
  },
  {
    key: '车品牌',
    field: 'carBrand',
  },
  {
    key: '车型',
    field: 'carType',
  },
  {
    key: '规格',
    field: 'carModel',
  },
  {
    key: '单位',
    field: 'goodsUnit',
  },
  {
    key: '备注',
    field: 'remark',
  },
]

const projectTable = [
  {
    key: '项目名称',
    field: '',
  },
  {
    key: '项目分类',
    field: '',
  },
  {
    key: '推荐工时',
    field: '',
  },
  {
    key: '单价',
    field: '',
  },
  {
    key: '数量',
    field: '',
  },
  {
    key: '优惠',
    field: '',
  },
  {
    key: '总价',
    field: '',
  },
  {
    key: '销售人',
    field: '',
  },
  {
    key: '实施人',
    field: '',
  },
]
const projectDialogTable = [
  {
    key: '项目名称',
    field: 'projectName',
  },
  {
    key: '商品分类',
    field: 'typeName',
  },
  {
    key: '推荐工时',
    field: 'time',
  },
  {
    key: '单价',
    field: 'salePriceUnit',
  },
  {
    key: '备注',
    field: 'remark',
  },
]

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
      visibleDialogGoods: false,
      visibleDialogProject: false,
      temp_dialog: [[], []],
      temp_list: [],
      rules,

      goodsTable,
      goodsDialogTable,
      projectTable,
      projectDialogTable,
    }
  },
  computed:{
    ...mapState({
      'payTypeList': state => state.Select.payTypeList,
      'employeeList': state => state.Select.employeeList,
      'goodsList': state => state.Select.sellingMealGoods.list,
      'goodsTotal': state => state.Select.sellingMealGoods.total,
      'goodsCurr': state => state.Select.sellingMealGoods.currPageNo,
      'projectList': state => state.Select.sellingMealProject.list,
      'projectTotal': state => state.Select.sellingMealProject.total,
      'projectCurr': state => state.Select.sellingMealProject.currPageNo
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
      'sellingMealSalePost': 'sellingMealSalePost',
      'getSellingMealGoodsList': 'getSellingMealGoodsList',
      'getSellingMealProject': 'getSellingMealProject'
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
    handleOpenDialog(type){
      if(type === 0){
        this.getSellingMealGoodsList({currPageNo: 1}).then(res => {
          this.visibleDialogGoods = true
        })
      }else{
        this.getSellingMealProject({currPageNo: 1}).then(res => {
          this.visibleDialogProject = true
        })
      }
    },
    handleDialogCancel(){
      this.visibleDialogGoods = false
      this.visibleDialogProject = false
      this.temp_dialog = [[], []]
    },
    /**
     * 分页器
     */
    getCurrent(type, e){
      console.log(type, e)
    },
    handleSelection(type, e){

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
