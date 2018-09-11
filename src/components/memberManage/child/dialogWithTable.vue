<template>
  <section class="wrapper">
      <el-dialog title="编辑" :visible.sync="isShowDialog" :before-close="beforeClose">
        <el-form label-width="60px" :model="form" >
          <el-form-item label="顾问">
            <el-select placeholder="请选择顾问" v-model="form.id">
              <el-option label="111" value="1111"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-table :data="list" border stripe>
            <el-table-column align="center" label="头像">
              <template slot-scope="scope">
                <img :src="scope.row.wxpic" alt="avatar" />
              </template>
            </el-table-column>
            <el-table-column align="center" label="微信昵称" prop="nickName" ></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="handleDelItem({index: scope.$index})">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <span slot="footer">
          <el-button @click="beforeClose">取消</el-button>
          <el-button>确定</el-button>
        </span>
      </el-dialog>
  </section>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
export default {
  name: 'dialogWithTable',
  props:{
    isShowDialog:{
      required:true,
      type: Boolean,
      default: false
    },
    list:{
      required:true,
      type:Array,
      default:[]
    }
  },
  data () {
    return {
      form:{
        id:''
      },
    }
  },

  methods: {
    ...mapMutations({
      'beforeClose' : 'clearMemberAddCounselor',
      'handleDelItem' : 'handleDelMemberItem'
    }),
  }
}
</script>

<style scoped lang='scss' >

</style>
