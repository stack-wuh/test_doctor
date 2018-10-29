<template>
  <section class="add-wrapper">
    <el-dialog title="编辑检测项" :visible.sync="isShow" :before-close="handleCancel">
      <section class="form-area">
        <section class="flex flex-align-center margin-bm-15">
          <span class="margin-rg-15">专项检测名称:</span>
          <el-input v-model="name" class="my-input-220" placeholder="请编辑专项检测名称"></el-input>
        </section>
        <el-table :data="table" border stripe>
          <el-table-column align="center" label="图片">
            <template slot-scope="scope" >
              <img :src="scope.row.picture" alt="pic" style="width: 60px;height: 60px;" >
            </template>
          </el-table-column>
          <el-table-column align="center" label="检测项名称" prop="name"></el-table-column>
          <el-table-column align="center" label="详情" prop="descInfo"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
               <el-checkbox v-model="scope.row.status" ></el-checkbox>
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
      name: '',
      detectionProjectIds:''
    }
  },
  computed:{
    ...mapState({
      'isShow': state => state.Server.isShowSettingOneDialog,
      'data': state => state.Server.dialog_row,
      'table': state => state.Select.serveSettingOne,
    })
  },

  methods: {
    ...mapMutations({
      'setSettingOneState': 'setSettingOneState'
    }),
    ...mapActions({
      'serverCarSettingOnePub': 'serverCarSettingOnePub',
      'getServerStore':'getServerStore'
    }),
    handleCancel(){
      this.setSettingOneState()
      setTimeout(() => {
        this.table.map(item => {
          item = Object.assign(item, {status: false})
        })
      })
    },
    handleSubmit(){
      let table = JSON.parse(JSON.stringify(this.table))
      let _arr = table.filter(item => item.status).map(item => item.id).toString()
      let form = {
        name: this.name,
        detectionProjectIds: _arr,
        id: this.data && this.data.id
      }
      this.serverCarSettingOnePub({form}).then(res => {
        if(res.status === 0){
          setTimeout(() => {
            this.handleCancel()
            this.getServerStore({path: '专项检测配置'})
          }, 1000)
        }
      })
    },
    formatTable(){
      let _arr = this.data && this.data.detectionProjectIds && this.data.detectionProjectIds.split(',').map(item => Number(item))
      this.table.map(item => {
        if( _arr && _arr.includes(item.id)){
          item = Object.assign(item, {status: true})
        }
      })
    }
  },
  watch:{
    isShow(){
      this.formatTable()
    }
  },
}
</script>

<style scoped lang='scss' >

</style>
