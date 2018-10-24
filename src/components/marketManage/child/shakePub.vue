<template>
  <section class="wrapper">
      <section class="content">
        <el-form class="my-form" label-width="120px" >
          <section class="inline-box">
            <el-form-item label="场次名称">
              <el-input v-model="form.fieldName" ></el-input>
            </el-form-item>
            <el-form-item label="活动日期">
              <el-date-picker value-format="yyyy-MM-dd" v-model="form.activityDateToString" ></el-date-picker>
            </el-form-item>
          </section>
          <section class="inline-box">
            <el-form-item label="参与人数">
              <el-input v-model="form.partakeNum" ></el-input>
            </el-form-item>
            <el-form-item label="屏幕显示人数">
              <el-input v-model="form.displayNum" ></el-input>
            </el-form-item>
          </section>
          <el-form-item label="获胜分数">
            <el-input v-model="form.winnerScore"  class="margin-rg-15 my-input-220"></el-input>
            <span class="c999">每摇一次,可随机获得5-10积分</span>
          </el-form-item>
          <el-form-item label="背景图片">
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
            <el-button>新增</el-button>
          </p>
          <el-table :data="[{}]" border stripe>
            <el-table-column v-for="(item, index) in tabels" :key="index" v-if="item.type === 'default'" align="center" :label="item.key" :prop="item.key"></el-table-column>
            <el-table-column v-for="(item, index) in tabels" :key="index" v-if="item.type === 'button'" align="center" :label="item.key" :prop="item.key">
              <template slot-scope="scope">
                 <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
        <my-button></my-button>
      </section>
  </section>
</template>

<script>
import MyButton from '@/components/common/subButton'

const tabels = [
  {
    key:'奖项',
    type:'default',
    field:'',
  },
  {
    key:'奖品',
    type:'default',
    field:'',
  },
  {
    key:'开始名次',
    type:'default',
    field:'',
  },
  {
    key:'结束名次',
    type:'default',
    field:'',
  },
  {
    key:'操作',
    type:'button',
    field:'',
  }
]

export default {
  name: 'shackPub',
  components:{
    MyButton
  },
  data () {
    return {
      uploadUrl: rootPath + 'store/uploadPictures.do',
      tabels,
      form:{
        fieldName:'',
        activityDateToString:'',
        partakeNum:'',
        displayNum:'',
        winnerScore:'',
        backgroundPicture:'',
      }
    }
  },

  methods: {
    handleSuccessUpload(res){
      this.form.backgroundPicture = res.data
    }
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
