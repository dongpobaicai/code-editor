import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/code',
    name: 'code',
    component: () => import(/* webpackChunkName: "code" */ '../views/CodeEditor.vue')
  },
  {
    path: '/vue',
    name: 'vue',
    component: () => import(/* webpackChunkName: "code" */ '../views/VueEditor.vue')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import(/* webpackChunkName: "form" */ '../views/JsonForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
