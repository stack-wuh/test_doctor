<template>
  <section class="warpper" >
    <el-dialog :visible.sync="visibleDialog" :title="title" :before-close="beforeClose">
      <section class="upload-box">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="uploadUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :auto-upload="true"
          :file-list="fileList"
          name="upload_file"
          >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">请选择Excel表格文件</div>
        </el-upload>
      </section>
      <span slot="footer">
        <el-button @click="handleHideDialog" >取消</el-button>
        <el-button @click="handleSubmit" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'dialogWithImport',
  props:{
    title:{
      type:String,
      required:true,
      default:'导入文件'
    }
  },
  data () {
    return {
      uploadUrl:window.rootPath + '/store/uploadPictures.do',
      fileList:[]
    }
  },
  computed:{
    ...mapState({
      'visibleDialog':'visibleDialogWithImport'
    }),
    pathChange(){
      return this.$route.query.child || this.$route.query.subMenu
    }
  },
  methods: {
    ...mapActions({
      'couponReciverList': 'couponReciverList',
      'couponMember': 'couponImportExcel',
      'goodsImport':'platformGoodsImport',
      'platformProjectImport':'platformProjectImport'
    }),
    beforeClose(){
      this.handleHideDialog()
    },
    handleHideDialog(){
      this.fileList = []
      this.$store.commit('handleDialogWithImport', {visible: false})
    },
    handleSuccess(file, fileList){
      this.fileList = [...this.fileList, fileList]
    },
    handlePreview(){

    },
    handleRemove(file, fileList){
      this.fileList = fileList
    },
    handleSubmit(){
      switch(this.pathChange){
        case '会员列表' : return this.$store.dispatch('memberInfoImport', {path: this.pathChange, form:{fileName: this.fileList.map(item => item.response.data)}}).then(res => this.handleHideDialog())
        case '查看领取明细' : return this.couponReciverList({path: this.pathChange, form: {fileName: this.fileList.map(item => item.response.data)}}).then(res => res.status == 0 && this.handleHideDialog())
        case '用户卡券管理' : return this.couponMember({path: this.pathChange, form: {fileName: this.fileList.map(item => item.response.data)}}).then(res => res.status == 0 && this.handleHideDialog())
        case '商品设置' : return  this.goodsImport({path: this.pathChange, form: {fileName: this.fileList.map(item => item.response.data)}}).then(res => res.status == 0 && this.handleHideDialog())
        case '项目设置' : return  this.platformProjectImport({path: this.pathChange, form: {fileName: this.fileList.map(item => item.response.data)}}).then(res => res.status == 0 && this.handleHideDialog())
      }
    }
  }
}
</script>

<style scoped lang='scss' >

</style>
