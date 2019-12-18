<!--
 * @Description: 首页
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-09-15 21:59:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-18 14:49:56
 -->

<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span='24' class='header'>
            header
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <NavSide />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavSide from '@/components/NavSide.vue';
import { setPageTitle } from '@/utils/utils';

@Component({
	components: {
		NavSide,
	},
})
export default class Home extends Vue {
	private created() {
		setPageTitle('首页');
	}
}
</script>

<style lang="less" scoped>
  .header {
    background-color: #545c64;
    color: #ffffff;
    height: 50px;
  }
  .el-header {
    padding: 0;
  }
  .el-aside {
    // display: flex;
    margin-bottom: -9999px;
    padding-bottom: 9999px;
  }
</style>
