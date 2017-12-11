<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import 'src/common/styles/index.scss';
  html, body {
   height: 100%;
 }
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  #app {
    height: 100%;
  }
</style>
