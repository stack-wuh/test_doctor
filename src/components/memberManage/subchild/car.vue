<template>
  <section class="wrapper">
    <section class="info">
      <p class="nav-title flex flex-justify-between"><span>基本信息</span><el-button>编辑</el-button></p>
        <el-form :model="form" class="my-form" label-width="120px">
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
  </section>
</template>

<script>
export default {
  name: 'car',

  data () {
    return {
      form:{},
      formList:[
        [
          {
            label:'车型',
            disabled:true,
            type:'input',
          },
          {
            label:'车牌号',
            disabled:true,
            type:'input',
          },
          {
            label:'车架号',
            disabled:true,
            type:'input',
          },
        ],
        [
          {
            label:'发动机号',
            disabled:true,
            type:'input',
          },
          {
            label:'购买保险日期',
            disabled:true,
            type:'input',
          },
          {
            label:'上次保养日期',
            disabled:true,
            type:'input',
          },
        ],
        [
          {
            label:'首次上牌时间',
            disabled:true,
            type:'input',
          },
          {
            label:'上次保养公里数',
            disabled:true,
            type:'input',
          },
          {
            label:'保养间隔公里数',
            disabled:true,
            type:'input',
          },
        ],
      ]
    }
  },

  methods: {}
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
