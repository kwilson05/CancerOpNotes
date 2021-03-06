import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue';

import useFirebaseAuth from "@/composable/firebase-auth";
const state = useFirebaseAuth();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/vitals'
      },
      {
        name: 'vitals',
        path: 'vitals',
        component: () => import('@/views/Vitals.vue')
      },
    ]
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/Register.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (state.user.value && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'vitals', replace: true });
  } else if (
    !state.user.value &&
    to.name !== 'login' &&
    to.name !== 'register'
  ) {
    next({ name: 'login', replace: true });
  } else {
    next();
  }
})

export default router
