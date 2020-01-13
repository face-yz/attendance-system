/*
 * @Description: 路由配置文件
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-11-28 21:21:04
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-09 17:25:53
 */
import Vue from 'vue';
import Router, { Route, RouteConfig } from 'vue-router';
import store from '@/store/store';
import Home from './views/Home.vue';
import { checkIsLogin } from '@/utils/utils';

Vue.use(Router);

const path: string = store.state.role;

// export const asyncRoutes: RouteConfig[] = [
//   {
//     path: '/student/punch-card/:id',
//     name: 'punch-cord',
//     component: () => import('@/components/PunchCard.vue'),
//     meta: {
//       requireAuth: true,
//       roles: ['student'],
//     },
//   },
// ];

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			// name: 'home',
			redirect: '/student/punch-card',
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/Login/Login.vue'),
		},
		{
			path: '/student',
			name: 'student',
			component: Home,
			children: [
				{
					path: 'punch-card',
					name: 'punch-card',
					component: () => import('@/components/PunchCard.vue'),
					meta: {
						requireAuth: false,
						roles: ['student'],
					},
				},
				{
					path: 'look-attendance',
					name: 'look-attendance',
					component: () => import('@/components/LookAttendance.vue'),
					meta: {
						requireAuth: true,
						roles: ['student'],
					},
				},
				{
					path: 'attendance-record',
					name: 'attendance-record',
					component: () => import('@/components/AttendanceRecord.vue'),
					meta: {
						requireAuth: true,
						roles: ['student'],
					},
				},
				{
					path: 'leave-record',
					name: 'leave-record',
					component: () => import('@/components/LeaveRecord.vue'),
					meta: {
						requireAuth: true,
						roles: ['student'],
					},
				},
				{
					path: 'personal-information',
					name: 'personal-information',
					component: () => import('@/components/PersonalInfo.vue'),
					meta: {
						requireAuth: true,
						roles: ['student'],
					},
				},
			],
		},
		{
			path: '/teacher',
			name: 'teacher',
			component: Home,
			meta: {
				requireAuth: true,
			},
			children: [
				{
					path: 'add-student',
					name: 'add-student',
					component: () => import('@/components/AddStudent.vue'),
					meta: {
						requireAuth: true,
						roles: ['teacher'],
					},
				},
				{
					path: 'student-list',
					name: 'student-list',
					component: () => import('@/components/StudentList.vue'),
					meta: {
						requireAuth: true,
						roles: ['teacher'],
					},
				},
				{
					path: 'attendance-list',
					name: 'attendance-list',
					component: () => import('@/components/AttendanceList.vue'),
					meta: {
						requireAuth: true,
						roles: ['teacher'],
					},
				},
				{
					path: 'add-attendance',
					name: 'add-attendance',
					component: () => import('@/components/AddAttendance.vue'),
					meta: {
						requireAuth: true,
						roles: ['teacher'],
					},
				},
				{
					path: 'examine',
					name: 'examine',
					component: () => import('@/components/Examine.vue'),
					meta: {
						requireAuth: true,
						roles: ['teacher'],
					},
				},
				{
					path: 'attendance-info',
					name: 'attendance-info',
					component: () => import('@/components/StudentAttendInfo.vue'),
					meta: {
						requireAuth: true,
						roles: ['teacher'],
					},
				},
				{
					path: 'history-state',
					name: 'history-state',
					component: () => import('@/components/HistoryAttendState.vue'),
					meta: {
						requireAuth: true,
						roles: ['teacher'],
					},
				},
			],
		},
		{
			path: '*',
			name: '404',
			component: () => import('@/views/404.vue'),
		},
	],
});

router.beforeEach((to: Route, from: Route, next) => {
	if (to.path === '/student/punch-card') {
		localStorage.setItem('auth', 'student');
	}
	if (to.matched.some((route) => route.meta.requireAuth)) {
		if (!checkIsLogin()) {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath,
				},
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
