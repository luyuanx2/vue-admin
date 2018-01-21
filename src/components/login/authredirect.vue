<script>
    export default {
      name: 'authredirect',
      created () {

//        const hash = window.location.search.slice(1)
//        const hash = window.location.hash.split("?")[1];
        const hash = window.location.href.split("?")[1];
        alert('hash'+hash)
        window.opener.location.href = window.location.origin + '/login#' + new Date().getTime().toString()
//        window.opener.location.href =  window.location.origin + '/login#' + new Date().getTime().toString()
//        window.close()
      }
    }
</script>
