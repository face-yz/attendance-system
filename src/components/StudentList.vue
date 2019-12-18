<!--
 * @Description: 学生信息列表
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-12 20:37:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-18 16:05:57
 -->

<template>
	<div>
		<el-table
			:data="tableData"
			border
			stripe
			style="width: 721px">
			<el-table-column
				prop="username"
				label="姓名"
				align="center"
				width="180">
			</el-table-column>
			<el-table-column
				prop="uId"
				label="学号"
				align="center"
				width="180">
			</el-table-column>
			<el-table-column
				prop="phone"
				label="电话"
				align="center"
				width="180">
			</el-table-column>
			<el-table-column
				label="操作"
				align="center"
				width="180">
				<template slot-scope="scope">
					<el-button
						type="text"
						@click="handleClick(scope.row)"
						size="medium"
					>
						重置密码
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { StudentInfo, Res } from '@/interface';
import { getStudentList, resetPassword } from '@/http/api';
import { setPageTitle } from '@/utils/utils';

@Component
export default class StudentList extends Vue {
	private tableData: StudentInfo[] = [];

	public formatData(data: StudentInfo[]) {
		this.tableData = data.map((obj: StudentInfo) => {
				delete obj['password'];
				return obj;
		});
	}

	public async handleClick(row: StudentInfo) {
		const res: Res = await resetPassword(row.uId);
		parseInt(res.code, 10) === 1 ? this.$message.success(res.msg) : this.$message.error(res.msg);
	}

	public async created() {
		setPageTitle('学生信息列表');
		const res: Res = await getStudentList();
		this.formatData(res.data);
	}
}
</script>

<style lang="less" scoped>
</style>