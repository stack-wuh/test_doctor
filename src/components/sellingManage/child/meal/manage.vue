<template>
  <section class="wrapper">
    <section class="form-area">
      <el-form class="my-form" ref="myForm" :model="form" label-width="120px" >
        <section class="my-form__item">
          <el-form-item label="套餐名称" prop="packageName">
            <el-input v-model="form.packageName" placeholder="请选择套餐名称" ></el-input>
          </el-form-item>
          <el-form-item label="套餐售价" prop="packagePrice">
            <el-input v-model="form.packagePrice" placeholder="请编辑套餐售价" ></el-input>
          </el-form-item>
        </section>
        <section class="my-form__item">
          <el-form-item label="状态" prop="packageStatus" placeholder="请选择状态" >
            <el-select v-model="form.packageStatus">
              <el-option label="启用" :value="1" ></el-option>
              <el-option label="停用" :value="0" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否分红" prop="isShare" placeholder="请选择是否分红" >
            <el-select v-model="form.isShare">
              <el-option label= '是' :value="0" ></el-option>
              <el-option label= '否' :value="1" ></el-option>
            </el-select>
          </el-form-item>
        </section>
        <section class="my-form__item">
          <el-form-item label="员工奖励" prop="isEmployeeAward">
            <el-select v-model="form.isEmployeeAward" placeholder="请选择员工奖励" >
              <el-option label="是" :value="0" ></el-option>
              <el-option label="否" :value="1" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售奖励" prop="oldPrice">
            <el-input v-model="form.oldPrice" placeholder="请编辑销售奖励" ></el-input>
          </el-form-item>
        </section>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="form.remark" :rows="3" style="width: 80%;"></el-input>
        </el-form-item>
      </el-form>
    </section> 

    <section class="table-area">
      <p class="table__title">
        <span>商品列表</span>
        <el-button type="primary">添加</el-button>
      </p>
      <el-table :data="[{}]" border stripe></el-table>
    </section>

    <section class="table-area">
      <p class="table__title">
        <span>项目列表</span>
        <el-button type="primary">添加</el-button>
      </p>
      <el-table :data="[{}]" border stripe></el-table>
    </section>

    <section class="btm-area">
      <div class="margin-rg-15" >
        <span>数量合计: </span>
        <strong class="danger">0</strong>
      </div>
      <div>
        <span>总价合计: </span>
        <strong class="danger">0</strong>
      </div>
      <div class="empty-flex"></div>
      <my-bottom></my-bottom>
    </section>
  </section>
</template>

<script>
import MyBottom from '@/components/common/subButton';
export default {
  name: '',
  components:{
    MyBottom
  },
  data () {
    return {
      form:{
        packageName: '',
        packagePrice: '',
        packageStatus: '',
        isShare: '',
        isEmployeeAward: '',
        saleAward: '',
        remark: '',
        oldPrice: '',
      }
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/mixin.scss';
.wrapper{
  .form-area{
    padding: 20px 0;
    background-color: #fff;
    .my-form__item{
      @include flex-box;
      .el-form-item{
        width: 40%;
        .el-input,
        .el-select{
          width: 100%;
        }
      }
    }
  }
  .table-area{
    padding: 20px;
    margin-top:20px;
    background-color:  #fff;
    p.table__title{
      @include flex-box(row, nowrap, space-between, center);
      height: 50px;
      margin-bottom: 15px;
      line-height: 50px;
      border-bottom: 1px solid #eee;
    }
  }
  .btm-area{
    @include flex-box(row, nowrap, space-between, center);
  }
}
</style>
