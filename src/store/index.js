import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/utils/api'
import { setCookie } from '@/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		UserProfile: [],
		PermissionsData: [],
		RolesData: [],
		AdminsData: [],
		FindWechatSettingsData: [],
		RevisionsData: [],
		ClientsData: [],
		CompaniesData: [],
		PlansData: [],
		IndexData: [],
		PlanDepartIndexData: [],
		EditDiagnose: {
			activeName: ''
		},
		OrdersData: []
	},
	mutations: {
		UserProfile(state, data) {
			state.UserProfile = data
		},
		PermissionsData(state, data) {
			state.PermissionsData = data
		},
		RolesData(state, data) {
			state.RolesData = data
		},
		AdminsData(state, data) {
			state.AdminsData = data
		}
	},
	actions: {

		async getUserProfile({
			state,
			commit
		}) {
			const data = await api.getUserProfile()
			commit('UserProfile', data.data)
		},
		async getPermissions({
			state,
			commit
		}) {
			const data = await api.getPermissions()
			commit('PermissionsData', data.data)
		},
		async getRoles({
			state,
			commit
		}) {
			const data = await api.getRoles()
			commit('RolesData', data.data)
		},
		async getAdmins({
			state,
			commit
		}) {
			const data = await api.getAdmins()
			commit('AdminsData', data.data)
		}
	}
})

export default store
