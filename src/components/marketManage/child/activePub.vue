<template>
  <section class="wrapper">
      <section class="content">
        <el-form class="my-form" label-width="150px" >
          <el-form-item label="活动标题" >
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="图片(750*300)">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="首页推广" >
            <el-checkbox label="勾选时表示上传的照片会在首页轮播显示" ></el-checkbox>
          </el-form-item>
          <el-form-item label="报名费" >
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="参与时强制支付" >
            <el-checkbox label="勾选时表示参与时报名费用强制支付"></el-checkbox>
          </el-form-item>
          <el-form-item label="活动日期" >
            <el-date-picker type="datetimerange" ></el-date-picker>
          </el-form-item>
          <el-form-item label="参与活动奖励" >
            <el-select></el-select>
          </el-form-item>
          <el-form-item label="初始报名数" >
            <el-select></el-select>
          </el-form-item>
          <el-form-item label="是否允许报名" >
            <el-checkbox label="勾选时表示允许报名"></el-checkbox>
          </el-form-item>
          <el-form-item label="精准用户设置" >
            <section class="inline-box">
              <el-select placeholder="浏览次数"></el-select>
              <el-select placeholder="平均单词浏览时间"></el-select>
              <el-checkbox label="勾选时表示两者都要满足"></el-checkbox>
            </section>
          </el-form-item>
        </el-form>
        <my-bottom type="button" />
      </section>
  </section>
</template>

<script>
import MyBottom from '@/components/common/bottom'
export default {
  name: 'activePub',
  components:{
    MyBottom , 
  },
  data () {
    return {
      imageUrl:'',
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >
.wrapper{
  height: 100%;
  .content{
    height: 100%;
    background-color: #fff;
    .my-form{
      padding: 15px 0;
      width: 70%;
      margin:0 auto;
      .el-input{
        width: 65%;
      }
      .el-select{
        margin-right: 15px;
      }
      .inline-box{
        .el-select{
          width: 30%;
        }
      }
    }
  }
}
</style>
