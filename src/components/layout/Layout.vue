<template>
  <div class="layout-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <el-container>
      <el-header>
      <logo></logo>
      <Navbar></Navbar>
      </el-header>
      <el-container>
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
          <tags-view></tags-view>
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
  import Logo from 'components/logo/Logo'
  import TagsView from 'components/tags-view/TagsView'

  export default {
    components: {
      AppMain,
      Sidebar,
      Navbar,
      Logo,
      TagsView
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "src/common/styles/mixin.scss";

  .layout-wrapper {
    height: 100%;
  }
  .el-header {
  position: fixed;
  width: 100%;
  height: 50px !important;
  background-color: #00b4ef;//32A7B8 #49ABE8 3F87FF #52B2E8 007BB6 #01B4FF e6e6e6 #00b4ef
  color: #333;
  text-align: center;
  z-index: 1100;
  padding: 0;
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
