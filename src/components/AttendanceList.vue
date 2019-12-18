<!--
 * @Description: 查看考勤信息
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-12 20:41:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-18 18:29:44
 -->
<template>
	<div>
		<h3>查看考勤信息</h3>
		<el-table
			:data="tableData"
			border
			stripe
			style="width: 1381px">
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
				prop="starttime"
				label="开课日期"
				align="center"
				width="200">
			</el-table-column>
			<el-table-column
				prop="endtime"
				label="结课日期"
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
					<el-button type="text" @click="handleClick(scope.row)" size="medium">录入学生</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Res, AttendancePlan } from '@/interface';
import { getAttendancePlanList } from '@/http/api';
import { setWeekDay } from '@/utils/utils';
import moment from 'moment';

@Component
export default class AttendanceList extends Vue {
	private tableData: AttendancePlan[] = [];

	public handleClick(row: AttendancePlan): void {
		console.log(row);
	}

	public formatData(data: AttendancePlan[]): void {
		this.tableData = data.map((item: AttendancePlan) => {
			item['starttime'] = moment(item['starttime']).format('YYYY 年 MM 月 DD 日');
			item['endtime'] = moment(item['endtime']).format('YYYY 年 MM 月 DD 日');
			if (item['days']) {
				item['week'] = setWeekDay(item['days']);
			}
			return item;
		});
	}

	public async created() {
		const res: Res = await getAttendancePlanList();
		this.formatData(res.data);
	}
}
</script>

<style lang="less" scoped>
	span {
		display: inline-block;
		margin-right: 5px;
	}
</style>