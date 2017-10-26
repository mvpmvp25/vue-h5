<template>
	<div>

		<head-top go-back='true'></head-top>

		<div class="app-content">

			<section class="login-box login-form">
				<div class="login-item login-mobile-icon">
					<input class="clear-input login-input" type="text" placeholder="手机号码" />
				</div>
				<div class="login-item login-passkey-icon">
					<input id="passKey" class="clear-input login-input no-line" type="password" data-skill="eye" placeholder="登录密码" />
				</div>
			</section>

			<section class="login-btn">
				<div class="btn lock" @click="changeName('fizz')">登录({{readName}})</div>
			</section>

			<section class="login-box">
				<div class="login-turn">
					<span class="left">一键注册</span>
					<span class="right">忘记密码</span>
				</div>
			</section>

		</div>

		<!--<head-top signin-up='home'>
			<span slot='logo' class="head_logo" @click="reload">ele.me777</span>
		</head-top>
		<p class="img-box">
			<img src="../../images/activity.png">
		</p>-->
		<!--<p>{{userName}}</p>
		<p>{{userAge}}</p>-->
		<!--<nav class="city_nav">
            <div class="city_tip">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <router-link :to="'/city/' + guessCityid" class="guess_city">
                <span>{{guessCity}}</span>
                <svg class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </router-link>  
        </nav>
        <section id="hot_city_container">
            <h4 class="city_title">热门城市</h4>
            <ul class="citylistul clear">
                <router-link  tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">
                    {{item.name}}
                </router-link>  
            </ul>
        </section>
        <section class="group_city_container">
            <ul class="letter_classify">
                <li v-for="(value, key, index) in sortgroupcity" :key="key"  class="letter_classify_li">
                    <h4 class="city_title">{{key}}
                        <span v-if="index == 0">（按字母排序）</span>
                    </h4>
                    <ul class="groupcity_name_container citylistul clear">
                        <router-link  tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
                            {{item.name}}

                        </router-link>  
                    </ul>
                </li>
            </ul>
        </section>-->
	</div>
</template>

<script>
	import headTop from '../../components/header/head';
	import { testApi } from '../../service/testGetData';
	import { inputClear } from '../../module/element';

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
			});
			inputClear();

		},

		components: {
			headTop
		},

		computed: {
			readName: function() {
				return this.userName;
			},
			//将获取的数据按照A-Z字母开头排序
			//      sortgroupcity(){
			//          let sortobj = {};
			//          for (let i = 65; i <= 90; i++) {
			//              if (this.groupcity[String.fromCharCode(i)]) {
			//                  sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
			//              }
			//          }
			//          return sortobj
			//      }
		},

		methods: {
			changeName(_name) {
				this.userName = _name;
			},
			//点击图标刷新页面
			reload() {
				window.location.reload();
			}
		},
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