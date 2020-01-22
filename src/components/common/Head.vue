<template>
	<div class="header">
		<div class="logoImg">
			<div class="logoImg-left">
				<img src="@/assets/logo_top.png">
				<span style="top: -10px;">IrisAdminApi</span>
			</div>
			<el-dropdown class="user_d" @command="handleCommand">
				<span class="el-dropdown-link">
					<img src="../../assets/index-head.png" class="user_d-img"/>
           			{{UserProfile.Name}}
           			<i class="el-icon-arrow-down el-icon--right"></i>
          		</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
					<el-dropdown-item command="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<el-dialog title="修改密码" :visible.sync="dialogTableVisible" width="30%">
			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				<el-form-item label="密码：" prop="pass">
					<el-input type="password" v-model="ruleForm2.pass" auto-complete="off" class="width250" maxlength="20"></el-input>
				</el-form-item>
				<el-form-item label="确认密码：" prop="checkPass">
					<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" class="width250" maxlength="20"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
					<el-button @click="resetForm('ruleForm2')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	// import { getCookie, delCookie } from '@/utils'
	import { mapState, mapActions } from 'vuex'
	import utils from '@/utils'
	export default {
		name: 'Head',
		data() {
			var validatePass = (rule, value, callback) => {
				console.log(value)
				if(value == '' || value.length < 6) {
					callback(new Error('请输入6-20位密码'))
				} else {
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass')
					}
					callback()
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value == '' || value.length < 6) {
					callback(new Error('再次输入新的密码'))
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'))
				} else {
					callback()
				}
			};
			return {
				ruleForm2: {
					pass: '',
					checkPass: ''
				},
				rules2: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				},
				dialogTableVisible: false
			}
		},
		computed: {
			...mapState([
				'UserProfile'
			])
		},
		methods: {
			...mapActions([
				'getUserProfile'
			]),
			Operating_Documentation() {
				window.open('https://www.yuque.com/dhyanfabu/youqikangshuoming/uw20sv')
			},
			submitForm(formName) {
				this.$refs[formName].validate(async(valid) => {
					if(valid) {
						let form = {}
						form.id = this.UserProfile.id
						form.password = this.ruleForm2.pass
						const data = await utils.putUsersPassword(form);
						this.$message({
							message: data.data.msg,
							type: 'success'
						});
						this.dialogTableVisible = false
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleCommand(command) {
				if(command == 'logout') {
					utils.delCookie('token');
					this.$message({
						message: '成功退出',
						type: 'success'
					})
					this.$router.replace({
						name: 'Login'
					})
				}
				if(command == 'editPassword') {
					this.dialogTableVisible = true
				}
			},
			async getData() {
				if(this.UserProfile.length == 0) {
					await this.getUserProfile()
				}
			},
			async putPassword(form) {
				await utils.putUsersPassword(form);
				this.$message({
					type: 'success',
					message: '修改成功'
				});
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" scoped>
	.width250 {
		width: 250px;
	}

	.header {
		text-align: left;
		background: #FFFFFF;
		width: 100%;
		height: 60px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.nav-top-icon {
		float: right;
		margin-top: 21px;
	}

	.logoImg {
		border-bottom: 1px solid rgb(243, 244, 245);
		box-shadow: rgba(170, 170, 170, 0.2) 0px 2px 8px 0px;
		&-left {
			display: inline-block;
			line-height: 80px;
			width: 230px;
			height: 60px;
			background-color: rgb(0, 36, 70);
			color: #ffffff;
			position: fixed;
		}
	}

	.logoImg img {
		width: 30px;
		height: 30px;
		margin: 0 15px;
	}

	.logoImg span {
		position: relative;
		margin-right: 20px;
	}

	.isolation {
		display: inline-block;
		background: #D5D5D5;
		width: 2px;
		height: 30px;
		margin-left: 20px;
		margin-right: 20px;
	}

	.user_d {
		float: right;
		margin-top: 20px;
		&-wen {
			margin-right: 25px;
			vertical-align: middle;
			cursor: pointer;
		}
		&-img {
			width: 24px !important;
			height: 24px !important;
			vertical-align: middle;
			border-radius: 50%;
			background: #000;
			margin: 0 6px !important;
		}
	}
</style>
