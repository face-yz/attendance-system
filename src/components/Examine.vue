<!--
 * @Description: 请假审批
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-12 21:18:58
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-25 20:10:18
 -->
<template>
	<div>
		<h3>请假审批</h3>
		<el-table
			:data="tableData"
			border
			stripe
			style="width: 1941px">
			<el-table-column
				prop="uId"
				label="学号"
				align="center"
				width="160">
			</el-table-column>
			<el-table-column
				prop="username"
				label="学生姓名"
				align="center"
				width="160">
			</el-table-column>
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
				width="160">
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
				prop="startt"
				label="请假开始日期"
				align="center"
				width="200">
			</el-table-column>
			<el-table-column
				prop="endt"
				label="请假截止日期"
				align="center"
				width="200">
			</el-table-column>
			<el-table-column
				prop="userreason"
				label="请假事由"
				align="center"
				width="260">
			</el-table-column>
			<el-table-column
				prop="state"
				label="请假状态"
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
			<el-table-column
				label="操作"
				align="center"
				width="120">
				<template slot-scope="scope">
					<el-button
						type="text"
						@click="agreeOrNoLeave(scope.row, true)"
						size="medium"
						title="批准该同学的请假申请"
						:disabled="scope.row.state === -1 ? false : true"
					>批准</el-button>
					<el-button
						type="text"
						@click="noAgree(scope.row)"
						size="medium"
						title="不批准该同学的请假申请"
						:disabled="scope.row.state === -1 ? false : true"
					>不批准</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog
			title="审批备注"
			:visible.sync="dialogVisible"
			width="30%">
			<!-- <span>这是一段信息</span> -->
			<el-input
				type="textarea"
				:autosize="{ minRows: 2, maxRows: 4 }"
				placeholder="请输入不批准原因"
				v-model="teachersay">
			</el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="agreeOrNoLeave(row, false)">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import { Res, LeaveList, AgreeOrNoLeave } from '@/interface';
import { getLeaveList, agreeLeave, noAgreeLeave } from '@/http/api';
import { setWeekDay, strChange } from '@/utils/utils';

@Component
export default class Examine extends Vue {
	private tableData: LeaveList[] = [];
	private dialogVisible: boolean = false;
	private teachersay: string = '';
	private row: any = {};

	public formatData(data: LeaveList[]): void {
		this.tableData = data.map((item: LeaveList) => {
			const temp: LeaveList = this._.cloneDeep(item);
			if (temp['days']) {
				temp['week'] = setWeekDay(temp['days']);
			}
			temp['startt'] = moment(temp['startt']).format('YYYY 年 MM 月 DD 日');
			temp['endt'] = moment(temp['endt']).format('YYYY 年 MM 月 DD 日');
			return temp;
		});
	}

	public async agreeOrNoLeave(row: LeaveList, agree: boolean) {
		const temp = this._.cloneDeep(row);
		delete temp['userreason'];
		delete temp['username'];
		delete temp['state'];
		delete temp['week'];
		temp.starttime = moment(temp['starttime']).format('YYYY-MM-DD');
		temp.startt = strChange(temp.startt);
		temp.endt = strChange(temp.endt);
		const params: AgreeOrNoLeave = temp;
		let res: Res = {
			code: '',
			data: [],
			msg: '',
		};
		if (agree) {
			res = await agreeLeave(params);
		} else {
			params['teachersay'] = this.teachersay;
			res = await noAgreeLeave(params);
			this.dialogVisible = false;
		}
		if (parseInt(res.code, 10) === 1) {
			agree ? row.state = 1 : row.state = 0;
			this.$message.success(res.msg);
		} else {
			this.$message.error(res.msg);
		}
	}

	public noAgree(row: LeaveList) {
		this.row = row;
		this.dialogVisible = true;
	}

	public async created() {
		const res: Res = await getLeaveList();
		this.formatData(res.data);
	}
}
</script>

<style lang="less" scoped>

</style>