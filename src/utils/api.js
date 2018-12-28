import request from './request'
import apiUrl from './apiUrl'
const api_url = apiUrl
const api = {
	//登陆
	getToken: (item) => request.post(`${api_url}/v1/admin/login`, {
		Username: item.name,
		Password: item.password
	}),
	//登陆用户信息
	getUserProfile: (id) => request.get(`${api_url}/v1/admin/users/profile`),
	//首页
	getIndex: (id) => request.get(`${api_url}/v1/`),
	/*---------------- 设置 -----------------*/
	//编辑用户
	putAdmins: (form) => request.put(`${api_url}/v1/users/${form.id}`, {
		name: form.name,
		email: form.email,
		password: form.password,
		username: form.username,
		phone: form.phone,
		role_id: form.role_id
	}),
	//修改密码
	putUsersPassword: (form) => request.put(`${api_url}/v1/users/${form.id}/password`, {
		password: form.password
	}),
	/*----------------权限管理-------------------*/
	//权限列表
	getPermissions: () => request.get(`${api_url}/v1/permissions`),
	//新建权限
	postPermissions: (form) => request.post(`${api_url}/v1/permissions`, {
		name: form.name,
		description: form.description,
		display_name: form.display_name
	}),
	//编辑权限
	putPermissions: (form) => request.put(`${api_url}/v1/permissions/${form.id}`, {
		description: form.description,
		display_name: form.display_name
	}),
	//删除权限
	deletePermissions: (id) => request.delete(`${api_url}/v1/permissions/${id}`),
	//权限详情
	getPermissionsDetail: (id) => request.get(`${api_url}/v1/permissions/${id}`),
	/*----------------角色管理-------------------*/
	//角色列表
	getRoles: () => request.get(`${api_url}/v1/roles`),
	//新建角色
	postRoles: (form) => request.post(`${api_url}/v1/roles`, {
		name: form.name,
		display_name: form.display_name,
		permissions_ids: form.permissions_ids
	}),
	//编辑角色
	putRoles: (form) => request.post(`${api_url}/v1/permissions/sync`, {
		role_id: form.id,
		name: form.name,
		display_name: form.display_name,
		permissions_ids: form.permissions_ids
	}),
	//删除角色
	deleteRoles: (id) => request.delete(`${api_url}/v1/roles/${id}`),
	//角色详情
	getRolesDetail: (id) => request.get(`${api_url}/v1/roles/${id}`),
	/*----------------账号管理-------------------*/
	//账号列表
	getAdmins: () => request.get(`${api_url}/v1/admins`),
	//新建账号
	postAdmins: (form) => request.post(`${api_url}/v1/admins`, {
		password: form.password,
		name: form.name,
		username: form.username,
		phone: form.phone,
		role_id: form.role_id,
		is_audit: form.is_audit
	}),
	//编辑账号
	putAdmins: (form) => request.put(`${api_url}/v1/users/${form.id}`, {
		password: form.password,
		name: form.name,
		username: form.username,
		phone: form.phone,
		role_id: form.role_id,
		is_audit: form.is_audit
	}),
	//删除账号
	deleteAdmins: (id) => request.delete(`${api_url}/v1/users/${id}`),
	//设置负责人
	putUsersAudit: (id) => request.put(`${api_url}/v1/users/${id}/audit`),
	//账号详情
	getAdminsDetail: (id) => request.get(`${api_url}/v1/users/${id}`),

}

export default api
