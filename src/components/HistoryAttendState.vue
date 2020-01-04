<!--
 * @Description: 历史考勤状态
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2020-01-03 23:31:34
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-04 17:31:17
 -->
<template>
	<div>
		<!-- <h3>历史考勤状态</h3> -->
		<div style="width: 1041px; display: flex; justify-content: flex-end; padding-bottom: 20px;">
			<el-link :underline="false" @click="showData">
				历史考勤状态数据可视化展示
				<i class="el-icon-d-arrow-right"></i>
			</el-link>
		</div>
		<el-table
			:data="tableData"
			border
			stripe
			style="width: 1041px">
			<el-table-column
				prop="uid"
				label="学号"
				align="center"
				width="160">
			</el-table-column>
			<el-table-column
				prop="username"
				label="姓名"
				align="center"
				width="160">
			</el-table-column>
			<el-table-column
				prop="normal"
				label="已签到次数"
				align="center"
				width="120">
				<template slot-scope="scope">
					<span class="success">{{ scope.row.normal }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="leave"
				label="请假次数"
				align="center"
				width="120">
				<template slot-scope="scope">
					<span class="info">{{ scope.row.leave }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="late"
				label="迟到次数"
				align="center"
				width="120">
				<template slot-scope="scope">
					<span class="warning">{{ scope.row.late }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="abnormal"
				label="未打卡次数"
				align="center"
				width="120">
				<template slot-scope="scope">
					<span class="danger">{{ scope.row.abnormal }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="total"
				label="应打卡次数"
				align="center"
				width="120">
			</el-table-column>
			<el-table-column
				prop="percentage"
				label="正常到课率"
				align="center"
				width="120">
			</el-table-column>
		</el-table>
		<el-drawer
			:visible.sync="drawer"
			size="650px"
			:modal="false"
			direction="rtl">
			<div ref="container" style="width: 500px;height:500px;"></div>
		</el-drawer>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Res, Data, AttendancePlan, IHistoryAttendState } from '@/interface';
import { historyAttendState } from '@/http/api';
import moment from 'moment';

@Component
export default class HistoryAttendState extends Vue {
	private tableData: IHistoryAttendState[] = [];
	private drawer: boolean = false;
	private attendState = new Map([
		['abnormal', '未打卡'],
		['leave', '请假'],
		['late', '迟到'],
		['normal', '已签到'],
	]);
	private option = {
		title : {
			text: '历史考勤状态分布分布',
			x: 'center',
		},
		tooltip : {
			trigger: ('item' as 'item'),
			formatter: '{a} <br/>{b} : {c} ({d}%)',
		},
		legend: {
			orient: ('vertical' as 'vertical'),
			left: 'right',
			data: ['已签到', '请假', '迟到', '未打卡'],
		},
		series : [
			{
				name: '考勤状态',
				type: ('pie' as 'pie'),
				radius : '55%',
				center: ['50%', '60%'],
				data: [],
				itemStyle: {
					emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
			},
		],
	};
	public async getHistoryStateList() {
		const query = this.$route.query;
		const params = {
			...query,
			selecttime: moment().format('YYYY-MM-DD'),
		};
		const res: Res = await historyAttendState(params);
		this.tableData = res.data;
		console.log('res: ', res);
	}
	public formateOptionData(data: IHistoryAttendState[]): Data[] {
		const temp: Data[] = [];
		const length: number = data.length;
		if (!length) {
			return temp;
		}
		const tempObj = {
			abnormal: 0,
			leave: 0,
			late: 0,
			normal: 0,
		};
		data.forEach((item) => {
			const {abnormal, normal, leave, late} = item;
			tempObj['abnormal'] += abnormal;
			tempObj['normal'] += normal;
			tempObj['leave'] += leave;
			tempObj['late'] += late;
		});
		for (const [name, value] of Object.entries(tempObj)) {
			temp.push({value: value * length, name: String(this.attendState.get(name))});
		}
		return temp;
	}
	public async showData() {
		this.drawer = true;
		setTimeout(() => {
			const myChart = this.$echarts.init(this.$refs['container'] as HTMLDivElement);
			myChart.setOption(this.option);
			const data: Data[] = this.formateOptionData(this.tableData);
			myChart.setOption({
				series: [{
					name: '考勤状态',
					data: data,
				}],
			});
		}, 500);
	}
	public created() {
		this.getHistoryStateList();
	}
	// public mounted() {
	// 	this.$nextTick(() => this.showData());
	// }
}
</script>

<style lang="less" scoped>
	.el-table {
		.success {
			color: #67C23A;
		}
		.warning {
			color: #E6A23C;
		}
		.danger {
			color: #F56C6C;
		}
		.info {
			color: #909399;
		}
	}
</style>>