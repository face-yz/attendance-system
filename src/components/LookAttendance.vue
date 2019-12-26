<!--
 * @Description: 学生查看考勤
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-12 21:04:56
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-26 18:46:30
 -->
<template>
	<div>
		<h3>学生查看考勤</h3>
		<el-table
			:data="tableData"
			border
			stripe
			label-width="110px"
			class="table-data"
			style="width: 981px">
			<el-table-column
				prop="clazzname"
				label="课程名称"
				align="center"
				width="200">
			</el-table-column>
			<el-table-column
				prop="groupname"
				label="教室"
				align="center"
				width="200">
			</el-table-column>
			<el-table-column
				prop="days"
				label="每周上课日期"
				align="center"
				width="200">
				<template slot-scope="scope">
					<span v-for="(item, index) in scope.row.week" :key="index">
						{{ item }}
					</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="marktime"
				label="上课时间"
				align="center"
				width="200">
			</el-table-column>			
			<el-table-column
				label="操作"
				align="center"
				width="180">
				<template slot-scope="scope">
					<el-button type="text" title="学生请假" @click="handleClick(scope.row)" size="medium">请假</el-button>
					<el-button type="text" title="查询该课程过往考勤记录" @click="goRecord(scope.row)">考勤记录</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-drawer
			title="请假"
			:visible.sync="drawer"
			direction="rtl"
			size="650px"
			:modal="false">
			<h3>学生请假</h3>
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="110px"
				class="demo-ruleForm">
				<el-form-item label="学生姓名" prop="username">
					<el-input v-model="ruleForm.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="学号" prop="uId">
					<el-input v-model="ruleForm.uId" disabled></el-input>
				</el-form-item>
				<el-form-item label="假期开始时间" prop="startt" required>
					<el-date-picker
						type="date"
						placeholder="选择日期"
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"
						v-model="ruleForm.startt"
						:picker-options="pickerOptionsStart"
						style="width: 100%;">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="假期结束时间" prop="endt" required>
					<el-date-picker
						type="date"
						placeholder="选择日期"
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"
						v-model="ruleForm.endt"
						:picker-options="pickerOptionsEnd"
						style="width: 100%;">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="请假事由" prop="userreason">
					<el-input
						type="textarea"
						:autosize="{ minRows: 2, maxRows: 4}"
						maxlength="100"
						minlength="10"
  					show-word-limit
						v-model="ruleForm.userreason"
						placeholder="请输入10-100位字符">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">请假</el-button>
					<el-button @click="closeDrawer">取消</el-button>
				</el-form-item>
			</el-form>
		</el-drawer>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getAttendancePlanToLeave, applyForLeave } from '@/http/api';
import { Res, AttendancePlan, ApplyVacation } from '@/interface';
import { setWeekDay, setPageTitle, strChange } from '@/utils/utils';
import moment from 'moment';

@Component
export default class LookAttendance extends Vue {
	private tableData: AttendancePlan[] = [];
	private leave: AttendancePlan = {
		clazzname: '',
		starttime: '',
		endtime: '',
		groupname: '',
		marktime: '',
		days: '',
	};
	private drawer: boolean = false;
	private ruleForm: ApplyVacation = {
		uId: '',
		username: '',
		startt: '',
		endt: '',
		userreason: '',
	};
	private rules: any =  {
		username: [
			{ required: true, message: '学生姓名', trigger: 'blur' },
		],
		uId: [
			{ required: true, message: '学号', trigger: 'blur' },
		],
		startt: [
			{ required: true, message: '请选择假期开始日期', trigger: 'change' },
		],
		endt: [
			{ required: true, message: '请选择假期结束日期', trigger: 'change' },
		],
		userreason: [
			{ required: true, message: '请输入请假事由', trigger: 'change' },
			{ min: 10, max: 100 , message: '请输入10-100位字符' },
		],
	};

	private pickerOptionsStart: any = {};
	private pickerOptionsEnd: any = {};

	public submitForm(formName: string) {
		(this.$refs[formName] as any).validate((valid: any) => {
			if (valid) {
				this.applyForLeave();
			} else {
				return false;
			}
		});
	}

	public async handleClick(row: AttendancePlan) {
		this.drawer = true;
		const name = sessionStorage.getItem('name');
		const uId = sessionStorage.getItem('uId');
		this.ruleForm.uId = String(uId);
		this.ruleForm.username = String(name);
		const temp = this._.cloneDeep(row);
		temp.starttime = strChange(temp.starttime);
		this.leave = temp;
	}

	public formatData(data: AttendancePlan[]): void {
		this.tableData = data.map((item: AttendancePlan) => {
			const temp: AttendancePlan = this._.cloneDeep(item);
			if (temp['days']) {
				temp['week'] = setWeekDay(temp['days']);
			}
			temp['starttime'] = moment(temp['starttime']).format('YYYY 年 MM 月 DD 日');
			return temp;
		});
	}

	public closeDrawer() {
		this.drawer = false;
		(this.$refs['ruleForm'] as any).resetFields();
	}

	public async applyForLeave() {
		const params = {
			...this.ruleForm,
			groupname: this.leave.groupname,
			marktime: this.leave.marktime,
			starttime: this.leave.starttime,
			days: this.leave.days,
			clazzname: this.leave.clazzname,
		};
		const res: Res = await applyForLeave(params);
		parseInt(res.code, 10) === 1 ? this.$message.success(res.msg) : this.$message.error(res.msg);
		this.drawer = false;
	}

	public goRecord(row: AttendancePlan) {
		const temp = this._.cloneDeep(row);
		temp.starttime = strChange(temp.starttime);
		const payload = {
			...temp,
		};
		console.log('payload: ', payload);
		this.$store.dispatch('SET_PLAN', payload);
		this.$router.push('/student/attendance-record');
	}

	public async created() {
		const uId = sessionStorage.getItem('uId');
		const res: Res = await getAttendancePlanToLeave(String(uId));
		this.formatData(res.data);
		const self = this;
		setPageTitle('学生请假');
		this.pickerOptionsStart = {
			disabledDate(time: any) {
				let end: any;
				let start: any;
				if (self.ruleForm.endt) {
					end = new Date(self.ruleForm.endt).valueOf();
				}
				start =  Date.now();
				return time && (time.valueOf() < start) || time.valueOf() > end;
			},
		};

		this.pickerOptionsEnd = {
			disabledDate(time: any) {
				let start: any;
				if (self.ruleForm.startt) {
					// 让用户可以选择开始结束同一天
					start = new Date(self.ruleForm.startt).valueOf() + 1;
				} else {
					start = Date.now();
				}
				return time && time.valueOf() < start;
			},
		};
	}
}
</script>

<style lang="less" scoped>
	.demo-ruleForm {
		width: 500px;
		margin: 0 auto;
		& > .el-form-item {
			margin-bottom: 40px;
		}
	}
	.table-data {
		.el-button+.el-button {
			margin-left: 25px;
		}
	}
</style>