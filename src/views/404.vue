<!--
 * @Description: 404页面
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-09-15 21:59:05
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-30 22:23:42
 -->
<template>
	<div class="hello">
    <h3>Not Found 404</h3>
		<!-- <img :src="require('@/static/img/image2.jpeg')" alt="404"> -->
		<router-link to="/login">前往登录页面</router-link>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { setPageTitle } from '@/utils/utils';

@Component
export default class HelloWorld extends Vue {
	public created() {
		setPageTitle('404');
	}
}
</script>

<style scoped lang="less">
img {
	width: 800px;
}
</style>
