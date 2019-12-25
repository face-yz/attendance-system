/*
 * @Description: 定义所有接口形状
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-04 20:09:28
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-25 18:06:04
 */

export type Func = () => void;
export type LeaveList = AttendancePlan & ApplyVacation;

export interface LoginParam {
	username ?: string;
	password ?: string;
	authCode ?: number;
	uId ?: string;
}

export interface RuleForm {
	userName: string;
	password: string;
	authCode ?: number;
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

export interface ApplyVacation {
	uId: string;
	username: string;
	startt: string;
	endt: string;
	userreason: string;
	state ?: number;
	id ?: string;
}

export interface AgreeOrNoLeave {
	uId: string;
	id ?: string;
	startt: string;
	endt: string;
	groupname: string;
	marktime: string;
	starttime: string;
	days ?: string;
	clazzname: string;
	teachersay ?: string;
}
