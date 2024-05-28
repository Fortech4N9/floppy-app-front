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
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile/ProfileView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/LoginView.vue')
  },
  {
    path: '/your-friends',
    name: 'your-friends',
    component: () => import('../views/messenger/UserFriendsView.vue')
  },
  {
    path: '/your-future-friends',
    name: 'your-future-friends',
    component: () => import('../views/messenger/UserFutureFriendsView.vue')
  },
  {
    path: '/friend-profile/:userId', // Добавляем :userId для параметра
    name: 'FriendProfileView',
    component: () => import('../views/Profile/FriendProfileView.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
