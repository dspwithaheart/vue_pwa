import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/three',
    name: 'Three',
    component: () => import(/* webpackChunkName: "three" */ '../components/ThreeAnime.vue')
  },
  {
    path: '/forcegraph',
    name: 'ForceGraph',
    component: () => import(/* webpackChunkName: "forcegraph" */ '../components/ForceGraph.vue')
  },
  {
    path: '/unrealbloom',
    name: 'UnrealBloom',
    component: () => import(/* webpackChunkName: "unrealbloom" */ '../components/UnrealBloom.vue')
  },
  {
    path: '/interactivepoints',
    name: 'InteractivePoints',
    component: () => import(/* webpackChunkName: "interactivepoints" */ '../components/InteractivePoints.vue')
  },
  {
    path: '/shaders',
    name: 'Shaders',
    component: () => import(/* webpackChunkName: "shaders" */ '../components/Shaders.vue')
  }
  // {
  //   path: '/githubio',
  //   name: 'Github',
  //   component: () => import(/* webpackChunkName: "githubio" */ '../components/Github.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
