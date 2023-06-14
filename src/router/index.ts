import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/theLoginPage',
      name: 'theLoginPage',
      component: () => import('../views/TheLoginPage.vue')
    },
    {
      path: '/theWelcomePage',
      name: 'theWelcomePage',
      component: () => import('../views/TheWelcomePage.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound404',
      component: () => import('../views/NotFound404.vue')
    }
  ]
})

export default router
