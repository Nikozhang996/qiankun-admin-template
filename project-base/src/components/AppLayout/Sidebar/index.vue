<template>
  <div class="slidebar">
    <el-menu
      unique-opened
      class="el-menu-vertical"
      :default-active="$route.path"
      :collapse="!$store.getters.app.sidebar.opened"
      @select="handleSelect"
    >
      <sidebar-item :menus="menus" :root-path="rootPath" />
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";

export default {
  components: {
    SidebarItem
  },

  data() {
    return {
      matchPath: ""
    };
  },

  watch: {
    $route: {
      immediate: true,
      handler(val) {
        const match = val.path.match(/(\/[^/]+)\/?/);
        this.matchPath = match ? match[1] : "";
      }
    }
  },

  computed: {
    rootPath() {
      return this.matchPath;
    },

    module() {
      const target = this.$store.getters.menus.find(item => {
        return item.route === this.matchPath;
      });
      return target || [];
    },

    menus() {
      return this.module ? this.module.children : [];
    },

    opened() {
      return false;
    }
  },
  methods: {
    handleSelect(path) {
      const { query } = this.$route;
      this.$nextTick(() => {
        this.$router.replace({ path: path, query });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.slidebar {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid #ebeef5;

  & ::v-deep .el-menu-vertical {
    border-right: none;
    box-sizing: border-box;
    // transition: null;
    border-right-color: #ebeef5;

    &:not(.el-menu--collapse) {
      width: 180px;
    }

    &.el-menu--collapse {
      width: 45px;
      .el-menu-item,
      .el-submenu__title,
      .el-tooltip {
        padding: 0 5px !important;
        span,
        .el-submenu__icon-arrow {
          display: none;
        }
        i {
          margin-left: 5px !important;
        }
      }
    }

    .el-menu-item.is-active {
      background: #eefaf8;
    }
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgb(239, 239, 239);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-corner {
    background: #179a16;
  }
}
</style>
