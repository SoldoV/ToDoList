<template>
  <el-row class="header-row align-row">
    <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" class="main-header">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="header-col">
        <div class="header-img" :style="{ backgroundImage: 'url(' + logo + ') ' }"></div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-dropdown style="float:right" trigger="click">
          <div class="header-profile">
            <div class="header-profile-img-text hide-username font-nunito-bold">{{username}}</div>
            <div class="profile-image-wrapper align-row">
            <div class="header-profile-img"  @click="mySidebar" :style="{ backgroundImage: 'url(' + profile + ') ' }">
            </div>
            </div>
          </div>
          <!-------------------Log out------------------------->
          <el-dropdown-menu slot="dropdown" class="mobile-dropdown" style="margin-top:15px; width: 200px; border-radius:0px">
            <el-dropdown-item class="header-profile-img-text logout-float font-nunito-bold align-row">
              <i class="material-icons">exit_to_app</i>
              <div style="display:inline-block">Log out</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-col>
    </el-col>
  </el-row>
</template>

<script>
  //import images
  import logo from "../../public/img/logo.png"
  import profile from "../../public/img/avatar.png"

  export default {
    name: 'header',
    data() {
      return {
        logo: logo,
        profile: profile,
        username: "Username",
      }
    },
    methods:{
      //Emit to main page
      mySidebar(){
        if(screen.width < 922)this.$emit('myEvent')
      }
    }
  }

</script>

<style lang="scss"></style>
