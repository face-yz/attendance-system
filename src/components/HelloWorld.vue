<!--
 * @Description: 
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-09-15 21:59:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-18 14:52:35
 -->
<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<el-row>
			<el-button round>圆角按钮</el-button>
			<el-button type="primary" round>主要按钮</el-button>
			<el-button type="success" round>成功按钮</el-button>
			<el-button type="info" round>信息按钮</el-button>
			<el-button type="warning" round>警告按钮</el-button>
			<el-button type="danger" round>危险按钮</el-button>
		</el-row>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
	@Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
