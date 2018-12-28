// 正则验证
// 主要用于限制输入内容
// 1.value ---数据（输入的内容）
// 2.返回  ---限制过后的数据
// 3.正则编写规则，使用的是.replace()替换，所以正则填写的规则应该是非法的数据的正则，讲其替换成空
//举例：如果登录页面，账号不能输入中文，value传过来的是'admin我'，经过方法返回后的数据是 'admin'
export default{
    //只允许数字
    onlynumber(value){
        return value.replace(/\D/g,'');
    },
    //只允许数字,字母
    onlyZorN(value){
        return value.replace(/[^\w\.\/]/g,'');
    },
    //不允许中文和空格
    noCork(value){
        return value.replace(/[\u4E00-\u9FA5\s]/g,'');
    },
    //不允许空格
    noK(value) {
        return value.replace(/\s/g,'');
    },
    //只能输入数字，小数点，不能有空格
    nolyNorD(value) {
        return value.replace(/[^0-9\.\/]/g,'');
    }
}