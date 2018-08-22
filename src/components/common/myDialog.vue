<template>
  <section class="wrapper">
      <el-dialog :visible.sync="visibleDialog" ref="myDialog" :before-close="beforeClose" :title=" '编辑' + ($route.query.child || $route.query.subMenu)" >
          <el-form :model="myForm" ref="myForm" label-width="120px">
            <el-form-item v-for="(item,index) in list" :key="index" :label="item.key" :prop="item.prop" :rules="item.rules" >
              <el-input class="my-input-320" v-if="item.type === 'input' || item.type == 'default' || !item.type " :placeholder="'请编辑'+item.key" v-model="myForm[item.prop]" ></el-input>
              <el-input class="my-input-320" v-if="item.type == 'textarea'" :placeholder="'请编辑' + item.key" v-model="myForm[item.prop]" :type="item.type || 'textarea'" :rows="item.rows || 2" ></el-input>
              <el-select class="my-input-320" v-if="item.type === 'select'" :placeholder="'请选择' + item.key" v-model="myForm[item.prop]" >
                <el-option v-if="item.list" v-for="(list,lindex) in item.list" :key="lindex" :label="list.label" :value="list.value" ></el-option>
                <el-option label="aaa" value="aaa" v-else ></el-option>
              </el-select>
              <el-date-picker value-format="yyyy-MM-dd" v-if="item.type == 'date'" v-model="myForm[item.prop]" ></el-date-picker>
              <p v-if="item.tips"  class="c999" >{{item.tips}}</p>
            </el-form-item>
          </el-form>
          {{list}} -- {{myForm}} --- {{formList}}
          <div slot="footer">
            <el-button type="" @click="beforeClose">取消</el-button>
            <el-button type="primary" @click="handleSubmit" >确定</el-button>
          </div>
      </el-dialog>
  </section>
</template>

<script>
import {forms} from './utils/dialog.js'
import {mapActions, mapMutations} from 'vuex'
export default {
  name: 'myDialog',
  
  data () {
    return {
      list:[],
      myForm:{}
    }
  },
  computed:{
    visibleDialog(){
      return this.$store.state.dialogVisible
    },
    rootPath(){
      return this.$route.query.child || this.$route.query.subMenu
    },
    formList(){
      return this.$store.state.tableRow
    },
  },
  watch:{
    rootPath(){
      this.getList()
    },
    formList(){
      this.getList()
    }
  },
  methods: {
    ...mapActions({
      'handleSubmitDep':'depPubAndPut',
      'handleSubmitStaff':'staffPubAndPut',
      'handleSubmitCouponLevel' : 'couponLevelPubAndPut' ,
      'handleSubmitMember' : 'memberPayPubAndPut',
      'handleSubmitKepp':'keepPubAndPut' , 
      'handleSubmitCompany' : 'companyPubAndPut',
      'handleSubmitFaseReply' : 'fastReplyPubAndPut',
    }),
    /**
     * dialog对话框
     * beforeclose钩子
     */
    beforeClose(){
      this.$refs.myForm.resetFields()
      this.$store.commit('handlehideDialog')
    },
    getList(){
      let data = forms.find(item => item.name === this.rootPath)
      this.list = data && data.list
      this.myForm = this.formList ? this.formList : (data && data.myForm)
    },
    handleSubmit(){
     this.$refs.myForm.validate(valid=>{
       if(valid){
        switch(this.rootPath){
          case '部门管理' : this.handleSubmitDep({ path: this.rootPath ,form: this.myForm })
            break;
          case '员工列表' : this.handleSubmitStaff({path: this.rootPath ,form:this.myForm})
            break;
          case '会员卡等级设置' : this.handleSubmitCouponLevel({path: this.rootPath ,form: this.myForm})
            break;
          case '会员充值设置' : this.handleSubmitMember({path: this.rootPath ,form: this.myForm})
            break;
          case '保养提醒设置' : this.handleSubmitKepp({path: this.rootPath ,form: this.myForm})
            break;
          case '保险公司' : this.handleSubmitCompany({path: this.rootPath ,form: this.myForm})
            break;
          case '快捷回复设置' : this.handleSubmitFaseReply({path: this.rootPath ,form: this.myForm})
            break;
        }
        setTimeout(()=>{
          this.$refs.myForm.resetFields()
        },1000)
       }else{
         _g.toastMsg({
           type:'error',
           msg:'请编辑必填项后提交',
         })
       }
     })
    },
  },
  created(){
    this.getList()
  }
}
</script>

<style scoped lang='scss' >

</style>
