<template>
  <div class="notification">
    <el-badge v-if="count > 0" :value="count" class="badge">
      <i class="el-icon-message-solid" @click="showSlide" />
    </el-badge>
    <i v-else class="el-icon-message-solid" @click="showSlide" />
    <app-slide ref="slide">
      <template slot="content">
        <el-button
          v-if="activeName === 'notRead' && showAllRead"
          class="all-read"
          type="text"
          size="medium"
          @click="setAllReaded"
        >
          全部已读
        </el-button>
        <i class="el-icon-close" @click="hideSlide" />
        <el-tabs v-model="activeName">
          <el-tab-pane label="未读消息" name="notRead">
            <not-read
              ref="notRead"
              @item-click="handleItemClick"
              @update="handleNotReadUpdate"
            />
          </el-tab-pane>
          <el-tab-pane label="已读消息" name="readed">
            <readed ref="readed" @item-click="handleItemClick" />
          </el-tab-pane>
        </el-tabs>
      </template>
    </app-slide>
  </div>
</template>

<script>
import ws from "@/utils/ws";
import AppSlide from "@/components/AppSlide";
import Readed from "./Readed";
import NotRead from "./NotRead";

export default {
  components: {
    AppSlide,
    Readed,
    NotRead
  },

  data() {
    return {
      activeName: "notRead",
      count: 0,
      instance: null,
      showAllRead: false
    };
  },

  created() {
    this.instance = ws.connect();
    this.addMessageListener();
  },

  beforeDestroy() {
    this.removeMessageListener();
  },

  computed: {
    userId() {
      return this.$store.getters.userData.id;
    }
  },

  methods: {
    fetchNotReadCount() {
      this.$http["workorder"]
        .post("work-order/mail/queryNotReadCount", {
          type: 1,
          userId: this.userId
        })
        .then(({ bizResponseCode, messageCount }) => {
          if (bizResponseCode === "B00") {
            this.count = messageCount;
          }
        });
    },

    setAllReaded() {
      this.$http["workorder"]
        .post("work-order/mail/updateReadStatus", {
          operation_type: 2,
          type: 1,
          userId: this.userId
        })
        .then(({ bizResponseCode }) => {
          if (bizResponseCode === "B00") {
            this.refreshData("notRead");
            this.refreshData("readed");
          }
        });
    },

    showSlide() {
      this.$refs.slide.show();
    },

    hideSlide() {
      this.$refs.slide.hide();
    },

    addMessageListener() {
      this.instance.addEventListener("message", this.handleMessage);
    },

    removeMessageListener() {
      this.instance.removeEventListener("message", this.handleMessage);
    },

    handleMessage(res) {
      if (res.data) {
        const { msg, code } = JSON.parse(res.data);
        if (code === 200 && msg === "success") {
          this.refreshData("notRead");
          this.refreshData("readed");
        }
      }
    },

    handleItemClick(item) {
      this.hideSlide();
      this.$router.push({
        path: "/workorder/privatePoll/privatePoll-all",
        query: { workOrderCode: item.messageContent.workOrderCode }
      });
    },

    refreshData(type) {
      this.$refs[type].initData();
    },

    handleNotReadUpdate(data) {
      this.showAllRead = data.length !== 0;
      this.fetchNotReadCount();
    }
  }
};
</script>

<style lang="scss" scoped>
.notification {
  height: inherit;
  line-height: inherit;
  float: right;
  margin-right: 15px;
  display: flex;
  align-items: center;
  .el-icon-message-solid {
    font-size: 30px !important;
    color: white;
    cursor: pointer;
  }
  .badge {
    height: auto;
    line-height: normal;

    ::v-deep .el-badge__content {
      top: 6px;
      right: 12px;
    }
  }
}

.el-icon-close {
  font-size: 26px;
  position: absolute;
  top: 0;
  right: 2px;
  padding: 6px;
  cursor: pointer;
  z-index: 1;
}

.all-read {
  position: absolute;
  top: 2px;
  right: 50px;
  cursor: pointer;
  z-index: 1;
}

::v-deep .app-slide .slide .content {
  padding: 0;
}
::v-deep .el-tabs {
  height: 100%;
  position: relative;
  .el-tabs__header {
    margin-bottom: 0;
    .el-tabs__nav-wrap {
      padding: 0 10px;
    }
  }
  .el-tabs__content {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    background-color: #f2f2f2;
    // padding: 10px;
    // overflow-y: auto;
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
