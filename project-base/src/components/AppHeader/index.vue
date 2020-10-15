<template>
  <div class="app-header">
    <logo />
<!--    <account />-->
    <app-menu />
<!--    <notification />-->
<!--    <search />-->
<!--    <call-manually />-->
  </div>
</template>

<script>
import Logo from "./Logo";
import AppMenu from "./AppMenu";
// import Account from "./Account";
import Search from "./Search";
import Notification from "./Notification";
// import CallManually from "./CallManually";

export default {
  components: {
    Logo,
    AppMenu,
    // Account,
    // Notification,
    // Search,
    // CallManually
  }
};
</script>

<style lang="scss" scoped>
.app-header {
  position: relative;
  height: 48px;
  // line-height: 48px;
  background-color: #50c8b9;
  color: white;
  padding: 0 15px;
}
</style>
