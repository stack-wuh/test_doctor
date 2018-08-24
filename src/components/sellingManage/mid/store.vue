<template>
  <section class="father">
      <section class="content">
        <Search />
        <my-table v-if="isShow" :list="[{}]" header="true" :params="changePath" >
          <span slot="title">{{changePath}}列表</span>
          <div slot="right">
            <my-button></my-button>
          </div>
        </my-table>
      </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import MyTable from '@/components/common/myTable'
import MyButton from '@/components/common/myButton'
export default {
  name: 'list',
  components:{
    Search ,
    MyTable ,
    MyButton ,
  },
  data () {
    return {
      isShow:true,
    }
  },
  computed:{
    changePath(){
      return this.$route.query.child ||  this.$route.query.subMenu
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
