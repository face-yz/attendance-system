/*
 * @Description: 入口文件
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-09-15 21:59:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-05 20:44:48
 */
import Vue from 'vue';
import {
  Button,
  Row,
  Container,
  Header,
  Aside,
  Main,
  Col,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Input,
  Link,
  Form,
  FormItem,
  Message,
} from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Button);
Vue.use(Row);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Col);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Input);
Vue.use(Link);
Vue.use(Form);
Vue.use(FormItem);

Vue.config.productionTip = false;
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
