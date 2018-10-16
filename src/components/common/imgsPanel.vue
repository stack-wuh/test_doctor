<template>
  <section class="my-carousel-wrapper">
      <el-carousel :autoplay="autoplay" :indicator-position="position" :arrow="arrow" :interval="interval">
        <el-carousel-item v-for="(item, index) in list" :key="index">
          <img class="my-carousel__img" :src="item" alt="logo">
        </el-carousel-item>
      </el-carousel>
  </section>
</template>

<script>
export default {
  name: '',
  props:{
    title:{
      type:String,
      default:'图片展示'
    },
    dialogVisible:{
      type:Boolean,
      default:true,
    },
    autoplay:{
      type: Boolean,
      default: true,
    },
    position:{
      type:String,
      default:'outside'
    },
    arrow:{
      type:String,
      default:'hover'
    },
    interval:{
      type:Number,
      default: 5000
    },
    list:{
      type:Array,
      default:[],
      required: true
    }
  },
  data () {
    return {
    }
  },

  methods: {},
  created(){
    console.log(this.list)
  }
}
</script>

<style scoped lang='scss' >
.my-carousel-wrapper{
  width:100%;
  height:100%;
  
  .my-carousel__img{
    width: 100%;
    height: 100%;
  }
}
</style>
