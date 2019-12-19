/*
 * @Description: 二次封装axios
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-11-28 21:12:06
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-19 20:44:52
 */

import axios from 'axios';
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
