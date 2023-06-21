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
    props: true,
    component: () => import('@/components/users/id.vue')
  },
  {
    path: '/store',
    name: 'users-store',
    component: () => import('@/components/users/UsersWithStore.vue')
  },
  {
    path: '/composition',
    name: 'users-composition',
    component: () => import('@/components/users/UsersWithComposition.vue')
  },
  {
    path: '/hooks',
    name: 'users-hooks',
    component: () => import('@/components/users/UsersWithHooks.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
