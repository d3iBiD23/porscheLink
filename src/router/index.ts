import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)*",
    redirect: "/login",
  },
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
    path: "/maps",
    component: () => import("@/views/map/MapsView.vue"),
  },
  {
    path: "/account",
    component: () => import("@/views/account/AccountPage.vue"),
  },
  {
    path: "/help",
    component: () => import("@/views/mainHelp/HelpPage.vue"),
  },
  {
    path: "/porschelink",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "homepage",
      },
      {
        path: "homepage",
        component: () => import("@/views/mainScreen/MainScreen.vue"),
      },
      {
        path: "overview",
        component: () => import("@/views/vehicleDetails/HomePageOverview.vue"),
      },
      {
        path: "accountpage",
        component: () => import("@/views/account/AccountPage.vue"),
      },
      {
        path: "stats",
        component: () => import("@/views/stats/MainStats.vue"),
      },
      {
        path: "appointment",
        component: () => import("@/views/appointment/Appointment.vue"),
      },
      {
        path: "appointment/hour",
        component: () => import("@/views/appointment/Hour.vue"),
      },
      {
        path: "appointment/booked",
        component: () => import("@/views/appointment/Booked.vue"),
      },
      {
        path: "diagnose",
        component: () => import("@/views/diagnose/DiagnoseStatus.vue"),
      },
      {
        path: "diagnosing",
        component: () => import("@/views/diagnose/Diagnosing.vue"),
      },
      {
        path: "diagnosed",
        component: () => import("@/views/diagnose/DiagnoseGood.vue"),
      },
      {
        path: "clearingCodes",
        component: () => import("@/views/diagnose/ClearingCodes.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
