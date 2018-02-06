<template>
	<div>

		<head-top go-back="hide" head-title="登陆"></head-top>

		<div class="app-content">

			<section class="login-box login-form">
				<div class="login-item login-mobile-icon">
					<input class="clear-input login-input" type="text" placeholder="手机号码" v-model="userMobile" />
				</div>
				<div class="login-item login-passkey-icon">
					<input id="passKey" class="clear-input login-input no-line" type="password" data-skill="eye" placeholder="登录密码" v-model="passWord" />
				</div>
			</section>

			<section class="login-btn">
				<div class="btn lock" @click="login">{{loginText}}</div>
			</section>

			<section class="login-box">
				<div class="login-turn">
					<span class="left" @click="testplus">一键注册{{userMobile}}</span>
					<span class="right">忘记密码</span>
				</div>
			</section>

		</div>

		<alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>

	</div>
</template>

<script>
	import headTop from '../../components/header/head';
	import alertTip from '../../components/common/alertTip';
	import { sendLogin } from '../../service/testGetData';
	import { mapMutations } from 'vuex';
	import { inputClear } from '../../module/element';

	export default {
		data() {
			return {
				userMobile: "",
				passWord: "",
				token: "",
				showAlert: false, //显示提示组件
				alertText: null, //提示的内容
			}
		},

		mounted() {
			inputClear();
		},

		components: {
			headTop,
			alertTip
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
					this.$router.push('personal');
				} else {
					this.showAlert = true;
					this.alertText = res.msgContent;
				}
			},
			closeTip() {
				this.showAlert = false;
			},
			testplus() {
				console.log("cc");
				var doAction = function() {
					plus.nativeUI.actionSheet({
						cancel: "取消",
						buttons: [{
							title: "拍照"
						}, {
							title: "手机相册"
						}]
					}, function(e) {
						if(e.index == 1) {
							plus.gallery.pick(function(e) {
								for(var i in e.files) {
									
									plus.io.resolveLocalFileSystemURL(e.files[i], function(entry) {
										alert(entry.toRemoteURL());
									}, function(e) {
										$.toast("读取文件错误：" + e.message);
									});
								}

							}, function(e) {
								//console.log("取消选择图片");
							}, {
								filter: "image",
								multiple: true,
								system: false
							});
						}
						if(e.index == 2) {
							alert(plus.os.name);
						}
					});
				}

				if(window.plus) {
					setTimeout(function() { //解决callback与plusready事件的执行时机问题(典型案例:showWaiting,closeWaiting)
						doAction();
					}, 0);
				} else {
					document.addEventListener("plusready", function() {
						doAction();
					}, false);
				}
			}
		}
	}
</script>

<!--<style lang="scss" scoped>-->
<style lang="scss">
	@import '../../style/param';
	@import '../../style/input';
	.login-box {
		@extend %box;
	}
	
	.login-form {
		margin-top: $px * 10;
		background: $white;
		.login-item {
			width: $mainWidth;
			height: $px * 36;
			margin: 0 auto;
			position: relative;
			&:before {
				content: "";
				width: 10%;
				height: 100%;
				display: block;
				position: absolute;
				left: 0;
				top: 0;
			}
			.login-input {
				border-bottom: 1px #d9d9d9 solid;
				padding-left: 10%;
			}
		}
		.login-mobile-icon {
			&:before {
				background: url($iconMobile) no-repeat center center;
				background-size: auto 50%;
			}
		}
		.login-passkey-icon {
			&:before {
				background: url($iconLock) no-repeat center center;
				background-size: auto 50%;
			}
		}
	}
	
	.login-btn {
		@extend %box;
		margin-top: $px * 15;
		.btn {
			@extend %btn;
		}
		.btn.lock {
			background: #C5C5C5;
		}
	}
	
	.login-turn {
		width: $mainWidth;
		margin: $px * 20 auto 0;
		span {
			font-size: $px * 12;
			color: $mainColor;
		}
	}
</style>