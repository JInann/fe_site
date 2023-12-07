import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: () => import("./login.vue") },
    { path: "/login", component: () => import("./login.vue") },
    { path: "/token/:token", component: () => import("./token.vue") },
    { path: "/user/:id", component: () => import("./user.vue") },
  ],
});

// Vue.config.productionTip = false;
// import VConsole from "vconsole";
if (import.meta.env.VITE_APP_TITLE != "production") {
  // new VConsole();
}
const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
