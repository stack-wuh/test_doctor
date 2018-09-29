<template>
  <section class="wrapper">
      <el-dialog title="编辑" :visible.sync="isShowDialog" :before-close="cancel">
        <el-form label-width="60px" :model="form" >
          <el-form-item label="顾问">
            <el-select placeholder="请选择顾问" v-model="form.id">
              <el-option v-for="(item,index) in list" :key="index" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-table :data="data" border stripe>
            <el-table-column align="center" label="头像">
              <template slot-scope="scope">
                <img :src="scope.row.wxpic" alt="avatar" />
              </template>
            </el-table-column>
            <el-table-column align="center" label="微信昵称" prop="nickName" ></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="handleDelItem({index: scope.$index})">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <span slot="footer">
          <el-button @click="cancel">取消</el-button>
          <el-button @click="submit" type="primary">确定</el-button>
        </span>
      </el-dialog>
  </section>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
export default {
  name: 'dialogWithTable',
  props:{
    isShowDialog:{
      required:true,
      type: Boolean,
      default: false
    },
    data:{
      required:true,
      type:Array,
      default:[]
    },
    list:{
      required: true,
      type:Array,
      default:[]
    },
    text:{
      required: true,
      type: String,
      default:'',
    }
  },
  data () {
    return {
      form:{
        id:''
      },
    }
  },
  computed:{
    changePath(){
      return this.$route.query.child || this.$route.query.subMenu
    }
  },
  methods: {
    ...mapMutations({
      'beforeClose' : 'clearMemberAddCounselor',
      'handleDelItem' : 'handleDelMemberItem',
    }),
    ...mapActions({
      'handleSubmitMember': 'memberPostCounselor'
    }),
    cancel(){
      this.form = {}
      this.beforeClose()
    },
    submit(){
      let chooseIds = new Set(), form = {}
      this.data.map(item => {
        chooseIds.add(item.id)
      })
      form = {
        id: Array.from(chooseIds).toString(),
        type: this.text === '分配保养顾问' ? '1' : this.text === '分配保险顾问' ? '2' : '3',
        employeeId: this.form.id.toString()
      }
      let result = Object.values(form).every(item => item[0])
      if(result){
        this.handleSubmitMember({form, path: this.changePath}).then(res => {
          setTimeout(() => {
            this.cancel()
          }, 1000);
        })
      }else{
        _g.toastMsg({
          type: 'error',
          msg: '请编辑必填项目后提交!'
        })
      }
      // switch(this.text){
      //   case '分配保养顾问' : return this.handleSubmitMember({id: Array.from(chooseIds).toString()})
      // }
      console.group('start')
      console.log('is clicked')
      console.log(this.text, form)
      console.groupEnd('end')
    }
  }
}
</script>

<style scoped lang='scss' >

</style>
