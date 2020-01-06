import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import Home from '@/components/Home'

//系统设置
import PermissionsMange from '@/components/SetUp/PermissionsMange'
import AddPermissions from '@/components/SetUp/PermissionsMange/AddPermissions'
import RoleMange from '@/components/SetUp/RoleMange'
import AddRole from '@/components/SetUp/RoleMange/AddRole'
import UsersMange from '@/components/SetUp/UsersMange'
import AddUsers from '@/components/SetUp/UsersMange/AddUsers'


const parentComponent = {
	template: `<router-view></router-view>`
};
Vue.use(Router);

export default new Router({
	// mode: 'history',
	routes: [{
		path: '',
		component: Admin,
		children: [{
			path: '/',
			name: 'Home',
			meta: {
				title: '主页',
				requireAuth: true,
				cid: 1
			},
			component: Home,
		}, {
			path: 'SetUp',
			name: 'SetUp',
			meta: {
				title: '设置',
				requireAuth: true,
			},
			component: parentComponent,
			children: [{
				path: 'PermissionsMange',
				name: 'PermissionsMange',
				meta: {
					title: '权限管理',
					requireAuth: true,
					cid: 7
				},
				component: PermissionsMange,
			}, {
				path: 'AddPermissions',
				name: 'AddPermissions',
				meta: {
					title: '新建权限',
					requireAuth: true,
					cid: 7
				},
				component: AddPermissions,
			}, {
				path: 'EditPermissions/:id',
				name: 'EditPermissions',
				meta: {
					title: '编辑权限',
					requireAuth: true,
					cid: 7
				},
				component: AddPermissions,
			}, {
				path: 'RoleMange',
				name: 'RoleMange',
				meta: {
					title: '角色管理',
					requireAuth: true,
					cid: 8
				},
				component: RoleMange,
			}, {
				path: 'AddRole',
				name: 'AddRole',
				meta: {
					title: '新建角色',
					requireAuth: true,
					cid: 8
				},
				component: AddRole,
			}, {
				path: 'EditRole/:id',
				name: 'EditRole',
				meta: {
					title: '编辑角色',
					requireAuth: true,
					cid: 8
				},
				component: AddRole,
			}, {
				path: 'UsersMange',
				name: 'UsersMange',
				meta: {
					title: '账号管理',
					requireAuth: true,
					cid: 9
				},
				component: UsersMange,
			}, {
				path: 'AddUsers',
				name: 'AddUsers',
				meta: {
					title: '新建账号',
					requireAuth: true,
					cid: 9
				},
				component: AddUsers,
			}, {
				path: 'EditUsers/:id',
				name: 'EditUsers',
				meta: {
					title: '编辑账号',
					requireAuth: true,
					cid: 9
				},
				component: AddUsers,
			}]
		}]
	}, {
		path: '/login',
		name: 'Login',
		meta: {
			title: '登录页',
			requireAuth: false,
		},
		component: Login
	}]
})
