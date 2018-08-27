<template>
  <section class="wrapper">
    <section class="content">
      <section class="form inter-box">
        <p class="t-title">{{this.$route.query.child}}</p>
        <el-form label-width="140px">
          <section class="inline-box" v-for="(item,index) in formatFormItem" :key="index"  >
            <el-form-item :label="item.label">
              <el-input clearable v-if="item.type == 'input'" class="my-input-220" v-model="item.value" ></el-input><span class="tips">{{item.tips}}</span>
              <el-select @change="item.change" clearable v-if="item.type == 'select'" v-model="item.value">
                <el-option v-for="(list,lid) in item.list" :label="list.label" :value="list.value" :key="lid"></el-option>
              </el-select>
              <el-radio-group v-if="item.type == 'radio'" v-model="item.value" >
                <el-radio v-for="(list,lindex) in item.list" :key="lindex" :label="list.value">{{list.label}}</el-radio>
              </el-radio-group>
              <el-input type="textarea" placeholder="请编辑" v-if="item.type == 'textarea' && formatFormItem[0].value == 0" v-model="item.value" :style="item.style"></el-input>
              <el-select v-if="item.type == 'textarea' && (formatFormItem[0].value !== 0 && formatFormItem[0].value !=='') " placeholder="请选择" v-model="item.value">
                <el-option v-for="(sub,sid) in item.list" :key="sid" :label="sub.label" :value="sub.value"></el-option>
              </el-select>
            </el-form-item>
          </section>
        </el-form>
      </section>
      <section class="inter-box" v-if="$route.query.child == '会员卡积分规则'">
        <p class="t-title">积分消费规则</p>
        <el-table class="my-table" :data="integralRules" stripe border>
          <el-table-column align="center" label="操作项">
            <template slot-scope="scope" >
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="设置项">
            <template slot-scope="scope">
              <el-input v-model="scope.row.value" :placeholder="'请编辑' + scope.row.name + '消费规则'" >
                <template slot="append" >
                  (/每次)
                </template>
              </el-input>
            </template>
          </el-table-column>
        </el-table>
        <section class="flex-box inter-box">
          <p class="t-title" >消费返积分</p>
          <el-button @click="visibleDialog = true" type="small">编辑</el-button>
        </section>
        <el-table class="my-table" :data="formatInterList" stripe border >
          <el-table-column align="center" label="消费满(元)" prop="range"></el-table-column>
          <el-table-column align="center" label="赠送积分" prop="integral"></el-table-column>
        </el-table>
        <p class="t-title">积分抵现</p>
        <el-table class="my-table" :data="list" stripe border>
          <el-table-column align="center" label="会员等级" prop="price"></el-table-column>
          <el-table-column align="center" label="最高可抵现" prop="integral"></el-table-column>
        </el-table>
        <p class="t-title">注:可与优惠券叠加使用.抵现比例为: 100积分=1元.每单最高可抵扣金额与会员等级相关.</p>
      </section>
      <section class="btn-area">
          <bottom type="button" :formData="formatFormItem" />
      </section>
      <el-dialog title="编辑积分消费规则" :visible.sync="visibleDialog">
        <el-table class="my-table" :data="formatInterList" stripe border >
          <el-table-column align="center" label="消费满(元)" prop="range"></el-table-column>
          <el-table-column align="center" label="赠送积分" prop="integral">
            <template slot-scope="scope">
                <el-input v-model="scope.row.integral" placeholder="请编辑赠送的积分"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer">
          <el-button @click="visibleDialog = false" >取消</el-button>
          <el-button @click="handleSubmitIntegralRule" type="primary">确定</el-button>
        </div>
      </el-dialog>
    </section>
  </section>
</template>

<script>
import Bottom from '@/components/common/bottom'
import { mapActions , mapState ,mapGetters} from 'vuex'
/**
 * 组件需要参数 route.query.child
 * 会员卡积分规则发布 
 * 关注后消息推送
 */
export default {
  name: 'curbRule',
  components:{
    Bottom,
  },
  data () {
    return {
      visibleDialog:false,
      list:[
        {
          price:'0-20',
          intergal:1,
        },
        {
          price:'21-100',
          intergal:9,
        },
        {
          price:'101-500',
          intergal:29,
        },
        {
          price:'1001-2000',
          intergal:79,
        },
        {
          price:'2001-5000',
          intergal:599,
        },
        {
          price:'5001-',
          intergal:899,
        },
      ],
      form:[
        {
          name:'会员卡积分规则',
          list:[
            {
              label:'换算规则积分',
              type:'input',
              value:'',
              prop:'ruleIntegra',
              tips:'一个积分可抵扣金额(元)'
            },
            {
              label:'首次关注',
              type:'input',
              value:'',
              prop:'firstConcern',
              tips:'永久一次'
            },
            {
              label:'完善个人信息',
              type:'input',
              value:'',
              prop:'improvePersonal',
              tips:'永久一次'
            },
            {
              label:'完善车辆信息',
              type:'input',
              value:'',
              prop:'improveVehicle',
              tips:'永久一次'
            },
            {
              label:'分享活动',
              type:'input',
              value:'',
              prop:'sharingActivities',
              tips:'永久一次'
            },
            {
              label:'登录/每日访问',
              type:'input',
              value:'',
              prop:'dailyAccess',
              tips:'每天三次'
            },
            {
              label:'抽奖活动',
              type:'input',
              value:'',
              prop:'luckyDraw',
              tips:'每次'
            },
            {
              label:'推荐有礼',
              type:'input',
              value:'',
              prop:'recommend',
              tips:'每个活动每次'
            },
            {
              label:'在线预约',
              type:'input',
              value:'',
              prop:'appointment',
              tips:'每天一次'
            },
            {
              label:'在线预定',
              type:'input',
              value:'',
              prop:'booking',
              tips:'每天一次'
            },
            {
              label:'意见反馈',
              type:'input',
              value:'',
              prop:'feedback',
              tips:'采纳奖励'
            },
            {
              label:'问卷调查',
              type:'input',
              value:'',
              prop:'survey',
              tips:'每次'
            },
            {
              label:'续保询价',
              type:'input',
              value:'',
              prop:'renewInquiry',
              tips:'每天一次'
            },
          ]
        },
        {
          name:'关注后消息推送',
          list:[
            {
              label:'推送消息',
              type:'select',
              value:'',
              prop:'pushType',
              list:[
                {
                  label:'文本',
                  value:0
                },
                {
                  label:'套餐',
                  value:1
                },
                {
                  label:'活动',
                  value:2
                },
                {
                  label:'卡券',
                  value:3
                }
              ],
              change:this.handleChange
            },
            {
              label:'推送内容',
              type:'textarea',
              value:'',
              list:[],
              prop:'pushContent',
              style:'width:320px',
            },
            {
              label:'是否推送',
              type:'radio',
              value:'',
              prop:'whetherPush',
              list:[
                {
                  label:'推送',
                  value:1
                },
                {
                  label:'不推送',
                  value:0
                }
              ]
            }
          ]
        }
      ],
      integralRules:[
        {
          name:'抽奖活动',
          value:'',
          prop:'',
        },
        {
          name:'新品试用',
          value:'',
          prop:'',
        }
      ],
    }
  },
  computed:{
    ...mapState({
      'data' : state => state.System.data ,
      'interList':state => state.System.list1 ,
    }),
    ...mapGetters({
      'formatInterList' : 'formatInterForConsume',
      'pushList':'formatPushList'
    }),
    formItem(){
      return this.form.find(item => item.name === this.$route.query.child).list
    },
    formatFormItem(){
      let keys =  this.data && Object.keys(this.data)
       keys && keys.map(item => {
        this.formItem.map(list => {
          if(list.prop === item){
            list.value = this.data[item]
          }
          list.id = this.data.id ? this.data.id : ''
        })
      })
      return this.formItem
    }
  },
  watch:{
    pushList(){
      this.$set(this.formatFormItem[1], 'list', this.pushList)
      console.log(this.pushList)
    }
  },
  methods: {
    ...mapActions({
      'getInterList':'couponIntergalForConsume',
      'getInterListRules':'getCouponIntegralRules',
      'getPushList' : 'getPushList'
    }),
    /**
     * 积分消费规则
     * 编辑与发布
     */
    handleSubmitIntegralRule(){
      let form = this.formatInterList.map(item => {
        return {moneyMin:item.moneyMin, moneyMax:item.moneyMax, integral:item.integral, id:item.id}
      })
      form = JSON.stringify(form)
      this.$http.post('platform/addOrUpIntegralReturn.do', {data:form}, res => {
        if(res.status == 0){
          _g.toastMsg({
            type:'success',
            msg:res.msg
          })
          setTimeout(()=>{
             this.visibleDialog = false
          },1000)
        }
      })
    },
    handleChange(e){
      this.$store.dispatch('getPushList', {pushType:e})
    }
  } , 
  created(){
    this.getInterList()
    this.getInterListRules()
    this.getPushList()
  },
}
</script>

<style scoped lang='scss' >
.wrapper{
  height: calc(100% - 20px);
  .content{
    background-color: #fff;
    section.form{
      margin:15px 0;
      .el-form{
        display: flex;
        flex-flow: row wrap;
        .el-form-item{
          .el-input{
            margin-right:15px;
            +span{
              color: #999;
            }
          }
        }
      }
    }
    section.inter-box{
      p{
        margin-bottom:15px;
      }
      p.t-title{
        margin-left: 15px;
        color: #999;
      }
      .my-table{
        width: 95%;
        margin:0 auto;
      }
    }
    section.btn-area{
      margin:15px 0;
      text-align: center;
    }
    section.inline-box{
      width: 50%;
    }
    .flex-box{
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      margin:15px 0;
      .el-button{
        margin-right: 3%;
      }
    }
  }
  .btn-area{
    padding-bottom:10px;
  }
}
</style>
