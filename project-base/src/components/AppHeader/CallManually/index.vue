<template>
  <div class="call-manually">
    <el-input
      placeholder="请输入电话号码"
      maxlength="11"
      v-model="phoneNumber"
      clearable
      @keyup.enter="call"
    >
      <el-select v-model="type" style="width: 95px" slot="prepend">
        <el-option label="手机外呼" :value="1" />
        <el-option label="固话外呼" :value="2" />
        <el-option label="免风控" :value="3" />
        <el-option label="VOIP" :value="4" />
      </el-select>
      <el-button slot="append" @click="call">拨打</el-button>
    </el-input>

    <phone-dialog
      :type="type"
      :number="phoneNumber"
      v-if="visible"
      @close="visible = false"
    />
  </div>
</template>

<script>
import PhoneDialog from "@/components/TelephoneButton/PhoneDialog";

export default {
  components: {
    PhoneDialog
  },

  data() {
    return {
      type: 1,
      phoneNumber: "",
      visible: false
    };
  },

  methods: {
    call() {
      if (this.phoneNumber.trim() === "") {
        this.$message.warning("请输入电话号码");
      } else {
        //voip直接发起外呼
        if (this.type === 4) {
          this.$voip.callOut(this.phoneNumber);
        } else {
          this.visible = true;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.call-manually {
  float: right;
  margin-right: 15px;
  width: 245px;
  line-height: 48px;
}

@media (max-width: 1280px) {
  .call-manually {
    display: none;
  }
}
</style>
