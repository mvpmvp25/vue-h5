<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="scss">
	@import './style/common';
	.router-fade-enter-active,
	.router-fade-leave-active {
		transition: all .2s ease;
	}
	
	.router-fade-enter,
	.router-fade-leave-to {
		transform: translateX(15px);
		opacity: 0;
	}
</style>