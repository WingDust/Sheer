import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Home from './components/HelloWorld.vue'
import Main from '../view/Main.vue';

const routes: RouteRecordRaw[] = [

{
  path: '/',
  name: 'Main',
  component: Main
},
{
  path: '/proxy',
  name: 'proxy',
  component: () => import('../view/proxy.vue')
}
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
