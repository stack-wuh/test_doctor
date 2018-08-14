<template>
  <section class="father">
    <header class="header compnent_header">
       <span>{{$route.query.menu}}</span>
       <span v-if="$route.query.subMenu">></span>
       <span>{{$route.query.subMenu}}</span>
       <span v-if="$route.query.child">></span>
       <span>{{$route.query.child || ''}}</span>
     </header>
     <section class="content">
       <router-view></router-view>
     </section>
  </section>
</template>

<script>
export default {
  name: 'index',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >
.father{
  header.header{
    height: 30px;
    color: #999;
  }
}
</style>
