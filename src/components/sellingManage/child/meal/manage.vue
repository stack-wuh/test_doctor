<template>
  <section class="wrapper">
    <section class="form-area">
      <el-form class="my-form" ref="myForm" :model="form" :rules="rules" label-width="120px" >
        <section class="my-form__item">
          <el-form-item label="套餐名称" prop="packageName">
            <el-input v-model="form.packageName" placeholder="请选择套餐名称" ></el-input>
          </el-form-item>
          <el-form-item label="套餐售价" prop="packagePrice">
            <el-input v-model="form.packagePrice" placeholder="请编辑套餐售价" ></el-input>
          </el-form-item>
        </section>
        <section class="my-form__item">
          <el-form-item label="状态" prop="packageStatus" placeholder="请选择状态" >
            <el-select v-model="form.packageStatus">
              <el-option label="启用" :value="1" ></el-option>
              <el-option label="停用" :value="0" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否分红" prop="isShare" placeholder="请选择是否分红" >
            <el-select v-model="form.isShare">
              <el-option label= '是' :value="0" ></el-option>
              <el-option label= '否' :value="1" ></el-option>
            </el-select>
          </el-form-item>
        </section>
        <section class="my-form__item">
          <el-form-item label="员工奖励" prop="isEmployeeAward">
            <el-select v-model="form.isEmployeeAward" placeholder="请选择员工奖励" >
              <el-option label="是" :value="0" ></el-option>
              <el-option label="否" :value="1" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售奖励" prop="saleAward">
            <el-input v-model="form.saleAward" placeholder="请编辑销售奖励" ></el-input>
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
        <el-button @click="handleOpenDialogGoods" type="primary">添加</el-button>
      </p>
      <el-table :data="temp_goods" border stripe>
        <el-table-column align="center" v-if="!item.type" v-for="(item, index) in goodsTable" :key="index" :label="item.key" :prop="item.field"></el-table-column>
        <el-table-column align="center" v-if="item.type === 'input'" v-for="(item, index) in goodsTable" :key="index" :label="item.key" :prop="item.field">
          <template slot-scope="scope">
            <el-input v-model="scope.row[item.field]" placeholder="请编辑" ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" >
          <template slot-scope="scope">
              <el-button @click="handleDelItem(0, scope.$index)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table> 
    </section>

    <section class="table-area">
      <p class="table__title">
        <span>项目列表</span>
        <el-button @click="handleOpenDialogProject" type="primary">添加</el-button>
      </p>
      <el-table :data="temp_project" border stripe>
        <el-table-column align="center" v-if="!item.type" v-for="(item, index) in projectTable" :key="index" :label="item.key" :prop="item.field" ></el-table-column>
        <el-table-column align="center" v-if="item.type === 'input'" v-for="(item, index) in projectTable" :key="index" :label="item.key" :prop="item.field" >
          <template slot-scope="scope">
            <el-input v-model="scope.row[item.field]" placeholder="请编辑" ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" >
          <template slot-scope="scope">
              <el-button @click="handleDelItem(1, scope.$index)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <section class="btm-area">
      <div class="margin-rg-15" >
        <span>数量合计: </span>
        <strong class="danger">{{totalNum}} </strong>
      </div>
      <div>
        <span>总价合计: </span>
        <strong class="danger">{{totalPrice}}</strong>
      </div>
      <div class="empty-flex"></div>
      <my-bottom @handleSubmit="handleSubmit" @handleCancel="handleCancel" ></my-bottom>
    </section>
    
    <el-dialog title="选择商品" :visible.sync="visibleDialogGoods">
      <el-table @selection-change="e => {return handleTableChange(0, e)}" :data="goodsList" border stripe>
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column align="center" v-for="(item, index) in goodsTable" :key="index" :label="item.key" :prop="item.field" ></el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="handleDialogCancel" size="small">取消</el-button>
        <el-button @click="handleDialogSubmit(0)" size="small" type="primary">确认</el-button>
      </span>
    </el-dialog>

    <el-dialog title="选择项目" :visible.sync="visibleDialogProject">
      <el-table @selection-change="e => {return handleTableChange(1, e)}" :data="projectList" border stripe>
        <el-table-column align="center" type="selection" ></el-table-column>
        <el-table-column align="center" v-for="(item, index) in projectTable" :key="index" :label="item.key" :prop="item.field" ></el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="handleDialogCancel" size="small">取消</el-button>
        <el-button @click="handleDialogSubmit(1)" size="small" type="primary">确认</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import MyBottom from '@/components/common/subButton';
import {mapActions, mapState} from 'vuex'

const rules = {
  packageName: [{required: true, message: '请编辑套餐名称', trigger: 'blur'}],
  packagePrice: [{required: true, message: '请编辑套餐售价', trigger: 'blur'}],
  packageStatus: [{required: true, message: '请选择状态', trigger: 'change'}],
  isShare: [{required: true, message: '请选择是否分红', trigger: 'change'}],
  isEmployeeAward: [{required: true, message: '请选择是否员工奖励', trigger: 'change'}],
  saleAward: [{required: true, message: '请编辑销售奖励', trigger: 'blur'}],
  remark: [{required: false, message: '请编辑备注', trigger: 'blur'}],
}
const goodsTable = [
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
    field: 'carModel',
  },
  {
    key: '规格',
    field: 'carType',
  },
  {
    key: '单位',
    field: 'goodsUnit',
  },
  {
    key: '单价',
    field: 'salePrice'
  },
  {
    key: '数量',
    field: 'num',
    type: 'input',
  },
  {
    key: '备注',
    field: 'remark',
  }
]
const projectTable = [
  {
    key: '项目分类',
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
    key: '数量',
    field: 'num',
    type: 'input',
  },
  {
    key: '备注',
    field: 'remark',
  }
]


export default {
  name: '',
  components:{
    MyBottom
  },
  data () {
    return {
      form:{
        packageName: '',
        packagePrice: '',
        packageStatus: '',
        isShare: '',
        isEmployeeAward: '',
        saleAward: '',
        remark: '',
        oldPrice: '',
      },
      rules,
      visibleDialogGoods: false,
      visibleDialogProject: false,
      dialog_goods: [], // 商品列表 -- dialog
      dialog_project: [], //项目列表 -- dialog
      temp_arr: [[], []],
      temp_goods: [],
      temp_project: [],

      goodsTable,
      projectTable,
    }
  },

  computed:{
    ...mapState({
      'goodsList': state => state.Select.sellingMealGoods.list,
      'goodsTotal': state => state.Select.sellingMealGoods.total,
      'goodsCurrPage': state => state.Select.sellingMealGoods.currPageNo,
      'projectList': state => state.Select.sellingMealProject.list,
      'projectTotal': state => state.Select.sellingMealProject.total,
      'projectCurrPage': state => state.Select.sellingMealProject.currPageNo,
    }),

    totalNum(){
      let _total = 0
      this.temp_goods.map(item => {
        _total += Number.parseFloat(item.num ? item.num : 0)
      })
      this.temp_project.map(item => {
        _total += Number.parseFloat(item.num ? item.num : 0)
      })
      return _total
    },
    totalPrice(){
      let _total = 0
      this.temp_goods.map(item => {
        _total += Number.parseInt(item.num ? item.num : 0) * Number.parseFloat(item.salePrice ? item.salePrice : 0)
      })
      this.temp_project.map(item => {
        _total += Number.parseInt(item.num ? item.num : 0) * Number.parseFloat(item.salePriceUnit ? item.salePriceUnit : 0)
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
      'sellingMealPost': 'sellingMealPost',
      'getSellingMealGoodsList': 'getSellingMealGoodsList',
      'getSellingMealProject': 'getSellingMealProject',
      'getSellingMealManageInfo': 'getSellingMealManageInfo'
    }),
    handleOpenDialogGoods(){
      this.getSellingMealGoodsList({currPageNo: 1}).then(res => {
        this.visibleDialogGoods = true
      })
    },
    handleOpenDialogProject(){
      this.getSellingMealProject({currPageNo: 1}).then(res => {
        this.visibleDialogProject = true
      })
    },
    handleSubmit(){
      let goodsids = this.temp_goods.map(item => {return {id: item.id, num: item.num} })
      let proIds = this.temp_project.map(item => {return {id: item.id, num: item.num} })
      this.$refs.myForm.validate(valid => {
        if(valid){
          let form = {...this.form, goodsIds: JSON.stringify(goodsids), proIds: JSON.stringify(proIds), oldPrice: this.totalPrice}
          this.sellingMealPost({form}).then(res => {
            res.status ===0 && this.handleCancel()
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请编辑必填项后提交!'
          })
        }
      })
    },
    handleCancel(){
      this.$refs.myForm.resetFields()
      setTimeout(() => {
        this.$router.go(-2)
      }, 1000)
    },
    handleDialogSubmit(type){
      if(type){
        this.visibleDialogProject = false
        this.temp_project = this.temp_project.concat(this.temp_arr[type])
      }else{
        this.visibleDialogGoods = false
        this.temp_goods = this.temp_goods.concat(this.temp_arr[type])
      }
      this.temp_arr = [[], []]
    },
    handleTableChange(type, e){
      this.temp_arr[type] = e
    },
    handleDialogCancel(type){
      this.visibleDialogGoods = false
      this.visibleDialogProject = false
      this.temp_arr = [[], []]
    },
    handleDelItem(type, $index){
      if(type){
        this.temp_project.splice($index, 1)
      }else{
        this.temp_goods.splice($index, 1)
      }
    },
  },
  created(){
    this.getSellingMealManageInfo({id: this.query && this.query.id}).then(res => {
      console.log(res)
      this.form = {...this.form, ...res.data.package}
      this.temp_goods = res.data.goodsVoList
      this.temp_project = res.data.proList
    })
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/mixin.scss';
.wrapper{
  .form-area{
    padding: 20px 0;
    background-color: #fff;
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
  }
}
</style>
