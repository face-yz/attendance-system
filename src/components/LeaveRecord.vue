<!--
 * @Description: 请假记录
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-25 22:55:24
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-05 18:01:32
 -->

<template>
	<div>
		<el-table
			:data="tableData"
			border
			stripe
			style="width: 1481px">
			<el-table-column
				prop="username"
				label="学生姓名"
				align="center"
				width="140">
			</el-table-column>
			<el-table-column
				prop="clazzname"
				label="课程名称"
				align="center"
				width="180">
			</el-table-column>
			<el-table-column
				prop="groupname"
				label="教室"
				align="center"
				width="140">
			</el-table-column>
			<el-table-column
				prop="days"
				label="每周上课日期"
				align="center"
				width="180">
				<template slot-scope="scope">
					<span v-for="(item, index) in scope.row.week" :key="index">
						{{ item }}
					</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="startt"
				label="请假开始日期"
				align="center"
				width="160">
			</el-table-column>
			<el-table-column
				prop="endt"
				label="请假截止日期"
				align="center"
				width="160">
			</el-table-column>
			<el-table-column
				prop="userreason"
				label="请假事由"
				align="center"
				width="240">
			</el-table-column>
			<el-table-column
				prop="teachersay"
				label="审批备注"
				align="center"
				width="160">
			</el-table-column>
			<el-table-column
				prop="state"
				label="审批状态"
				width="120"
				align="center"
				filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag
						:type="scope.row.state === 0 ? 'danger' :
						(scope.row.state === 1 ? 'success' : 'primary')"
						disable-transitions>
						{{scope.row.state === 0 ? '未批准' : 
						(scope.row.state === 1 ? '已批准' : '待批准')}}</el-tag>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setPageTitle, setWeekDay } from '@/utils/utils';
import { getLeaveRecordList } from '@/http/api';
import { Res, AgreeOrNoLeave } from '@/interface';
import moment from 'moment';

@Component
export default class LeaveRecord extends Vue {
	private tableData: AgreeOrNoLeave[] = [];

	public formatData(data: AgreeOrNoLeave[]): void {
		this.tableData = data.map((item: AgreeOrNoLeave) => {
			const temp: AgreeOrNoLeave = this._.cloneDeep(item);
			if (temp['days']) {
				temp['week'] = setWeekDay(temp['days']);
			}
			temp['startt'] = moment(temp['startt']).format('YYYY 年 MM 月 DD 日');
			temp['endt'] = moment(temp['endt']).format('YYYY 年 MM 月 DD 日');
			return temp;
		});
	}

	public async created() {
		setPageTitle('请假记录');
		const uId: string = String(sessionStorage.getItem('uId'));
		if (uId.length) {
			const res: Res = await getLeaveRecordList(uId);
			this.formatData(res.data);
		} else {
			this.$message.error('无法获取学生id');
		}
	}
}
</script>

<style scoped lang="less">
</style>
