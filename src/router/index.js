import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import GroupFeed from '../views/GroupFeed.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feed',
    name: 'GroupFeed',
    component: GroupFeed
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
