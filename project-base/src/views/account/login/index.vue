<template>
  <div class="login-container">
    <el-card class="third-party-login-card" v-if="type === 'thirdParty'">
      <div class="logo-container">
        <img src="@/assets/images/login-logo.png" />
      </div>
      <div class="btn-container">
        <el-button
          type="primary"
          size="large"
          style="width: 100%"
          @click="fetchLoginQrcodeUrl"
        >
          钉钉扫码登录
        </el-button>

        <el-button
          type="text"
          style="margin-top: 15px"
          @click="type = 'username'"
        >
          账号密码登录
        </el-button>
      </div>
    </el-card>

    <el-card class="login-card" v-else>
      <div class="logo-container">
        <img src="@/assets/images/login-logo.png" />
      </div>
      <el-form
        ref="loginForm"
        label-position="top"
        size="large"
        :model="loginForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            clearable
            v-model="loginForm.username"
            auto-complete="off"
            @keyup.enter.native="$refs.password.focus()"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password" class="password-item">
          <el-input
            clearable
            ref="password"
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>

        <el-form-item>
          <el-button :loading="loading" type="primary" @click="handleLogin">
            登 录
          </el-button>
        </el-form-item>

        <div style="margin-top: 15px; text-align: center">
          <el-button type="text" @click="type = 'thirdParty'">
            钉钉扫码登录
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { setToken } from "@/utils/token";

export default {
  data() {
    return {
      loading: false,
      type: "thirdParty",
      loginForm: {
        username: "",
        password: "",
        __fields: "token,uid"
      }
    };
  },

  methods: {
    fetchLoginQrcodeUrl() {
      this.loading = true;
      this.$http["auth"]
        .get("v1/dingtalk/oauth/qrcode-login-url", {
          params: {
            redirect: encodeURIComponent(
              `${window.location.origin}?type=login`
            ),
            __fields: "url"
          }
        })
        .then(({ code, data: { url } }) => {
          if (code === 0) {
            location.href = url;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleLogin() {
      if (!this.loginForm.username) {
        this.$message.warning("请输入用户名");
        return;
      }
      if (!this.loginForm.password) {
        this.$message.warning("请输入密码");
        return;
      }
      this.loading = true;
      this.$http["auth"]
        .post("v1/auth/admin/token", this.loginForm)
        .then(({ code, data }) => {
          if (code === 0) {
            setToken(data.token);
            this.$router.replace("/");
          } else {
            this.loading = false;
          }
        })
        .catch(err => {
          this.loading = false;
          const { data } = err.response;
          let message;
          if (data) {
            message = data.info || "发生未知错误";
          } else {
            message = "发生未知错误";
          }
          this.$message.error(message);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #50c8b9;

  & ::v-deep .el-card {
    transition: none;
  }

  & ::v-deep .el-card__body {
    padding: 20px;
    .el-form-item {
      width: 100%;
      margin: 0px auto;
      .el-form-item__label {
        line-height: 20px;
      }
      .el-button {
        width: 100%;
        margin-top: 30px;
      }
    }
    .password-item {
      margin-top: 25px;
    }
  }

  .third-party-login-card {
    width: 300px;
    height: auto;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;

    .logo-container {
      width: 200px;
      height: 50px;
      margin: 20px auto 0 auto;

      img {
        width: 100%;
      }
    }
    .btn-container {
      text-align: center;
      margin-top: 30px;
    }
  }

  .login-card {
    width: 350px;
    height: 380px;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    .logo-container {
      width: 200px;
      height: 50px;
      margin: 20px auto 0 auto;

      img {
        width: 100%;
      }
    }
  }
}
</style>
