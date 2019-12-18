/*
 * @Description: 状态管理
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-10 23:05:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-18 14:51:01
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		role: '',
	},
	mutations: {
		CHANGE_ROLE(state, payload) {
			state.role = payload.role;
		},
	},
	getters: {
		CHANGE_ROLE(state) {
			return state.role;
		},
	},
	actions: {
		CHANGE_ROLE({ commit }, payload) {
			commit('CHANGE_ROLE', payload);
		},
	},
});
