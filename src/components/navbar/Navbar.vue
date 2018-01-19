<template xmlns="http://www.w3.org/1999/html">
  <div class="navbar-wrapper">
  <el-dropdown class="avatar-container" trigger="click">
    <div class="avatar-wrapper">
      <img class="user-avatar" src="src/common/image/default.png">
      <span style="vertical-align: middle">admin</span>
      <i style="vertical-align: middle" class="el-icon-caret-bottom"></i>
    </div>
    <el-dropdown-menu class="user-dropdown" slot="dropdown">
      <router-link class="inlineBlock" to="/">
        <el-dropdown-item>
          首页
        </el-dropdown-item>
      </router-link>
      <el-dropdown-item divided>
        <span @click="logout" style="display:block;">退出</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'avatar'
      ])
    },
    methods: {
      logout () {
        this.$store.dispatch('FedLogOut').then(() => {
          // 为了重新实例化vue-router对象 避免bug
          location.reload()
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .navbar-wrapper {
    float: right;
    height: 100%;
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 25px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>
