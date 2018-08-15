<template>
  <section class="wrapper">
      <el-dialog :visible.sync="visibleDialog" ref="myDialog" :before-close="beforeClose" :title=" '编辑' + ($route.query.child || $route.query.subMenu)" >
          <el-form :model="myForm" ref="myForm" label-width="120px">
            <el-form-item v-for="(item,index) in list" :key="index" :label="item.key" :prop="item.prop" :rules="item.rules" >
              <el-input class="my-input-320" v-if="item.type === 'input' || item.type == 'default' || !item.type " :placeholder="'请编辑'+item.key" v-model="myForm[item.prop]" ></el-input>
              <el-select class="my-input-320" v-if="item.type === 'select'" :placeholder="'请选择' + item.key" v-model="myForm[item.prop]" >
                <el-option label="aaa" value="aaa"></el-option>
              </el-select>
              <el-date-picker v-if="item.type == 'date'" v-model="myForm[item.prop]" ></el-date-picker>
              <p v-if="item.tips"  class="c999" >{{item.tips}}</p>
            </el-form-item>
          </el-form>
          {{list}} -- {{myForm}}
          <div slot="footer">
            <el-button type="" @click="beforeClose">取消</el-button>
            <el-button type="primary">确定</el-button>
          </div>
      </el-dialog>
  </section>
</template>

<script>
import {forms} from './utils/dialog.js'
export default {
  name: 'myDialog',
  
  data () {
    return {
      list:[],
      myForm:{}
    }
  },
  computed:{
    visibleDialog(){
      return this.$store.state.dialogVisible
    },
    rootPath(){
      return this.$route.query.child || this.$route.query.subMenu
    },
  },
  watch:{
    rootPath(){
      this.getList()
    }
  },
  methods: {
    beforeClose(){
      this.$refs.myForm.resetFields()
      this.$store.commit('handlehideDialog')
    },
    getList(){
      let data = forms.find(item => item.name === this.rootPath)
      this.list = data && data.list
      this.myForm = data && data.myForm
    }
  },
  created(){
    this.getList()
  }
}
</script>

<style scoped lang='scss' >

</style>
