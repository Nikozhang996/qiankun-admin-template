<template>
  <div class="scroll-layout" @scroll="handleScroll">
    <slot />
    <div class="bottom-layout" v-if="!hide" v-loading="loading">
      <span v-if="end">没有数据了</span>
      <span v-if="!end && !loading">滚动加载更多</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      end: false,
      hide: false
    };
  },

  methods: {
    handleScroll(event) {
      const target = event.target;
      const { scrollTop, offsetHeight, scrollHeight } = target;
      if (scrollTop + offsetHeight === scrollHeight) {
        this.$emit("load-more");
      }
    },

    changeStatus(type) {
      switch (type) {
        case "loading":
          this.loading = true;
          break;

        case "finish":
          this.loading = false;
          break;

        case "end":
          this.loading = false;
          this.end = true;
          break;

        case "hide":
          this.hide = true;
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-layout {
  height: 100%;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
}
.bottom-layout {
  background-color: transparent;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  ::v-deep .el-loading-mask {
    background-color: inherit;
  }
}
</style>
