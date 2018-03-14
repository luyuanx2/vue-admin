<template xmlns="http://www.w3.org/1999/html">
  <div class="navbar-wrapper">

    <div class="avatar-container">
      <el-tooltip class="header-item" effect="dark" :content="isFullScreen?'退出全屏':'全屏'" placement="bottom">
        <div class="" @click="handleScreen">
          <svg-icon :icon-class="isFullScreen?'exitfullscreen':'fullscreen'" />
        </div>
      </el-tooltip>
      <el-tooltip class="header-item" effect="dark" content="锁屏" placement="bottom">
          <screen-lock></screen-lock>
      </el-tooltip>

      <div class="header-item">
        <el-popover
          ref="popover"
          placement="bottom"
          width="336"
          trigger="click"
          v-model="visible">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="通知 (5)" name="first">通知 (5)</el-tab-pane>
            <el-tab-pane label="消息 (3)" name="second">消息 (3)</el-tab-pane>
            <el-tab-pane label="待办 (4)" name="third">待办 (4)</el-tab-pane>
          </el-tabs>
        </el-popover>
        <div v-popover:popover style="line-height: 1;margin-right: 12px">
          <el-badge is-dot>
            <svg-icon icon-class="inform"/>
          </el-badge>
        </div>
      </div>

  <el-dropdown class="" trigger="click">
    <div class="avatar-wrapper">
      <img class="user-avatar" src="../../common/image/default.png">
      <span style="vertical-align: middle;font-size: 16px">{{name}}</span>
      <!--<i style="vertical-align: middle" class="el-icon-caret-bottom"></i>-->
    </div>
    <el-dropdown-menu class="user-dropdown" slot="dropdown">
      <router-link class="inlineBlock" to="/">
        <el-dropdown-item>
          首页
        </el-dropdown-item>
      </router-link>
      <el-dropdown-item divided >
        <span @click="logout" style="display:block;">退出</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
    </div>


</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ScreenLock from "./screen-lock";
  import { fullscreenToggel } from "@/utils";
  export default {
    components: { ScreenLock },
    data() {
      return {
        activeName: 'second',
        visible: false,
      };
    },
    computed: {
      ...mapGetters([
        'avatar',
        'name'
      ]),
      ...mapGetters(["isFullScreen"])
    },
    methods: {
      handleScreen() {
        this.$store.commit("SET_FULLSCREEN");
        fullscreenToggel();
      },
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
  .header-item {
    /*height: 35px;*/
    display: inline-block;
    margin: 0 12px;
    line-height: 50px;
    vertical-align: middle;
  }
  .navbar-wrapper {
    float: right;
    height: 100%;
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 12px;
      padding: 0px 12px;
      .avatar-wrapper {
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        position: relative;
        .user-avatar {
          vertical-align: middle;
          width: 32px;
          height: 32px;
          border-radius: 16px;
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
