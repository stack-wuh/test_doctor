<template>
  <section class="father">
      <section class="content">
        <Search  />
        <my-table v-if="isShow" :list="[{}]" header="true" >
          <span slot="title">{{$route.query.child || $route.query.subMenu}}列表</span>
          <div slot="right">
            <my-button />
          </div>
        </my-table>
      </section>
  </section>
</template>

<script>
/**
 * 用品管理子模块的全部列表
 */
import MyTable from '@/components/common/myTable'
import Search from '@/components/common/search'
import MyButton from '@/components/common/myButton'
export default {
  name: 'store',
  components:{
    MyTable , 
    Search ,
    MyButton ,
  },
  data () {
    return {
      isShow:true,
    }
  },
  computed:{
    changePath(){
      return this.$route.query.child || this.$route.query.subMenu
    }
  },
  watch:{
    changePath(){
      this.isShow = false
      setTimeout(()=>{
        this.isShow = true
      })
    }
  },
  methods: {}
}
</script>

<style scoped lang='scss' >

</style>
