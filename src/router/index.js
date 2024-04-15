import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/login.vue")
    },

    {
      path: "/:type",
      name: "category",
      component: () => import("../views/TopicView.vue")
    },
    {
      path: "/edit/:type/:ID",
      name: "edit",
      component: () => import("../components/EditMinor.vue")
    },
    {
      path: "/create/:type",
      name: "create",
      component: () => import("../components/CreateMinor.vue")
    },
    {
      path: "/editquestion/:ID",
      name: "editquestion",
      component: () => import("../components/EditQuestion.vue")
    },
    {
      path: "/createquestion",
      name: "createquestion",
      component: () => import("../components/CreateQuestion.vue")
    }
  ]
});

export default router;
