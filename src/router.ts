/*
 * @Description: 路由配置文件
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-11-28 21:21:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-05 20:24:54
 */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { checkIsLogin } from '@/utils/utils';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/Login.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requireAuth)) {
    if (!checkIsLogin()) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }
});

export default router;
