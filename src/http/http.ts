/*
 * @Description: 二次封装axios
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-11-28 21:12:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-05 20:05:30
 */

import axios from 'axios';
// import qs from 'qs';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://120.27.246.207:8089' : 'http://120.27.246.207';

axios.defaults.timeout = 5000;
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

export const httpGet = (url: string, params: object = {}) => {
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

export const httpPost = (url: string, data: object = {}) => {
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
