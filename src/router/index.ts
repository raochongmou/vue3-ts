import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import LocalCache from "@/utils"
import { firstMenu } from "@/utils/mapMenuToRoutes";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/index.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/notFound/index.vue")
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})
router.beforeEach((to) => {
  if(to.path !== "/login") {
    const token = LocalCache.getCache("token");
    if(!token) {
      return "/login";
    }
  }
  if(to.path === "/main") {
    router.push(firstMenu);
  }
})

export default router