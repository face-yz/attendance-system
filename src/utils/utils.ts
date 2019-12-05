/*
 * @Description: 封装的工具
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-05 20:15:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-05 20:19:00
 */

export const checkIsLogin = (): boolean => {
  const token = localStorage.getItem('as_token');
  return token !== undefined;
};
