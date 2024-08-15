import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../components/LogIn.vue'
import Home from '../components/home/Home.vue'
import GameList from '../components/gameListPage/GameList.vue'
import Provider from '../components/providerPage/Provider.vue'
import Account from '../components/account/Account.vue'

const routes = [  
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        redirect: '/home/gamelist'
      },
      {
        path: 'gamelist',
        name: 'GameList',
        component: GameList
      },
      {
        path: 'provider',
        name: 'Provider',
        component: Provider
      },
      {
        path: 'account',
        name: 'Account',
        component: Account
      }
    ]
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: function () {
    //   return import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
