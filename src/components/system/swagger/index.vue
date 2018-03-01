<template>
  <keep-alive>
  <my-iframe routerPath="/manage/swagger-ui.html"></my-iframe>
  </keep-alive>
</template>

<script>
  import MyIframe from 'base/iframe'
  export default {
    name: 'swagger',
    components: {
      MyIframe
    }
//    created () {
//        console.log(window.location.href) //http://192.168.202.1:8999/#/sys/sql
//    }
  }
</script>

