/*
 * @Description: api管理
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-11-28 21:12:14
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-25 18:31:25
 */
import { httpGet, httpPost, uploadPost } from '@/http/http';
import {
	Res,
	LoginParam,
	StudentInfo,
	AttendancePlan,
	ApplyVacation,
	AgreeOrNoLeave,
} from '@/interface';

/************* 登录 **************/

export async function loginWithPassword(params: LoginParam): Promise<Res> {
	const res: Res = await httpPost('/api/v1/login', params);
	return res;
}

export async function loginWithAuthCode(params: LoginParam): Promise<Res> {
	const res: Res = await httpPost('/api/v1', params);
	return res;
}

export async function loginStudentWithPassword(params: LoginParam): Promise<Res> {
	const res: Res = await httpPost('/api/v1/userLogin', params);
	return res;
}

/************* 学生管理 **************/

export async function addStudent(params: StudentInfo): Promise<Res> {
	const res: Res = await httpPost('/api/v1/addUser', params);
	return res;
}

export async function getStudentList(): Promise<Res> {
	const res: Res = await httpGet('/api/v1/selectUserList');
	return res;
}

export async function resetPassword(uId: string): Promise<Res> {
	const params = {
		uId,
		password: '111111',
	};
	const res: Res = await httpPost('/api/v1/updateUser', params);
	return res;
}

/************* 考勤计划管理 **************/

export async function addAttendancePlan(params: AttendancePlan): Promise<Res> {
	const res: Res = await httpPost('/api/v1/addPlan', params);
	return res;
}

export async function getAttendancePlanList(): Promise<Res> {
	const res: Res = await httpGet('/api/v1/selectAttendPlanList');
	return res;
}

export async function loggingStudentInfo(params: any): Promise<Res> {
	const res: Res = await uploadPost('/api/v1/addPlan/addPlanUser', params);
	return res;
}

/************* 学生请假 **************/

export async function getAttendancePlanToLeave(uId: string): Promise<Res> {
	const params = {
		uId,
	};
	const res: Res = await httpPost('/api/v1/selectUserAttendPlan', params);
	return res;
}

export async function applyForLeave(params: ApplyVacation): Promise<Res> {
	const res: Res = await httpPost('/api/v1/askLeave', params);
	return res;
}

export async function getLeaveList(): Promise<Res> {
	const res: Res = await httpGet('/api/v1/selectLeaveList');
	return res;
}

export async function agreeLeave(params: AgreeOrNoLeave): Promise<Res> {
	const res: Res = await httpPost('/api/v1/updateArgee', params);
	return res;
}

export async function noAgreeLeave(params: AgreeOrNoLeave): Promise<Res> {
	const res: Res = await httpPost('/api/v1/updateNoArgee', params);
	return res;
}
