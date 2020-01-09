// import {getCookie} from '@/utils'
// import Vue from 'vue'
// import router from '@/router'
// import apiUrl from './apiUrl'
//
// const api_url = apiUrl;
// const Fly = require("flyio/dist/npm/fly");
// const fly = new Fly;
//
// fly.config.baseURL = `${api_url}/v1/admin/`;
// fly.interceptors.request.use((request) => {
//   if (this.getCookie('token')) {
//     request.headers.Accept = 'application/json';
//     request.headers.Authorization = 'Bearer ' + this.getCookie('token')
//   }
//   return Promise.resolve(request)
// });
//
// fly.interceptors.response.use((response) => {
//     if (response.status === 401) {
//       router.replace({
//         name: 'Login'
//       })
//     }
//     if (response.status === 403) {
//       Vue.prototype.$message({
//         showClose: true,
//         message: '你没有操作权限',
//         type: 'warning'
//       })
//     }
//
//     if (response.status === 419) {
//       Vue.prototype.$message({
//         showClose: true,
//         message: '你的操作太频繁，请稍后再试',
//         type: 'warning'
//       })
//     }
//
//     return Promise.resolve(response.data)
//   },
//   (err) => {
//     if (err.status === 0) {
//       Vue.prototype.$message({
//         showClose: true,
//         message: err.message,
//         type: 'warning'
//       });
//     }
//
//     return Promise.resolve(err.message)
//   }
// );
//
// export default fly
