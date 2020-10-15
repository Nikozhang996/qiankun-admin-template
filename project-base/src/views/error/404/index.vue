<template>
  <div style="overflow: hidden">
    <h4>抱歉，您暂时无权限查看此页面，请联系管理员开通。</h4>
    <el-button @click="back" type="text">返回首页</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.replace("/");
      // location.href = location.origin;
    }
  }
};
</script>
