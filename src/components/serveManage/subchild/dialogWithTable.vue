<template>
  <section class="dialog-table-wrapper">
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="beforeClose">
      <slot name="form-area"></slot>
      <el-table :data="formatDialogTable({path})" border stripe>
         <span v-for="(item,index) in tables" :key="index">
           <el-table-column align="center" :label="item.label" :prop="item.field"></el-table-column>
         </span>
      </el-table>
      <span v-if="dialogCanShowFooter" slot="footer">
        <el-button @click="handleClickCancel">取消</el-button>
        <el-button @click="handleClickSubmit">确定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import {mapActions, mapState, mapMutations, mapGetters} from 'vuex'
export default {
  name: '',
  props:{
    title:{
      type:String,
      default:'展示内容'
    },
  },
  data () {
    return {
      tables:[
        {
          label:'状态',
          field:'statusText',
        },
        {
          label:'建议操作',
          field:'suggest',
        },
        {
          label: '下次提醒(天)',
          field:'days',
        },
        {
          label: '维修预估费用',
          field:'price',
        }
      ]
    }
  },
  computed:{
    ...mapState({
      'dialogVisible': state => state.Server.dialogVisible,
      'list': state => state.Server.dialog_arr,
      'dialogCanShowFooter': state => state.Server.dialogCanShowFooter,
      'dialogCanShowForm': state => state.Server.dialogCanShowForm,
    }),
    ...mapGetters({
      'formatDialogTable':'formatDialogTable'
    }),
    path(){
      return this.$route.query.child || this.$route.query.subMenu
    }
  },
  methods: {
    ...mapMutations({
      'toggleDialog': 'serverCarStateToggle'
    }),
    beforeClose(){
      this.toggleDialog()
    },
    handleClickCancel(){
      this.beforeClose()
    },
    handleClickSubmit(){
      this.beforeClose()
    },
  },
}
</script>

<style scoped lang='scss' >

</style>
