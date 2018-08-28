<template>
  <section class="wrapper">
    <section class="content">
      <Search />
      <my-table header="true" :list="list" >
        <span slot="title">{{$route.query.child}}</span>
        <div slot="right">
          <my-button />
        </div>
      </my-table>
    </section>
  </section>
</template>

<script>
import Search from '@/components/common/search'
import MyTable from '@/components/common/myTable'
import MyButton from '@/components/common/myButton'

import {mapActions, mapGetters} from 'vuex'
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
  computed:{
    ...mapGetters({
      'list':'formatCouponStore'
    })
  },
  methods: {
    ...mapActions({
      'getList':'getCouponStore'
    })
  },
  created(){
    this.getList({path: this.$route.query.child || this.$route.query.subMenu})
  }
}
</script>

<style scoped lang='scss' >

</style>
