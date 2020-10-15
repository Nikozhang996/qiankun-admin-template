<template>
  <scroll-layout
    ref="scroll"
    v-loading="loading.list"
    @load-more="handleLoadMore"
  >
    <div v-if="msgData.length > 0">
      <notification-item
        v-for="item in msgData"
        :key="item.workOrderCode"
        :data="item"
        @click.native="$emit('item-click', item)"
      >
        <div>{{ item.messageContent && item.messageContent.time }}</div>
        <div style="margin-top: 10px">
          {{ item.messageContent && item.messageContent.messageContent }}
        </div>
      </notification-item>
    </div>
    <div class="no-data" v-else>暂无数据</div>
  </scroll-layout>
</template>

<script>
import ScrollLayout from "./ScrollLayout";
import NotificationItem from "./NotificationItem";

export default {
  components: {
    ScrollLayout,
    NotificationItem
  },

  data() {
    return {
      formData: {
        nowPage: 1,
        pageSize: 10,
        type: 1,
        isRead: 1,
        userId: this.$store.getters.userData.id
      },
      loading: {
        list: false,
        more: false
      },
      msgData: [],
      noData: false
    };
  },

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      this.formData.nowPage = 1;
      this.loading.list = true;
      try {
        this.msgData = await this.fetchMsgData();
      } finally {
        this.loading.list = false;
      }
      if (this.msgData.length < this.formData.pageSize)
        this.$refs.scroll.changeStatus("hide");
    },

    fetchMsgData() {
      return this.$http["workorder"]
        .post("work-order/mail/queryMailMessage", this.formData)
        .then(({ bizResponseCode, data }) => {
          if (bizResponseCode === "B00") {
            if (data) {
              data.forEach(item => {
                item.messageContent = JSON.parse(item.messageContent);
              });
            }
            return data || [];
          }
        });
    },

    async handleLoadMore() {
      if (!this.noData) {
        this.formData.nowPage++;
        this.$refs.scroll.changeStatus("loading");
        try {
          const data = await this.fetchMsgData();
          if (data.length === 0) {
            this.noData = true;
            this.$refs.scroll.changeStatus("end");
          } else {
            this.$refs.scroll.changeStatus("finish");
            this.msgData = [].concat(this.msgData, data);
          }
        } catch (error) {
          this.$refs.scroll.changeStatus("finish");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.no-data {
  text-align: center;
  margin-top: 50px;
}
</style>
