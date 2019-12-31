/*
 * @Description: api管理
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-11-28 21:12:14
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-30 23:00:34
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

// 老师使用密码登录
export async function loginWithPassword(params: LoginParam): Promise<Res> {
	const res: Res = await httpPost('/api/v1/login', params);
	return res;
}

// 老师使用验证码登录
export async function loginWithAuthCode(params: LoginParam): Promise<Res> {
	const res: Res = await httpPost('/api/v1', params);
	return res;
}

// 学生使用密码登录
export async function loginStudentWithPassword(params: LoginParam): Promise<Res> {
	const res: Res = await httpPost('/api/v1/userLogin', params);
	return res;
}

/************* 学生管理(老师端) **************/

// 添加学生
export async function addStudent(params: StudentInfo): Promise<Res> {
	const res: Res = await httpPost('/api/v1/addUser', params);
	return res;
}

// 获取并查看学生列表
export async function getStudentList(): Promise<Res> {
	const res: Res = await httpGet('/api/v1/selectUserList');
	return res;
}

// 重置学生登录密码
export async function resetPassword(uId: string): Promise<Res> {
	const params = {
		uId,
		password: '111111',
	};
	const res: Res = await httpPost('/api/v1/updateUser', params);
	return res;
}

/************* 考勤计划管理(老师端) **************/

// 添加考勤计划
export async function addAttendancePlan(params: AttendancePlan): Promise<Res> {
	const res: Res = await httpPost('/api/v1/addPlan', params);
	return res;
}

// 获取并查看考勤计划列表
export async function getAttendancePlanList(): Promise<Res> {
	const res: Res = await httpGet('/api/v1/selectAttendPlanList');
	return res;
}

// 在考勤计划中录入学生
export async function loggingStudentInfo(params: any): Promise<Res> {
	const res: Res = await uploadPost('/api/v1/addPlan/addPlanUser', params);
	return res;
}

// 批准请假
export async function agreeLeave(params: AgreeOrNoLeave): Promise<Res> {
	const res: Res = await httpPost('/api/v1/updateArgee', params);
	return res;
}

// 不批准请假
export async function noAgreeLeave(params: AgreeOrNoLeave): Promise<Res> {
	const res: Res = await httpPost('/api/v1/updateNoArgee', params);
	return res;
}

// 获取请假审批列表
export async function getLeaveList(): Promise<Res> {
	const res: Res = await httpGet('/api/v1/selectLeaveList');
	return res;
}

/************* 学生请假管理(学生端) **************/

// 学生获取考勤计划并请假
export async function getAttendancePlanToLeave(uId: string): Promise<Res> {
	const params = {
		uId,
	};
	const res: Res = await httpPost('/api/v1/selectUserAttendPlan', params);
	return res;
}

// 申请请假
export async function applyForLeave(params: ApplyVacation): Promise<Res> {
	const res: Res = await httpPost('/api/v1/askLeave', params);
	return res;
}

// 获取并查看请假记录列表
export async function getLeaveRecordList(uId: string): Promise<Res> {
	const params = {
		uId,
	};
	const res: Res = await httpPost('/api/v1/selectUserLeave', params);
	return res;
}

// 获取并查看考勤记录
export async function getAttendanceRecordList(params: any): Promise<Res> {
	const res: Res = await httpPost('/api/v1/selectUserSignList', params);
	return res;
}

/************* 学生打卡(学生端) **************/

// 学生拍照打卡
export async function photoPunch(params: any): Promise<Res> {
	const res: Res = await uploadPost('/api/v1/selectUserSignAttendPlanList', params);
	return res;
}

export async function punchCard(params: any): Promise<Res> {
	const res: Res = await httpPost('/api/v1/updateUserSign', params);
	return res;
}
