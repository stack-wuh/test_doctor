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
              <el-select disabled v-if="item.type === 'select1'" v-model="formList.form[item.field]" >
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
        <el-button v-if="!disabled" @click="handleOpenDialog" type="primary" >{{rules_arr1.includes(pathChange) ? '搜索' : '添加'}}</el-button>
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
        <el-table-column align="center" v-for="(item, index) in dialogTableList" :key="index" :label="item.key" :prop="item.field"></el-table-column>
      </el-table>
      <my-bottom v-if="!can_show_pagination.includes(this.pathChange)" type="pagination" :total="total" :currentPage='currPageNo' @getCurrent="getCurrent" ></my-bottom>
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
        label: '采购入库单',
        field: 'storageCode',
        type: 'input',
        rules:[{required: true, message: '请编辑采购入库单号', trigger: 'change'}],
      },
      {
        label: '供应商',
        field: 'supplierId',
        type: 'select',
        rules:[{required: true, message: '请选择供应商', trigger: 'blur'}],
      },
      {
        label: '付款人',
        field: 'userId',
        type: 'select',
        rules:[{required: true, message: '请选择付款人', trigger: 'change'}],
      },
      {
        label: '支付方式',
        field: 'payType',
        type: 'select',
        rules:[{required: true, message: '请选择支付方式', trigger: 'change'}],
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
    title: '采购订单',
    params:['编辑采购订单'],
    list:[
      {
        label: '采购人',
        field: 'takerId',
        type: 'select',
        rules:[{required: true, message: '请选择采购人', trigger: 'change'}],
      },
      {
        label: '采购日期',
        field: 'purchaseDate',
        type: 'date',
        rules:[{required: true, message: '请选择采购日期', trigger: 'blur'}],
      },
      {
        label: '供应商名称',
        field: 'supplierId',
        type: 'select',
        rules:[{required: true, message: '请选择供应商名称', trigger: 'change'}],
      },
      {
        label: '物流公司',
        field: 'logisticsId',
        type: 'select',
        rules:[{required: true, message: '请选择支付方式', trigger: 'change'}],
      },
      {
        label: '运费',
        field: 'price',
        type: 'input',
        rules:[{required: true, message: '请编辑运费', trigger: 'input'}],
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
    title: '采购入库',
    params:['编辑采购入库'],
    list:[
      {
        label: '采购订单',
        field: 'purchaseCode',
        type: 'input',
        rules:[{required: true, message: '请编辑采购订单', trigger: 'input'}],
      },
      {
        label: '入库日期',
        field: 'storageDate',
        type: 'date',
        rules:[{required: true, message: '请选择入库日期', trigger: 'change'}],
      },
      {
        label: '供应商名称',
        field: 'supplierId',
        type: 'select',
        rules:[{required: true, message: '请选择供应商名称', trigger: 'change'}],
      },
      {
        label: '仓库名称',
        field: 'repositoryId',
        type: 'select',
        rules:[{required: true, message: '请选择仓库', trigger: 'change'}],
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
      remark: '',
      storageDate: '',
      supplierId: '',
      repositoryId: '',

    }
  },
  {
    title: '采购退货',
    params:['编辑采购退货'],
    list:[
      {
        label: '采购订单',
        field: 'purchaseCode',
        type: 'input',
        rules:[{required: true, message: '请编辑采购订单', trigger: 'input'}],
      },
      {
        label: '退货日期',
        field: 'backDate',
        type: 'date',
        rules:[{required: true, message: '请选择入库日期', trigger: 'change'}],
      },
      {
        label: '退货人',
        field: 'backerId',
        type: 'select',
        rules:[{required: true, message: '请选择供应商名称', trigger: 'change'}],
      },
      {
        label: '仓库名称',
        field: 'repositoryId',
        type: 'select',
        rules:[{required: true, message: '请选择仓库', trigger: 'change'}],
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
      remark: '',
      storageDate: '',
      supplierId: '',
      repositoryId: '',

    }
  },
  {
    title: '业务退货',
    params:['编辑业务退货'],
    list:[
      {
        label: '商品出库单',
        field: 'outRepositoryCode',
        type: 'input',
        rules:[{required: true, message: '请编辑商品出库单', trigger: 'input'}],
      },
      {
        label: '仓库名称',
        field: 'repositoryId',
        type: 'select1',
        rules:[{required: true, message: '请选择仓库', trigger: 'input'}],
      },
      {
        label: '退货日期',
        field: 'backDate',
        type: 'date',
        rules:[{required: true, message: '请选择退货日期', trigger: 'change'}],
      },
      {
        label: '订单状态',
        field: 'OrderStatus',
        type: 'select',
        list:[
          {
            label: '已发货',
            value: 1
          },
          {
            label: '未发货',
            value: 0
          }
        ],
        rules:[{required: true, message: '请选择退货日期', trigger: 'change'}],
      },
      {
        label: '退货原因',
        field: 'remark',
        type: 'textarea',
        rows: '3',
        rules:[{required: true, message: '请编辑备注', trigger: 'blur'}],
      }
    ],
    form:{}
  },
  {
    title: '业务出库',
    params:['编辑业务出库'],
    list:[
      {
        label: '业务单号',
        field: 'orderCode',
        type: 'input',
        rules:[{required: true, message: '请编辑业务单号', trigger: 'input'}],
      },
      {
        label: '仓库名称',
        field: 'repositoryId',
        type: 'select',
        rules:[{required: true, message: '请选择仓库', trigger: 'input'}],
      },
      {
        label: '出库日期',
        field: 'outRepositoryDate',
        type: 'date',
        rules:[{required: true, message: '请选择出库日期', trigger: 'change'}],
      },
      {
        label: '备注',
        field: 'remark',
        type: 'textarea',
        rows: '3',
        rules:[{required: true, message: '请编辑备注', trigger: 'blur'}],
      }
    ],
    form: {}
  }
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
        field: 'repositoryNum',
      },
      {
        label: '采购单价',
        type:'default' ,
        field: 'takePrice',
      },
      {
        label: '应付金额',
        type:'default' ,
        field: 'storageTotalPrice',
      },
      {
        label: '已付金额',
        type:'default' ,
        field: 'price',
      },
      {
        label: '本次实付金额',
        type:'input',
        field: 'alreadyPrice',
      },
      {
        label: '未付金额',
        type:'default' ,
        field: 'unpayNum',
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
    title: '采购订单',
    params:['编辑采购订单'],
    list:[
      {
        label: '商品编码',
        type: 'default',
        field: 'goodsCode'
      },
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
        label: '采购数量',
        type:'input' ,
        field: 'repositoryNum',
      },
      {
        label: '采购单价',
        type:'default' ,
        field: 'takePrice',
      },
      {
        label: '采购总价',
        type: 'default',
        field: 'totalPrice',
      },
      {
        label: '备注',
        type:'default' ,
        field: 'remark',
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
    title: '采购入库',
    params:['编辑采购入库'],
    list:[
      {
        label: '商品编码',
        type: 'default',
        field: 'goodsCode'
      },
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
        label: '采购数量',
        type:'default' ,
        field: 'purchaseNum',
      },
      {
        label: '采购单价',
        type:'default' ,
        field: 'purchasePrice',
      },
      {
        label: '采购总价',
        type: 'default',
        field: 'purchaseTotalPrice',
      },
      {
        label: '已付金额',
        type: 'default',
        field: 'price',
      },
      {
        label: '已入库数量',
        type: 'default',
        field: 'addNum',
      },
      {
        label: '已退货数量',
        type: 'default',
        field: 'backNum',
      },
      {
        label: '入库数量',
        type: 'input',
        field: 'repositoryNum',
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
    title: '采购退货',
    params:['编辑采购退货'],
    list:[
      {
        label: '商品名称',
        type: 'default',
        field: 'goodsClassificationName',
      },
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
        label: '采购数量',
        type:'default' ,
        field: 'purchaseNum',
      },
      {
        label: '采购单价',
        type: 'default',
        field: 'purchasePrice'
      },
      {
        label: '采购总价',
        type: 'default',
        field: 'purchaseTotalPrice'
      },
      {
        label: '已退货数量',
        type:'default' ,
        field: 'backNum',
      },
      {
        label: '入库数量',
        type: 'default',
        field: 'repositoryNum',
      },
      {
        label: '可退货数量',
        type: 'default',
        field: 'returnableNum',
      },
      {
        label: '本次退货数量',
        type: 'input',
        field: 'thisBackNum',
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
    title: '业务退货',
    params:['编辑业务退货'],
    list:[
      {
        label: '商品名称',
        field: 'goodName',
        type: 'default',
      },
      {
        label: '仓库名称',
        field: 'repositoryName',
        type: 'default',
      },
      {
        label: '车品牌',
        field: 'carBrand',
        type: 'default',
      },
      {
        label: '车型号',
        field: 'carModel',
        type: 'default',
      },
      {
        label: '单位',
        field: 'goodUnit',
        type: 'default',
      },
      {
        label: '销售数量',
        field: 'saleNum',
        type: 'default',
      },
      {
        label: '出库数量',
        field: 'outRepositoryNum',
        type: 'default',
      },
      {
        label: '退货数量',
        field: 'backNum',
        type: 'input',
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
    title: '业务出库',
    params:['编辑业务出库'],
    list:[
      {
        label: '商品名称',
        field: 'goodsName',
        type: 'default',
      },
      {
        label: '单位',
        field: 'goodsUnit',
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
        label: '销售数量',
        field: 'saleNum',
        type: 'default',
      },
      {
        label: '已出库数量',
        field: 'outRepositoryNum',
        type: 'default',
      },
      {
        label: '库存数量',
        field: 'repositoryNum',
        type: 'default',
      },
      {
        label: '出库数量',
        field: 'backNum',
        type: 'input',
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
const dialogTable1 = [
  {
    key: '商品名称',
    field: 'goodName',
  },
  {
    key: '仓库名称',
    field: 'repositoryName',
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
    key: '单位',
    field: 'goodUnit',
  },
  {
    key: '销售数量',
    field: 'saleNum',
  },
  {
    key: '出库数量',
    field: 'outRepositoryNum',
  },
  {
    key: '退货数量',
    field: 'backNum',
  }
]
const dialogTable2 = [
      {
        key: '商品名称',
        field: 'goodsName',
        type: 'default',
      },
      {
        key: '单位',
        field: 'goodsUnit',
        type: 'default',
      },
      {
        key: '车品牌',
        field: 'carBrand',
        type: 'default',
      },
      {
        key: '车型',
        field: 'carModel',
        type: 'default',
      },
      {
        key: '规格',
        field: 'carType',
        type: 'default',
      },
      {
        key: '销售数量',
        field: 'saleNum',
        type: 'default',
      },
      {
        key: '已出库数量',
        field: 'outRepositoryNum',
        type: 'default',
      },
      {
        key: '库存数量',
        field: 'repositoryNum',
        type: 'default',
      },
      {
        key: '出库数量',
        field: 'backNum',
        type: 'input',
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
      dialogTable1,
      dialogTable2,

      list:[], // 页面中的表格
      temp_select:[], // dialog -- 表格选择的临时数组

      rules_arr1: ['编辑调拨接收', '编辑付款管理', '编辑采购入库', '编辑采购退货'],
      can_show_pagination: ['编辑业务退货'],
    }
  },
  computed:{
    ...mapState({
      'stores': state => state.Select.storeList,
      'employees': state => state.Select.employeeList,
      'SellingStoreGoods': state => state.Select.sellingStore.SellingStoreGoods,
      'total': state => state.Select.sellingStore.total,
      'currPageNo': state => state.Select.sellingStore.currPageNo,
      'providerList': state => state.Select.providerList,
      'payTypeList': state => state.Select.payTypeList,
      'logisticList': state => state.Select.logisticList,
      'formInfo': state => state.Select.sellingStore.formInfo
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
        }else if(item.field === 'supplierId'){
          item = Object.assign(item, {list: this.providerList})
        }else if(item.field === 'payType'){
          item = Object.assign(item, {list: this.payTypeList})
        }else if(item.field === 'userId'){
          item = Object.assign(item, {list: this.employees})
        }else if(item.field === 'takerId'){
          item = Object.assign(item, {list: this.employees})
        }else if(item.field === 'logisticsId'){
          item = Object.assign(item, {list: this.logisticList})
        }else if(item.field === 'backerId'){
          item = Object.assign(item, {list: this.employees})
        }else if(item.field === 'outRepositoryId'){
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
    },
    canShowButton(){
      let arr = ['编辑采购订单']
      return arr.includes(this.pathChange)
    },
    dialogTableList(){
      if(this.pathChange === '编辑业务退货'){
        return dialogTable1
      }else if(this.pathChange === '编辑业务出库'){
        return dialogTable2
      }else{
        return dialogTable
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
      'sellingStoreCheckPut': 'sellingStoreCheckPut',
      'getProviderList': 'getProviderList',
      'getPayTypeList': 'getPayTypeList',
      'sellingFinancePayPut': 'sellingFinancePayPut',
      'sellingFinancePayPost': 'sellingFinancePayPost',
      'sellingFinancePayInfo': 'sellingFinancePayInfo',
      'getPurchaseList': 'getPurchaseList',
      'getLogisticList': 'getLogisticList',
      'sellingFinancePost': 'sellingFinancePost',
      'getSellingFinanceOrderInfo': 'getSellingFinanceOrderInfo',
      'getSellingFinanceInputInfo': 'getSellingFinanceInputInfo',
      'sellingFinanceInputPost': 'sellingFinanceInputPost',
      'getSellingFinanceInputPutInfo': 'getSellingFinanceInputPutInfo',
      'getSellingFinanceBackPostInfo': 'getSellingFinanceBackPostInfo',
      'sellingFinanceBackPost': 'sellingFinanceBackPost',
      'sellingFinanceBackPost': 'sellingFinanceBackPost',
      'getSellingFinanceBackInfo': 'getSellingFinanceBackInfo',
      'getBusinessInfo': 'getBusinessInfo',
      'sellingBusinessBackPost':'sellingBusinessBackPost',
      'getBusinessOutInfo': 'getBusinessOutInfo',
      'sellingBusinessOutPost': 'sellingBusinessOutPost'
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
            msg: '请编辑调拨发起单后搜索'
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
            msg: '请选择仓库后搜索'
          })
        }
      }else if(this.pathChange === '编辑付款管理'){
        if(this.formList.form && this.formList.form.storageCode){
          this.sellingFinancePayPut({storageCode: this.formList.form.storageCode}).then(res => {
            if(res.status === 0){
              this.formList.form.storageCode = res.data.storage.storageCode
              this.list = res.data.list.map(item => {
                return {...item, unpayNum: item.storageTotalPrice - item.price, alreadyPrice: 0}
              })
            }
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请编辑采购入库单后搜索'
          })
        }
      }else if(this.pathChange === '编辑采购订单'){
        this.getPurchaseList({currPageNo: 1}).then(res => {
          this.visibleDialog = true
          this.SellingStoreGoods.map(item => {
            item = Object.assign(item, {repositoryNum: 0, totalPrice: Number.parseFloat(item.repositoryNum ? item.repositoryNum : 0) * Number.parseFloat(item.takePrice)})
          })
        })
      }else if(this.pathChange === '编辑采购入库'){
        if(this.formList.form && this.formList.form.purchaseCode){
          this.getSellingFinanceInputInfo({purchaseCode: this.formList.form.purchaseCode}).then(res => {
            if(res.status === 0){
              this.list = res.data.infoList.map(item => {
                return {...item, repositoryNum: item.repositoryNum ? item.repositoryNum : 0}
              })
              this.formList.form.purchaseCode = res.data.purchaseOrder.purchaseCode
            }
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请编辑采购订单后搜索'
          })
        }
      }else if(this.pathChange === '编辑采购退货'){
        if(this.formList.form && this.formList.form.purchaseCode){
          this.getSellingFinanceBackPostInfo({purchaseCode: this.formList.form.purchaseCode}).then(res => {
            if(res.status === 0){
              this.list = res.data.list.map(item => {
                return {...item, thisBackNum: item.thisBackNum ? item.thisBackNum : 0}
              })
            }
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请编辑采购订单后搜索'
          })
        }
      }else if(this.pathChange === '编辑业务退货'){
        if(this.formList.form && this.formList.form.outRepositoryCode){
          this.getBusinessInfo({outRepositoryCode: this.formList.form.outRepositoryCode, currPageNo: 1}).then(res => {
            this.visibleDialog = true
            this.formList.form.repositoryId = this.formInfo.id
          })
        }else {
          _g.toastMsg({
            type: 'error',
            msg: '请编辑出库单后搜索'
          })
        }
      }else if(this.pathChange === '编辑业务出库'){
        if(this.formList.form && !this.formList.form.orderCode) return _g.toastMsg({type: 'error', msg: '请编辑业务单号后搜索'})
        if(this.formList.form && !this.formList.form.repositoryId) return _g.toastMsg({type: 'error', msg: '请选择仓库后搜索'})
        this.getBusinessOutInfo({orderCode: this.formList.form.orderCode, repositoryId: this.formList.form.repositoryId}).then(res => {
            this.visibleDialog = true
        })
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
      if(this.pathChange === '编辑采购订单'){
        this.getPurchaseList({currPageNo: e})
      }else{
        this.getSellingGoodsList({outputRepositoryId: this.formList.form.outputRepositoryId, currPageNo: e})
      }
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
        }else if(this.pathChange === '编辑付款管理'){
          return {storageInfoId: item.id, alreadyPrice: item.alreadyPrice}
        }else if(this.pathChange === '编辑采购订单'){
          return {goodsId: item.id, num: item.num, price: item.price, totalPrice: item.totalPrice, remark: item.remark}
        }else if(this.pathChange === '编辑采购入库'){
          return {purchaseInfoId: item.id, price: item.price, backNum: item.backNum, repositoryNum: item.repositoryNum}
        }else if(this.pathChange === '编辑采购退货'){
          return {purchaseInfoId: item.id, thisBackNum: item.thisBackNum}
        }else if(this.pathChange === '编辑业务退货'){
          return {goodId: item.goodId, num: item.backNum}
        }else if(this.pathChange === '编辑业务出库'){
          return {goodId: item.goodId, num: item.backNum}
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
          if(this.pathChange === '编辑付款管理'){
            this.sellingFinancePayPost({form}).then(res => {
              res.status === 0 && this.handleClickCancel()
            })
          }
          if(this.pathChange === '编辑采购订单'){
            this.sellingFinancePost({form}).then(res => {
              res.status === 0 && this.handleClickCancel()
            })
          }
          if(this.pathChange === '编辑采购入库'){
            this.sellingFinanceInputPost({form}).then(res => {
              res.status === 0 && this.handleClickCancel()
            })
          }
          if(this.pathChange === '编辑采购退货'){
            this.sellingFinanceBackPost({form}).then(res => {
              res.status === 0 && this.handleClickCancel()
            })
          }
          if(this.pathChange === '编辑业务退货'){
            form = {...form, goodsData: JSON.stringify(data)}
            this.sellingBusinessBackPost({form: {...form, outRepositoryId: this.formInfo.outRepositoryId}}).then(res => {
              res.status === 0 && this.handleClickCancel()
            })
          }
          if(this.pathChange === '编辑业务出库'){
            form = {...form, goodsData: JSON.stringify(data)}
            this.sellingBusinessOutPost({form}).then(res => {
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
          item = Object.assign(item, {reduceNum: (item.num - item.repositoryNum).toFixed(2)})
        })
      }else if(this.pathChange === '编辑付款管理'){
        this.list.map(item =>{
          let unpayNum = Number.parseFloat(item.storageTotalPrice) - Number.parseFloat(item.price) - Number.parseFloat(item.alreadyPrice)
          item = Object.assign(item, {unpayNum})
        })
      }else if(this.pathChange === '编辑采购订单'){
        this.list.map(item => {
          let totalPrice = item.repositoryNum * Number.parseFloat(item.takePrice)
          item = Object.assign(item, {totalPrice})
        })
      }
    }
  },
  created(){
    if(this.pathChange === '编辑付款管理'){
      this.getProviderList()
      this.getPayTypeList()
      this.getEmployeeList()
    }else if(this.pathChange === '编辑采购订单'){
      this.getProviderList()
      this.getLogisticList()
      this.getEmployeeList()
    }else if(this.pathChange === '编辑采购入库'){
      this.getProviderList()
      this.getSellingStores()
    }else if(this.pathChange === '编辑业务出库'){
      this.getSellingStores()
    }else {
      this.getSellingStores()
      this.getEmployeeList()
    }
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
      }else if(this.pathChange === '编辑付款管理'){
        this.sellingFinancePayInfo({id: this.query.id}).then(res =>{
          this.formList.form = {...this.formList.form, ...res.data.pay}
          this.list = res.data.list.map(item => {
            return {...item, unpayNum: Number.parseFloat(item.storageTotalPrice) - Number.parseFloat(item.price), alreadyPrice: 0}
          })
        })
      }else if(this.pathChange === '编辑采购订单'){
        this.getSellingFinanceOrderInfo({id: this.query.id}).then(res => {
          this.formList.form = {...this.formList.form, ...res.data.purchaseOrder}
          this.list = res.data.goodsList
        })
      }else if(this.pathChange === '编辑采购入库'){
        this.getSellingFinanceInputPutInfo({id: this.query.id}).then(res => {
          this.list = res.data.list
          this.formList.form = {...this.formList.form, ...res.data.storeage}
        })
      }else if(this.pathChange === '编辑采购退货'){
        this.getSellingFinanceBackInfo({id: this.query.id}).then(res => {
          this.list = res.data.list
          this.formList.form = {...this.formList.form, ...res.data.purchaseBack}
        })
      }else if(this.pathChange === '编辑业务退货'){
        this.formList.form = {...this.formList.form, ...this.query, outRepositoryCode: this.query.backCode, OrderStatus: this.query.status}
        // this.getBusinessInfo({outRepositoryCode: this.query.backCode})
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
