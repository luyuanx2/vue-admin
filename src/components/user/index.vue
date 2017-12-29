<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include='cachedViews'>
      <user-list></user-list>
    </keep-alive>
  </transition>
</template>

<script>
  import UserList from 'components/user/UserList'
  export default {
    components: {
      UserList
    },
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      }
    }
  }
</script>
