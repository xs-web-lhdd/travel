import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "city" */ '../views/Home')
  },
  {
    path: '/city/City',
    name: 'City',
    component: () => import(/* webpackChunkName: "city" */ '../views/city/City')
  },
  {
    path: '/citydetail/Citydetail/:id',
    name: 'Citydetail',
    component: () => import(/* webpackChunkName: "citydetail" */ '../views/citydetail/Citydetail')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
})

export default router
