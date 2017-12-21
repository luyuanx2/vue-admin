<template>
    <!--<el-aside width="200px"></el-aside>-->
  <scroll-bar>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from 'components/sidebar/SidebarItem'
  import ScrollBar from 'components/scrollbar/Scrollbar'
  export default {
    components: {
      ScrollBar,
      SidebarItem
    },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      isCollapse () {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*.el-menu {*/
    /*height: 100%;*/
  /*}*/
</style>
