<template>
  <el-dialog
    width="500px"
    title="企业邮箱"
    :visible="visible"
    :close-on-click-modal="false"
    append-to-body
    @close="handleClose"
    @open="handleOpen"
  >
    <div v-loading="loading">
      <div
        v-if="type === 2"
        style="background: #ffffd3; padding: 8px; margin-bottom: 10px; border: 1px solid #facd91;"
      >
        请输入您的 名拼音.姓的拼音，如 张三
        san.zhang@happy-seed.com。注意因为公司员工比较多，如出现同名同姓的情况，请在后面增加数字加以区分
      </div>
      <div class="mb-10">
        <span>企业邮箱</span>
        <span class="red">&nbsp;*</span>
      </div>
      <div v-if="type === 1">
        <div class="mb-10 red">当前帐号未绑定企业邮箱，请点击下面绑定</div>
        <div>
          <el-button type="primary" @click="type = 2">开通或绑定邮箱</el-button>
        </div>
      </div>
      <div v-if="type === 2">
        <div>
          <el-input v-model="email" @input="handleInput">
            <template slot="append">@happy-seed.com</template>
          </el-input>
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
          <span>邮箱：{{ user.email }}</span>
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
      user: {
        email: "",
        name: "",
        dingTalkId: ""
      },
      canBind: false,
      type: 1, // 1: 当前帐号未绑定企业邮箱 2: 用户点击了绑定邮箱，展示input框 3: 已经有邮箱了， 重新绑定
      email: "",
      rules: {
        name: [{ required: true, message: "请输入企业邮箱", trigger: "blur" }]
      }
    };
  },
  methods: {
    queryEmail() {
      this.message = "";
      this.HasError = false;
      if (this.email) {
        if (!/^[\w]+\.[\w]+$/.test(this.email)) {
          this.HasError = true;
          this.message = "企业邮箱格式有误, 期望格式为: xxx.xxxx";
          return void 0;
        }
        this.queryLoading = true;
        this.$http["oa"]
          .get("/oa/v1/bind/qq/email", {
            params: { email: this.email + "@happy-seed.com" }
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
        this.message = "请输入企业邮箱";
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
      this.email = "";
      this.HasError = false;
      this.$emit("update:visible");
    },
    handleOpen() {
      this.loading = true;
      this.$http["oa"]
        .get("/oa/v1/bind/employee")
        .then(({ data }) => {
          console.log(data);
          this.user = data;
          if (this.user && this.user.email) {
            this.type = 3; // 有邮箱
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
        .post("/oa/v1/bind/qq/email", {
          email: this.email + "@happy-seed.com"
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
