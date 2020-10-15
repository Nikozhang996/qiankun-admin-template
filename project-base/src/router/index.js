import Vue from "vue";
import {Message} from "element-ui";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {path: "/", redirect: "/home"},
    {
        path: "/account/login",
        name: "account-login",
        component: () => import("@/views/account/login")
    },
    {
        path: "/home",
        name: "home",
        component: () => import("@/views/home")
    },
    {
        path: "/redirect/:path(.*)",
        meta: {hidden: true},
        component: () =>
            import(/* webpackChunkName: "redirect" */ "@/views/redirect/index.vue")
    },
    {path: "/error/404", component: () => import("@/views/error/404")}
];

const router = new VueRouter({
    routes
});

router.onError(err => {
    if (/Cannot find module/.test(err.toString())) {
        Message.closeAll();
        Message.error("该页面不存在");
    }
});

export default router;
