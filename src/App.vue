<template>
  <div id="app">
    <header>
      <navigation></navigation>
    </header>
    <pageBreak></pageBreak>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from 'components/nav/nav'
import PageBreak from 'components/pageBreak/pageBreak'
export default {
  name: 'app',
  components: {
    Navigation,
    PageBreak
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
  .pageBreak {
    width: 100%;
    height: 60px;
    
  }
</style>
