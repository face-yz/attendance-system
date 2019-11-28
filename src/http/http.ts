/*
 * @Description: 二次封装axios
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-11-28 21:12:06
 * @LastEditors: Jensen
 * @LastEditTime: 2019-11-28 21:56:57
 */

import axios from 'axios';
import qs from 'qs';

const BASE_URL = 'http://zhkt.fun';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('as_token');
  token && (config.headers.Author = `Bearer ${token}`);
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

export const httpPost = (url: string, params: object = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params))
    .then((res) => {
      resolve(res.data);
    })
    .catch((error) => {
      console.error('httpPost error: ', error);
    });
  });
};
