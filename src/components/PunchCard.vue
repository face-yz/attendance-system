<!--
 * @Description: 学生打卡
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-11 15:45:30
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-05 20:25:12
 -->

<template>
	<div class="punch-card">
		<!--开启摄像头-->
		<!-- <img @click="this.callCamera" :src="this.headImgSrc" alt="摄像头"> -->
		<!--canvas截取流-->
		<div class="content">
			<canvas ref="canvas" width="320" height="240"></canvas>
			<!--图片展示-->
			<video ref="video" class="video-img"></video>
			<!--确认-->
			<el-button type="primary" style="margin-top:20px" @click="photograph">拍照</el-button>
		</div>
		<div class="attend-info">
			<h3>打卡信息</h3>
			<el-divider></el-divider>
			<el-form ref="form" :model="attendInfo" label-width="80px">
				<el-form-item label="姓名：">
					<span>{{ attendInfo.username }}</span>
				</el-form-item>
				<el-form-item label="课程：">
					<span>{{ attendInfo.clazzname }}</span>
				</el-form-item>
				<el-form-item label="教室：">
					<span>{{ attendInfo.groupname }}</span>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { dataURLtoFile, setPageTitle } from '@/utils/utils';
import { photoPunch, punchCard } from '@/http/api';
import { Res } from '@/interface';
import momemt from 'moment';

@Component({})
export default class PunchCard extends Vue {
	private attendInfo = {
		username: '',
		groupname: '',
		clazzname: '',
	};
	public async punchCard(params: any): Promise<Res> {
		console.log('puncg');
		const punch = Object.assign(params);
		punch['signdate'] = momemt(punch['signdate']).format('YYYY-MM-DD');
		punch['starttime'] = momemt(punch['starttime']).format('YYYY-MM-DD');
		punch['state'] = punch['flag'];
		delete punch['flag'];
		return await punchCard(punch);
	}
	public async photoPunch(file: File) {
		const formdata: any = new FormData();
		formdata.append('now', momemt().format('YYYY-MM-DD'));
		formdata.append('nowtime', momemt().format('HH:mm:ss'));
		formdata.append('img', file);
		const res = await photoPunch(formdata);
		if (res.data === null || !res.data.length) {
			this.$message.warning(res.msg);
			setTimeout(() => {
				this.$router.go(0);
			}, 3000);
			return;
		}
		const temp = !res.data ? {} : this._.cloneDeep(res.data[0]);
		this.attendInfo = Object.assign(this.attendInfo, temp);
		const flag: number = temp.flag;
		if (flag === 1 || flag === 3) {
			const r: Res = await this.punchCard(temp);
			if (parseInt(r.code, 10) === 1) {
				this.$notify[flag === 1 ? 'success' : 'error']({
					title: '打卡',
					message: flag === 1 ? '打卡成功！' : '打卡成功(已迟到)！',
				});
			}
		}
		if (flag === -1) {
			this.$notify.warning({
				title: '打卡',
				message: '该课程打卡未开始！',
			});
		}
		setTimeout(() => {
			this.$router.go(0);
		}, 3000);
	}
	public callCamera() {
		const self = this;
		// H5调用电脑摄像头API
		navigator.mediaDevices.getUserMedia({
			video: true,
		}).then((success: any) => {
			// 摄像头开启成功
			(this.$refs['video'] as any).srcObject = success;
			// 实时拍照效果
			(this.$refs['video'] as any).play();
		}).catch((error: any) => {
			self.$notify.error({
				title: '开启摄像头',
				message: '摄像头开启失败，请检查摄像头是否可用！',
			});
		});
	}

	public photograph() {
		const ctx = (this.$refs['canvas'] as any).getContext('2d');
		// 把当前视频帧内容渲染到canvas上
		ctx.drawImage(this.$refs['video'], 0, 0, 320, 240);
		// 转base64格式、图片格式转换、图片质量压缩
		const imgBase64 = (this.$refs['canvas'] as any).toDataURL('image/jpeg');
		const file = dataURLtoFile(imgBase64, `${Date.now()}.jpg`);
		this.photoPunch(file);
	}

	public closeCamera() {
		if (!(this.$refs['video'] as any).srcObject) {
			return;
		}
		const stream = (this.$refs['video'] as any).srcObject;
		const tracks = stream.getTracks();
		tracks.forEach((track: any) => {
			track.stop();
		});
		(this.$refs['video'] as any).srcObject = null;
	}

	public created() {
		setPageTitle('学生打卡');
		this.callCamera();
	}
	public beforeDestroy() {
		this.closeCamera();
	}
}
</script>

<style lang="less" scoped>
	h3 {
		margin: 0;
	}
	.action {
		display: flex;
		justify-content: center;
		.punch-card, .as-leave {
			width: 100px;
			height: 100px;
			margin-right: 200px;
			border-radius: 50%;
			line-height: 100px;
			color: #ffffff;
			transition: all .6s;
			cursor: pointer;
		}
		.punch-card {
			background-color: #67C23A;
			&:hover {
				box-shadow: 0 0 15px #67C23A;
			}
		}
		.as-leave {
			background-color: #409EFF;
			&:hover {
				box-shadow: 0 0 15px #409EFF;
			}
		}
	}
	.punch-card {
		position: relative;
		& canvas {
			background-color: #F0F3F9;
		}
		& > .content {
			position: absolute;
			width: 660px;
			transition: all 1.5s;
		}
		& > .attend-info {
			position: absolute;
			left: 760px;
		}
	}
	.video-img {
		width: 320px;
		margin-left: 20px;
	}
	.el-form-item__content {
		text-align: left;
	}
</style>