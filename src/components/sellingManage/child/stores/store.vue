<template>
  <section class="store-wrapper">
    {{pathChange}} -- {{formList}}
    <section class="form-area">
      <el-form class="my-form" label-width="100px">
        <section class="form-list">
          <section class="form-item" v-for="(item, index) in formList.list" :key="index">
            <el-form-item v-if="item.type !== 'textarea'" :label="item.label" :prop="item.field">
              <el-input v-if="item.type === 'input'" v-model="formList.form[item.field]" :placeholder="'请编辑' + item.label"></el-input>
              <el-date-picker v-if="item.type === 'date'" v-model="formList.form[item.field]" :placeholder="'请编辑' + item.label" value-format="yyyy-MM-dd" ></el-date-picker>
            </el-form-item>
          </section>
        </section>
        <el-form-item v-if="item.type === 'textarea'" v-for="(item, index) in formList.list" :key="index" :label="item.label" :prop="item.field">
          <el-input style="width: 80%;" v-model="formList.form[item.field]" :placeholder="'请编辑' + item.label" type="textarea" :rows="3" ></el-input>
        </el-form-item>
      </el-form>
    </section>
    <section class="table-area">
      <p class="table-area__title">
        <span>商品列表</span>
        <el-button type="primary" >新增</el-button>
      </p>
      <el-table :data="[{}]" border stripe>
        <el-table-column align="center" v-for="(item, index) in tableList" :label="item.label" :prop="item.field"></el-table-column>
        <el-table-column align="center" v-for="(item, index) in tableList" :label="item.label" :prop="item.field" v-if="item.type === 'button'">
          <template slot-scope="scope">
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="btn-area">
      <el-button type="warning">保存草稿</el-button>
      <el-button type="primary">提交</el-button>
      <el-button type="danger">返回</el-button>
    </section>
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
        field: '',
        type: 'input',
      },
      {
        label: '盘点人员',
        field: '',
        type: 'input',
      },
      {
        label: '调拨日期',
        field: '',
        type: 'date',
      },
      {
        label: '备注',
        field: '',
        type: 'textarea',
        rows: '3',
      }
    ],
    form:{

    },
  },
  {
    title: '调拨发起',
    params:['编辑调拨发起'],
    list:[
      {
        label: '发起仓',
        field: '',
        type: 'input',
      },
      {
        label: '接受仓',
        field: '',
        type: 'input',
      },
      {
        label: '调拨日期',
        field: '',
        type: 'date',
      },
      {
        label: '送货日期',
        field: '',
        type: 'date',
      },
      {
        label: '操作人员',
        field: '',
        type: 'input',
      },
      {
        label: '备注',
        field: '',
        type: 'textarea',
        rows: '3',
      }
    ],
    form:{}
  },
  {
    title: '调拨接收',
    params:['编辑调拨接收'],
    list:[
      {
        label: '调拨发起单',
        field: '',
        type: 'input',
      },
      {
        label: '发起仓',
        field: '',
        type: 'input',
      },
      {
        label: '接受仓',
        field: '',
        type: 'input',
      },
      {
        label: '调拨日期',
        field: '',
        type: 'date',
      },
      {
        label: '操作人员',
        field: '',
        type: 'input',
      },
      {
        label: '备注',
        field: '',
        type: 'textarea',
        rows: '3',
      }
    ],
    form:{}
  },
]
const tables = [
  {
    title: '日常盘点',
    list:[
      {
        label: '商品编码'
      },
      {
        label: '商品名称'
      },
      {
        label: '车品牌'
      },
      {
        label: '车型'
      },
      {
        label: '规格'
      },
      {
        label: '单位'
      },
      {
        label: '总库存数量'
      },
      {
        label: '在途数量'
      },
      {
        label: '可盘点库存数量'
      },
      {
        label: '本次盘点数量'
      },
      {
        label: '库存差异数'
      },
      {
        label: '备注'
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
  }
]

export default {
  name: '',

  data () {
    return {
      visibleDialog: false,
      forms,
      tables,
    }
  },
  computed:{
    formList(){
     return this.forms.filter(item => item.params.includes(this.pathChange)) && 
              this.forms.filter(item => item.params.includes(this.pathChange))[0]
    },
    tableList(){
      return this.tables[0].list
    },
    pathChange(){
      let data = this.$route.query
      return data.child || data.subMenu
    }
  },
  methods: {}
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
