<template>
  <div class="nav-tags-view">
    <el-tabs
      :value="currentPath"
      type="card"
      @tab-remove="removeTag"
      @tab-click="switchTag"
      @contextmenu.prevent.native="openMenu($event)"
    >
      <el-tab-pane
        v-for="tag in tags"
        :key="tag.path"
        :label="tag.meta ? tag.meta.title : ''"
        :name="tag.path"
        closable
      />
    </el-tabs>
    <div class="operation">
      <el-dropdown size="small" @command="handleCommand" trigger="click">
        <i class="el-icon-arrow-down" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="current">关闭当前标签</el-dropdown-item>
          <el-dropdown-item command="other">关闭其它标签</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有标签</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refresh(selectedTag.path)">
        刷新此标签
      </li>
      <li @click="removeTag(selectedTag.path)">
        关闭此标签
      </li>
      <li @click="removeOtherTags(selectedTag.path)">
        关闭其他标签
      </li>
      <li @click="removeAllTags">
        关闭所有标签
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    currentPath() {
      return this.$route.path;
    },

    tags() {
      return this.$store.getters.tags;
    }
  },

  data() {
    return {
      visible: false,
      left: 100,
      top: 28,
      lastRoute: null,
      selectedTag: {}
    };
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        this.addTag();
        this.lastRoute = this.$route;
      }
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },

  methods: {
    findTagIndex(path) {
      return this.tags.findIndex(item => item.path === path);
    },

    closeMenu() {
      this.visible = false;
    },

    openMenu(e) {
      const { id, textContent } = e.target;
      const keyPath = id.replace("tab-", "");
      this.selectedTag = this.$store.getters.tags.find(
        item => item.path === keyPath
      );
      if (this.selectedTag?.meta?.title !== textContent) {
        return;
      }
      const siderWidth = this.$store.state.app.sidebar.opened ? 185 : 56;
      const navHeigth = 46;
      const contextMenuWidth = 104; // 右键菜单宽度
      const clienx = Math.min(e.clientX, window.innerWidth - contextMenuWidth); // 判断边缘条件
      this.left = clienx - siderWidth;
      this.top = e.clientY - navHeigth;
      this.visible = true;
    },

    addTag() {
      const { meta, name, path, params, query } = this.$route;
      if (meta && meta.title) {
        const route = { meta, name, path, params, query };
        let index = 0;
        if (this.lastRoute) {
          index = this.tags.findIndex(
            item => item.path === this.lastRoute.path
          );
        }
        if (this.findTagIndex(route.path) === -1) {
          this.$store.commit("ADD_TAG", { route, index });
        }
      }
    },

    switchTag(tag) {
      const route = this.tags[this.findTagIndex(tag.name)] || { path: "/" };
      if (this.currentPath !== route.path) {
        this.redirect(route);
      }
    },

    removeTag(path) {
      const index = this.findTagIndex(path);
      const route = this.tags[index];
      this.$store.commit("REMOVE_TAG", route.path);
      if (path === this.currentPath) {
        if (index > 0) {
          this.redirect(this.tags[index - 1]);
        } else {
          this.redirect("/");
        }
      }
    },

    redirect(params) {
      this.$nextTick(() => {
        this.$router.push(params);
      });
    },

    refresh(path) {
      this.$nextTick(() => {
        this.$router.replace({
          path: "/redirect" + path
        });
      });
    },

    removeOtherTags(path) {
      const tempPath = path || this.currentPath;
      for (const tag of this.tags) {
        if (tag.path === tempPath) {
          this.$store.commit("SET_TAGS", [tag]);
          path && this.redirect(tempPath);
        }
      }
    },

    removeAllTags() {
      this.$store.commit("SET_TAGS", []);
      this.redirect("/");
    },

    handleCommand(command) {
      switch (command) {
        case "current":
          this.removeTag(this.currentPath);
          break;

        case "other":
          this.removeOtherTags();
          break;

        case "all":
          this.removeAllTags();
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-tags-view {
  position: relative;
  & ::v-deep .el-tabs__header {
    background-color: #f9fafc;
    margin: 0;
    padding: 0 34px 0 46px;
    .el-tabs__nav {
      border-top: none;
      border-radius: 0;
    }
    .el-tabs__item {
      position: relative;
      font-size: 12px;
      line-height: inherit;
      height: inherit;
      border-radius: 0;
      min-width: 140px;
      &.is-active {
        background-color: #fff;
        &:focus {
          border-bottom-color: #fff;
        }
      }
      & .el-icon-close {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        line-height: 13px;
      }
      &:focus {
        box-shadow: none;
        outline: none;
        border-color: #dcdfe6;
      }
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: inherit;
      i {
        position: relative !important;
        top: 1px !important;
      }
    }
    .el-tabs__nav-wrap.is-scrollable {
      padding: 0 30px;
    }
  }
  .operation {
    position: absolute;
    right: 15px;
    top: 0;
    .el-icon-arrow-down {
      cursor: pointer;
    }
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  li {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 32px;
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
}
</style>
