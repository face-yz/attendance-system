<!--
 * @Description: 登录页面
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-03 20:30:06
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-26 16:45:45
 -->

<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick" stretch>
			<el-tab-pane label="管理员登录" name="teacher">
				<!-- 老师登录 -->
				<LoginSelect loginAuth='teacher' />
			</el-tab-pane>
			<el-tab-pane label="学生登录" name="student">
				<!-- 学生登录 -->
				<LoginSelect loginAuth='student' />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setPageTitle } from '@/utils/utils';
import LoginSelect from '@/components/LoginSelect.vue';

@Component({
	components: {
		LoginSelect,
	},
})
export default class Login extends Vue {
	private activeName: string = 'teacher';
	public handleClick(tab: any, event: any): void {
		console.log(tab, event);
	}

	private created() {
		setPageTitle('登录');
	}
}
</script>>

<style lang="less" scoped>
	.el-tabs {
		width: 402px;
		margin: 100px auto;
	}
</style>>