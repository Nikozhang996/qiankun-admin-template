<template>
  <el-dialog
    width="500px"
    title="绑定钉钉"
    :visible="visible"
    :close-on-click-modal="false"
    append-to-body
    @close="handleClose"
    @open="handleOpen"
  >
    <div v-loading="loading">
      <div class="mb-10" v-if="type === 1">
        <span>钉钉账号</span>
        <span class="red">&nbsp;*</span>
      </div>
      <div class="mb-10" v-if="type === 2">
        <span>钉钉登录手机号</span>
        <span class="red">&nbsp;*</span>
      </div>
      <div v-if="type === 1">
        <div class="mb-10 red">当前帐号未绑定钉钉，请点击下面绑定</div>
        <div>
          <el-button type="primary" @click="type = 2">绑定钉钉</el-button>
        </div>
      </div>
      <div v-if="type === 2">
        <div>
          <el-input v-model="phone" @input="handleInput"></el-input>
        </div>
        <div class="mt-10">
          <el-button
            type="primary"
            class="mr-4"
            @click="queryEmail"
            v-loading="queryLoading"
          >
            查询
          </el-button>
          <span class="green" v-if="!HasError">{{ message }}</span>
          <span class="red" v-else>{{ message }}</span>
        </div>
      </div>
      <div v-if="type === 3">
        <div class="mb-10">
          <span class="mr-4">姓名：{{ user.name }}</span>
          <span>Dingtalk_id：{{ user.dingTalkId }}</span>
        </div>
        <div>
          <el-button type="primary" @click="type = 2">重新绑定</el-button>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible')">取 消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        :disabled="!canBind && type == 2"
        v-loading="loading"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      loading: false,
      queryLoading: false,
      HasError: false,
      message: "",
      type: 1, // 1: 当前帐号未绑定企业邮箱 2: 用户点击了绑定邮箱，展示input框 3: 已经有邮箱了， 重新绑定
      user: {
        email: "",
        name: "",
        dingTalkId: ""
      },
      canBind: false,
      dingding: "",
      phone: ""
    };
  },
  methods: {
    queryEmail() {
      this.message = "";
      this.HasError = false;
      if (this.phone) {
        if (!/[\d]{11}/.test(this.phone)) {
          this.HasError = true;
          this.message = "钉钉登录手机号格式有误";
          return void 0;
        }
        this.queryLoading = true;
        this.$http["oa"]
          .get("/oa/v1/bind/dingTalk", {
            params: { mobile: this.phone }
          })
          .then(({ data }) => {
            this.HasError = !data.canBind;
            this.canBind = data.canBind;
            this.message = data.message;
          })
          .finally(() => {
            this.queryLoading = false;
          });
      } else {
        this.HasError = true;
        this.message = "请输入钉钉登录手机号";
        return void 0;
      }
    },
    handleInput() {
      this.canBind = false;
      this.message = "";
    },
    handleClose() {
      this.loading = false;
      this.canBind = false;
      this.message = "";
      this.phone = "";
      this.HasError = false;
      this.$emit("update:visible");
    },
    handleOpen() {
      this.loading = true;
      this.$http["oa"]
        .get("/oa/v1/bind/employee")
        .then(({ data }) => {
          this.user = data;
          if (this.user && this.user.dingTalkId) {
            this.type = 3; // 有dingTalkId
          } else {
            this.type = 1;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSubmit() {
      if (this.type !== 2) {
        this.$emit("update:visible");
        return void 0;
      }
      this.loading = true;
      this.$http["oa"]
        .post("/oa/v1/bind/dingTalk", {
          mobile: this.phone
        })
        .then(res => {
          if (res.code === 0 || res.code === 200) {
            this.$message.success("保持成功");
            this.$emit("update:visible");
          } else {
            this.$message.error(res.message);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.mt-10 {
  margin-top: 10px;
}
.mb-10 {
  margin-bottom: 10px;
}
.mr-4 {
  margin-right: 4px;
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>
