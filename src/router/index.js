import { createRouter, createWebHistory } from 'vue-router'
import Connection from '../views/Connection.vue'
import GroupFeed from '../views/GroupFeed.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Connection',
    component: Connection
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
