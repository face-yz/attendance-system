/*
 * @Description: 入口文件
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-09-15 21:59:24
 * @LastEditors: Jensen
 * @LastEditTime: 2019-09-15 22:48:52
 */
import Vue from 'vue';
import { Button } from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Button);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
