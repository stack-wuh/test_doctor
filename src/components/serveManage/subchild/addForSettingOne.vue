<template>
  <section class="add-wrapper">
    <el-dialog title="编辑检测项" :visible.sync="isShow" :before-close="handleCancel">
      <section class="form-area">
        <section class="flex flex-align-center margin-bm-15">
          <span class="margin-rg-15">专项检测名称:</span>
          <el-input class="my-input-220" placeholder="请编辑专项检测名称"></el-input>
        </section>
        <el-table :data="[{}]" border stripe>
          <el-table-column align="center" label="检测项名称" prop="name"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
               <el-checkbox v-model="scope.row.isCheck" ></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <span slot="footer">
        <el-button @click="handleCancel" type="danger">取消</el-button>
        <el-button @click="handleSubmit" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
export default {
  name: '',

  data () {
    return {
    }
  },
  computed:{
    ...mapState({
      'isShow': state => state.Server.isShowSettingOneDialog,
      'data': state => state.Server.dialog_row
    })
  },

  methods: {
    ...mapMutations({
      'setSettingOneState':'setSettingOneState'
    }),
    handleCancel(){
      this.setSettingOneState()
    },
    handleSubmit(){
      console.log(this.data, this.isShow)
    }
  }
}
</script>

<style scoped lang='scss' >

</style>
