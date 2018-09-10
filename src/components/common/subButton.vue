<template>
  <section class="wrapper">
      <section class="btn-area">
        <el-button @click="handleCancel" type="danger">取消</el-button>
        <el-button @click="handleSubmit" type="primary">确定</el-button>
      </section>
  </section>
</template>

<script>
export default {
  name: 'subButton',

  data () {
    return {
    }
  },

  methods: {
    handleSubmit(){
      this.$emit('handleSubmit', {submit:true })
    },
    handleCancel(){
      this.$emit('handleCancel', true)
    }
  }
}
</script>

<style scoped lang='scss' >
.wrapper{
  margin:15px 0;
  .btn-area{
    text-align:center;    
  }
}
</style>
