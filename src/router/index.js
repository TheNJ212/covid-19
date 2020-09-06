import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Countries from '../views/Countries.vue'
import Country from '../views/Country.vue'
import NotFound from '../views/NotFound.vue'
import Vaccine from '../views/Vaccine.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      indexActive: 0
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About, // () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    meta: {
      indexActive: 1
    }
  },
  {
    path: '/countries',
    name: 'Countries',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Countries, // () => import(/* webpackChunkName: "countries" */ '../views/Countries.vue')
    meta: {
      indexActive: 2
    }
  },
  {
    path: '/vaccine',
    name: 'Vaccine',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Vaccine, // () => import(/* webpackChunkName: "countries" */ '../views/Countries.vue')
    meta: {
      indexActive: 3
    }
  },
  {
    path: '/countries/:country',
    name: 'Country',
    component: Country,
    meta: {
      indexActive: -1
    }
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      indexActive: -1
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
