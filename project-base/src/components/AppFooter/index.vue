<template>
  <div class="app-footer" ref="appFooter">
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppFooter",

  watch: {
    "$store.state.app.sidebar.opened"(value) {
      this.initPosition(value);
    }
  },

  mounted() {
    this.initPosition(this.$store.state.app.sidebar.opened);
  },

  methods: {
    initPosition(value) {
      const style = this.$refs.appFooter.style;
      if (value) {
        style.left = "180px";
      } else {
        style.left = "45px";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-footer {
  overflow: hidden;
  position: fixed;
  left: 180px;
  bottom: 0;
  right: 0;
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  background-color: #fff;
  border-top: 1px solid #ebeef5;
  z-index: 998;
  // transition: left 0.4s;

  & ::v-deep .app-pagination {
    line-height: 38px;
    float: right;
    margin: 0;
    .el-pager,
    .el-pager li,
    .el-pagination button,
    .el-pagination span:not([class*="suffix"]) {
      vertical-align: middle;
    }
  }
}
</style>
