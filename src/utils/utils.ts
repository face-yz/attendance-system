/*
 * @Description: 封装的工具
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-05 20:15:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-18 17:54:28
 */

/**
 * @description: 检查用户是否登录
 * @param {} 无参数
 * @return: true or false
 */
export const checkIsLogin = (): boolean => {
	const token = localStorage.getItem('as_token');
	return token !== null;
};

/**
 * @description: base64格式转file对象
 * @param {string, string} base64字符串
 * @return: file对象
 */
export const dataURLtoFile = (dataurl: string, filename: string): any => {
	const arr: any = dataurl.split(',');
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = atob(arr[1]).length;
	const u8arr = new Uint8Array(n);
	while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, {type: mime});
};

/**
 * @description: 设置页面的title
 * @param {string} 页面title
 * @return: 无返回值
 */
export const setPageTitle = (title: string): void => {
	document.title = title + ' - 大学生考勤系统';
};

/**
 * @description: 星期字符串格式化
 * @param {string} 星期字符串
 * @return: 星期字符串数组
 */
export const setWeekDay = (dayStr: string): string[] => {
	const weekdays: string[] = [];
	const arrDay: string[] = dayStr.split('_');
	arrDay.forEach((item: string) => {
		switch (item) {
			case '1': weekdays.push('星期一'); break;
			case '2': weekdays.push('星期二'); break;
			case '3': weekdays.push('星期三'); break;
			case '4': weekdays.push('星期四'); break;
			case '5': weekdays.push('星期五'); break;
		}
	});
	return weekdays;
};
