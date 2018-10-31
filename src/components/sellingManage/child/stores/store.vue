<template>
  <section class="store-wrapper">
    <section class="form-area">
      <el-form :model="formList.form" ref="myForm" class="my-form" label-width="100px">
        <section class="form-list">
          <section class="form-item" v-for="(item, index) in formList.list" :key="index">
            <el-form-item v-if="item.type !== 'textarea'" :label="item.label" :prop="item.field" :rules="item.rules" >
              <el-select :disabled="disabled" clearable @change="handleChange(item)" v-if="item.type === 'select'" v-model="formList.form[item.field]" :placeholder="'请编辑' + item.label">
                <el-option v-if="sl" v-for="(sl, sid) in item.list" :key="sid" :label="sl.label" :value="sl.value"></el-option>
              </el-select>
              <el-input :disabled="disabled" clearable v-if="item.type === 'input'" v-model="formList.form[item.field]" :placeholder="'请编辑' + item.label"></el-input>
              <el-date-picker :disabled="disabled" v-if="item.type === 'date'" v-model="formList.form[item.field]" :placeholder="'请编辑' + item.label" value-format="yyyy-MM-dd" ></el-date-picker>
            </el-form-item>
          </section>
        </section>
        <el-form-item v-if="item.type === 'textarea'" :rules="item.rules" v-for="(item, index) in formList.list" :key="index" :label="item.label" :prop="item.field">
          <el-input :disabled="disabled" style="width: 80%;" v-model="formList.form[item.field]" :placeholder="'请编辑' + item.label" type="textarea" :rows="3" ></el-input>
        </el-form-item>
      </el-form>
    </section>

    <section class="table-area">
      <p class="table-area__title">
        <span>商品列表</span>
        <el-button v-if="!disabled" @click="handleOpenDialog" type="primary" >{{pathChange === '编辑调拨接收' ? '搜索' : '添加'}}</el-button>
      </p>
      <el-table :data="list" border stripe>
        <el-table-column v-if="item.type === 'default'" align="center" v-for="(item, index) in tableList" :label="item.label" :prop="item.field"></el-table-column>
        <el-table-column align="center" v-if="item.type === 'input'" v-for="(item, index) in tableList" :label="item.label" :prop="item.field">
          <template slot-scope="scope"> 
            <el-input @change="handleChangeInput" :disabled="disabled" v-model="scope.row[item.field]"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" v-for="(item, index) in tableList" :label="item.label" :prop="item.field" v-if="item.type === 'button'">
          <template slot-scope="scope">
            <el-button :disabled="disabled" @click="handleDelItem(item, scope.$index)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <section class="btn-area">
      <el-button v-if="!disabled" @click="handleClickSubmit(0)" type="warning">保存草稿</el-button>
      <el-button v-if="!disabled" @click="handleClickSubmit(1)" type="primary">提交</el-button>
      <el-button @click="handleClickCancel" type="danger">返回</el-button>
    </section>

    <el-dialog title="选择商品" :visible.sync="visibleDialog">
      <el-table @selection-change="handleTableSelect" :data="SellingStoreGoods" border stripe>
        <el-table-column width="90px" align="center" type="selection" fixed="left"></el-table-column>
        <el-table-column align="center" v-for="(item, index) in dialogTable" :key="index" :label="item.key" :prop="item.field"></el-table-column>
      </el-table>
      <my-bottom type="pagination" :total="total" :currentPage='currPageNo' @getCurrent="getCurrent" ></my-bottom>
      <span slot="footer">
        <el-button @click="handleDialogCancel" type="danger">取消</el-button>
        <el-button @click="handleDialogSubmit" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
const forms = [
  {
    title: '日常盘点',
    params:['编辑日常盘点'],
    list:[
      {
        label: '仓库名称',
        field: 'repositoryId',
        type: 'select',
        rules:[{required: true, message: '请选择仓库名称', trigger: 'change'}],
      },
      {
        label: '盘点人员',
        field: 'employeeId',
        type: 'select',
        rules:[{required: true, message: '请选择盘点人员', trigger: 'change'}],
      },
      {
        label: '盘点日期',
        field: 'checkDate',
        type: 'date',
        rules:[{required: true, message: '请选择盘点日期', trigger: 'change'}],
      },
      {
        label: '备注',
        field: 'remark',
        type: 'textarea',
        rows: '3',
        rules:[{required: true, message: '请编辑备注', trigger: 'change'}],
      }
    ],
    form:{
      repositoryId: '',
      employeeId: '',
      checkDate: '',
      remark: '',
    },
  },
  {
    title: '调拨发起',
    params:['编辑调拨发起'],
    list:[
      {
        label: '发起仓',
        field: 'outputRepositoryId',
        type: 'select',
        list:[],
        rules:[{required: true, message: '请选择发起仓', trigger: 'change'}],
      },
      {
        label: '接收仓',
        field: 'inputRepositoryId',
        type: 'select',
        list: [],
        rules:[{required: true, message: '请选择接收仓', trigger: 'change'}],
      },
      {
        label: '调拨日期',
        field: 'outputDate',
        type: 'date',
        rules:[{required: true, message: '请选择调拨日期', trigger: 'change'}],
      },
      {
        label: '送货日期',
        field: 'takeGoodsDate',
        type: 'date',
        rules:[{required: true, message: '请选择调拨日期', trigger: 'change'}],
      },
      {
        label: '操作人员',
        field: 'employeeId',
        type: 'select',
        rules:[{required: true, message: '请选择操作人员', trigger: 'change'}],
      },
      {
        label: '备注',
        field: 'remark',
        type: 'textarea',
        rows: '3',
        rules:[{required: true, message: '请编辑备注', trigger: 'blur'}],
      }
    ],
    form:{
      outputRepositoryId: '',
      inputRepositoryId: '',
      outputDate: '',
      takeGoodsDate: '',
      employeeId: '',
      remark: '',
    }
  },
  {
    title: '调拨接收',
    params:['编辑调拨接收'],
    list:[
      {
        label: '调拨发起单',
        field: 'outputCode',
        type: 'input',
        rules:[{required: true, message: '请编辑调拨发起单', trigger: 'blur'}],
      },
      {
        label: '发起仓',
        field: 'outputRepositoryId',
        type: 'select',
        rules:[{required: true, message: '请选择发起仓', trigger: 'change'}],
      },
      {
        label: '接收仓',
        field: 'inputRepositoryId',
        type: 'select',
        rules:[{required: true, message: '请选择接收仓', trigger: 'change'}],
      },
      {
        label: '调拨日期',
        field: 'inputDate',
        type: 'date',
        rules:[{required: true, message: '请选择调拨日期', trigger: 'change'}],
      },
      {
        label: '操作人员',
        field: 'employeeId',
        type: 'select',
        rules:[{required: true, message: '请选择操作人员', trigger: 'change'}],
      },
      {
        label: '备注',
        field: 'remark',
        type: 'textarea',
        rows: '3',
        rules:[{required: true, message: '请编辑备注', trigger: 'blur'}],
      }
    ],
    form:{
      outputCode: '',
      outputRepositoryId: '',
      inputRepositoryId: '',
      outputDate: '',
      takeGoodsDate: '',
      employeeId: '',
      remark: '',
    }
  },
  {
    title: '付款管理',
    params:['编辑付款管理'],
    list:[
      {
        label: '供应商',
        field: 'outputCode',
        type: 'select',
        rules:[{required: true, message: '请选择供应商', trigger: 'blur'}],
      },
      {
        label: '付款人',
        field: 'outputRepositoryId',
        type: 'select',
        rules:[{required: true, message: '请选择付款人', trigger: 'change'}],
      },
      {
        label: '支付方式',
        field: 'inputRepositoryId',
        type: 'select',
        rules:[{required: true, message: '请选择支付方式', trigger: 'change'}],
      },
      {
        label: '采购入库单',
        field: 'employeeId',
        type: 'input',
        rules:[{required: true, message: '请编辑采购入库单', trigger: 'change'}],
      },
      {
        label: '备注',
        field: 'remark',
        type: 'textarea',
        rows: '3',
        rules:[{required: true, message: '请编辑备注', trigger: 'blur'}],
      }
    ],
    form:{
      outputCode: '',
      outputRepositoryId: '',
      inputRepositoryId: '',
      outputDate: '',
      takeGoodsDate: '',
      employeeId: '',
      remark: '',
    }
  },
]
const tables = [
  {
    title: '日常盘点',
    params:['编辑日常盘点'],
    list:[
      {
        label: '商品编码',
        field: 'goodsCode',
        type: 'default',
      },
      {
        label: '商品名称',
        field: 'goodsName',
        type: 'default',
      },
      {
        label: '车品牌',
        field: 'carBrand',
        type: 'default',
      },
      {
        label: '车型',
        field: 'carModel',
        type: 'default',
      },
      {
        label: '规格',
        field: 'carType',
        type: 'default',
      },
      {
        label: '单位',
        field: 'goodsUnit',
        type: 'default',
      },
      {
        label: '总库存数量',
        field: 'totalRepositoryNum',
        type: 'default',
      },
      {
        label: '在途数量',
        field: 'loadNum',
        type: 'default',
      },
      {
        label: '可盘点库存数量',
        field: 'repositoryNum',
        type: 'default',
      },
      {
        label: '本次盘点数量',
        field: 'num',
        type: 'input',
      },
      {
        label: '库存差异数',
        field: 'reduceNum',
        type: 'default',
      },
      {
        label: '备注',
        field: 'remark',
        type: 'default',
      },
      {
        label: '操作',
        type: 'button',
        list:[
          {
            text: '删除'
          }
        ]
      }
    ]
  },
  {
    title: '调拨发起',
    params:['编辑调拨发起'],
    list:[
      {
        label: '商品编码',
        type:'default' ,
        field: 'goodsCode',
      },
      {
        label: '商品名称',
        type:'default' ,
        field: 'goodsName',
      },
      {
        label: '车品牌',
        type:'default' ,
        field: 'carBrand',
      },
      {
        label: '车型',
        type:'default' ,
        field: 'carModel',
      },
      {
        label: '规格',
        type:'default' ,
        field: 'carType',
      },
      {
        label: '单位',
        type:'default' ,
        field: 'goodsUnit',
      },
      {
        label: '库存数量',
        type:'default' ,
        field: 'repositoryNum',
      },
      {
        label: '调拨发起数量',
        type:'default' ,
        field: 'allotNun',
      },
      {
        label: '已接收数量',
        type:'default' ,
        field: 'receiveNum',
      },
      {
        label: '本次发起数量',
        type:'input' ,
        field: 'num',
      },
      {
        label: '操作',
        type: 'button',
        list:[
          {
            text: '删除'
          }
        ]
      }
    ]
  },
  {
    title: '调拨接收',
    params:['编辑调拨接收'],
    list:[
      {
        label: '商品编码',
        type:'default' ,
        field: 'goodsCode',
      },
      {
        label: '商品名称',
        type:'default' ,
        field: 'goodsName',
      },
      {
        label: '车品牌',
        type:'default' ,
        field: 'carBrand',
      },
      {
        label: '车型',
        type:'default' ,
        field: 'carModel',
      },
      {
        label: '规格',
        type:'default' ,
        field: 'carType',
      },
      {
        label: '单位',
        type:'default' ,
        field: 'goodsUnit',
      },
      {
        label: '调拨发起数量',
        type:'default' ,
        field: 'allotNun',
      },
      {
        label: '已接收数量',
        type:'default' ,
        field: 'receiveNum',
      },
      {
        label: '本次接收数量',
        type:'input' ,
        field: 'num',
      },
      {
        label: '操作',
        type: 'button',
        list:[
          {
            text: '删除'
          }
        ]
      }
    ]
  },
  {
    title: '付款管理',
    params:['编辑付款管理'],
    list:[
      {
        label: '商品名称',
        type:'default' ,
        field: 'goodsName',
      },
      {
        label: '单位',
        type:'default' ,
        field: 'goodsUnit',
      },
      {
        label: '车品牌',
        type:'default' ,
        field: 'carBrand',
      },
      {
        label: '车型',
        type:'default' ,
        field: 'carModel',
      },
      {
        label: '规格',
        type:'default' ,
        field: 'carType',
      },
      {
        label: '入库数量',
        type:'default' ,
        field: 'allotNun',
      },
      {
        label: '采购单价',
        type:'default' ,
        field: 'receiveNum',
      },
      {
        label: '应付金额',
        type:'input' ,
        field: 'num',
      },
      {
        label: '已付金额',
        type:'input' ,
        field: 'num',
      },
      {
        label: '未付金额',
        type:'input' ,
        field: 'num',
      },
      {
        label: '操作',
        type: 'button',
        list:[
          {
            text: '删除'
          }
        ]
      }
    ]
  },
]
const dialogTable = [
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
    key: '商品单位',
    field: 'goodsUnit',
  },
  {
    key: '车品牌',
    field: 'carBrand',
  },
  {
    key: '车型号',
    field: 'carModel',
  },
  {
    key: '规格',
    field: 'carType',
  },
  {
    key: '总库存数',
    field: 'totalRepositoryNum',
  },
  {
    key: '库存数量',
    field: 'repositoryNum',
  },
  {
    key: '在途数量',
    field: 'loadNum',
  },
  {
    key: '备注',
    field: 'remark',
  }
]


import {mapActions, mapState} from 'vuex'
import MyBottom from '@/components/common/bottom'
export default {
  name: '',
  components:{
    MyBottom,
  },
  data () {
    return {
      visibleDialog: false,
      forms,
      tables,
      dialogTable,
      list:[], // 页面中的表格
      temp_select:[], // dialog -- 表格选择的临时数组
    }
  },
  computed:{
    ...mapState({
      'stores': state => state.Select.storeList,
      'employees': state => state.Select.employeeList,
      'SellingStoreGoods': state => state.Select.sellingStore.SellingStoreGoods,
      'total': state => state.Select.sellingStore.total,
      'currPageNo': state => state.Select.sellingStore.currPageNo
    }),
    formList(){
     let data = this.forms.filter(item => item.params.includes(this.pathChange)) && 
              this.forms.filter(item => item.params.includes(this.pathChange))[0]
      data.list.map(item => {
        if(item.field === 'outputRepositoryId'){
          item = Object.assign(item, {list: this.stores})
        }else if(item.field === 'inputRepositoryId'){
          item = Object.assign(item, {list: this.stores})
        }else if(item.field === 'employeeId'){
          item = Object.assign(item, {list: this.employees})
        }else if(item.field === 'repositoryId'){
          item = Object.assign(item, {list: this.stores})
        }
      })
      return data
    },
    tableList(){
      let data = this.tables.filter(item => item.params.includes(this.pathChange)) && 
            this.tables.filter(item => item.params.includes(this.pathChange))[0] && 
              this.tables.filter(item => item.params.includes(this.pathChange))[0].list 
      return data
    },
    pathChange(){
      let data = this.$route.query
      return data.child || data.subMenu
    },
    query(){
      let data = this.$route.query.data
      data = data && JSON.parse(data)
      return data
    },
    disabled(){
      if(!this.query) return false
      if(this.query && this.query.status === 0){
        return false
      }else{
        return true
      }
    }
  },
  methods: {
    ...mapActions({
      'getSellingGoodsList': 'getSellingGoodsList',
      'getSellingStores': 'getSellingStores',
      'getEmployeeList': 'getEmployeeList',
      'sellingStoreSendPost': 'sellingStoreSendPost',
      'sellingStoreSendPut': 'sellingStoreSendPut',
      'getReciverGoods': 'getReciverGoods',
      'sellingStoreReciverPost': 'sellingStoreReciverPost',
      'sellingStoreReciverPut': 'sellingStoreReciverPut',
      'sellingStoreCheckPost': 'sellingStoreCheckPost',
      'sellingStoreCheckPut': 'sellingStoreCheckPut'
    }),
    /**
     * select框change事件
     */
    handleChange(item){
      console.log(item, this.formList.form)
    },
    /**
     * 切换对话框 -- dialog 
     * 选择商品列表
     */
    handleOpenDialog(){
      if(this.pathChange === '编辑调拨发起'){
        if(this.formList.form && this.formList.form.outputRepositoryId){
          this.getSellingGoodsList({outputRepositoryId: this.formList.form.outputRepositoryId}).then(res => {
            this.visibleDialog = true
          })
        }else {
          _g.toastMsg({
            type: 'error',
            msg: '请选择发起仓库'
          })
        }
      }else if(this.pathChange === '编辑调拨接收'){
        if(this.formList.form && this.formList.form && this.formList.form.outputCode){
          this.getReciverGoods({outputCode: this.formList.form.outputCode}).then(res => {
            if(res.status === 0){
              this.formList.form = {...this.formList.form, ...res.data.OutRepository}
              this.list = res.data.list
            }
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请编辑调拨发起单'
          })
        }
      }else if(this.pathChange === '编辑日常盘点'){
        if(this.formList.form && this.formList.form.repositoryId){
          this.getSellingGoodsList({outputRepositoryId: this.formList.form.repositoryId}).then(res => {
            this.visibleDialog = true
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请先选择仓库'
          })
        }
      }
    },
    /**
     * 表格的选择事件
     */
    handleTableSelect(e){
      this.temp_select = e.map(item => {
        return {...item, allotNun: item.allotNun ? item.allotNun : 0, receiveNum: item.receiveNum ? item.receiveNum : 0, num: item.num ? item.num : 0, reduceNum: 0}
      })
    },
    /**
     * dialog对话框的钩子
     */
    handleDialogCancel(){
      this.visibleDialog = false
    },
    handleDialogSubmit(){
      setTimeout(() => {
        this.visibleDialog = false
        this.list = this.list.concat(this.temp_select)
      }, 500)
    },
    /**
     * 分页
     */
    getCurrent(e){
      this.getSellingGoodsList({outputRepositoryId: this.formList.form.outputRepositoryId, currPageNo: e})
    },
    /**
     * 删除商品列表的item
     */
    handleDelItem(item, $index){
      this.list.splice($index, 1)
    },

    handleClickSubmit(status){
      let data = this.list.map(item => {
        if(this.pathChange === '编辑调拨发起'){
          return {repositoryGoodId: item.id, num: Number(item.num)}
        }else if(this.pathChange === '编辑调拨接收'){
          return {outputInfoId: item.id, num: Number(item.num)}
        }else if(this.pathChange === '编辑日常盘点'){
          return {repositoryGoodId: item.id, repositoryNum: item.repositoryNum, loadNum: item.loadNum, num: item.num}
        }
      })
      if(!this.list.length) {
        _g.toastMsg({
          type: 'error',
          msg: '请选择商品列表'
        })
        return
      }
      this.$refs.myForm.validate(valid => {
        if(valid){
          let form = {...this.formList.form, data: JSON.stringify(data), status}
          if(this.pathChange === '编辑调拨发起'){
            this.sellingStoreSendPost({form}).then(res => {
              res.status === 0 && this.handleClickCancel()
            })
          }
          if(this.pathChange === '编辑调拨接收'){
            this.sellingStoreReciverPost({form}).then(res => {
              res.status === 0 && this.handleClickCancel()
            })
          } 
          if(this.pathChange === '编辑日常盘点'){
            this.sellingStoreCheckPost({form}).then(res => {
              res.status === 0 && this.handleClickCancel()
            })
          }
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请编辑必填项目之后提交'
          })
        }
      })
    },

    handleClickCancel(){
      this.$refs.myForm.resetFields()
      this.list = []
      setTimeout(()=>{
        this.$router.go(-2)
      }, 1000)
    },

    /**
     * 商品列表中的inputchange事件
     * 计算差异额
     */
    handleChangeInput(){
      if(this.pathChange === '编辑日常盘点'){
        this.list.map(item => {
          item = Object.assign(item, {reduceNum: item.num - item.repositoryNum})
        })
      }
    }
  },
  created(){
    this.getSellingStores()
    this.getEmployeeList()
    Object.keys(this.formList.form).map(item => {
      this.formList.form[item] = ''
    })
    if(this.query && this.query.id){
      if(this.pathChange === '编辑调拨发起'){
        this.sellingStoreSendPut({id: this.query.id}).then(res => {
          this.formList.form = {...this.formList.form, ...res.data.outInfo}
          this.list = res.data.list
        })
      }else if(this.pathChange === '编辑调拨接收'){
        this.sellingStoreReciverPut({id: this.query.id}).then(res => {
          this.formList.form = {...this.formList.form, ...res.data.inputInfo, outputCode: res.data.inputInfo.inputCode}
          this.list = res.data.list
        })
      }else if(this.pathChange === '编辑日常盘点'){
        this.sellingStoreCheckPut({id: this.query.id}).then(res => {
          this.formList.form = {...this.formList.form, ...res.data.check}
          this.list = res.data.list.map(item => {
             return item = Object.assign(item, {reduceNum: item.num - item.repositoryNum})
          })
        })
      }
    }
  },
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
  .table-area{
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
    .table-area__title{
      @include flex-box(row, nowrap, space-between, center);
      height: 50px;
      padding: 0 15px;
      margin-bottom: 15px;
      line-height: 50px;
      border-bottom: 1px solid #eee;
      background-color: #fff;
    }
  }
  .btn-area{
    height: 50px;
    padding-right: 20px;
    text-align: right;
    background-color: #fff;
  }
}
</style>
