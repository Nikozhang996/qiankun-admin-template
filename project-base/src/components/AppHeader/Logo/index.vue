<template>
  <div class="logo-container" @click="$router.push('/')">
    <img src="@/assets/images/header-logo.png" />
  </div>
</template>

<style lang="scss" scoped>
.logo-container {
  position: relative;
  float: left;
  cursor: pointer;
  width: 110px;
  height: inherit;
  img {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
