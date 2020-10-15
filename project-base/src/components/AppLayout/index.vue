<template>
  <div class="app-layout">
    <app-header />
    <div class="app-body">
      <div class="body-left">
        <sidebar />
      </div>
      <div class="body-right">
        <div class="tags-view">
          <navbar />
        </div>
        <div id="module-container">
          <transition name="fade-transform" mode="out-in">
            <router-view v-if="$store.getters.app.routeActive" />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import resizeMixin from "@/mixin/resizeMixin";

export default {
  name: "AppLayout",
  components: {
    AppHeader,
    Sidebar,
    Navbar
  },
  mixins: [resizeMixin]
};
</script>

<style lang="scss" scoped>
// fade-transform
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.app-layout {
  height: 100%;
  .app-body {
    top: 48px;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    overflow: hidden;
    .body-left,
    .body-right {
      height: 100%;
    }
    .body-left {
      float: left;
    }
    .body-right {
      overflow: hidden;
      position: relative;
      #module-container {
        position: absolute;
        top: 32px;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
