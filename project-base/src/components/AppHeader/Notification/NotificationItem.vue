<template>
  <el-card class="card" shadow="hover">
    <slot />
  </el-card>
</template>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  position: relative;
  &:not(:first-child) {
    margin-top: 15px;
  }
  ::v-deep .el-card__body {
    padding: 10px;
  }
}
</style>
