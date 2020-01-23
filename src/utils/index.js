import axios from 'axios'
import apiUrl from '@/utils/apiUrl'
import Vue from 'vue'
import router from '@/router'

const api_url = apiUrl;

const utils = {
  api_url: api_url,
  getCookie: (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    if (arr)
      return unescape(arr[2]);
    else
      return false;
  },
  setCookie: (c_name, value, expiredays) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
      ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
  },
  hasClass: (el, className) => {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className)
  },
  addClass: (el, className) => {
    if (hasClass(el, className)) {
      return
    }

    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ')
  },
  removeClass: (el, className) => {
    if (!hasClass(el, className)) {
      return
    }

    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
    el.className = el.className.replace(reg, ' ')
  },
  delCookie: (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = utils.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  scrollLeft: (element, endOffset) => {
    var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (fun) {
      setTimeout(fun, 1000 / 60);
    };

    function scrollTo(element, endOffset, params) {
      var startOffset;
      var scrollProp;
      if (params.horizontal) {
        startOffset = element.scrollLeft;
        scrollProp = 'scrollLeft';
      } else if (params.vertical) {
        startOffset = element.scrollTop;
        scrollProp = 'scrollTop';
      }

      var distance = endOffset - startOffset;
      var forward = true;
      if (distance == 0) {
        return;
      }

      forward = (distance > 0);

      function scroll() {
        var speed = 2 + Math.abs(endOffset - startOffset) / 5;
        if (!forward) {
          speed = -speed;
        }
        startOffset += speed;
        element[scrollProp] = startOffset;
        if (startOffset < endOffset && speed > 0 || startOffset > endOffset && speed < 0) {
          raf(scroll);
        }
      }

      scroll();
    }

    scrollTo(element, endOffset, {
      horizontal: true
    });

  },
  //登陆
  getToken: (item) => axios.post(`v1/admin/login`, {
    username: item.name,
    password: item.password
  }),
  //登陆用户信息
  getUserProfile: () => axios.get(`v1/admin/users/profile`),


  //修改密码
  putUsersPassword: (form) => axios.put(`v1/admin/users/${form.Id}/password`, {
    password: form.password
  }),
  /*----------------权限管理-------------------*/
  //权限列表
  getPermissions: (datas) => axios.get(`v1/admin/permissions`, datas),
  //新建权限
  postPermissions: (form) => axios.post(`v1/admin/permissions`, {
    name: form.Name,
    description: form.Description,
    display_name: form.DisplayName
  }),
  //编辑权限
  putPermissions: (form) => axios.put(`v1/admin/permissions/${form.Id}`, {
    name: form.Name,
    description: form.Description,
    display_name: form.DisplayName
  }),
  //删除权限
  deletePermissions: (id) => axios.delete(`v1/admin/permissions/${id}`),
  //权限详情
  getPermissionsDetail: (id) => axios.get(`v1/admin/permissions/${id}`),
  /*----------------角色管理-------------------*/
  //角色列表
  getRoles: (datas) => axios.get(`v1/admin/roles`, datas),
  //新建角色
  postRoles: (form) => axios.post(`v1/admin/roles`, {
    name: form.Name,
    display_name: form.DisplayName,
    permissions_ids: form.permissions_ids
  }),
  //编辑角色
  putRoles: (form) => axios.put(`v1/admin/roles/${form.Id}`, {
    name: form.Name,
    display_name: form.DisplayName,
    permissions_ids: form.permissions_ids
  }),
  //删除角色
  deleteRoles: (id) => axios.delete(`v1/admin/roles/${id}`),
  //角色详情
  getRolesDetail: (id) => axios.get(`v1/admin/roles/${id}`),
  /*----------------账号管理-------------------*/
  //账号列表
  getAdmins: (datas) => axios.get(`v1/admin/users`, datas),
  //新建账号
  postAdmins: (form) => axios.post(`v1/admin/users`, {
    password: form.Password,
    name: form.Name,
    username: form.Username,
    role_ids: form.RoleIds,
  }),
  /*---------------- 设置 -----------------*/
  //编辑用户
  putAdmins: (form) => axios.put(`v1/admin/users/${form.Id}`, {
    password: form.Password,
    name: form.Name,
    username: form.Username,
    role_ids: form.RoleIds,
  }),

  //删除账号
  deleteAdmins: (id) => axios.delete(`v1/admin/users/${id}`),

  //账号详情
  getAdminsDetail: (id) => axios.get(`v1/admin/users/${id}`),

};

// 请求拦截器
axios.interceptors.request.use(
  config => {
    config.timeout = 6000;
    let token = 'Bearer ' + utils.getCookie('token');
    if (token) {
      config.headers = {
        'Authorization': token,
        'Accept': "application/json",
        'Content-Type': 'application/json'
      }
    }
    if (config.url === 'refresh') {
      config.headers = {
        'refresh-token': sessionStorage.getItem('refresh_token'),
        'Content-Type': 'application/json'
      }
    }
    return config
  },
  error => {
    if (error) {
      Vue.prototype.$message({
        showClose: true,
        message: error.Error,
        type: 'warning'
      });
    }

    return Promise.reject(error)
  }
);


//响应拦截器
axios.interceptors.response.use(
  response => {
    //   console.log(response);
    //   // 定时刷新access-token
    //   // if (!response.data.value && response.data.data.message === 'token invalid') {
    //   //   // 刷新token
    //   //   store.dispatch('refresh').then(response => {
    //   //     sessionStorage.setItem('access_token', response.data)
    //   //   }).catch(error => {
    //   //     throw new Error('token刷新' + error)
    //   //   })
    //   // }
    //
    //
    return response
  },
  error => {
    if (error) {
      if (error.response.status === 401) {
        router.replace({
          name: 'Login'
        }).then(r => {
          // console.log(r);
        })
      }
      if (error.response.status === 403) {
        Vue.prototype.$message({
          showClose: true,
          message: '你没有操作权限',
          type: 'warning'
        })
      }

      if (error.response.status === 419) {
        Vue.prototype.$message({
          showClose: true,
          message: '你的操作太频繁，请稍后再试',
          type: 'warning'
        })
      }

      Vue.prototype.$message({
        showClose: true,
        message: error,
        type: 'warning'
      });
    }
    return Promise.reject(error)
  }
);

// 基础url utils/apiUrl.js 文件设置
axios.defaults.baseURL = `${api_url}/`;

export default utils
