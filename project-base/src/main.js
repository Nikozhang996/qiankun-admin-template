import Vue from "vue";
import router from './router'
import store from './store'
import ElementUI from "element-ui";
import App from './App.vue'


Vue.use(ElementUI, {
    size: "mini",
});

Vue.config.productionTip = false;

export default new Vue({
    el: '#root',
    router,
    store,
    render: (h) => h(App),
})


