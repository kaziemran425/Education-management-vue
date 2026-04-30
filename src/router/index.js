import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
// এখানে .js এক্সটেনশনটি অবশ্যই যোগ করুন
import routes from "./routes.js";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // SMART LOGIN GUARD
  Router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("user_session");

    if (!isAuthenticated && !to.path.includes("/auth")) {
      next("/auth/login");
    } else if (isAuthenticated && to.path.includes("/auth")) {
      next("/dashboard");
    } else {
      next();
    }
  });

  return Router;
});
