<template>
  <!--搜索框-->
  <el-autocomplete
    :size="size"
    :style="{ width: width }"
    v-model="inputVal"
    :trigger-on-focus="false"
    :debounce="300"
    clearable
    autocomplete
    :fetch-suggestions="querySearch"
    @clear="tempQueryValue = ''"
    @select="handleSelect"
    popper-class="search-popper"
    placeholder="输姓名或4位数以上号码,可键盘↑↓操作"
  >
    <i slot="prefix" class="el-input__icon el-icon-search" />
    <template slot-scope="{ item }">
      {{ item.txt }}
    </template>
  </el-autocomplete>
</template>

<script>
function strlen(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}
export default {
  props: {
    width: {
      type: String,
      default: "320px"
    },
    size: {
      type: String,
      default: "mini"
    }
  },
  data() {
    return {
      inputVal: "",
      tempQueryValue: ""
    };
  },
  methods: {
    // 快速搜索框
    querySearch(queryString, callback) {
      this.tempQueryValue = queryString;
      if (queryString.trim() === "") return;
      // 小于4位数号码不让发
      if (strlen(queryString) < 4) {
        return;
      }
      this.$http["lp"]
        .post("tool/search_user", { keywords: queryString.trim() })
        .then(res => {
          const { code, data, info } = res;
          if (code === 0) {
            callback(data.users);
            if (data.users.length === 0) {
              this.$message.warning(`没有{ ${queryString} }的数据`);
            }
          } else if (code === 1003) {
            this.$message.warning(info);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 下拉搜索，选中后的逻辑
    handleSelect: function({ id }) {
      this.inputVal = this.tempQueryValue;
      this.$emit("show-user-detail", id);
    }
  }
};
</script>

<style>
.search-popper {
  width: auto !important;
}
</style>
