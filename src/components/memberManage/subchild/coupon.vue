<template>
  <section class="wrapper">
    <section class="info">
      <p class="nav-title flex"><span>基本信息</span><el-button>编辑</el-button></p>
      <el-form :modal="form" class="my-form" label-width="80px">
        <section v-for="(item,index) in formList" :key="index" class="inline-box">
          <el-form-item v-for="(list,lid) in item" :key="lid" :label="list.label">
            <el-input :disabled="list.disabled" v-if="list.type === 'input'" :placeholder="'请编辑' + list.label" v-model="form[list.prop]" style="width:80%;" ></el-input>
            <el-select :disabled="list.disabled" v-if="list.type === 'select'" v-model="form[list.prop]" :placeholder="'请选择' + list.label">
              <el-option v-for="(sub,sid) in list.list" :key="sid" :label="sub.label" :value="sub.value"></el-option>
            </el-select>
            <el-date-picker :disabled="list.disabled" v-model="form[list.prop]" v-if="list.type === 'date'" :placeholder="'请选择' + list.label"></el-date-picker>
          </el-form-item>
        </section>
      </el-form>
    </section>
    <section class="info">
      <p class="nav-title">会员卡信息</p>
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
    <section class="info">
      <p class="nav-title flex" ><span>用户套餐</span><el-button>查看更多</el-button></p>
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
import {mapActions} from 'vuex'
export default {
  name: 'coupon',

  data () {
    return {
      formList:[[
        {
          label:'客户姓名',
          prop:'name',
          type:'input',
          disabled:true,
        },
        {
          label:'性别',
          prop:'name',
          type:'select',
          disabled:true,
          list:[
            {
              label:'男',
              value:1
            },
            {
              label:'女',
              value:0
            }
          ]
        },
        {
          label:'生日',
          prop:'name',
          type:'date',
          disabled:true,
        }],
        [{
          label:'联系电话',
          prop:'name',
          type:'input',
          disabled:true,
        },
        {
          label:'售后经理',
          prop:'name',
          type:'input',
          disabled:true,
        },
        {
          label:'关注日期',
          prop:'name',
          type:'date',
          disabled:true,
        }],
      ],
      couponList:[[
        {
          label:'余额',
          type:'input',
          disabled:true,
        },
        {
          label:'积分',
          type:'input',
          disabled:true,
        },
        {
          label:'佣金',
          type:'input',
          disabled:true,
        }
      ]],
      form:{}
    }
  },

  methods: {
    ...mapActions({
      'memberCarComm':'memberCarComm'
    })
  },
  created(){
    let data = JSON.parse(this.$route.query.data)
    let {id, userId} = data
    this.memberCarComm({search:{id,userId}})
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
