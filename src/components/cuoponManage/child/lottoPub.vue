<template>
  <section class="wrapper">
    <section class="content">
      <Search />
      <my-table header="true" :list="[{}]" >
        <span slot="title">{{$route.query.child}}</span>
      </my-table>
    </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import MyTable from '@/components/common/myTable'
import MyButton from '@/components/common/myButton'
export default {
  name: 'lottoPub',
  components:{
    Search ,
    MyTable , 
    MyButton ,
  },
  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >

</style>
