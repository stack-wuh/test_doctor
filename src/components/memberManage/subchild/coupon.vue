<template>
  <section class="wrapper">
    <section class="info">
      <p class="nav-title flex"><span>基本信息</span>
        <el-button v-show="formList[0][0].disabled" @click="handleChangeState">编辑</el-button>
        <span v-show="!formList[0][0].disabled" >
          <el-button @click="handleCancel">取消</el-button>
          <el-button @click="handleSubmit">保存</el-button>
        </span>
      </p>
      <el-form :modal="form" class="my-form" label-width="80px">
        <section v-for="(item,index) in formList" :key="index" class="inline-box">
          <el-form-item v-for="(list,lid) in item" :key="lid" :label="list.label">
            <el-input :disabled="list.disabled" v-if="list.type === 'input'" :placeholder="'请编辑' + list.label" v-model="form[list.prop]" style="width:80%;" ></el-input>
            <el-select :disabled="list.disabled" v-if="list.type === 'select'" v-model="form[list.prop]" :placeholder="'请选择' + list.label">
              <el-option v-for="(sub,sid) in list.list" :key="sid" :label="sub.label" :value="sub.value"></el-option>
            </el-select>
            <el-date-picker value-format="yyyy-MM-dd" :disabled="list.disabled" v-model="form[list.prop]" v-if="list.type === 'date'" :placeholder="'请选择' + list.label"></el-date-picker>
          </el-form-item>
        </section>
      </el-form>
    </section>
    <section class="info">
      <p class="nav-title">会员卡信息</p>
      <el-form :modal="form" class="my-form" label-width="80px">
        <section v-for="(item,index) in memberList" :key="index" class="inline-box">
          <el-form-item v-for="(list,lid) in item" :key="lid" :label="list.label">
            <el-input :disabled="list.disabled" v-if="list.type === 'input'" :placeholder="'请编辑' + list.label" v-model="form[list.prop]" style="width:80%;" ></el-input>
            <el-select :disabled="list.disabled" v-if="list.type === 'select'" v-model="form[list.prop]" :placeholder="'请选择' + list.label">
              <el-option  v-for="(sub,sid) in list.list" :key="sid" :label="sub.label" :value="sub.value"></el-option>
            </el-select>
            <el-date-picker :disabled="list.disabled" v-model="form[list.prop]" v-if="list.type === 'date'" :placeholder="'请选择' + list.label"></el-date-picker>
          </el-form-item>
        </section>
      </el-form>
    </section>
    <section class="info">
      <p class="nav-title flex" ><span>用户套餐</span><el-button>查看更多</el-button></p>
      <el-form :modal="form" class="my-form" label-width="80px">
        <section v-for="(item,index) in comboList" :key="index" class="inline-box">
          <el-form-item v-for="(list,lid) in item" :key="lid" :label="list.label">
            <el-input :disabled="list.disabled" v-if="list.type === 'input'" :placeholder="'请编辑' + list.label" v-model="form[list.prop]" style="width:80%;" ></el-input>
            <el-select :disabled="list.disabled" v-if="list.type === 'select'" v-model="form[list.prop]" :placeholder="'请选择' + list.label">
              <el-option  v-for="(sub,sid) in list.list" :key="sid" :label="sub.label" :value="sub.value"></el-option>
            </el-select>
            <el-date-picker :disabled="list.disabled" v-model="form[list.prop]" v-if="list.type === 'date'" :placeholder="'请选择' + list.label"></el-date-picker>
          </el-form-item>
        </section>
      </el-form>
    </section>
    <section class="info">
      <p class="nav-title flex"><span>用户卡券</span><el-button>查看更多</el-button></p>
      <el-form :modal="form" class="my-form" label-width="80px">
        <section v-for="(item,index) in couponList" :key="index" class="inline-box">
          <el-form-item v-for="(list,lid) in item" :key="lid" :label="list.label">
            <el-input :disabled="list.disabled" v-if="list.type === 'input'" :placeholder="'请编辑' + list.label" v-model="form[list.prop]" style="width:80%;" ></el-input>
            <el-select :disabled="list.disabled" v-if="list.type === 'select'" v-model="form[list.prop]" :placeholder="'请选择' + list.label">
              <el-option  v-for="(sub,sid) in list.list" :key="sid" :label="sub.label" :value="sub.value"></el-option>
            </el-select>
            <el-date-picker :disabled="list.disabled" v-model="form[list.prop]" v-if="list.type === 'date'" :placeholder="'请选择' + list.label"></el-date-picker>
          </el-form-item>
        </section>
      </el-form>
    </section>
  </section>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'

const rules = {
  realName:[{required: true, message:'请编辑用户姓名', trigger:'blur'}],
  sex:[{required: true, message:'请选择用户性别', trigger:'change'}],
  birthday:[{required: true, message:'请选择用户生日', trigger:'change'}],
  phone:[{required: true, message:'请选择用户联系电话', trigger:'change'}],
  afterService:[{required: true, message:'请编辑售后主管', trigger:'change'}],
  createTimes:[{required: true, message:'请选择关注日期', trigger:'change'}],
}

export default {
  name: 'coupon',
  props:{
    id:{
      type:Number,
      default:'',
      required: true,
    },
    userId:{
      type:Number,
      default:'',
      required: true
    }
  },
  data () {
    return {
      formList:[[
        {
          label:'客户姓名',
          prop:'realName',
          type:'input',
          disabled:true,
        },
        {
          label:'性别',
          prop:'sex',
          type:'select',
          disabled:true,
          list:[
            {
              label:'男',
              value:'1'
            },
            {
              label:'女',
              value:'0'
            }
          ]
        },
        {
          label:'生日',
          prop:'birthday',
          type:'date',
          disabled:true,
        }],
        [{
          label:'联系电话',
          prop:'phone',
          type:'input',
          disabled:true,
        },
        {
          label:'售后经理',
          prop:'afterService',
          type:'input',
          disabled:true,
        },
        {
          label:'关注日期',
          prop:'createTimes',
          type:'date',
          disabled:true,
        }],
      ],
      memberList:[
       [
         {
          label:'余额',
          prop:'money',
          type:'input',
          disabled:true,
        },
        {
          label:'积分',
          prop:'integral',
          type:'input',
          disabled:true,
        },
        {
          label:'佣金',
          prop:'brokerage',
          type:'input',
          disabled:true,
        },        
       ] 
      ],
      comboList:[
        [
          {
            label:'套餐数',
            prop:'money',
            type:'input',
            disabled:true,
          },
          {
            label:'项目总数',
            prop:'money',
            type:'input',
            disabled:true,
          },
          {
            label:'已用项目',
            prop:'money',
            type:'input',
            disabled:true,
          },
          {
            label:'可用项目',
            prop:'money',
            type:'input',
            disabled:true,
          },
        ]
      ],
      couponList:[[
        {
          label:'总卡券',
          type:'input',
          disabled:true,
          prop:'count',
        },
        {
          label:'已使用',
          type:'input',
          disabled:true,
          prop:'use'
        },
        {
          label:'未使用',
          type:'input',
          disabled:true,
          prop:'unuse',
        }
      ]],
      form:{},
    }
  },
  computed:{
    ...mapState({

    })
  },
  methods: {
    ...mapActions({
      'memberCouponComm':'memberCouponComm',
      'submit': 'memberCouponCommPutAndFresh',
      'getSellList': 'getSellsList'
    }),
    handleChangeState(){
      this.formList.map(item => {
        item.map(list => {
          list.disabled = !list.disabled
        })
      })
    },
    handleCancel(){
      this.handleChangeState()
    },
    handleSubmit(){
      this.submit({form: this.form})
    }
  },
  created(){
    let search = {
      id: this.id,
      userId: this.userId
    }
    this.memberCouponComm({search})
      .then(res => {
        this.form = {...this.form, ...res.data, ...res.data.user}
      })
    this.getSellList()
  }
}
</script>

<style scoped lang='scss' >
.wrapper{
  .flex{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .info{
    background-color: #fff;
    .my-form{
      .inline-box{
        display: flex;
        justify-content: space-between;
        padding-left:20px;
        .el-form-item{
          flex:1;
        }
      }
    }
  }
  .nav-title{
    margin:15px;
    padding-top:15px;
    padding-bottom:15px;
    color: #999;
    border-bottom:1px solid #eee;
  }
}
</style>
