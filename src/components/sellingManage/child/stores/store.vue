<template>
  <section class="store-wrapper">
    <el-dialog title="编辑" :visible.sync="visibleDialog">
      <section class="form-area">
        <el-form>

        </el-form>
      </section>
      <section class="table-area"></section>
    </el-dialog>
  </section>
</template>

<script>
const forms = [
  {
    title: '日常盘点',
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
  }
]

export default {
  name: '',

  data () {
    return {
      visibleDialog: true
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >

</style>
