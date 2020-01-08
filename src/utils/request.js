import { getCookie } from '@/utils'
import Vue from 'vue'
import router from '@/router'
const Fly = require("flyio/dist/npm/fly");
const request = new Fly;

request.interceptors.request.use((request) => {
  if(getCookie('token')) {
    request.headers.Accept = 'application/json'
    request.headers.Authorization = 'Bearer ' + getCookie('token')
  }
  return request
})

request.interceptors.response.use((response) => {
  return Promise.resolve(response.data)
  }, (err) => {

    if(err.status == 0) {
      Vue.prototype.$message({
        showClose: true,
        message: err.message,
        type: 'warning'
      })
    }
    if(err.status == 401) {
      router.replace({
        name: 'Login'
      })
    }
    if(err.status == 403) {
      Vue.prototype.$message({
        showClose: true,
        message: '你没有操作权限',
        type: 'warning'
      })
    }
    if(err.status == 419) {
      Vue.prototype.$message({
        showClose: true,
        message: '你的操作太频繁，请稍后再试',
        type: 'warning'
      })
    }
    return Promise.resolve(err.message)

    // return promise.reject(err.response.data)
  }
);

export default request
