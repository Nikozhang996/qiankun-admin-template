<template>
  <el-dropdown class="account" size="small" :show-timeout="0">
    <div class="content">
      <el-avatar :size="30" v-if="userData.gender === 'boy'">
        <img src="@/assets/images/avatar_boy.png" />
      </el-avatar>

      <el-avatar :size="30" v-else>
        <img src="@/assets/images/avatar_girl.png" />
      </el-avatar>
      <span class="username" v-if="device === 'desktop'">
        {{ userData.realname }}
      </span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="showDialog.email = !showDialog.email">
        企业邮箱
      </el-dropdown-item>
      <el-dropdown-item
        @click.native="showDialog.dingding = !showDialog.dingding"
      >
        绑定钉钉
      </el-dropdown-item>
      <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
    <email-dialog :visible.sync="showDialog.email"></email-dialog>
    <ding-ding-dialog :visible.sync="showDialog.dingding"></ding-ding-dialog>
  </el-dropdown>
</template>

<script>
import { logout } from "@/utils/common";
import EmailDialog from "./emailDialog";
import DingDingDialog from "./dingdingDialog";
export default {
  components: { EmailDialog, DingDingDialog },
  data() {
    return {
      showDialog: {
        email: false,
        dingding: false
      }
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },

    device() {
      return this.$store.getters.app.device;
    }
  },

  methods: {
    logout() {
      logout();
    }
  }
};
</script>

<style lang="scss" scoped>
.account {
  float: right;
  height: inherit;
  display: flex;
}
.content {
  display: flex;
  align-items: center;
}
.username {
  color: white;
  margin-left: 10px;
}
</style>
