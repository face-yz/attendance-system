<!--
 * @Description: 侧边栏组件
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-11 15:23:15
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-20 20:46:01
 -->

<template>
	<el-row>
		<el-col :span="24">
			<el-menu
				:default-active="this.$route.path"
				background-color="#545c64"
				text-color="#fff"
				v-if="this.role === 'student'"
				router
				active-text-color="#ffd04b">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-alarm-clock"></i>
						<span>上课打卡</span>
					</template>
					<el-menu-item-group>
						<el-menu-item :index="'/student/punch-card'">打卡签到</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-search"></i>
						<span>信息查询</span>
					</template>
					<el-menu-item-group>
						<el-menu-item :index="'/student/look-attendance'">查询考勤</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
			<el-menu
				:default-active="this.$route.path"
				background-color="#545c64"
				text-color="#fff"
				v-else
				router
				active-text-color="#ffd04b">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-alarm-clock"></i>
						<span>学生管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/teacher/add-student">添加学生</el-menu-item>
						<el-menu-item index="/teacher/student-list">查看学生</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-search"></i>
						<span>考勤计划管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/teacher/add-attendance">添加考勤计划</el-menu-item>
						<el-menu-item index="/teacher/attendance-list">查看考勤计划</el-menu-item>
						<el-menu-item index="/teacher/examine">请假审批</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { State } from 'vuex-class';

@Component({})
export default class NavSide extends Vue {
	// private role: string = this.$store.state.role;
	get role() {
		if (this.$store.state.role.length) {
			return this.$store.state.role;
		}
	}
	private created() {
		// console.log('role: ', this.role);
	}
}
</script>

<style lang="less" scoped>
	.el-menu {
		height: 2000px;
	}
</style>