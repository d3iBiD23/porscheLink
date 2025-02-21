import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/login/register",
    name: "register",
    component: () => import("@/views/login/Register.vue"),
  },
  {
    path: "/login/forgotPwd",
    name: "forgotPwd",
    component: () => import("@/views/login/ForgotP.vue"),
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/homepage",
      },
      {
        path: "homepage",
        component: () => import("@/views/mainScreen/MainScreen.vue"),
      },
      {
        path: "details",
        component: () => import("@/views/vehicleDetails/HomePageOverview.vue"),
      },
      {
        path: "accountpage",
        component: () => import("@/views/account/AccountPage.vue"),
      },
      {
        path: "help",
        component: () => import("@/views/mainHelp/HelpPage.vue"),
      },
      {
        path: "repair",
        component: () => import("@/views/vehicleDetails/Repair.vue"),
      },
      {
        path: "functions",
        component: () => import("@/views/vehicleDetails/Functions.vue"),
      },
      {
        path: "maps",
        component: () => import("@/views/map/MapsView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
