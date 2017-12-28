<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include='cachedViews'>
      <user-list></user-list>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  import UserList from 'components/user/index'

  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>
