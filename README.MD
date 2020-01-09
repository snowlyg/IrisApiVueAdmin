# IrisApiVueAdmin

> IrisAdminApi 的前端代码
> IrisAdminApi 地址 https://github.com/snowlyg/IrisAdminApi

## Build Setup


##### install dependencies

```
npm install
```


##### 在src/utils/ 下面新建文件 apiUrl.js

##### 复制内容到文件内

```js
const api_url = 'http://localhost:80';
export default api_url;

```


#### serve with hot reload at localhost:8080

```
npm run dev
```


```
输入地址 http://localhost:8080

管理员账号：username
管理员密码：password
```


// config/index.js 文件修改打包文件生成位置

```
build: {
    // Template for index.html
    index: path.resolve(__dirname, '../../IrisAdminApi/resources/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../../IrisAdminApi/resources'),

```
