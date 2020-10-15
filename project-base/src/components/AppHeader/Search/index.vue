<template>
  <div>
    <user-detail-dialog
      append-to-body
      :visible.sync="userDetailVisible"
      :user-id="userId"
    />
    <div class="search">
      <autocomplete
        v-if="device === 'desktop'"
        width="270px"
        @show-user-detail="showUserDetail"
      />
      <i v-else class="iconfont icon-fangdajing" @click="visible = true" />
      <mobile-search
        :visible.sync="visible"
        @show-user-detail="showUserDetail"
      />
    </div>
  </div>
</template>

<script>
import Autocomplete from "./Autocomplete";
import MobileSearch from "./MobileSearch";

export default {
  components: {
    Autocomplete,
    MobileSearch
  },

  data() {
    return {
      visible: false,
      userDetailVisible: false,
      userId: ""
    };
  },

  computed: {
    device() {
      return this.$store.getters.app.device;
    }
  },

  methods: {
    showUserDetail(id) {
      this.userId = id;
      this.userDetailVisible = true;
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  height: inherit;
  line-height: 48px;
  float: right;
  margin-right: 15px;

  .iconfont {
    font-size: 30px !important;
    color: white;
    cursor: pointer;
  }
}
</style>
