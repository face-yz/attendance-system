<!--
 * @Description: 查看学生考勤信息
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2020-01-01 17:13:38
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-03 23:51:12
 -->
<template>
	<div style="position:relative;">
		<div class="block">
			<div>
				<h4>{{ this.$route.query.clazzname }}</h4>
			</div>
			<div>
				<h4>{{ this.$route.query.groupname }}</h4>
			</div>
			<div>
				<h4>{{ signdate }}</h4>
			</div>
			<div>
				<el-date-picker
					v-model="selecttime"
					type="date"
					format="yyyy 年 MM 月 dd 日"
      		value-format="yyyy-MM-dd"
					@change="getStudentList"
					placeholder="请选择考勤日期日期">
				</el-date-picker>
			</div>
			<div>
				<el-link :underline="false" @click="goHistoryState">
					历史考勤状态
					<i class="el-icon-d-arrow-right"></i>
				</el-link>
			</div>
		</div>
		<el-table
			:data="tableData"
			border
			stripe
			style="width: 601px">
			<el-table-column
				prop="uId"
				label="学号"
				align="center"
				width="200">
			</el-table-column>
			<el-table-column
				prop="username"
				label="姓名"
				align="center"
				width="200">
			</el-table-column>
			<el-table-column
				prop="state"
				label="考勤状态"
				width="200"
				align="center"
				filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag
						:type="stateType.get(scope.row.state)"
						disable-transitions>{{ state.get(scope.row.state) }}</el-tag>
				</template>
			</el-table-column>
		</el-table>
		<div ref="container" style="width: 500px;height:500px; position:absolute; top:0;right:0;"></div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { studentAttendInfoList, attendStateInfo } from '@/http/api';
import { Res, AttendRecord, AttendState, Data } from '@/interface';
import moment from 'moment';

@Component
export default class StudentAttendInfo extends Vue {
	private tableData: AttendRecord[] = [];
	private signdate: string = moment().format('YYYY 年 MM 月 DD 日');
	private selecttime: string = '';
	private params = {};
	private state = new Map([
		[0, '未打卡'],
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
	private attendState = new Map([
		['abnormal', '未打卡'],
		['leave', '请假'],
		['late', '迟到'],
		['normal', '已签到'],
	]);
	private option = {
		title : {
			text: '学生考勤状态分布',
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
	public formateOptionData(data: AttendState): Data[] {
		const temp: Data[] = [];
		if (!data) {
			return temp;
		}
		for (const [name, value] of Object.entries(data)) {
			if (this.attendState.has(name)) {
				temp.push({value: parseInt(value, 10), name: String(this.attendState.get(name))});
			}
		}
		return temp;
	}
	public async getStudentList(valtime ?: string) {
		const selecttime = valtime || moment().format('YYYY-MM-DD');
		this.signdate = moment(selecttime).format('YYYY 年 MM 年 DD 日');
		const query = this.$route.query;
		this.params = {
			...query,
			selecttime,
		};
		const res: Res = await studentAttendInfoList(this.params);
		if (res.data !== null) {
			this.tableData = res.data;
		}
		this.showData();
	}
	public async showData() {
		const myChart = this.$echarts.init(this.$refs['container'] as HTMLDivElement);
		myChart.setOption(this.option);
		const resState: Res = await attendStateInfo(this.params);
		const data: Data[] = this.formateOptionData(resState.data[0]);
		myChart.setOption({
			series: [{
				name: '考勤状态',
				data: data,
			}],
		});
	}
	public goHistoryState() {
		const query = this.$route.query;
		this.$router.push({
			path: '/teacher/history-state',
			query: {
				...query,
			},
		});
	}
	public created() {
		this.getStudentList();
	}
	public mounted() {
		this.$nextTick(() => this.showData());
	}
}
</script>

<style lang="less" scoped>
	h4 {
		margin: 0;
	}
	.block {
		display: flex;
		overflow: hidden;
		& > div {
			height: 70px;
			line-height: 70px;
			margin-right: 23px;
			color: #909399;
			font-size: 14px;
			font-weight: bold;
		}
	}
</style>