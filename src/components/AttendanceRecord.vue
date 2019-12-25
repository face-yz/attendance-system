<!--
 * @Description: 考勤记录
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-25 22:54:57
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-25 23:00:23
 -->

<template>
	<div>
		<h1>考勤记录</h1>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setPageTitle } from '@/utils/utils';

@Component
export default class AttendanceRecord extends Vue {
	public created() {
		setPageTitle('考勤记录');
	}
}
</script>

<style scoped lang="less">
</style>
