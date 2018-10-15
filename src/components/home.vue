<template>
  <section class="home" >
    <my-header class="header" />
    <section class="main">
      <Leftmenu class="left" />
      <section v-loading="isShowLoading" class="main">
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
    })
  },
  watch:{
    '$route'(to,from){
      console.log(to,from)
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
