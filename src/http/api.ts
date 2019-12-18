/*
 * @Description: api管理
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-11-28 21:12:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-18 16:29:08
 */
import { httpGet, httpPost } from '@/http/http';
import { LoginParam, Res, StudentInfo, AttendancePlan } from '@/interface';

/************* 登录 **************/

export async function loginWithPassword(param: LoginParam): Promise<Res> {
	const res: Res = await httpPost('/api/v1/login', param);
	return res;
}

export async function loginWithAuthCode(param: LoginParam): Promise<Res> {
	const res: Res = await httpPost('/api/v1', param);
	return res;
}

/************* 学生管理 **************/

export async function addStudent(param: StudentInfo): Promise<Res> {
	const res: Res = await httpPost('/api/v1/addUser', param);
	return res;
}

export async function getStudentList(): Promise<Res> {
	const res: Res = await httpGet('/api/v1/selectUserList');
	return res;
}

export async function resetPassword(uId: string): Promise<Res> {
	const param = {
		uId,
		password: '111111',
	};
	const res: Res = await httpPost('/api/v1/updateUser', param);
	return res;
}

/************* 考勤计划管理 **************/

export async function addAttendancePlan(param: AttendancePlan): Promise<Res> {
	const res: Res = await httpPost('/api/v1/addPlan', param);
	return res;
}

export async function getAttendancePlanList(): Promise<Res> {
	const res: Res = await httpGet('/api/v1/selectAttendPlanList');
	return res;
}
