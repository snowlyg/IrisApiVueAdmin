<template>
	<div>
		<Head></Head>
		<div class="container">
			<div class="left" :style="HeightInfo">
				<Nav></Nav>
			</div>
			<div class="right">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import Head from '@/components/common/Head'
	import Nav from '@/components/common/Nav'
	export default {
		components: {
			Head,
			Nav
		},
		name: 'Admin',
		data() {
			return {

			}
		},
		computed: {
			HeightInfo() {
				const height = window.screen.availHeight + 41 + 'px'
				return 'height: ' + height + ';'
			}
		},
		methods: {

		},
		mounted() {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.container {
		position: relative;
	}
	
	.left {
		border-radius: 0;
		width: 230px;
		transition: transform .3s;
		position: fixed;
		top: 60px;
		left: 0;
		bottom: 0;
		background: rgb(0, 20, 41);
	}
	
	.right {
		margin-left: 230px;
		position: absolute;
		width: calc(100% - 230px);
	}
</style>