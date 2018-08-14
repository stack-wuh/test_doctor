<template>
  <section class="wrapper">
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
  name: '',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >

</style>
