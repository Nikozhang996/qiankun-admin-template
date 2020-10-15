<template>
  <div class="container" v-if="device === 'desktop'">
    <el-menu
      class="app-menu"
      :default-active="defaultActive"
      menu-trigger="click"
      mode="horizontal"
      background-color="#50C8B9"
      text-color="#fff"
      active-text-color="#FAE26E"
    >
      <template v-for="item in visibleMenus">
        <el-menu-item
          :key="item.route"
          :index="item.route"
          @click="openMenu(item.route)"
        >
          {{ item.title }}
        </el-menu-item>
      </template>

      <el-submenu v-if="moreMenus.length > 0" index="more">
        <template slot="title">
          更多
        </template>

        <el-menu-item
          v-for="item in moreMenus"
          :key="item.route"
          :index="item.route"
          @click="openMenu(item.route)"
        >
          {{ item.title }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>

  <el-dropdown v-else trigger="click" size="medium" class="mobile">
    <i class="iconfont icon-zuocelan"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in menus"
        :key="item.route"
        :style="getMobileMenuActive(item.route)"
        @click.native="openMenu(item.route)"
      >
        {{ item.title }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    defaultActive() {
      const match = this.$route.path.match(/\/[\w-_]+/);
      return match ? match[0] : "";
    },

    device() {
      return this.$store.getters.app.device;
    },

    menus() {
      return this.$store.getters.menus;
    },

    visibleMenus() {
      return this.menus.slice(0, 4);
    },

    moreMenus() {
      return this.menus.slice(4);
    }
  },

  methods: {
    async openMenu(route) {
      this.$router.push(route);
    },

    getFirstPath(path, data) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (!item.meta.hidden) {
          const children = item.children;
          if (Array.isArray(children)) {
            return this.getFirstPath(`${path}/${item.path}`, children);
          } else {
            return `${path}/${item.path}`;
          }
        }
      }
    },

    getMobileMenuActive(path) {
      if (this.defaultActive === path) {
        return {
          color: "#50c8b9",
          backgroundColor: "#EEFAF8"
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  float: left;
  margin: 0 15px;
  height: inherit;
  line-height: 48px;
}
.app-menu {
  height: 100%;
  box-sizing: border-box;
  border-bottom: none;
  .el-menu-item {
    display: flex;
    align-items: center;
  }
  .el-submenu,
  .el-menu-item,
  ::v-deep .el-submenu__title {
    height: inherit;
    line-height: inherit;
    .el-submenu__icon-arrow {
      color: white;
    }
  }
}
.mobile {
  height: inherit;
  line-height: inherit;
  float: right;
  margin-right: 15px;
  display: flex;
  align-items: center;
  .iconfont {
    font-size: 30px !important;
    color: white;
    cursor: pointer;
  }
}
</style>
