<template>
  <section class="wrapper">
      <el-dialog title="添加奖品" :visible.sync="isShowDialog" :before-close="beforeClose">
        <el-form label-width="70px" :model="form" >
          <el-form-item label="奖品名称">
              <el-input v-model="keyWord" placeholder="请输入关键字搜索" class="my-input-220"></el-input>
              <el-button @click="handleChange" class="margin-lf-15">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="myTable" :data="list" border stripe>
            <el-table-column align="center" label="奖品名称" prop="couponName"></el-table-column>
            <el-table-column align="center" label="类型" prop="couponType" >
              <template slot-scope="scope">
                <span>{{scope.row.couponType == 0 ? '实物奖品' : '电子代金券'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="有效期" prop="validTill" ></el-table-column>
            <el-table-column align="center" label="总数量" prop="number" ></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="small" @click="handleAddItem(scope.row)" >选取</el-button>
              </template>
            </el-table-column>
        </el-table>
        <my-bottom @getCurrent="getCurrent" :total="total" :currPageNo="currPageNo" />
        <span slot="footer">
          <el-button @click="beforeClose">取消</el-button>
          <el-button @click="handleSubmit" type="primary">确定</el-button>
        </span>
      </el-dialog>
  </section>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import MyBottom from '@/components/common/bottom'
export default {
  name: 'dialogWithTable',
  components:{
    MyBottom,
  },
  props:{
    isShowDialog:{
      required:true,
      type: Boolean,
      default: false
    },
    list:{
      required:true,
      type:Array,
      default:[]
    },
    total:{
      required: true,
      type:Number,
      default:0
    },
    currPageNo:{
      required: true,
      type:Number,
      default:1
    }
  },
  data () {
    return {
      form:{
        id:''
      },
      keyWord:'',
      selection:[],
    }
  },

  methods: {
    ...mapMutations({
      'beforeClose' : 'clearCouponAddModel',
      'handleDelItem' : 'handleDelMemberItem',
      'hideDialog' : 'hideDialog'
    }),
    handleChange(){
      this.$emit('getKeyWord', {keyWord: this.keyWord})
    },
    handleAddItem(row){
      this.selection = [...this.selection, row]
    },
    handleSubmit(){
      this.$emit('getData', {data: this.selection})
      this.hideDialog()
      setTimeout(()=>{
        this.selection = []
      },500)
    },
    getCurrent(e){
      this.$emit('getCurrPageModel', e)
    }
  }
}
</script>

<style scoped lang='scss' >

</style>
