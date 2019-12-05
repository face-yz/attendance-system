/*
 * @Description: api管理
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-11-28 21:12:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-05 19:35:32
 */
import { httpGet, httpPost } from '@/http/http';
import { LoginParam } from '@/interface';

/************* 登录 **************/

export async function loginWithPassword(param: LoginParam) {
  const res = await httpPost('/api/v1/login', param);
  return res;
}

export async function loginWithAuthCode(param: LoginParam) {
  const res = await httpPost('/api/v1', param);
  return res;
}
