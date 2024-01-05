import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { createRouter, createWebHashHistory } from "vue-router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { getQueryString } from "./common";
const page = getQueryString("page");
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/" + (page || "login") },
    { path: "/login", component: () => import("./login.vue") },
    { path: "/token", component: () => import("./token.vue") },
    { path: "/user", component: () => import("./user.vue") },
  ],
});

// Vue.config.productionTip = false;
// import VConsole from "vconsole";
if (import.meta.env.VITE_APP_TITLE != "production") {
  // new VConsole();
}
const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount("#app");
