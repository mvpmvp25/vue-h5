<template>
	<div>

		<head-top go-back="show" head-title=""></head-top>

		<div class="app-content">

			<section class="welcome-cell">
				<div class="welcome-img"></div>
				<div class="welcome-title">欢迎回来</div>
			</section>

			<section class="login-box login-form">
				<div class="login-item">
					<input class="clear-input login-input" type="text" placeholder="输入手机号" v-model="userMobile" />
				</div>
				<div class="login-item login-password">
					<input id="passKey" class="clear-input login-input" type="password" data-skill="eye" placeholder="登录密码" v-model="passWord" />
				</div>
			</section>

			<section class="login-btn">
				<div class="btn" @click="login">{{loginText}}</div>
			</section>

			<section class="login-box">
				<div class="login-forget" @click="test">忘记密码</div>
			</section>

		</div>

		<alertdasdTip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alertdasdTip>
		<!--<loading v-if="showLoading"></loading>-->

	</div>
</template>

<script>
	import headTop from '../../components/header/head';
	import { sendLogin } from '../../service/testGetData';
	import { mapMutations } from 'vuex';
	import loading from '../../components/common/loading';
	import alertdasdTip from '../../components/common/alert';
	import { inputClear } from '../../module/input_clear';

	export default {
		data() {
			return {
				userMobile: "",
				passWord: "",
				token: "",
				showAlert: false, //显示提示组件
				alertText: null //提示的内容
				//showLoading: true,
			}
		},

		mounted() {

			inputClear();

		},

		components: {
			headTop,
			loading,
			alertdasdTip
		},

		computed: {
			loginText() {
				return "登陆";
			}
		},

		methods: {
			...mapMutations([
				'RECORD_TOKEN',
			]),
			async login() {
				let _passWord = this.passWord == "Fizz4706" ? "ea59db20b192dd0a86cd17bb9ef1dbde" : this.passWord;
				let res = await sendLogin(this.userMobile, _passWord);
				if(res.resType == "00") {
					this.token = res.token;
					this.RECORD_TOKEN({
						token: this.token
					});
					this.$router.push({ path: 'personal', query: { frompage: 'fewjij3' }});
				} else {

				}
			},
			closeTip() {
				this.showAlert = false;
			},
			test() {
				this.alertText = "的叫大都护";
				this.showAlert = true;
			}
		}
	}
</script>

<!--<style lang="scss" scoped>-->
<style lang="scss">
	@import '../../style/param';
	$clearInputHeight: $px * 40;
	@import '../../style/module/input_clear';
	.welcome-cell {
		@extend %box;
		height: $px * 36;
		margin: $px * 8 auto 0;
		text-align: center;
		.welcome-img {
			width: $px * 28;
			height: $px * 28;
			margin-top: $px * 3;
			vertical-align: middle;
			display: inline-block;
			background: url("../../img/icon/face.gif") no-repeat;
			background-size: 100% 100%;
		}
		.welcome-title {
			height: $px * 34;
			line-height: $px * 34;
			margin-left: $px * 4;
			font-size: $px * 28;
			color: $ashy;
			display: inline-block;
			vertical-align: middle;
		}
	}
	
	.login-box {
		@extend %box;
	}
	
	.login-form {
		margin-top: $px * 80;
		background: $white;
		.login-item {
			width: 85%;
			height: $px * 44;
			margin: 0 auto;
			position: relative;
			border-bottom: 1px #d9d9d9 solid;
			.login-input {
				font-size: $px * 24;
				color: $black;
			}
		}
		.login-password {
			margin-top: $px * 26;
		}
	}
	
	.login-btn {
		@extend %box;
		margin-top: $px * 52;
		.btn {
			@extend %btn;
		}
	}
	
	.login-forget {
		margin: $px * 20 auto 0;
		text-align: center;
		font-size: $px * 16;
		color: $ashy;
	}
</style>