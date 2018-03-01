<template>
  <my-iframe routerPath="/manage/druid/index.html"></my-iframe>
</template>

<script>
  import MyIframe from 'base/iframe'
  export default {
    name: 'sql',
    components: {
      MyIframe
    }
//    created () {
//        console.log(window.location.href) //http://192.168.202.1:8999/#/sys/sql
//    }
  }
</script>

