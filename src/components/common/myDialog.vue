<template>
  <section class="wrapper">
      <el-dialog :visible.sync="visibleDialog" ref="myDialog" :before-close="beforeClose" :title=" '编辑' + ($route.query.child || $route.query.subMenu)" >
          <el-form v-if="visibleDialog" :model="myForm" ref="myForm" label-width="120px">
            <el-form-item v-for="(item,index) in formatList" :key="index" :label="item.key" :prop="item.prop" :rules="item.rules" >
              <el-input class="my-input-320" v-if="item.type === 'input' || item.type == 'default' || !item.type " :disabled="item.disabled" :placeholder="'请编辑'+item.key" v-model="myForm[item.prop]" ></el-input>
              <el-input class="my-input-320" v-if="item.type == 'textarea'" :placeholder="'请编辑' + item.key" :disabled="item.disabled" v-model="myForm[item.prop]" :type="item.type || 'textarea'" :rows="item.rows || 2" ></el-input>
              <el-select class="my-input-320" v-if="item.type === 'select' && !item.multiple" :placeholder="'请选择' + item.key" :disabled="item.disabled" v-model="myForm[item.prop]" >
                <el-option v-if="item.list" v-for="(list,lindex) in item.list" :key="lindex" :label="list.label" :value="list.value" ></el-option>
              </el-select>
              <el-select multiple class="my-input-320" v-if="item.type === 'select' && item.multiple" :placeholder="'请选择' + item.key" :disabled="item.disabled" v-model="myForm[item.prop]" >
                <el-option v-if="item.list" v-for="(list,lindex) in item.list" :key="lindex" :label="list.label" :value="list.value" ></el-option>
              </el-select>
              <el-date-picker value-format="yyyy-MM-dd" v-if="item.type == 'date'" :disabled="item.disabled" v-model="myForm[item.prop]"></el-date-picker>
              <el-date-picker v-if="item.type === 'datetime'" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" :disabled="item.disabled" v-model="myForm[item.prop]"></el-date-picker>
              <el-time-select v-if="item.type === 'time'"  :disabled="item.disabled" v-model="myForm[item.prop]"></el-time-select>
              <p v-if="item.tips"  class="c999" >{{item.tips}}</p>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="" @click="beforeClose">取消</el-button>
            <el-button type="primary" @click="handleSubmit" >确定</el-button>
          </div>
      </el-dialog>
  </section>
</template>

<script>
import {forms} from './utils/dialog.js'
import {mapActions, mapMutations, mapGetters, mapState} from 'vuex'
export default {
  name: 'myDialog',
  
  data () {
    return {
      list:[],
      myForm:{
        couponId:[]
      }
    }
  },
  computed:{
    ...mapGetters({
      'departList':'formatDepList',
      'roleList' : 'formatRoleList',
      'couponList': 'formatCouponList',
      'goodsTypeList': 'formatGoodsTypeList',
      'projectsList': 'formatProjectList'
    }),
    ...mapState({
      'department':state => state.Select.department
    }),
    visibleDialog(){
      return this.$store.state.dialogVisible
    },
    rootPath(){
      return this.$route.query.child || this.$route.query.subMenu
    },
    formList(){
      return this.$store.state.tableRow
    },
    formatList(){
      return this.list && this.list.map(item => {
        if(item.key == '上级部门'){
          return {...item ,list: this.department}
        }else if(item.key == '角色类型'){
          if(!item.picker){
            return {...item, list: this.roleList}
          }else{
            return {...item}
          }
        }else if(item.key == '所属部门'){
          return {...item, list: this.departList}
        }else if(item.key == '赠送卡券'){
          return {...item, list:this.couponList}
        }else if(item.key === '使用角色类型'){
          return {...item, list: this.roleList}
        }else if(item.key === '员工角色'){
          return {...item, list: this.roleList}
        }else if(item.key === '商品类型'){
          return {...item, list: this.goodsTypeList}
        }else if(item.key === '项目类型名称'){
          return {...item, list: this.projectsList}
        }else{
          return {...item}
        }
      })
    }
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
      'handleSubmitParts' : 'partsPubAndPut',
      'handleSubmitRole' : 'RolePubAndPut' ,
      'handleSubmitFirstStaff' : 'staffFirstPub',
      'handleSubmitUserCommUp' : 'userCommUp',
      'handleSubmitMemberChecked' : 'couponMemberChecked',
      'feedBackPut' : 'feedBackPut',
      'handerServerCarFeed': 'carFeedPubAndFresh',
      'userSharePubAndFresh':'userSharePubAndFresh',
      'handleServerTime':'serverPrevTimePubAndFresh',
      'handlePlatformProvider': 'platformProviderPub',
      'platformRepositoryPub':'platformRepositoryPub',
      'platformGoodsTypePub':'platformGoodsTypePub',
      'platformGoodsPub':'platformGoodsPub',
      'platformProjectTypePub':'platformProjectTypePub',
      'platformLogisiticPub':'platformLogisiticPub',
      'platformPayPub':'platformPayPub',
      'platformProjectPub':'platformProjectPub',
      'statisticProjectPost': 'statisticProjectPost'
    }),
    /**
     * dialog对话框
     * beforeclose钩子
     */
    beforeClose(){
      setTimeout(()=>{
        this.$refs.myForm && this.$refs.myForm.resetFields()
      },500)
      this.myForm.couponId = []
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
          case '关注用户列表' : this.handleSubmitFirstStaff({path: this.rootPath, form: this.myForm})
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
          case '配件大类管理' : this.handleSubmitParts({path: this.rootPath ,form: this.myForm})
            break;
          case '角色管理' : this.handleSubmitRole({path: this.rootPath ,form: this.myForm})
            break;
          case '用户佣金提现' : this.handleSubmitUserCommUp({path: this.rootPath, form: this.myForm})
            break;
          case '用户卡券管理' : this.handleSubmitMemberChecked({path: this.rootPath, form: this.myForm})
            break; 
          case '意见反馈' : this.feedBackPut({path: this.rootPath, form: this.myForm})
            break;
          case '养车知识分类': this.handerServerCarFeed({path: this.rootPath, form: this.myForm})
            break;
          case '分享与消费奖励规则': this.userSharePubAndFresh({path: this.rootPath, form: this.myForm})
            break;
          case '预约时间管理' : this.handleServerTime({path: this.rootPath, form: this.myForm})
            break;
          case '供应商设置' : this.handlePlatformProvider({path: this.rootPath, form: this.myForm})
            break;
          case '仓库设置' : this.platformRepositoryPub({path: this.rootPath, form: this.myForm})
            break;
          case '商品分类设置' : this.platformGoodsTypePub({path: this.rootPath, form: this.myForm})
            break;
          case '商品设置' : this.platformGoodsPub({path: this.rootPath, form: this.myForm})
            break;
          case '项目分类设置' : this.platformProjectTypePub({path: this.rootPath, form: this.myForm})
            break;
          case '物流公司配置' : this.platformLogisiticPub({path: this.rootPath, form: this.myForm})
            break;
          case '支付方式配置' : this.platformPayPub({path: this.rootPath, form: this.myForm})
            break;
          case '项目设置' : this.platformProjectPub({path: this.rootPath, form: this.myForm})
            break;
          case '配置项目提成' : this.statisticProjectPost({path: this.rootPath, form: this.myForm})
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
