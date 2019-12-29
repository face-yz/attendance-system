<!--
 * @Description: 打卡、请假
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-11 15:45:30
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-29 18:54:04
 -->

<template>
	<div>
		<div class="punch-card">
			<!--开启摄像头-->
			<!-- <img @click="this.callCamera" :src="this.headImgSrc" alt="摄像头"> -->
			<!--canvas截取流-->
			<div ref="content">
				<canvas ref="canvas" width="320" height="240"></canvas>
				<!--图片展示-->
				<video ref="video" class="video-img"></video>
				<!--确认-->
				<el-button type="primary" @click="photograph">拍照</el-button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { dataURLtoFile } from '@/utils/utils';
import { photoPunch } from '@/http/api';
import momemt from 'moment';

@Component({})
export default class PunchCard extends Vue {
	public headImgSrc: string = '';
	public async photoPunch(file: File) {
		const formdata: any = new FormData();
		formdata.append('now', momemt().format('YYYY-MM-DD'));
		formdata.append('noetime', momemt().format('HH:mm:ss'));
		formdata.append('img', file);
		const res = await photoPunch(formdata);
		console.log('res: ', res);
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
			// console.error('摄像头开启失败，请检查摄像头是否可用！');
			self.$message.error('摄像头开启失败，请检查摄像头是否可用！');
		});
	}

	public photograph() {
		const ctx = (this.$refs['canvas'] as any).getContext('2d');
		// 把当前视频帧内容渲染到canvas上
		ctx.drawImage(this.$refs['video'], 0, 0, 320, 240);
		// 转base64格式、图片格式转换、图片质量压缩
		const imgBase64 = (this.$refs['canvas'] as any).toDataURL('image/jpeg');
		const file = dataURLtoFile(imgBase64, `${Date.now()}.jpg`);
		// (this.$refs['content'] as any).style.position = 'absolute';
		// (this.$refs['content'] as any).style.left = 0;
		// this.headImgSrc = imgBase64;
		this.photoPunch(file);
		// console.log(imgBase64);
		console.log(file);
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
		this.callCamera();
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
		& > div {
			position: absolute;
			width: 660px;
			// margin: 0 auto;
			transition: all 1.5s;
		}
	}
	.video-img {
		width: 320px;
		margin-left: 20px;
	}
</style>