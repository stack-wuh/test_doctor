<template>
  <section class="form-wrapper">
    <el-dialog title="编辑检修项配置" :visible.sync="dialogCanshowForm" :before-close="beforeClose">
      <el-form label-width="120px">
        <el-form-item v-for="(item, index) in list1" :key="index" :label="item.label" prop="item.field">
          <el-input v-if="item.type === 'input'" :placeholder="'请编辑' + item.label" v-model="form[item.field]"></el-input>
          <el-input v-if="item.type === 'textarea'" :placeholder="'请编辑' + item.label" v-model="form[item.field]" type="textarea" :rows="3"></el-input>
          <el-upload 
              v-if="item.type === 'upload'"
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              name='upload_file'
          >
              <img v-if="form.url" :src="form.url" class="avatar" alt="logo">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-table :list="[{}]" border stripe>
        <el-table-column v-for="(item, index) in tables" :key="index" :label="item.label" v-if="item.disabled" :prop="item.field" ></el-table-column>
        <el-table-column v-for="(item, index) in tables" :key="index" :label="item.label" v-if="!item.disabled" >
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
          field:''
        },
        {
          label:'正常状态图',
          type:'upload',
          field:''
        },
        {
          label:'说明',
          type:'textarea',
          field:''
        }
      ]
export default {
  name: '',

  data () {
    return {
      list1,
      form:{},

      uploadUrl:rootPath + '/store/uploadPictures.do',
      tables:[
        {
          label:'状态',
          field:'statusText',
          disabled: true,
        },
        {
          label:'建议操作',
          field:'suggest',
          disabled: true,
        },
        {
          label: '下次提醒(天)',
          field:'days',
          disabled: true,
        },
        {
          label: '维修预估费用',
          field:'price',
          disabled: false,
        }
      ],
    }
  },

  computed:{
    ...mapState({
      'dialogCanshowForm': state => state.Server.dialogCanshowForm
    })
  },

  methods: {
    ...mapMutations({
      'toggleDialog': 'serverCarStateToggle'
    }),
    beforeClose(){
      this.toggleDialog({text: '新增'})
    },
    handleCancel(){
      this.beforeClose()
    },
    handleSubmit(){},
  }
}
</script>

<style scoped lang='scss' >

</style>
