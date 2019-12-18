/*
 * @Description: 定义所有接口形状
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-04 20:09:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-18 17:55:45
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
	resource: string;
}

export interface Res {
	code: string;
	data: any;
	msg: string;
}

export interface StudentInfo {
	username: string;
	password ?: string;
	uId: string;
	phone: string;
}

export interface AttendancePlan {
	clazzname: string;
	starttime: string;
	endtime: string;
	groupname: string;
	marktime: string;
	weekdays ?: number[];
	days ?: string;
	week ?: string[];
}
