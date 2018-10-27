<template>
  <section class="home" >
    <my-header class="header" />
    <section v-loading="isShowLoading" class="main">
      <Leftmenu class="left" />
      <section  class="main">
        <section class="sub">
          <transition name="fade">
              <router-view  />
          </transition>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import Leftmenu from '@/components/common/leftmenu'
import MyHeader from '@/components/common/header'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components:{
    MyHeader,
    Leftmenu,
  },
  data () {
    return {
    }
  },
  computed:{
    ...mapState({
      'isShowLoading':'isShowLoading'
    }),
    pathChange(){
      return this.$route.query.child || this.$route.query.subMenu
    }
  },
  watch:{
    '$route'(to,from){
      this.$store.commit('clearSearchForm')
    },
    pathChange(){
      this.$store.commit('clearSearchForm')
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped >
@import '../assets/style/color.scss';
@import '../assets/style/mixin.scss';
@import './home.scss';
.fade-enter-active , .fade-leave-active{
  transition: opacity .5s linear;
}
.fade-enter , .fade-leave-to{
  opacity: 0;
}
</style>
