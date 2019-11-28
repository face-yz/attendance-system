/*
 * @Description: 路由配置文件
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-11-28 21:21:04
 * @LastEditors: Jensen
 * @LastEditTime: 2019-11-28 21:21:29
 */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
