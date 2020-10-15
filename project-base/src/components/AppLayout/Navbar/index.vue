<template>
  <div class="navbar">
    <div class="hamburger-container">
      <hamburger />
    </div>

    <tags-view />
  </div>
</template>

<script>
import Hamburger from "./Hamburger";
import TagsView from "./TagsView.vue";

export default {
  components: {
    Hamburger,
    TagsView
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 32px;
  line-height: 32px;
  position: relative;
  .hamburger-container {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-42%);
    line-height: 1;
    z-index: 100;
  }
}
</style>
