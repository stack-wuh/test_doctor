<template>
  <section class="form-wrapper">
    <el-dialog title="编辑检修项配置" :visible.sync="dialogCanshowForm" :before-close="beforeClose">
      <el-form :model="form" :rules="rules" ref="myForm" label-width="120px">
        <el-form-item v-for="(item, index) in list1" :key="index" :label="item.label" :prop="item.field">
          <el-input v-if="item.type === 'input'" :placeholder="'请编辑' + item.label" v-model="form[item.field]"></el-input>
          <el-input v-if="item.type === 'textarea'" :placeholder="'请编辑' + item.label" v-model="form[item.field]" type="textarea" :rows="3"></el-input>
          <el-upload 
              v-if="item.type === 'upload'"
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              name='upload_file'
              :on-success="handleSuccessUpload">
              <img v-if="form.picture" :src="form.picture" class="avatar" alt="logo">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-table :data="data" border stripe>
        <el-table-column align="center" v-for="(item, index) in tables" :key="index" :label="item.label" v-if="item.disabled" :prop="item.field" ></el-table-column>
        <el-table-column align="center" v-for="(item, index) in tables" :key="index" :label="item.label" v-if="!item.disabled" >
          <template slot-scope="scope">
            <el-input v-model="scope.row[item.field]"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="handleCancel" type="danger">取消</el-button>
        <el-button @click="handleSubmit" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';

const list1 = 
      [
        {
          label:'检测项目',
          type:'input',
          field:'name'
        },
        {
          label:'正常状态图',
          type:'upload',
          field:'picture'
        },
        {
          label:'说明',
          type:'textarea',
          field:'descInfo'
        }
      ]

const rules = {
  name: [{required: true, message:'请编辑项目名称', trigger: 'blur'}],
  picture: [{required: true, message:'请上传状态图片', trigger: 'change'}],
  descInfo: [{required: true, message:'请编辑详情', trigger: 'blur'}],
}

export default {
  name: '',

  data () {
    return {
      list1,
      form:{
        name: '',
        picture: '',
        desnInfo: '',
      },
      rules,
      uploadUrl:rootPath + '/store/uploadPictures.do',
      tables:[
        {
          label:'状态',
          field:'label',
          disabled: true,
          type: 'default',
        },
        {
          label:'建议操作',
          field:'tips',
          disabled: true,
          type: 'default',
        },
        {
          label: '下次提醒(天)',
          field:'days',
          disabled: false,
          type: 'input',
        },
        {
          label: '维修预估费用',
          field:'price',
          disabled: false,
          type: 'input',
        }
      ],
      data:[
        {
          label: '状态良好',
          tips: '正常',
          days: 0,
          price: 0,
          status: 1,
          suggest: 1,
        },
        {
          label: '轻微磨损或老化',
          tips: '推荐更换',
          days: 0,
          price: 0,
          status: 2,
          suggest: 2,
        },
        {
          label: '严重磨损或老化',
          tips: '必须更换',
          days: 0,
          price: 0,
          status: 3,
          suggest: 3,
        }
      ]
    }
  },

  computed:{
    ...mapState({
      'dialogCanshowForm': state => state.Server.dialogCanshowForm,
      'search': state => state.Server.dialog_arr,
      'serverSetting':state => state.Select.serverSetting
    }),
    query(){
      let data = this.$route.query.data
      data = data && JSON.parse(data)
      return data
    }
  },

  watch:{
    serverSetting(){
      this.form = {...this.form, ...this.serverSetting.project}
      this.data.map((item, index) => {
        item.days = this.serverSetting.list[index].days
        item.price = this.serverSetting.list[index].price
      })
    }
  },

  methods: {
    ...mapMutations({
      'toggleDialog': 'serverCarStateToggle'
    }),
    ...mapActions({
      'getServeCarSetting': 'getServeCarSetting',
      'serverCarSettingPub': 'serverCarSettingPub'
    }),
    beforeClose(){
      this.toggleDialog({text: '新增'})
    },
    handleCancel(){
      this.$refs.myForm.resetFields()
      this.data.map(item => {
        item.days = 0
        item.price = 0
      })
      setTimeout(() => {
        this.beforeClose()
      }, 1000)
    },
    handleSuccessUpload(res){
      this.form.picture = res.data
    },
    handleSubmit(){
      let data = JSON.parse(JSON.stringify(this.data)).map(item => {
        return  {status: item.status, suggest: item.suggest}
      })
      this.$refs.myForm.validate(valid => {
        if(valid){
          let form = {
            ...this.form,
            data: JSON.stringify(data)
          }
          this.serverCarSettingPub({form}).then(res => {
            res.status === 0 && (
              this.handleCancel()
            )
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请编辑必填项之后提交'
          })
        }
      })
    },
  },
  created(){

  }
}
</script>

<style scoped lang='scss' >

</style>
