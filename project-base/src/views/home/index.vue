<template>
  <div>
    <app-header />
    <div class="home-content">
      <div class="home-view">
        <h1 class="title">欢迎使用快乐种子后台管理系统</h1>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";

export default {
  components: {
    AppHeader
  }
};
</script>

<style lang="scss" scoped>
.home-content {
  position: absolute;
  top: 48px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.home-view {
  width: 100%;
  position: relative;
  background: url(~@/assets/images/banner.png) no-repeat;
  background-size: 100%;
  height: 100%;
  overflow: hidden;
}
.title {
  color: white;
  top: 1vw;
  left: 2.5vw;
  font-size: 2.7vw;
  position: absolute;
  animation: title 0.5s ease forwards;
  font-style: italic;
  transform: translateY(-100%);
  opacity: 0;
  letter-spacing: 0.1vw;
}
@keyframes title {
  70% {
    transform: translateY(5%);
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>
