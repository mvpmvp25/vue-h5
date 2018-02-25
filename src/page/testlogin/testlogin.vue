<template>
	<div>
		<head-top signin-up='home'>
			<span slot='logo' class="head_logo" @click="reload">777</span>
		</head-top>
		<p class="img-box">
			<img src="../../images/activity.png">
		</p>
		<p>{{userName}}</p>
		<p>{{userAge}}</p>
		
	</div>
</template>

<script>
	import headTop from '../../components/testheader/testhead'
	import { testApi } from '../../service/testGetData'

	export default {
		data() {
			return {
				userName: '',
				userAge: ''
			}
		},

		mounted() {
			// 测试接口
			testApi().then(res => {
				this.userName = res.name;
				this.userAge = res.age;
			})

		},

		components: {
			headTop
		},

		computed: {
			
		},

		methods: {
			//点击图标刷新页面
			reload() {
				window.location.reload();
			}
		},
	}
</script>

<style lang="scss" scoped>
	.img-box img {
		max-width: 100%;
		height: auto;
	}
	
</style>