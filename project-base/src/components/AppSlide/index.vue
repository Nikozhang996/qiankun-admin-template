<template>
  <transition name="fade">
    <div class="app-slide" v-show="visible" @click="handleClick($event)">
      <transition name="slide">
        <div ref="appSlide" class="slide" v-show="visible" :style="getStyle()">
          <div class="header" v-if="hasTitle">
            <slot name="title" />
            <i class="el-icon-close" @click.stop="hide" />
          </div>

          <div class="content">
            <slot name="content" />
          </div>

          <div class="footer" v-if="hasFooter">
            <slot name="footer" />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },

  computed: {
    hasTitle() {
      return this.$slots.title !== void 0;
    },

    hasFooter() {
      return this.$slots.footer !== void 0;
    },

    device() {
      return this.$store.state.app.device;
    }
  },

  mounted() {
    this.initStyle();
  },

  methods: {
    initStyle() {
      const contentStyle = this.$refs.appSlide.querySelector(".content").style;
      this.hasTitle && (contentStyle.top = "48px");
      this.hasFooter && (contentStyle.bottom = "45px");
    },

    show() {
      this.visible = true;
    },

    hide() {
      this.visible = false;
    },

    handleClick(event) {
      if (event.currentTarget === event.target) {
        this.hide();
      }
    },

    getStyle() {
      return { minWidth: this.device === "desktop" ? "400px" : "100vw" };
    }
  }
};
</script>

<style lang="scss" scoped>
$duration: 0.3s;

.app-slide {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2000;
  color: #606266;
  .slide {
    position: fixed;
    min-width: 400px;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    z-index: 2001;
    box-shadow: 1px 10px 40px rgba(0, 0, 0, 0.1);
    .header {
      height: 48px;
      line-height: 48px;
      background-color: #50c8b9;
      color: #fff;
      line-height: 48px;
      padding: 0 10px;
      position: relative;
      font-size: 12px;

      .el-icon-close {
        font-size: 18px;
        float: right;
        position: absolute;
        right: 10px;
        top: 50%;
        padding: 5px;
        cursor: pointer;
        transform: translateY(-50%);
      }
    }
    .content {
      padding: 10px;
      line-height: normal;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: hidden;
    }

    .footer {
      padding: 0 10px;
      height: 45px;
      line-height: 45px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-top: 1px solid #ebeef5;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all $duration;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all $duration;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
