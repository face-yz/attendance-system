<!--
 * @Description: 登录页面
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-03 20:30:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-18 14:48:47
 -->

<template>
  <div class='login'>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
      <el-form-item prop="userName">
        <el-input
          placeholder="手机号"
          maxlength="11"
          v-model="ruleForm.userName"
          clearable
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
      <el-form-item prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="teacher">老师</el-radio>
          <el-radio label="student">学生</el-radio>
        </el-radio-group>
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
import { Component, Vue } from 'vue-property-decorator';
import { Form as ElForm } from 'element-ui';
import { loginWithPassword } from '@/http/api';
import { RuleForm, Res } from '@/interface';
import { setPageTitle } from '@/utils/utils';

@Component
export default class Login extends Vue {
	private ruleForm: RuleForm = {
		userName: '',
		password: '',
		authCode: 0,
		resource: '',
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
		resource: [
			{ required: true, message: '请选择登录权限', trigger: 'change' },
		],
	};
	private isPhone: boolean = false;

	public submitForm(formName: string) {
		(this.$refs[formName] as any).validate((valid: any) => {
			if (valid) {
				console.log(this.ruleForm);
				this.login();
			} else {
				console.log('error submit!!');
				return false;
			}
		});
	}

	private validateUserName(rule: any, value: string, callback: any): void {
		if (!(/^1[3-9]\d{9}$/.test(value))) {
			callback(new Error('请输入正确格式的手机号码'));
		}
		callback();
	}

	private validatePassword(rule: any, value: string, callback: any): void {
		if (value.length < 6 || value.length > 20) {
			callback(new Error('格式错误，请输入长度为6~20位密码'));
		}
		callback();
	}

	private validateAuthCode(rule: any, value: string, callback: any): void {
		if (!(/^\d{6}$/.test(value))) {
			callback(new Error('请输入6为数字验证码'));
		}
		callback();
	}

	private validateAuth(rule: any, value: string, callback: any): void {
		if (!value.length) {
			callback(new Error('请选择登录权限'));
		}
		callback();
	}

	private change(): void {
		this.isPhone = !this.isPhone;
	}

	private async login() {
		const res: Res = await loginWithPassword({
			username: this.ruleForm.userName,
			password: this.ruleForm.password,
		});
		console.log(res);
		if (parseInt(res.code, 10) === 1) {
			localStorage.setItem('as_token', res.data[0].token);
			this.$store.dispatch('CHANGE_ROLE', {role: this.ruleForm.resource});
			this.$router.replace(`/${this.$store.state.role}`);
		}
	}

	private created() {
		setPageTitle('登录');
	}
}
</script>>

<style lang="less" scoped>
  .login {
    width: 360px;
    padding: 20px;
    margin: 100px auto;
    border: 1px solid antiquewhite;
  }
  .el-icon-user:before {
    display: block;
    content: url('../../assets/user.png');
    width: 26px;
    height: 26px;
  }
  .el-icon-lock:before {
    display: block;
    content: url('../../assets/password.png');
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