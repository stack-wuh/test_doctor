<template>
  <section class="wrapper">
      <section class="content">
        <el-form class="my-form" ref="myForm" :rules="rules" :model="form" label-width="120px" >
          <section class="inline-box">
            <el-form-item label="场次名称" prop="fieldName">
              <el-input v-model="form.fieldName" ></el-input>
            </el-form-item>
            <el-form-item label="活动日期" prop="activityDateToString" >
              <el-date-picker value-format="yyyy-MM-dd" v-model="form.activityDateToString" ></el-date-picker>
            </el-form-item>
          </section>
          <section class="inline-box">
            <el-form-item label="参与人数" prop="partakeNum">
              <el-input v-model="form.partakeNum" ></el-input>
            </el-form-item>
            <el-form-item label="屏幕显示人数" prop="displayNum" >
              <el-input v-model="form.displayNum" ></el-input>
            </el-form-item>
          </section>
          <el-form-item label="获胜分数" prop="winnerScore" >
            <el-input v-model="form.winnerScore"  class="margin-rg-15 my-input-220"></el-input>
            <span class="c999">每摇一次,可随机获得5-10积分</span>
          </el-form-item>
          <el-form-item label="背景图片" prop="backgroundPicture" >
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleSuccessUpload"
              name="upload_file">
              <img v-if="form.backgroundPicture" :src="form.backgroundPicture" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <section class="tabel-wrapper">
          <p class="table__title">
            <span>活动列表</span>
            <el-button @click="handleAddActive">新增</el-button>
          </p>
          <el-table :data="temp_list" border stripe>
            <el-table-column v-for="(item, index) in tabels" :key="index" v-if="item.type === 'default'" align="center" :label="item.key" :prop="item.field"></el-table-column>
            <el-table-column v-for="(item, index) in tabels" :key="index" v-if="item.type === 'input'" align="center" :label="item.key" :prop="item.field">
              <template slot-scope="scope">
                <el-input v-model="scope.row[item.field]"></el-input>
              </template>
            </el-table-column>
            <el-table-column v-for="(item, index) in tabels" :key="index" v-if="item.type === 'button'" align="center" :label="item.key" :prop="item.key">
              <template slot-scope="scope">
                 <el-button @click="handleDelItem(scope.$index)" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
        <my-button @handleSubmit="submit" @handleCancel="cancel" ></my-button>

        <el-dialog title="选择活动" :visible.sync="dialogVisible">
          <el-table :data="data" border stripe>
            <el-table-column width="120px" align="center" label="序号" type="index"></el-table-column>
            <el-table-column align="center" label="活动名称" prop="label"></el-table-column>
            <el-table-column width="180px" align="center" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleAddItem(scope.row)" size="mini" type="primary" >选取</el-button>
              </template>
            </el-table-column>
          </el-table>
          <span slot="footer">
            <el-button @click="handleCancelChoose">取消</el-button>
            <el-button @click="handleSubmitChoose">确定</el-button>
          </span>
        </el-dialog>
      </section>
  </section>
</template>

<script>
import MyButton from '@/components/common/subButton'
import {mapActions} from 'vuex'

const tabels = [
  {
    key:'奖项',
    type:'default',
    field:'rank',
  },
  {
    key:'奖品',
    type:'default',
    field:'couponName',
  },
  {
    key:'开始名次',
    type:'input',
    field:'startPlace',
  },
  {
    key:'结束名次',
    type:'input',
    field:'endPlace',
  },
  {
    key:'操作',
    type:'button',
    field:'',
  }
]
const rules = {
  fieldName: [{required: true, message: '请编辑场次名称', trigger: 'blur'}],
  activityDateToString: [{required: true, message: '请选择活动日期', trigger: 'change'}],
  partakeNum: [{required: true, message: '请编辑参与人数', trigger: 'blur'}],
  displayNum: [{required: true, message: '请编辑屏幕显示人数', trigger: 'blur'}],
  winnerScore: [{required: true, message: '请编辑获胜分数', trigger: 'blur'}],
  backgroundPicture: [{required: true, message: '请上传背景图片', trigger: 'change'}],
}

export default {
  name: 'shackPub',
  components:{
    MyButton
  },
  data () {
    return {
      uploadUrl: rootPath + '/store/uploadPictures.do',
      tabels,
      form:{
        fieldName:'',
        activityDateToString:'',
        partakeNum:'',
        displayNum:'',
        winnerScore:'',
        backgroundPicture:'',
      },
      dialogVisible: false,
      data:[],
      temp_list:[],
      temp_data:[],
      rules,
    }
  },

  computed: {
    searchData(){
      let data = this.$route.query.data
      data = data && JSON.parse(data)
      return data
    }
  },
  methods: {
    ...mapActions({
      'marketShakePub': 'marketShakePub',
      'getShackActive': 'getShackActive',
      'marketShakeEdit':'marketShakeEdit'
    }),
    handleSuccessUpload(res){
      this.form.backgroundPicture = res.data
    },
    submit(){
      this.form = {...this.form, data: JSON.stringify(this.temp_list)}
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.marketShakePub({form: this.form}).then(res => {
            res.status === 0 && this.cancel()
          })
        }else {
          _g.toastMsg({
            type: 'error',
            msg: '请编辑必填项目后提交'
          })
        }
      })
    },

    cancel(){
      this.$refs.myForm.resetFields()
      this.temp_list = []
      setTimeout(()=>{
        this.$router.go(-2)
      }, 1000)
    },
    /**
     * 切换dialog对话框
     */
    handleAddActive(){
      this.dialogVisible = true
      this.getShackActive().then(res => {
        this.data = res.data
      })
    },

    /**
     * 选择活动
     */
    handleAddItem(item){
      let _index = []
      this.temp_data.map( sub => {
        _index.push(sub.value)        
      })
      if(!_index.includes(item.value)){
        this.temp_data.push(item)
      }
    },
    /**
     * 处理数据
     */
    handleCancelChoose(){
      this.dialogVisible = false
      this.temp_data = []
    },
    handleSubmitChoose(){
      let _list = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
      this.dialogVisible = false
      this.temp_list = this.temp_data.map((item, index) => {
        return {rank: _list[index] + '等奖', couponName: item.label, startPlace: index, endPlace: index}
      })
    },
    /**
     * 活动列表 -- 删除item
     */
    handleDelItem(index){
      this.temp_list.splice(index, 1)
    }
  },
  created(){
    this.marketShakeEdit({id: this.searchData && this.searchData.id})
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/mixin.scss';
.wrapper{
  height: 100%;
  .content{
    height:100%;
    background-color: #fff;
    .my-form{
      padding:15px 0;
      .inline-box{
        display: flex;
      }
      .my-input-220{
        width: 220px;
      }
    }
  }
  .tabel-wrapper{
    margin:20px;
    .table__title{
      @include flex-box(row, nowrap, space-between, center);
      height: 60px;
      margin-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
