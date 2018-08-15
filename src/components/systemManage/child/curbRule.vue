<template>
  <section class="father">
    <section class="content">
      <section class="form" >
        <el-form label-width="140px">
          <el-form-item v-for="(item,index) in formItem" :key="index" :label="item.label">
            <el-input clearable v-if="item.type == 'input'" class="my-input-220" v-model="item.value" ></el-input><span class="tips">{{item.tips}}</span>
            <el-select clearable v-if="item.type == 'select'" v-model="item.value">
              <el-option label="11" value="123"></el-option>
            </el-select>
            <el-radio-group v-if="item.type == 'radio'" v-model="item.value" >
              <el-radio v-for="(list,lindex) in item.list" :key="lindex" :label="list.label"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </section>
      <section class="inter-box" v-if="$route.query.child == '会员卡积分规则'">
        <p>消费返积分</p>
        <el-table :data="list" stripe border >
          <el-table-column align="center" label="消费满(元)" prop="price"></el-table-column>
          <el-table-column align="center" label="赠送积分" prop="intergal"></el-table-column>
        </el-table>
      </section>
      <section class="btn-area">
          <bottom type="button" />
      </section>
    </section>
  </section>
</template>

<script>
import Bottom from '@/components/common/bottom'
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
              tips:'一个积分可抵扣金额(元)'
            },
            {
              label:'首次关注',
              type:'input',
              value:'',
              tips:'永久一次'
            },
            {
              label:'完善个人信息',
              type:'input',
              value:'',
              tips:'永久一次'
            },
            {
              label:'完善车辆信息',
              type:'input',
              value:'',
              tips:'永久一次'
            },
            {
              label:'分享活动',
              type:'input',
              value:'',
              tips:'永久一次'
            },
            {
              label:'登录/每日访问',
              type:'input',
              value:'',
              tips:'每天三次'
            },
            {
              label:'抽奖活动',
              type:'input',
              value:'',
              tips:'每次'
            },
            {
              label:'推荐有礼',
              type:'input',
              value:'',
              tips:'每个活动每次'
            },
            {
              label:'在线预约',
              type:'input',
              value:'',
              tips:'每天一次'
            },
            {
              label:'在线约定',
              type:'input',
              value:'',
              tips:'每天一次'
            },
            {
              label:'意见反馈',
              type:'input',
              value:'',
              tips:'采纳奖励'
            },
            {
              label:'问卷调查',
              type:'input',
              value:'',
              tips:'每次'
            },
            {
              label:'续保询价',
              type:'input',
              value:'',
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
            },
            {
              label:'推送内容',
              type:'select',
              value:'',
            },
            {
              label:'是否推送',
              type:'radio',
              value:'',
              list:[
                {
                  label:'推送',
                },
                {
                  label:'不推送',
                }
              ]
            }
          ]
        }
      ],
      format:{
        
      },
    }
  },
  computed:{
    formItem(){
      return this.form.find(item => item.name === this.$route.query.child).list
    }
  },
  methods: {}
}
</script>

<style scoped lang='scss' >
.father{
  height: 100%;
  .content{
    // height: 100%;
    background-color: #fff;
    section.form{
      margin:15px 0;
      .el-form{
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
    }
    section.btn-area{
      margin:15px 0;
      text-align: center;
    }
  }

}
</style>
