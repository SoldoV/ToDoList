<template>
  <div class="front-page">
    <mobile-sidebar v-if="sidebar" v-on:closeSidebar="showSidebar"/>
   <Header v-on:myEvent="showSidebar"/>
   <front-page-info/>
      <Tables/>
  </div>
</template>

<script>
 //Import all components
  import Header from "./header.vue"
  import Tables from "./tables.vue"
  import FrontPageInfo from "./front-page-info.vue"
  import MobileSidebar from "./mobile-sidebar.vue"


  export default {
    name: 'front-page',
    components:{
      Header,
      Tables,
      FrontPageInfo,
      MobileSidebar
    },
    data() {
      return {
        sidebar: false,
      }
    },
    methods:{
      showSidebar(){
        this.sidebar = !this.sidebar
      }
    }
  }

</script>

<style lang="scss"></style>
