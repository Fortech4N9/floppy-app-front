import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfileView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/your-friends',
    name: 'your-friends',
    component: () => import('../views/UserFriendsView.vue')
  },
  {
    path: '/your-future-friends',
    name: 'your-future-friends',
    component: () => import('../views/UserFutureFriendsView.vue')
  },
  {
    path: '/friend-profile',
    name: 'FriendProfileView',
    component: () => import('../views/FriendProfileView.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
