import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utils'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		UserProfile: [],
		PermissionsData: {
            ListData: [],
            queryData: {},
            total: 0
		},
		RolesData: {
            ListData: [],
            queryData: {},
            total: 0
		},
		AdminsData: {
            ListData: [],
            queryData: {},
            total: 0
		},
	},
	mutations: {
		UserProfile(state, data) {
			state.UserProfile = data
		},
		PermissionsData(state, data) {
			state.PermissionsData.ListData = data
		},
		RolesData(state, data) {
			state.RolesData.ListData = data
		},
		AdminsData(state, data) {
			state.AdminsData.ListData = data
		}
	},
	actions: {

		async getUserProfile({
			state,
			commit
		}) {
			const data = await utils.getUserProfile();
			commit('UserProfile', data.data.data)
		},
		async getPermissions({
			state,
			commit
		},datas) {
			const data = await utils.getPermissions(datas);
			commit('PermissionsData', data.data.data)
		},
		async getRoles({
			state,
			commit
		},datas) {
			const data = await utils.getRoles(datas);
			commit('RolesData', data.data.data)
		},
		async getAdmins({
			state,
			commit
		},datas) {
			const data = await utils.getAdmins(datas);
			commit('AdminsData', data.data.data)
		}
	}
});

export default store
