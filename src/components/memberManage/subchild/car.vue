<template>
  <section class="wrapper">
    <section class="info">
      <p class="nav-title flex flex-justify-between"><span>基本信息</span>
        <el-button v-if="formList[0][0].disabled" @click="handleToggleState">编辑</el-button>
        <span v-else-if="!formList[0][0].disabled">
          <el-button @click="handleCancel">取消</el-button>   
          <el-button @click="handleClickSave">保存</el-button>   
        </span>
      </p>
        <el-form :model="form" class="my-form" label-width="120px">
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
  </section>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'car',
  props:{
    id:{
      type:Number,
      required: true,
      default:'',
    }
  },
  data () {
    return {
      form:{},
      tempForm:{},
      formList:[
        [
          {
            label:'车型',
            disabled:true,
            type:'input',
            prop:'carModel'
          },
          {
            label:'车牌号',
            disabled:true,
            type:'input',
            prop:'plateNum'
          },
          {
            label:'车架号',
            disabled:true,
            type:'input',
            prop:'frameNum'
          },
        ],
        [
          {
            label:'发动机号',
            disabled:true,
            type:'input',
            prop:'engineNum'
          },
          {
            label:'购买保险日期',
            disabled:true,
            type:'date',
            prop:'InsuranceStart'
          },
          {
            label:'上次保养日期',
            disabled:true,
            type:'date',
            prop:'lastMaintainTime'
          },
        ],
        [
          {
            label:'首次上牌日期',
            disabled:true,
            type:'date',
            prop:'firstBoardTime'
          },
          {
            label:'上次保养公里数',
            disabled:true,
            type:'input',
            prop:'lastMaintainKm'
          },
          {
            label:'保养间隔公里数',
            disabled:true,
            type:'input',
            prop:'maintainIntervalKm'
          },
        ],
      ],
      isDisabled: true
    }
  },

  methods: {
    ...mapActions({
      'memberCarComm':'memberCarComm',
      'memberCarCommPut':'memberCarCommPut'
    }),
    handleToggleState(){
      this.formList.forEach(item => {
        item.map(list => {
          list.disabled = !list.disabled
        })
      })
    },
    handleCancel(){
      this.handleToggleState()
      this.form = {...this.form, ...this.tempForm}
    },
    handleClickSave(){
      console.log(this.form)
      this.memberCarCommPut({form: this.form})
    }
  },
  created(){
    let temp = JSON.parse(JSON.stringify(this.form))
    this.memberCarComm({search: {id: this.id}}).then(res => {
      this.form = {...this.form, ...res.data}
      this.tempForm = {...temp, ...res.data}
    })
  }
}
</script>

<style scoped lang='scss' >
.wrapper{
  .nav-title{
    margin:15px;
    padding-top:15px;
    padding-bottom:15px;
    color: #999;
    border-bottom:1px solid #eee;
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
}
</style>
