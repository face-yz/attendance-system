<!--
 * @Description: 学生端个人信息页面
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2020-01-09 17:04:10
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-13 10:11:15
 -->
<template>
	<div class="info">
		<h1>{{ title }}</h1>
		<el-tabs type="border-card" @tab-click="select">
			<el-tab-pane label="个人资料">
				<ul>
					<li class="item">
						<span>姓名</span>
						<div class="profile-input">
							<span type="text" class="input">{{ userInfo.username }}</span>
						</div>
					</li>
					<li class="item">
						<span>学号</span>
						<div class="profile-input">
							<span type="text" class="input">{{ userInfo.uId }}</span>
						</div>
					</li>
				</ul>
			</el-tab-pane>
			<el-tab-pane label="账号绑定">
				<ul>
					<li class="item">
						<span class="title">手机</span>
						<div class="input-box">
							<span class="account"></span>
							<div class="action-box">
								<button class="btn link-btn" @click="dialogFormVisible = true">
									<img src="https://b-gold-cdn.xitu.io/v3/static/img/binding.07f72f8.svg" class="icon">
									<span>绑定</span>
								</button>
							</div>
						</div>
					</li>
				</ul>
			</el-tab-pane>
			<el-tab-pane label="修改密码">修改密码</el-tab-pane>
		</el-tabs>
		<el-dialog title="绑定手机号" :visible.sync="dialogFormVisible" width="400px">
			<el-form :model="form" :rules="rules" ref="form">
				<el-form-item prop="phone">
					<el-input v-model="form.phone" autocomplete="off" placeholder="请输入手机号码"></el-input>
				</el-form-item>
				<div class="code">
					<input v-model="form.code" max="6" style="margin-left:0; font-size:14px;" placeholder="请输入6位验证码" class="input"/>
					<el-link type="primary" :underline="false" title="发送验证码" @click="submitForm('form')">发送验证码</el-link>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" style="width:100%;" @click="checkCode">绑定手机</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { setPageTitle } from '@/utils/utils';
import { bindPhone, checkCodeAndBind } from '@/http/api';

@Component
export default class PersonalInfo extends Vue {
	private title: string = '个人资料';
	private dialogFormVisible: boolean = false;
	private form = {
		phone: '',
		code: '',
	};
	private rules = {
		phone: [
			{ validator: this.validatePhone, trigger: 'blur' },
		],
	};
	private userInfo = {
		username: '赵松松',
		uId: '04163035',
	};
	public select(event: any) {
		this.title = event.label;
		setPageTitle(event.label);
	}
	public validatePhone(rule: any, value: string, callback: any): void {
		const pattern = /^1[3-9]\d{9}$/;
		const message: string = '手机号码';
		if (!pattern.test(value)) {
			callback(new Error('请输入正确格式的' + message));
		}
		callback();
	}
	public submitForm(formName: string) {
		(this.$refs[formName] as any).validate((valid: any) => {
			if (valid) {
				this.bindPhone();
				// console.log('success');
			} else {
				console.log('no');
				return false;
			}
		});
	}
	public async bindPhone() {
		const uId: string = String(sessionStorage.getItem('uId'));
		const params = {
			phone: this.form.phone,
			uId,
		};
		const res = await bindPhone(params);
		parseInt(res.code, 10) === 1 ? this.$message.success(res.msg) : this.$message.error(res.msg);
	}
	public async checkCode() {
		const reg = /^\d{6}$/;
		if (!reg.test(this.form.code)) {
			this.$message.error('请输入6为验证码！');
			return;
		}
		const uId: string = String(sessionStorage.getItem('uId'));
		const params = {
			phone: this.form.phone,
			code: this.form.code,
			uId,
		};
		const res = await checkCodeAndBind(params);
		parseInt(res.code, 10) === 1 ? this.$message.success(res.msg) : this.$message.error(res.msg);
	}
}
</script>

<style lang="less" scoped>
	ul, li {
		list-style: none;
		margin: 0;
	}
	ul {
		padding: 0 20px;
	}
	.info {
		width: 750px;
	}
	h1 {
		margin-top: 0;
		text-align: left;
		font-size: 1.5rem;
	}
	.el-select {
		width: 100%;
	}
	.item {
		display: flex;
    align-items: center;
    padding: 2rem 0;
		border-top: 1px solid #f1f1f1;
		.title {
			font-size: 1.1rem;
    	color: #333;
			width: 10rem;
			text-align: left;
		}
		.input-box {
			flex: 1 1 auto;
			display: flex;
			.account {
				flex: 1 1 auto;
    		font-size: 1.167rem;
    		color: #909090;
			}
			.action-box {
				margin-left: 1rem;
				.btn {
					padding: 0;
					font-size: 1.1rem;
					color: #007fff;
					background-color: transparent;
					white-space: nowrap;
					border: 0;
					cursor: pointer;
					outline: none;
					.icon {
						margin-right: .6rem;
						height: 1.5rem;
						vertical-align: bottom;
					}
				}
			}
		}
	}
	.profile-input {
		display: flex;
    justify-content: flex-start;
    flex: 1;
	}
	.input {
    display: inline-block;
    border: none;
    outline: none;
    color: #909090;
		font-size: 1.05rem;
		margin-left: 70px;
	}
	.code {
		width: 360px;
		height: 40px;
		display: flex;
		margin-bottom: 22px;
		justify-content: space-between;
		border: 1px solid #DCDFE6;
		border-radius: 4px;
		padding: 0 10px;
		box-sizing: border-box;
	}
</style>