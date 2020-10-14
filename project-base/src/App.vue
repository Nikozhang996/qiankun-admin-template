<template>
  <div id="root">
    <el-select v-model="a">
      <el-option label="A" value="1"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 100
    }
  }
}
</script>
