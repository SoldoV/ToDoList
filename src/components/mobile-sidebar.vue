<template>
  <div class="mobile-sidebar">
    <div class="mobile-align">
      <div class=" align-row">
        <div class="profile-image-wrapper mobile-profile-align align-row" style="margin-right: 1em !important">
          <div class="header-profile-img mobile-profile-align-img"
            :style="{ backgroundImage: 'url(' + profile + ') ' }">
          </div>
        </div>
        <div class="header-profile-img-text font-nunito-bold mobile-username-align">{{username}}</div>
      </div>
      <div class="logout-mobile align-row">
        <i class="material-icons">exit_to_app</i>
        <div style="display:inline-block">Log out</div>
      </div>
    </div>
    <div class="clickAway" @click="$emit('closeSidebar')">
    </div>
  </div>
</template>

<script>
  import profile from "../../public/img/avatar.png"

  export default {
    name: 'mobile-sidebar',
    data() {
      return {
        profile: profile,
        username: "Username",
      }
    }
  }

</script>

<style lang="scss"></style>
