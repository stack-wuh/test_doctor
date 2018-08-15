<template>
  <section class="wrapper">
    <section class="content">
      <el-form class="my-form" label-width="120px" :model="form">
        <section class="inline-box">
          <el-form-item label="精品名称">
            <el-input placeholder="请编辑精品名称"></el-input>
          </el-form-item>
          <el-form-item label="库存数量">
            <el-input placeholder="请编辑库存数量"></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="市场原价">
            <el-input placeholder="请编辑市场原价"></el-input>
          </el-form-item>
          <el-form-item label="商城售价">
            <el-input placeholder="请编辑商城售价"></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="精品大类">
            <el-select placeholder="请编辑精品大类">
              <el-option label="aaa" value="aaa"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-select placeholder="请编辑商品状态">
              <el-option label="aaa" value="aaa"></el-option>
            </el-select>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="适用车型">
            <el-input placeholder="请编辑使用车型"></el-input>
          </el-form-item>
          <el-form-item label="积分换购">
            <el-select placeholder="请选择积分换购">
              <el-option label="aaa" value="aaa"></el-option>
            </el-select>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="换购积分">
            <el-input placeholder="请编辑换购积分"></el-input>
          </el-form-item>
          <el-form-item label="获得积分">
            <el-input placeholder="请编辑获得积分"></el-input>
          </el-form-item>
        </section>
        <section class="inline-box">
          <el-form-item label="是否直降">
            <el-select placeholder="请选择是否直降">
              <el-option label="aaa " value="aaa"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否推荐">
            <el-select placeholder="请选择是否推荐">
              <el-option label="aaa " value="aaa"></el-option>
            </el-select>
          </el-form-item>
        </section>
        <section>
          <el-form-item label="列表首图">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </section>
      </el-form>
      <my-bottom type="button" />
    </section>
  </section>
</template>

<script>
import MyBottom from '@/components/common/bottom'
export default {
  name: 'usePub',
  components:{
    MyBottom
  },
  data () {
    return {
      imageUrl:'',
      form:{},
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/mixin.scss';
.wrapper{
  height: 100%;
  .content{
    height: 100%;
    padding:20px 0;
    background-color: #fff;
    .inline-box{
      @include flex-box();
      .el-form-item{
        display: inline;
        flex:1;
        .el-input,
        .el-select{
          width: 80%;
        }
      }
    }
  }
}
</style>
