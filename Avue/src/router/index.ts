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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/reactive',
      name: 'reactive',
      component: () => import('../views/ReactiveView.vue')
    },
    {
      path: '/playground',
      name: 'playground',
      component: () => import('../views/PlaygroundView.vue')
    },
    {
      path: '/vbind',
      name: 'vbind',
      component: () => import('../views/VBindView.vue')
    },
    {
      path: '/parentopt',
      name: 'parentopt',
      component: () => import('../views/ParentOptView.vue')
    },
    {
      path: '/parentcomp',
      name: 'parentcomp',
      component: () => import('../views/ParentCompView.vue')
    },
    {
      path: '/lifecycle',
      name: 'lifecycle',
      component: () => import('../views/LifeCycleView.vue')
    },
  ]
})

export default router
