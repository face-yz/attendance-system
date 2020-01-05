<!--
 * @Description: 首页
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-09-15 21:59:05
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-05 18:01:55
 -->

<template>
	<div class="home">
		<el-container>
			<el-header>
				<el-row>
					<el-col :span='22' class='header'>
						<div v-if="showStu" style="display:flex">
							<div style="margin-right:20px">学号：<span>{{ this.uId }}</span></div>
							<div>姓名：<span>{{ this.name }}</span></div>
						</div>
					</el-col>
					<el-col :span='2' class='login-btn'>
						<el-link
							:underline="false"
							class="login"
							v-if="!show"
							title="用户登录"
							@click="login"
						>登录</el-link>
						<el-link
							:underline="false"
							class="login-out"
							v-else
							title="退出登录"
							@click="loginOut"
						>退出</el-link>
					</el-col>
				</el-row>
			</el-header>
			<el-container>
				<el-aside width="220px">
					<NavSide />
				</el-aside>
				<el-main>
					<router-view />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavSide from '@/components/NavSide.vue';
import { setPageTitle } from '@/utils/utils';

@Component({
	components: {
		NavSide,
	},
})
export default class Home extends Vue {
	private name: string = '';
	private uId: string = '';
	private show: boolean = false;
	private showStu: boolean = false;

	public loginOrOut() {
		if (localStorage.getItem('as_token')) {
			this.show = true;
			if (this.$route.path === '/student' || this.$route.path === '/teacher') {
				localStorage.getItem('auth') === 'student'
				? this.$router.replace('/student/look-attendance')
				: this.$router.replace('/teacher/attendance-list');
			}
		}
		if (sessionStorage.getItem('name') && sessionStorage.getItem('uId')) {
			const tn = sessionStorage.getItem('name');
			const tu = sessionStorage.getItem('uId');
			this.name = tn === null ? '' : tn;
			this.uId = tu === null ? '' : tu;
			this.showStu = true;
		}
	}
	public login() {
		this.$router.push('/login');
	}
	public loginOut() {
		localStorage.clear();
		sessionStorage.clear();
		this.$router.replace('/login');
	}
	private created() {
		setPageTitle('首页');
		this.loginOrOut();
	}
}
</script>

<style lang="less" scoped>
	.home {
		height: 100%;
		& > .el-container {
			height: 100%;
			display: flex;
		}
	}
	.header, .login-btn {
		background-color: #545c64;
		color: #ffffff;
		height: 50px;
		line-height: 50px;
	}
	.header {
		display: flex;
		justify-content: flex-end;
	}
	.el-header {
		position: sticky;
		top: 0;
		padding: 0;
		z-index: 10;
	}
	.el-aside {
		background-color: #545c64;
		overflow-y: auto;
	}
	.el-main {
		overflow: auto;
	}
	.el-link--default {
		color: #fff;
		font-size: 16px;
		&:hover {
			color: #409eff;
		}
	}
	.login {
		&:before {
			display: block;
			content: url('../assets/login.svg');
			margin-right: 5px;
			font-size: 0;
			width: 26px;
			height: 26px;
		}
	}
	.login-out {
		&:before {
			display: block;
			content: url('../assets/login-out.svg');
			margin-right: 5px;
			font-size: 0;
			width: 26px;
			height: 26px;
		}
	}
</style>
