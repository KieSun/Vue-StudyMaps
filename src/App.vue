<template>
  <div id="app">
    <header>
      <navigation></navigation>
    </header>
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Navigation from 'components/nav/nav'
export default {
  name: 'app',
  components: {
    Navigation
  },
  beforeRouteEnter() {
    console.log('beforeRouteEnter')
    console.log(this.$route.path)
  }
}
</script>

<style lang="scss" scoped>
@import './../static/css/app.css';
header {
  width: 100%;
  height: 70px;
  background: #20A0FF;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

</style>
