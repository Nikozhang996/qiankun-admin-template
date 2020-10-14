import Vue from "vue";
import ElementUI from "element-ui";

import App from './App.vue'

Vue.use(ElementUI, {
  size: "mini",
});

Vue.config.productionTip = false;

export default new Vue({
  render: (h) => h(App),
}).$mount("#root");


