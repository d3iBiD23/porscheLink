import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { IonTabs } from "@ionic/vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home/",
  },
  {
    path: "/home/",
    name: "home",
    component: IonTabs,
    children: [
      {
        path: "mainpage",
        component: () => import("@/views/MainScreen.vue"),
      }
    ]
  },
  {
    path: "/tabs",
    name: "tabs",
    component: IonTabs,
    children: [
      {
        path: "details",
        component: () => import("@/views/HomePageOverview.vue"),
      },
      {
        path: "accountpage",
        component: () => import("@/views/AccountPage.vue"),
      },
      {
        path: "help",
        component: () => import("@/views/HelpPage.vue"),
      },
      {
        path: "details",
        component: () => import("@/views/Details.vue"),
      },
      {
        path: "repair",
        component: () => import("@/views/Repair.vue"),
      },
      {
        path: "functions",
        component: () => import("@/views/Functions.vue"),
      },
      {
        path: "maps",
        component: () => import("@/views/MapsView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
