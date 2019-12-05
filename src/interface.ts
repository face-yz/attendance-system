/*
 * @Description: 定义所有接口形状
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-04 20:09:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-05 19:37:13
 */

export interface LoginParam {
  username: string;
  password ?: string;
  authCode ?: number;
}

export interface RuleForm {
  userName: string;
  password: string;
  authCode: number;
}

