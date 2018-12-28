<template>
	<div>
		<div class="page-title">
			<i class="iconfont icon-arrow-left cursor" @click="$router.go(-1)"></i> {{ $route.meta.title }}
		</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<el-form @submit.native.prevent class="margin-top-lg" :label-position="labelPosition" label-width="130px" :model="ruleForm" ref="ruleForm" :rules="rules">

					<el-form-item prop="username" class="margin-left-lg margin-top must" label="姓名">
						<el-input class="form-input-h" v-model="ruleForm.username" placeholder="请输入"></el-input>
						<p class="form_p_g">输入账号使用者的姓名！</p>
					</el-form-item>

					<el-form-item prop="name" class="margin-left-lg margin-top must" label="账号名">
						<el-input class="form-input-h" v-model="ruleForm.name" placeholder="请输入"></el-input>
						<p class="form_p_g">输入账号名，用于后台登录！</p>
					</el-form-item>

					<el-form-item prop="password" class="margin-left-lg margin-top must" label="密码">
						<el-input class="form-input-h" v-model="ruleForm.password" placeholder="请输入" maxlength="20" type="password"></el-input>
						<p class="form_p_g">输入账号的密码，6-20位字符不限！</p>
					</el-form-item>

					<el-form-item prop="phone" class="margin-left-lg margin-top must" label="手机号">
						<el-input class="form-input-h" v-model="ruleForm.phone" placeholder="请输入" @input="checkNo" maxlength="11"></el-input>
						<p class="form_p_g">填写11位手机号，顾问认证时，会作为认证匹配的条件</p>
					</el-form-item>

					<el-form-item label="选择角色" prop="role_id" class="margin-left-lg margin-top must">
						<el-select v-model="ruleForm.role_id" placeholder="请选择角色">
							<el-option v-for="item,index in RolesData" :key="index" :label="item.display_name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item class="text-center margin-top-lg">
						<el-button :disabled="loading" type="primary" @click="submitForm('ruleForm')">提交</el-button>
						<el-button @click="resetForm('ruleForm')">返回</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import { getCookie } from '@/utils'
	export default {
		data() {
			var validatePass2 = (rule, value, callback) => {
				if(!(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(value))) {
					callback(new Error('请正确输入手机号'))
				} else {
					callback()
				}
			}
			var validatePass3 = (rule, value, callback) => {
				if(this.$route.params.id){
					callback()
				}
				if(value.length <6) {
					callback(new Error('请正确输入密码'))
				} else {
					callback()
				}
			}
			return {
				data: [],
				labelPosition: 'right',
				ruleForm: {
					username: '',
					name: '',
					password: '',
					phone: '',
					role_id: '',
					id: this.$route.params.id
				},
				rules: {
					username: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '请输入账号名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						validator: validatePass3,
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						validator: validatePass2,
						trigger: 'blur'
					}],
					role_id: [{
						required: true,
						message: '请选择角色',
						trigger: 'change'
					}],
				},
				loading: false,
				resetdata: false,
			}
		},
		computed: {
			...mapState([
				'RolesData'
			])
		},
		methods: {
			...mapActions([
				'getRoles'
			]),
			async getData() {
				if(this.$route.params.id) {
					this.loading = true
					const data = await api.getAdminsDetail(this.$route.params.id)
					await this.getRoles()
					this.ruleForm.username = data.data.username
					this.ruleForm.name = data.data.name
					this.ruleForm.phone = data.data.phone
					if(data.data.roles.data.length > 0){
						this.ruleForm.role_id = data.data.roles.data[0].id
					}
				} else {
					await this.getRoles()
				}

				this.loading = false
			},
			//提交表单
			submitForm(formName) {
				let id = this.$route.params.id;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(id) {
							this.putAdmins()
						} else {
							this.postAdmins()
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async postAdmins() {
				this.loading = true
				const data = await api.postAdmins(this.ruleForm)
				if(data.status) {
					this.$message({
						type: 'success',
						message: data.msg
					})
					this.$router.push({
						name: 'UsersMange'
					})
				} else {
					this.$message({
						type: 'info',
						message: data.msg
					})
				}
				this.loading = false
			},
			async putAdmins() {
				this.loading = true
				if(this.ruleForm.password == ''){
					delete this.ruleForm.password
				}
				const data = await api.putAdmins(this.ruleForm)
				if(data.status) {
					this.$message({
						type: 'success',
						message: data.msg
					})
					this.$router.push({
						name: 'UsersMange'
					})
				} else {
					this.$message({
						type: 'info',
						message: data.msg
					})
				}
				this.loading = false
			},
			resetForm(formName) {
				//this.$refs[formName].resetFields();
				if(this.resetdata) {
					this.$confirm('真的要退出此次编辑？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					}).then(() => {
						this.$router.go(-1)
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						})
					})
				} else {
					this.$router.go(-1)
				}
			},
			checkNo(value) {
				if(value) {
					this.$nextTick(() => {
						this.ruleForm.phone = this.$valid.onlynumber(value)
					});
				}
			}
		},
		mounted: function() {
			this.getData()
		},
		watch: {
			ruleForm: {
				handler(curVal, oldVal) {
					this.resetdata = true
				},
				deep: true
			}
		}
	}
</script>
<style lang="less" scoped>
	.auditDaka {
		&-arrow {
			& .icon-07jiantouxiangzuo {
				vertical-align: middle;
				font-size: 24px;
				color: #444444;
			}
		}
	}
</style>
<style scoped>
	.form-input-h {
		width: 400px
	}
	
	.form_p_g {
		font-size: 14px;
		color: #888;
		clear: both
	}
	
	.tree-box {
		margin-top: 10px;
		border: 1px solid #E3E3E3;
		border-radius: 4px;
		width: 800px;
		padding: 10px;
		min-height: 220px
	}
	
	.avatar-uploader {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		display: inline-block;
		line-height: 1
	}
	
	.avatar-uploader:hover {
		border-color: #409EFF
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center
	}
	
	.avatar {
		width: 100px;
		height: 100px;
		display: block
	}
	
	.colrecom_form {
		width: 200px;
		border: 1px solid #ccc;
		line-height: initial;
		display: inline-block;
		position: relative;
		margin: 0 15px 1rem 0;
		float: left;
		height: 141px;
		border-radius: 4px
	}
	
	.colrecom_form_add {
		width: 200px;
		border: 1px dotted #ccc;
		line-height: initial;
		display: inline-block;
		position: relative;
		margin: 0 15px 1rem 0;
		float: left;
		height: 141px;
		text-align: center;
		border-radius: 4px
	}
	
	.colrecom_form_add>.el-icon-plus {
		height: 80px
	}
	
	.colrecom_form>img {
		width: 100%
	}
	
	.colrecom_form>p {
		line-height: normal;
		text-align: center;
		padding: 0 3px;
		word-wrap: normal;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: justify
	}
	
	.colrecom_form>.el-icon-error {
		color: #ff7043;
		position: absolute;
		top: -7px;
		right: -7px;
		font-size: 18px
	}
	
	.input_search_video {
		width: 50%
	}
	
	.span_search_video {
		color: #888;
		margin-left: 5%
	}
	
	.select_show_video {
		width: 685px;
		margin: 0 auto
	}
	
	.show_page {
		margin-top: 2rem;
		text-align: center
	}
</style>