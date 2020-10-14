import Vue from "vue";
import ElementUI from "element-ui";

Vue.use(ElementUI, {
  size: "mini",
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

export default application;
