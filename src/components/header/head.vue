<template>
	<header class="app-header-box">
		<a class="app-header-back" v-if="goBack == 'show' ? true : false" @click="$router.go(-1)"></a>
		<h1 class="app-header-title">{{headTitle}} {{appVersion}}</h1>
	</header>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {

			}
		},
		mounted() {
			//最新版本信息
			this.getVersion();

		},
		props: ['goBack', 'headTitle'],
		// props: ['signinUp', 'headTitle', 'goBack'],
		computed: {
			...mapState([
				'appVersion'
			]),
		},
		methods: {
			...mapActions([
				'getVersion'
			]),
		}

	}
</script>

<style lang="scss" scoped>
	/*@import '../../style/mixin';

    #head_top{
        background-color: $blue;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, 1.95rem);
    }
    .head_goback{
        left: 0.4rem;
        @include wh(0.6rem, 1rem);
        line-height: 2.2rem;
        margin-left: .4rem;
    }
    .head_login{
        right: 0.55rem;
        @include sc(0.65rem, #fff);
        @include ct;
        .login_span{
            color: #fff;
        }
        .user_avatar{
            fill: #fff;
            @include wh(.8rem, .8rem);
        }
    }
    .title_head{
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            font-weight: bold;
        }
    }*/
</style>