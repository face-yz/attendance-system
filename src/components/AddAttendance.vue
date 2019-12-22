<!--
 * @Description: 添加考勤信息
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-12 20:41:11
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-20 20:32:32
 -->
<template>
	<div>
		<h3>添加考勤计划</h3>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="ruleForm"
			label-width="110px"
			class="demo-ruleForm"
		>
			<el-form-item label="课程名称" prop="clazzname">
				<el-input v-model="ruleForm.clazzname"></el-input>
			</el-form-item>
			<el-form-item label="教室名称" prop="groupname">
				<el-input v-model="ruleForm.groupname"></el-input>
			</el-form-item>
			<el-form-item label="课程起止日期" required>
				<el-col :span="11">
					<el-form-item prop="starttime">
						<el-date-picker
							type="date"
							format="yyyy 年 MM 月 dd 日"
							value-format="yyyy-MM-dd"
							placeholder="开始日期"
							v-model="ruleForm.starttime"
							:picker-options="pickerOptionsStart"
							style="width: 100%;">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-form-item prop="endtime">
						<el-date-picker
							type="date"
							format="yyyy 年 MM 月 dd 日"
							value-format="yyyy-MM-dd"
							placeholder="结束日期"
							v-model="ruleForm.endtime"
							:picker-options="pickerOptionsEnd"
							style="width: 100%;">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-form-item>
			<el-form-item label="每周上课天数" prop="weekdays">
				<el-select v-model="ruleForm.weekdays" placeholder="请选择每周上课天数" multiple>
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="上课开始时间" prop="marktime" required>
        <el-time-picker
					value-format="HH:mm:ss"
					placeholder="上课开始时间"
					v-model="ruleForm.marktime"
					style="width: 100%;">
				</el-time-picker>
      </el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Res, AttendancePlan } from '@/interface';
import { addAttendancePlan } from '@/http/api';
import { setPageTitle } from '@/utils/utils';

@Component
export default class AttendanceList extends Vue {
	private ruleForm: AttendancePlan = {
		clazzname: '',
		starttime: '',
		endtime: '',
		groupname: '',
		marktime: '',
		weekdays: [],
	};

	private rules: any =  {
		clazzname: [
			{ required: true, message: '请输入课程名称', trigger: 'blur' },
		],
		groupname: [
			{ required: true, message: '请输入教室名称', trigger: 'blur' },
		],
		starttime: [
			{ required: true, message: '请选择课程开始日期', trigger: 'change' },
		],
		endtime: [
			{ required: true, message: '请选择课程结束日期', trigger: 'change' },
		],
		marktime: [
			{ required: true, message: '请选择上课开始时间', trigger: 'change' },
		],
		weekdays: [
			{ required: true, message: '请选择每周上课天数', trigger: 'change' },
		],
	};

	private options: any = [{
			value: 1,
			label: '星期一',
		}, {
			value: 2,
			label: '星期二',
		}, {
			value: 3,
			label: '星期三',
		}, {
			value: 4,
			label: '星期四',
		}, {
			value: 5,
			label: '星期五',
		},
	];

	private pickerOptionsStart: any = {};
	private pickerOptionsEnd: any = {};

	public submitForm(formName: string) {
		(this.$refs[formName] as any).validate((valid: any) => {
			if (valid) {
				this.addAttendancePlan();
			} else {
				return false;
			}
		});
	}

	public resetForm(formName: string) {
		(this.$refs[formName] as any).resetFields();
	}

	public async addAttendancePlan() {
		const res: Res = await addAttendancePlan(this.ruleForm);
		const code: number = parseInt(res.code, 10);
		this.$messageBox.confirm(res.msg + ', 是否继续添加考勤计划?', '添加考勤计划', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: code === 1 ? 'success' : 'error',
		}).then(() => {
			this.$router.go(0);
		}).catch(() => {
			this.$router.push('/teacher/attendance-list');
		});
	}

	public created() {
		const self = this;
		setPageTitle('添加考勤计划');
		this.pickerOptionsStart = {
			disabledDate(time: any) {
				let end: any;
				let start: any;
				if (self.ruleForm.endtime) {
					end = new Date(self.ruleForm.endtime).valueOf();
				}
				start =  Date.now();
				return time && (time.valueOf() < start) || time.valueOf() > end;
			},
		};

		this.pickerOptionsEnd = {
			disabledDate(time: any) {
				let start: any;
				if (self.ruleForm.starttime) {
					// 让用户可以选择开始结束同一天
					start = new Date(self.ruleForm.starttime).valueOf() + 1;
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
		width: 600px;
		margin: 0 auto;
	}
	.el-form-item {
		margin-bottom: 40px;
	}
	.el-form {
		& > .el-form-item:nth-child(3) {
			margin-bottom: 0;
		}
		& .el-select {
			display: inline-block;
			position: relative;
			width: 100%;
		}
	}
</style>