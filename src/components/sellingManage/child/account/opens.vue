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
      <el-table :data="temp_goods" border stripe>
        <el-table-column align="center" type="selection" ></el-table-column>
        <el-table-column width="120px" v-if="item.type === 'default' || item.type === undefined" v-for="(item, index) in goodsTable" :key="index" align="center" :label="item.key" :prop="item.field"></el-table-column>
        <el-table-column width="120px" v-if="item.type === 'input'" v-for="(item, index) in goodsTable" :key="index" align="center" :label="item.key">
          <template slot-scope="scope">
            <el-input @change="e => {return handleChangeInputNum(0, e, scope)}" v-model="scope.row[item.field]" placeholder="请编辑" ></el-input>
          </template>
        </el-table-column>
        <el-table-column width="120px" v-if="item.type === 'select'" v-for="(item, index) in goodsTable" :key="index" align="center" :label="item.key">
          <template slot-scope="scope">
            <el-select v-model="scope.row[item.field]">
              <el-option v-for="(item, index) in employeeList" :key="index" :label="item.label" :value="item.value" ></el-option>
            </el-select>
          </template>
        </el-table-column>
  
        <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleTableDel(0, scope.$index)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </section>

    <section class="table-area">
      <p class="table__title">
        <span>项目列表</span>
        <el-button @click="handleOpenDialog(1)" type="primary">添加</el-button>
      </p>
      <el-table :data="temp_project" border stripe>
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column width="120px" v-if="item.type === '' || item.type === undefined" align="center" v-for="(item, index) in projectTable" :key="index" :label="item.key" :prop="item.field"></el-table-column>
        <el-table-column width="120px" v-if="item.type === 'input'" align="center" v-for="(item, index) in projectTable" :key="index" :label="item.key" :prop="item.field">
          <template slot-scope="scope">
            <el-input @change="e => {return handleChangeInputNum(1, e, scope)}" v-model="scope.row[item.field]" placeholder="请编辑" ></el-input>
          </template>
        </el-table-column>
        <el-table-column width="120px" v-if="item.type === 'select'" v-for="(item, index) in projectTable" :key="index" align="center" :label="item.key">
          <template slot-scope="scope">
            <el-select v-model="scope.row[item.field]">
              <el-option v-for="(item, index) in employeeList" :key="index" :label="item.label" :value="item.value" ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope" >
            <el-button @click="handleTableDel(1, scope.$index)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </section>

    <section class="btm-area">
      <section class="msg-area">
        <el-select v-model="form.saleType" placeholder="请选择消费类型" >
          <el-option v-for="(item, index) in typeList" :key="index" :label="item.label" :value="item.value" ></el-option>
        </el-select>
        <p class="margin-lf-15">
          <span>合计消费: </span>
          <strong class="danger">{{totalMoney}} </strong>元
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
        <el-button type="primary" @click="handleDialogSubmit(0)">确定</el-button>
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
        <el-button type="primary" @click="handleDialogSubmit(1)">确定</el-button>
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
    field: 'goodsCode',
  },
  {
    key: '商品名称',
    field: 'goodsName',
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
    key: '数量',
    field: 'num',
    type: 'input',
  },
  {
    key: '单价',
    field: 'salePrice',
  },
  {
    key: '优惠',
    field: 'discount',
    type: 'input',
  },
  {
    key: '总价',
    field: 'saleMoney',
  },
  {
    key: '已出库数量',
    field: 'outRepositoryNum',
  },
  {
    key: '销售人',
    field: 'saleEmployeeId',
    type: 'select',
    list: [],
  },
  {
    key: '领料人',
    field: 'takeEmployeeId',
    type: 'select',
    list: [],
  },
  {
    key: '实施人',
    field: 'workEmployeeId',
    type: 'select',
    list: [],
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
    field: 'projectInfoName',
  },
  {
    key: '项目分类',
    field: 'projectName',
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
    key: '数量',
    field: 'num',
    type: 'input'
  },
  {
    key: '优惠',
    field: 'discount',
    type: 'input',
  },
  {
    key: '总价',
    field: 'totalPrice',
  },
  {
    key: '销售人',
    field: 'saleEmployeeId',
    type: "select",
  },
  {
    key: '实施人',
    field: 'workEmployeeId',
    type: "select",
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

const typeList = [
  {
    label: '美容洗车',
    value: 0,
  },
  {
    label: '保险维修',
    value: 1,
  },
  {
    label: '保养维修',
    value: 2,
  },
  {
    label: '故障检查',
    value: 3,
  }
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
        saleType: '',
      },
      condition: '',
      temp_form:{},
      visibleDialogGoods: false,
      visibleDialogProject: false,
      temp_dialog: [[], []],
      temp_goods: [],
      temp_project: [],
      rules,

      goodsTable,
      goodsDialogTable,
      projectTable,
      projectDialogTable,
      typeList,
    }
  },
  computed:{
    ...mapState({
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
    },
    totalMoney(){
      let _total = 0
      this.temp_goods.map(item => {
        _total += Number.parseFloat(item.salePrice ? item.salePrice : 0) * Number.parseInt(item.num ? item.num : 0)
      })
      this.temp_project.map(item => {
        _total += Number.parseFloat(item.salePriceUnit ? item.salePriceUnit : 0) * Number.parseInt(item.num ? item.num : 0)
      })
      return _total
    },
    query(){
      let data = this.$route.query.data
      data = data && JSON.parse(data)
      return data
    }
  },
  methods: {
    ...mapActions({
      'getSellingMealSaleInfo': 'getSellingMealSaleInfo',
      'getSalesList': 'getSalesList',
      'getPayTypeList': 'getPayTypeList',
      'getEmployeeList': 'getEmployeeList',
      'sellingAccountOutPost': 'sellingAccountOutPost',
      'getSellingMealGoodsList': 'getSellingMealGoodsList',
      'getSellingMealProject': 'getSellingMealProject',
      'getSellingMealManList': 'getSellingMealManList',
      'getSellingAccountInfo': 'getSellingAccountInfo'
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
      this.temp_dialog[type] = e
    },
    handleDialogSubmit(type){
      if(type === 0) {
        this.visibleDialogGoods = false
        this.temp_dialog[type].map(item => {
          item = Object.assign(item, {outRepositoryNum: 0})
        })
        this.temp_goods = this.temp_goods.concat(this.temp_dialog[type])
      }else{
        this.visibleDialogProject = false
        this.temp_project = this.temp_project.concat(this.temp_dialog[type])
      }
      setTimeout(() => {
        this.temp_dialog[type] = []
      })
    },
    handleClickCancel(){
      setTimeout(() => {
        this.$router.go(-2)
      }, 1000)
    },
    handleClickSubmit(status){
      let goodsDate = this.temp_goods.map(item => {
        return {goodId: item.id, num: item.num, discount: item.discount, saleMoney: item.saleMoney, saleEmployeeId: item.saleEmployeeId, takeEmployeeId: item.takeEmployeeId, workEmployeeId: item.workEmployeeId }
        })
      let projectDate = this.temp_project.map(item => {
        return {projectId: item.id, num: item.num, discount: item.discount, totalPrice: item.totalPrice, saleEmployeeId: item.saleEmployeeId, workEmployeeId: item.workEmployeeId}
      })
      

      let form = {...this.form, status, userId: this.temp_form.userId, goodsDate: JSON.stringify(goodsDate), projectDate: JSON.stringify(projectDate), totalMoney: this.totalMoney}
      this.sellingAccountOutPost({form}).then(res => {
        res.status === 0 && this.handleClickCancel()
      })
    },

    handleTableDel(type, $index){
      if(type === 0) {
        this.temp_goods.splice($index, 1)
      }else{
        this.temp_project.splice($index, 1)
      }
    },

    handleChangeInputNum(type, e, scope){
      if(type === 0) {
        scope.row.saleMoney = Number.parseFloat(scope.row.salePrice) * Number.parseInt(scope.row.num)
      }else{
        scope.row.totalPrice = Number.parseFloat(scope.row.salePriceUnit) * Number.parseInt(scope.row.num)
      }
    }
  },
  created(){
    this.getEmployeeList()
    if(this.query && this.query.id){
      this.getSellingAccountInfo({id: this.query && this.query.id}).then(res => {
        this.temp_form = res.data['用户信息']
        this.temp_goods = res.data['商品列表']
        this.temp_project = res.data['项目列表']
        this.condition = res.data.phone
      })
    }
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
