import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/box',
    name: 'Box',
    component: () => import('../views/Box.vue')
  },
  {
    path: '/line',
    name: 'Line',
    component: () => import('../views/Line.vue')
  },
  {
    path: '/shadow',
    name: 'Shadow',
    component: () => import('../views/Shadow.vue')
  },
  {
    path: '/animation',
    name: 'Animation',
    component: () => import('../views/Animation.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
