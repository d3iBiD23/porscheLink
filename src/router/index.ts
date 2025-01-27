import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/homepage'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/homepage'
      },
      {
        path: 'homepage',
        component: () => import('@/views/HomePageOverview.vue')
      },
      {
        path: 'accountpage',
        component: () => import('@/views/AccountPage.vue')
      },
      {
        path: 'help',
        component: () => import('@/views/HelpPage.vue')
      }
      ,
      {
        path: 'details',
        component: () => import('@/views/Details.vue')
      }
      ,
      {
        path: 'repair',
        component: () => import('@/views/Repair.vue')
      }
      ,
      {
        path: 'functions',
        component: () => import('@/views/Functions.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
