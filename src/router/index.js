import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/components/About.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/components/users/Users.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('@/components/users/id.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
