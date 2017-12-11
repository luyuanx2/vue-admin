<template>
  <div class="layout-wrapper">
    <el-container>
      <el-header>
      <Navbar></Navbar>
      </el-header>
      <el-container>
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
          <app-main ></app-main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import AppMain from 'components/main/Main'
  import Sidebar from 'components/sidebar/Sidebar'
  import Navbar from 'components/navbar/Navbar'

  export default {
    components: {
      AppMain,
      Sidebar,
      Navbar
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "src/common/styles/mixin.scss";

  .layout-wrapper {
    height: 100%;
  }
  .el-header {
    height: 50px !important;
    background-color: #01B4FF;//32A7B8 #49ABE8 3F87FF #52B2E8 007BB6 #01B4FF
    color: #333;
    text-align: center;
    z-index: 1100;
  }

  /*.el-aside {*/
    /*background-color: #D3DCE6;*/
    /*color: #333;*/
    /*height: 100%;*/
  /*}*/

  .el-main {
    /*background-color: #E9EEF3;*/
    background-color: red;
    min-height: 100%;
  }

  .el-container {
    height: 100%;
  }

  .layout-wrapper {
  @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
