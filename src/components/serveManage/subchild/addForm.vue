<template>
  <section class="form-wrapper">
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
          ></el-upload>
        </el-form-item>
      </el-form>
  </section>
</template>

<script>
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

      uploadUrl:rootPath + '/store/uploadPictures.do'
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >

</style>
