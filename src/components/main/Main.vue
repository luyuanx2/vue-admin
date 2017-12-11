<template>
    <!--<el-main>-->
      <section class="app-main">
        <transition name="fade" mode="out-in">
          <!-- <router-view :key="key"></router-view> -->
          <div style="padding: 32px;background-color: #f0f2f5;box-sizing: inherit"></div>
          <router-view></router-view>
        </transition>
      </section>
    <!--</el-main>-->
</template>

<script>
  export default {

  }
</script>
