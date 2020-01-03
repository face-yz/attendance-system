/*
 * @Description: 二次封装axios
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-11-28 21:12:06
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-02 17:29:15
 */

import axios from 'axios';
import { MessageBox } from 'element-ui';
import router from '@/router';
import { Res } from '@/interface';
// import qs from 'qs';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://120.27.246.207:8089' : 'http://120.27.246.207';

axios.defaults.timeout = 10000;
axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use((config) => {
	const token = localStorage.getItem('as_token');
	token && (config.headers.Authorization = `Bearer ${token}`);
	return config;
}, (error) => {
	console.error('axios request error:', error);
});

axios.interceptors.response.use((response) => {
	const code: number = parseInt(response.data.code, 10);
	if (code === -1) {
		MessageBox.confirm('当前登录已过期， 请重新前往登录！', '登录过期', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
		}).then(() => {
			router.push({
				path: 'login',
				query: {
					redirect: router.currentRoute.fullPath,
				},
			});
		});
	}
	return response;
 }, (error) => {
	console.error('axios response error: ', error);
 });

export const httpGet = (url: string, params: object = {}): Promise<Res> => {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params,
		}).then((res) => {
			resolve(res.data);
		}).catch((error) => {
			console.error('httpGet error: ', error);
		});
	});
};

export const httpPost = (url: string, data: object = {}): Promise<Res> => {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
		.then((res) => {
			resolve(res.data);
		})
		.catch((error) => {
			console.error('httpPost error: ', error);
		});
	});
};

export const uploadPost = (url: string, data: object = {}): Promise<Res> => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};
	return new Promise((resolve, reject) => {
		axios.post(url, data, config)
		.then((res) => {
			resolve(res.data);
		})
		.catch((error) => {
			console.error('uploadPost error: ', error);
		});
	});
};
