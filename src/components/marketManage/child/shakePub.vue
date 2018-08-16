<template>
  <section class="wrapper">
      <section class="content">
        <el-form class="my-form" label-width="120px" >
          <section class="inline-box">
            <el-form-item label="场次名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="活动日期">
              <el-date-picker></el-date-picker>
            </el-form-item>
          </section>
          <section class="inline-box">
            <el-form-item label="参与人数">
              <el-select></el-select>
            </el-form-item>
            <el-form-item label="屏幕显示人数">
              <el-select></el-select>
            </el-form-item>
          </section>
          <el-form-item label="获胜分数">
            <el-select class="margin-rg-15"></el-select>
            <span class="c999">每摇一次,可随机获得5-10积分</span>
          </el-form-item>
          <el-form-item label="背景图片">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </section>
  </section>
</template>

<script>
export default {
  name: 'shackPub',

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
    height:100%;
    background-color: #fff;
    .my-form{
      padding:15px 0;
      .inline-box{
        display: flex;
      }
    }
  }
}
</style>
