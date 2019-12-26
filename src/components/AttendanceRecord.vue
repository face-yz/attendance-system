<!--
 * @Description: 考勤记录
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-25 22:54:57
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-26 21:45:27
 -->

<template>
	<div>
		<h1>考勤记录</h1>
		<el-table
			:data="tableData"
			border
			stripe
			style="width: 1701px">
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
				width="160">
			</el-table-column>
			<el-table-column
				prop="marktime"
				label="上课时间"
				align="center"
				width="200">
			</el-table-column>
			<el-table-column
				prop="signdate"
				label="考勤日期"
				align="center"
				width="200">
			</el-table-column>
			<el-table-column
				prop="state"
				label="考勤状态"
				width="120"
				align="center"
				filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag
						:type="stateType.get(scope.row.state)"
						disable-transitions>{{ state.get(scope.row.state) }}</el-tag>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setPageTitle, setWeekDay } from '@/utils/utils';
import { AttendRecord } from '@/interface';
import { getAttendanceRecordList } from '@/http/api';
import moment from 'moment';

@Component
export default class AttendanceRecord extends Vue {
	private state = new Map([
		[0, '旷课'],
		[1, '已签到'],
		[2, '请假'],
		[3, '迟到'],
	]);
	private stateType = new Map([
		[0, 'danger'],
		[1, 'success'],
		[2, 'info'],
		[3, 'warning'],
	]);

	private tableData: AttendRecord[] = [];

	public formatData(data: AttendRecord[]): void {
		this.tableData = data.map((item: AttendRecord) => {
			const temp: AttendRecord = this._.cloneDeep(item);
			if (temp['days']) {
				temp['week'] = setWeekDay(temp['days']);
			}
			temp['signdate'] = moment(temp['signdate']).format('YYYY 年 MM 月 DD 日');
			return temp;
		});
	}
	public async getData() {
		const selecttime = moment().format('YYYY-MM-DD');
		const uId = String(sessionStorage.getItem('uId'));
		const attend = this.$store.state.attendancePlan;
		const params = {
			...attend,
			uId,
			selecttime,
		};
		const res = await getAttendanceRecordList(params);
		this.formatData(res.data);
	}
	public created() {
		setPageTitle('考勤记录');
		this.getData();
	}
}
</script>

<style scoped lang="less">
</style>
