<template>
  <transition name="fade">
    <div class="mobile-search" v-if="visible" @click="close">
      <autocomplete
        width="100%"
        @select="update"
        size="small"
        @show-user-detail="id => $emit('show-user-detail', id)"
      />
    </div>
  </transition>
</template>

<script>
import Autocomplete from "./Autocomplete";
export default {
  components: {
    Autocomplete
  },

  props: {
    visible: Boolean
  },

  watch: {
    "$store.getters.app.device"(device) {
      if (device === "desktop") {
        this.update();
      }
    }
  },

  methods: {
    update() {
      this.$emit("update:visible", false);
    },

    close() {
      if (event.currentTarget === event.target) {
        this.update();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mobile-search {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2000;
  padding: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
