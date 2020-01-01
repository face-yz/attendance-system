/*
 * @Description: 入口文件
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-09-15 21:59:24
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-01 21:41:05
 */
import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import { ElMessage } from 'element-ui/types/message';
import { ElNotification } from 'element-ui/types/notification';
import { ElMessageBox } from 'element-ui/types/message-box';
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
	Radio,
	RadioGroup,
	Breadcrumb,
	BreadcrumbItem,
	Divider,
	MessageBox,
	Table,
	TableColumn,
	TimePicker,
	DatePicker,
	Select,
	Option,
	Tag,
	Drawer,
	Upload,
	Dialog,
	Tabs,
	TabPane,
	Notification,
	Pagination,
} from 'element-ui';
import App from './App.vue';
import router from './router';
import store from '@/store/store';
import lodash from 'lodash';
import Echarts from 'echarts';

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
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Divider);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(TimePicker);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tag);
Vue.use(Drawer);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Pagination);

declare module 'vue/types/vue' {
	interface Vue {
		$router: VueRouter;
		$route: Route;
		$message: ElMessage;
		$notify: ElNotification;
		$messageBox: ElMessageBox;
		_: typeof lodash;
		$echarts: typeof Echarts;
	}
}

Vue.config.productionTip = false;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype['_'] = lodash;
Vue.prototype.$echarts = Echarts;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
