import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import Task from '../views/Task.vue'
import New from '../views/New.vue'

const routes = [
  {path: '/tasks', alias: '/', component: Tasks},
  {path: '/new', component: New},
  {path: '/task/:taskId', component: Task, props: true},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
