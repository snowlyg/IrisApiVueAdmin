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
  getUserProfile: () => request.get(`${api_url}/v1/admin/users/profile`),
  //首页
  getIndex: () => request.get(`${api_url}/v1/`),
  /*---------------- 设置 -----------------*/
  //编辑用户
  putAdmins: (form) => request.put(`${api_url}/v1/admin/users/${form.id}`, {
    name: form.name,
    email: form.email,
    password: form.password,
    username: form.username,
    phone: form.phone,
    role_id: form.role_id
  }),
  //修改密码
  putUsersPassword: (form) => request.put(`${api_url}/v1/admin/users/${form.id}/password`, {
    password: form.password
  }),
  /*----------------权限管理-------------------*/
  //权限列表
  getPermissions: () => request.get(`${api_url}/v1/admin/permissions`),
  //新建权限
  postPermissions: (form) => request.post(`${api_url}/v1/admin/permissions`, {
    name: form.Name,
    description: form.Description,
    display_name: form.DisplayName
  }),
  //编辑权限
  putPermissions: (form) => request.put(`${api_url}/v1/admin/permissions/${form.ID}`, {
    name: form.Name,
    description: form.Description,
    display_name: form.DisplayName
  }),
  //删除权限
  deletePermissions: (id) => request.delete(`${api_url}/v1/admin/permissions/${id}`),
  //权限详情
  getPermissionsDetail: (id) => request.get(`${api_url}/v1/admin/permissions/${id}`),
  /*----------------角色管理-------------------*/
  //角色列表
  getRoles: () => request.get(`${api_url}/v1/admin/roles`),
  //新建角色
  postRoles: (form) => request.post(`${api_url}/v1/admin/roles`, {
    ame: form.Name,
    display_name: form.DisplayName,
    permissions_ids: form.permissions_ids
  }),
  //编辑角色
  putRoles: (form) => request.put(`${api_url}/v1/admin/roles/${form.ID}`, {
    name: form.Name,
    display_name: form.DisplayName,
    permissions_ids: form.permissions_ids
  }),
  //删除角色
  deleteRoles: (id) => request.delete(`${api_url}/v1/admin/roles/${id}`),
  //角色详情
  getRolesDetail: (id) => request.get(`${api_url}/v1/admin/roles/${id}`),
  /*----------------账号管理-------------------*/
  //账号列表
  getAdmins: () => request.get(`${api_url}/v1/admin/users`),
  //新建账号
  postAdmins: (form) => request.post(`${api_url}/v1/admin/users`, {
    password: form.Password,
    name: form.Name,
    username: form.Username,
    role_id: form.RoleID,
  }),
  //编辑账号
  putAdmins: (form) => request.put(`${api_url}/v1/admin/users/${form.ID}`, {
    password: form.Password,
    name: form.Name,
    username: form.Username,
    role_id: form.RoleID,
  }),
  //删除账号
  deleteAdmins: (id) => request.delete(`${api_url}/v1/admin/users/${id}`),

  //账号详情
  getAdminsDetail: (id) => request.get(`${api_url}/v1/admin/users/${id}`),

}

export default api
