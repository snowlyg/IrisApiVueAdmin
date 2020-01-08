<template>
	<div>
		<div class="home_bd">
			<div class="admin-home">
				<el-row class="admin-home-rowa">
					<el-col :span="10">
						<el-row>
							<el-col :span="5">
								<img src="../assets/index-head.png" class="admin-home-img" />
							</el-col>
							<el-col :span="19">
								<p class="admin-home-p1">您好，{{UserProfile.Username}}，祝你开心每一天！</p>
								<p class="admin-home-p2">欢迎来到，IrisAdminApi</p>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="14">
						<el-row>

						</el-row>
					</el-col>
				</el-row>
				<div class="admin-home-rowb">
					<div class="admin-home-rowb-a">
						<p class="admin-home-rowb-a-p1">订单创建流程</p>
						<el-row class="admin-home-rowb-a-row">
							<el-col :span="6" class="admin-home-rowb-a-row-col xian">
								<i class="iconfont icon-ic_dns admin-home-rowb-a-row-icon"></i>
								<div class="admin-home-rowb-a-o"></div>
								<p class="admin-home-rowb-a-pc">选择方案类型</p>
							</el-col>
							<el-col :span="6" class="admin-home-rowb-a-row-col xian">
								<i class="iconfont icon-account-box admin-home-rowb-a-row-icon"></i>
								<div class="admin-home-rowb-a-o"></div>
								<p class="admin-home-rowb-a-pc">选择客户</p>
							</el-col>
							<el-col :span="6" class="admin-home-rowb-a-row-col xian">
								<i class="iconfont icon-ic_assignment admin-home-rowb-a-row-icon"></i>
								<div class="admin-home-rowb-a-o"></div>
								<p class="admin-home-rowb-a-pc">完善订单信息</p>
							</el-col>
							<el-col :span="6">
								<i class="iconfont icon-ic_check_circle admin-home-rowb-a-row-icon"></i>
								<div class="admin-home-rowb-a-o"></div>
								<p class="admin-home-rowb-a-pc">创建成功</p>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import countTo from 'vue-count-to';
	export default {
		components: {
			countTo
		},
		name: 'Home',
		data() {
			return {

			}
		},
		computed: {
			...mapState([
				'IndexData',
				'UserProfile'
			])
		},
		methods: {
			...mapActions([

			]),


		},
		mounted() {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.admin-home {
		&-rowa {
			margin-top: 10px;
			background: #FFFFFF;
			padding: 40px 25px;
			text-align: center;
		}
		&-img {
			width: 70px;
			height: 70px;
			border-radius: 50%;
		}
		&-p1 {
			text-align: left;
			font-size: 22px;
			font-weight: bold;
			margin-top: 4px;
		}
		&-p2 {
			text-align: left;
			color: rgb(85, 85, 85);
			font-size: 14px;
			margin-top: 12px;
		}
		&-p3 {
			color: rgb(136, 136, 136);
			font-size: 14px;
			&-num {
				color: rgb(88, 96, 140);
				font-size: 34px;
				margin-top: 15px;
			}
		}
		&-cola {
			position: relative;
			&:after {
				content: '';
				width: 1px;
				height: 40px;
				background: rgb(221, 221, 221);
				position: absolute;
				top: 15px;
				right: 0;
			}
		}
		&-rowb {
			padding: 25px;
			&-a {
				padding: 25px 22px;
				background: #ffffff;
				border-radius: 4px;
				&-p1 {
					color: rgb(102, 102, 102);
					font-size: 16px;
					font-weight: bold;
				}
				&-row {
					text-align: center;
					padding: 30px 0;
					&-icon {
						color: rgb(24, 144, 255);
						font-size: 24px;
					}
					&-col {
						position: relative;
						&.xian:after {
							content: '';
							width: 79%;
							height: 2px;
							background: #dbeeff;
							position: absolute;
							left: 60%;
							top: 62px;
						}
					}
				}
				&-o {
					width: 14px;
					height: 14px;
					background-color: rgb(217, 217, 217);
					border-radius: 50%;
					margin: 30px auto;
				}
				&-pc {
					font-size: 14px;
				}
			}
		}
		&-rowc {
			margin: 0 25px;
			&-row {
				&-col:last-child{
					padding-right: 0;
				}
				&-col {
					text-align: center;
					padding-right: 10px;
					border-radius: 4px;
					&-div {
						background: #FFFFFF;
						padding: 7rem 0;
						cursor: pointer;
					}
					&-icon {
						font-size: 80px;
					}
					&-p {
						margin-top: 10px;
					}
				}
			}
		}
	}

	.know-container {
		width: 100%;
		min-height: 600px;
		border-radius: 2px;
	}

	.home_title {
		padding-top: 60px;
		text-align: center;
		line-height: 44px;
		color: rgba(145, 163, 199, 1);
		font-size: 30px;
		text-align: center;
		font-family: Roboto;
	}

	.home_bd {
		width: 100%;
		height: 670px;
	}

	@media screen and (min-width: 1480px) {
		.home_bd {
			height: 780px;
		}
	}
</style>
