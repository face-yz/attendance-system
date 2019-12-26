/*
 * @Description: 状态管理
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-10 23:05:55
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-26 18:48:57
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		role: '',
		attendancePlan: {},
	},
	mutations: {
		CHANGE_ROLE(state, payload) {
			state.role = payload.role;
		},
		SET_PLAN(state, payload) {
			state.attendancePlan = {
				...payload,
			};
		},
	},
	getters: {
		CHANGE_ROLE(state) {
			return state.role;
		},
		SET_PLAN(state) {
			return state.attendancePlan;
		},
	},
	actions: {
		CHANGE_ROLE({ commit }, payload) {
			commit('CHANGE_ROLE', payload);
		},
		SET_PLAN({ commit }, payload) {
			commit('SET_PLAN', payload);
		},
	},
});
