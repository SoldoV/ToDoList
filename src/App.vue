<template>
  <div id="app">   
    <FrontPage/>
  </div>
</template>

<script>
import FrontPage from './components/frontPage.vue'

export default {
  name: 'app',
  components: {
    FrontPage
  }
}
</script>

<style lang="scss">
 @import "./css/main.css";
</style>
