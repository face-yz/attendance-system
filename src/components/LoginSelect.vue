<!--
 * @Description: 登录页面
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-03 20:30:06
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-04 17:52:01
 -->

<template>
	<div class='login'>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
			<el-form-item prop="userName">
				<el-input
					:placeholder="/^teacher$/.test(auth) ? '请输入11位手机号码' : '请输入8位学号'"
					maxlength="11"
					v-model="ruleForm.userName"
					clearable
					@change="submitForm('ruleForm')"
					class='input'>
					<template slot="prepend">
						<i class='el-icon-user'></i>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="password" v-if="!isPhone">
				<el-input
					v-model="ruleForm.password"
					class='input'
					clearable
					placeholder="密码"
					@change="submitForm('ruleForm')"
					show-password>
					<template slot="prepend">
						<i class='el-icon-lock'></i>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="authCode" v-else>
				<el-row>
					<el-col :span="17">
							<el-input
								maxlength="6"
								class="input"
								v-model="ruleForm.authCode"
								@change="submitForm('ruleForm')"
								clearable
							/>
					</el-col>
					<el-col :span="7">
						<el-button type="primary" class="input">
							获取验证码
						</el-button>
					</el-col>
				</el-row>
			</el-form-item>
			<div class='other-login input'>
				<el-link>忘记密码?</el-link>
				<el-link @click="change">{{isPhone ? '密码登录' : '手机验证码登录'}}</el-link>
			</div>
		</el-form>
		<el-button type="primary" class="input" @click="submitForm('ruleForm')">登录</el-button>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Form as ElForm } from 'element-ui';
import { loginWithPassword, loginStudentWithPassword } from '@/http/api';
import { RuleForm, Res } from '@/interface';
import { setWeekDay } from '../utils/utils';

@Component
export default class LoginSelect extends Vue {
	@Prop({
		required: true,
		validator(value) {
			return ['teacher', 'student'].indexOf(value) !== -1;
		},
	}) private loginAuth: string = 'teacher';

	get auth(): string {
		return this.loginAuth;
	}

	private ruleForm: RuleForm = {
		userName: '',
		password: '',
		authCode: 0,
	};
	private rules: object = {
		userName: [
			{ validator: this.validateUserName, trigger: 'blur' },
		],
		password: [
			{ validator: this.validatePassword, trigger: 'blur' },
		],
		authCode: [
			{ validator: this.validateAuthCode, trigger: 'blur' },
		],
	};
	private isPhone: boolean = false;
	private activeName: string = 'teacher';

	public submitForm(formName: string) {
		(this.$refs[formName] as any).validate((valid: any) => {
			if (valid) {
				this.login();
			} else {
				console.log('no');
				return false;
			}
		});
	}
	// 校验手机号码或学号
	private validateUserName(rule: any, value: string, callback: any): void {
		const pattern = this.auth === 'teacher' ? /^1[3-9]\d{9}$/ : /^\d{8}$/;
		const message: string = this.auth === 'teacher' ? '手机号码' : '学号';
		if (!pattern.test(value)) {
			callback(new Error('请输入正确格式的' + message));
		}
		callback();
	}
	// 校验密码
	private validatePassword(rule: any, value: string, callback: any): void {
		if (value.length < 6 || value.length > 20) {
			callback(new Error('格式错误，请输入长度为6~20位密码'));
		}
		callback();
	}
	// 校验验证码
	private validateAuthCode(rule: any, value: string, callback: any): void {
		if (!(/^\d{6}$/.test(value))) {
			callback(new Error('请输入6为数字验证码'));
		}
		callback();
	}
	// 切换密码登录和手机验证码登录
	private change(): void {
		this.isPhone = !this.isPhone;
	}

	private async login() {
		let res: Res;
		if (this.auth === 'teacher') {
			res = await loginWithPassword({
				username: this.ruleForm.userName,
				password: this.ruleForm.password,
			});
		} else {
			res = await loginStudentWithPassword({
				uId: this.ruleForm.userName,
				password: this.ruleForm.password,
			});
		}
		if (parseInt(res.code, 10) === 1) {
			console.log(res);
			localStorage.setItem('as_token', res.data[0].token);
			if (res.data.length === 2) {
				sessionStorage.setItem('uId', res.data[1].uId);
				sessionStorage.setItem('name', res.data[1].username);
			}
			// this.$store.dispatch('CHANGE_ROLE', {role: this.auth});
			localStorage.setItem('auth', this.auth);
			this.$router.replace(`/${this.auth}`);
		}
	}
}
</script>

<style lang="less" scoped>
	.login {
		width: 360px;
		padding: 20px;
		margin: 0 auto;
		border: 1px solid antiquewhite;
	}
	.el-icon-user:before {
		display: block;
		content: url('../assets/user.png');
		width: 26px;
		height: 26px;
	}
	.el-icon-lock:before {
		display: block;
		content: url('../assets/password.png');
		width: 26px;
		height: 26px;
	}
	.input {
		margin-top: 30px;
	}
	.other-login {
		display: flex;
		justify-content: space-between;
	}
	button {
		width: 100%;
	}
</style>>