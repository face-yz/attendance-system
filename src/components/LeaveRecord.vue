<!--
 * @Description: 请假记录
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-25 22:55:24
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-25 23:01:05
 -->

<template>
	<div>
		<h1>请假记录</h1>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setPageTitle } from '@/utils/utils';

@Component
export default class LeaveRecord extends Vue {
	public created() {
		setPageTitle('请假记录');
	}
}
</script>

<style scoped lang="less">
</style>
