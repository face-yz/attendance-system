<!--
 * @Description: 查看考勤信息
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-12 20:41:33
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-22 20:44:34
 -->
<template>
	<div>
		<!-- <h3>查看考勤信息</h3> -->
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
		<el-drawer
			:title="'课程：' + classname"
			:visible.sync="drawer"
			direction="rtl"
			size="650px"
			:modal="false"
			:before-close="handleClose">
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
				class="demo-ruleForm"
			>
				<el-form-item label="学生姓名" prop="username">
					<el-input
						v-model="ruleForm.username"
						placeholder="学生姓名根据所选学号自动添加"
						disabled
					>
					</el-input>
				</el-form-item>
				<el-form-item label="学号" prop="uId">
					<el-select v-model="ruleForm.uId" placeholder="请选择学生学号" @change="change">
						<el-option
							v-for="(item, index) in userlist"
							:label="item.uId"
							:value="item.uId"
							:key="index"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学生照片" required="">
					<el-upload
						action="#"
						list-type="picture-card"
						:limit="1"
						:file-list="fileList"
						:on-change="changeFile"
						:on-remove="handleRemove"
						:on-preview="handlePictureCardPreview"
						:auto-upload="false"
					>
						<i slot="default" class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">确定录入</el-button>
				</el-form-item>
			</el-form>
		</el-drawer>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Res, StudentInfo, AttendancePlan, Func } from '@/interface';
import { getAttendancePlanList, getStudentList, loggingStudentInfo } from '@/http/api';
import { setWeekDay, strChange } from '@/utils/utils';
import moment from 'moment';

@Component
export default class AttendanceList extends Vue {
	private tableData: AttendancePlan[] = [];
	private attendList: AttendancePlan = {
		clazzname: '',
		starttime: '',
		endtime: '',
		groupname: '',
		marktime: '',
	};
	private userlist: StudentInfo[] = [];
	private drawer: boolean = false;
	private classname: string = '';
	private dialogImageUrl: string = '';
	private dialogVisible: boolean = false;
	// private uId: string[] = [];
	private fileList: any = [];
	private ruleForm: any = {
		username: '',
		uId: '',
	};
	private rules: any = {
		username: [
			{ required: true, message: '请选择学号', trigger: 'blur' },
		],
		uId: [
			{ required: true, message: '请选择学号', trigger: 'change' },
		],
	};

	public async handleClick(row: AttendancePlan) {
		const res: Res = await getStudentList();
		this.userlist = res.data;
		this.attendList = this._.cloneDeep(row);
		this.attendList['starttime'] = strChange(this.attendList['starttime']);
		this.attendList['endtime'] = strChange(this.attendList['endtime']);
		this.classname = row.clazzname;
		this.drawer = true;
	}

	public formatData(data: AttendancePlan[]): void {
		this.tableData = data.map((item: AttendancePlan) => {
			const temp: AttendancePlan = item;
			temp['starttime'] = moment(temp['starttime']).format('YYYY 年 MM 月 DD 日');
			temp['endtime'] = moment(temp['endtime']).format('YYYY 年 MM 月 DD 日');
			if (temp['days']) {
				temp['week'] = setWeekDay(temp['days']);
			}
			return temp;
		});
	}

	public handleClose(done: Func): void {
		this.$messageBox.confirm('确认关闭？')
		.then(() => {
			done();
		})
		.catch(() => {
			console.log('关闭');
		});
	}

	public change(uId: string) {
		this.userlist.forEach((item: StudentInfo) => {
			if (item['uId'] === uId) {
				this.ruleForm.username = item['username'];
			}
		});
	}

	public submitForm(formName: string) {
		(this.$refs[formName] as any).validate((valid: any) => {
			if (valid) {
				this.loggingStudentInfo();
			} else {
				return false;
			}
		});
	}
	public handleRemove(file: any, fileList: any): void {
		this.fileList.length = 0;
	}
	public handlePictureCardPreview(file: any) {
		this.dialogImageUrl = file.url;
		this.dialogVisible = true;
	}
	public changeFile(files: any, fileList: any): void {
		this.fileList = fileList;
	}

	public async loggingStudentInfo() {
		if (!this.fileList.length) {
			this.$message.error('请上传学生照片!');
			return;
		}
		const formdata: any = new FormData();
		formdata.append('img', this.fileList[0].raw);
		const param = {
			groupName: this.attendList.groupname,
			start: this.attendList.starttime,
			end: this.attendList.endtime,
			marktime: this.attendList.marktime,
			clazzname: this.attendList.clazzname,
			days: this.attendList.days,
			uId: this.ruleForm.uId,
			userName: this.ruleForm.username,
		};
		for (const [key, value] of Object.entries(param)) {
			formdata.append(key, value);
		}
		const res: Res = await loggingStudentInfo(formdata);
		parseInt(res.code, 10) === 1 ? this.$message.success(res.msg) : this.$message.error(res.msg);
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
	.demo-ruleForm {
		width: 410px;
		margin: 0 auto;
		& > .el-form-item:nth-child(3) {
			height: 148px;
			overflow: hidden;
		}
	}
	.el-select {
		width: 100%;
	}
</style>