<!--
 * @Description: 老师添加学生信息
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-12 18:09:27
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-05 20:19:07
 -->

<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
			<el-form-item label="学生姓名" prop="username">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="学号" prop="uId">
				<el-input v-model="ruleForm.uId"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="ruleForm.password" disabled ></el-input>
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
import { StudentInfo, Res } from '@/interface';
import { setPageTitle } from '@/utils/utils';
import { addStudent } from '@/http/api';

@Component
export default class AddStudent extends Vue {
	private ruleForm: StudentInfo = {
		username: '',
		password: '111111',
		uId: '',
	};

	private rules: any = {
		username: [
			{ required: true, message: '请输入学生姓名', trigger: 'blur' },
			{ min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' },
		],
		uId: [
			{ required: true, validator: this.validateStu, trigger: 'blur' },
		],
		password: [
			{ required: true, message: '请输入学生初始登录密码', trigger: 'blur' },
			{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
		],
	};

	public validateStu(rule: any, value: string, callback: any): void {
		if (!/^[0-9]{8}$/.test(value)) {
			callback(new Error('请输入8位数字学号'));
		}
		callback();
	}

	public submitForm(formName: string): void {
		(this.$refs[formName] as any).validate((valid: any) => {
			if (valid) {
				this.addStudent();
			} else {
				return false;
			}
		});
	}

	public async addStudent() {
		const res: Res = await addStudent(this.ruleForm);
		const code: number = parseInt(res.code, 10);
		this.$messageBox.confirm(res.msg + ', 是否继续添加学生?', '添加学生', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: code === 1 ? 'success' : 'error',
		}).then(() => {
			this.$router.go(0);
		}).catch(() => {
			this.$router.push('/teacher/student-list');
		});
	}

	public resetForm(formName: any) {
		(this.$refs[formName] as any).resetFields();
	}

	private created() {
		setPageTitle('添加学生');
	}
}
</script>

<style lang="less" scoped>
	.el-form {
		width: 400px;
		margin: 0 auto;
	}
	.el-form-item {
		margin-bottom: 40px;
	}
</style>