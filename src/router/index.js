import { createRouter, createWebHistory } from 'vue-router'
import Connection from '../views/Connection.vue'
import Feed from '../views/Feed.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Connection',
    component: Connection
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed
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
