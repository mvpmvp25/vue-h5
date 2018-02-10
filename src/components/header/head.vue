<template>
	<header class="app-header-box">
		<a class="app-header-back" v-if="goBack == 'show' ? true : false" @click="$router.go(-1)"></a>
		<h1 class="app-header-title">{{headTitle}} <!--{{appVersion}}--></h1>
	</header>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	export default {
		data() {
			return {

			}
		},
		mounted() {
			//最新版本信息
			//this.getVersion();

		},
		props: ['goBack', 'headTitle'],
		computed: {
//			...mapState([
//				'appVersion'
//			]),
		},
		methods: {
//			...mapActions([
//				'getVersion'
//			]),
		}

	}
</script>

<!--<style lang="scss" scoped>
	
</style>-->