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

  methods: {},
  created(){
   
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/mixin.scss';
.father{
  @include flex-box(column,nowrap,flex-start,flex-start);
  height:100%;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    width:5px;
    height:1px;
  }
  &::-webkit-scrollbar-thumb{
    box-shadow: 0 0 5px inset rgba(0,0,0,.3);
    border-radius:4px;
  }
  header.header{
    height:30px;
    color: #999;
  }
  section.content{
    flex:1;
    width:100%;
  }
}
</style>
