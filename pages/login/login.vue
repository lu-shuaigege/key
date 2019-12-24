<template>
	<view class="login">
		<view class="login-top">
			<image src="../../static/login-bg.png"></image>
		</view>
		<view class="login-con">
			<view class="login-con-top">
				<image v-if="avatarUrl" :src="avatarUrl"></image>
			</view>
			<view class="login-tel">
				<image src="../../static/login-tel.png"></image>
				<input placeholder-class="place-holder" type="text" value="" maxlength="11" v-model="account" placeholder="请输入登录账号" />
			</view>
			<view class="login-psw">
				<image class="login-psw-psw" src="../../static/login-psw.png"></image>
				<input placeholder-class="place-holder" value="" v-model="password" placeholder="请输入密码" :type="inputType" />
				<image v-if="!showPassword" class="login-psw-eye" src="../../static/login-hideeye.png" @click="showpsw()"></image>
				<image v-if="showPassword" class="login-psw-eye" src="../../static/login-eye.png" @click="hidepsw()"></image>
			</view>
			<view class="login-submit">
				<button @click="login()" open-type="getUserInfo">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		login,
		wxOpeninfo,
		getUserToken,
		userAutologin
	} from "../../api/user.js"
	export default {
		data() {
			return {
				showPassword: false,
				inputType: "password",
				account: '',
				password: '',
				avatarUrl: '',
				openId: '',
				unionid: '',
				code: ''
			}
		},
		onLoad() {
			const that = this;
			that.getUserInfo();
			that.postUserAutologin();
			console.log(new Date().getTime());
		},
		methods: {
			getWxOpeninfo() {
				console.log('getWxOpeninfo Init');
				const that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						getUserToken().then(res => {
							wxOpeninfo(loginRes.code).then(res => {
								that.unionid = res.data.unionid || '';
								that.openId = res.data.openid || '';
							})
						})
					}
				});
			},
			postUserAutologin() {
				console.log('postUserAutologin Init');
				const that = this;
				if (new Date().getTime() > uni.getStorageSync('logintime')) {
					return that.getWxOpeninfo();
				}

				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						getUserToken().then(res => {
							userAutologin(loginRes.code).then(res => {
								if (res.error == 0) {
									uni.setStorageSync('companyid', res.data.companyid);
									uni.redirectTo({
										url: "../keycabinetlist/keycabinetlist"
									});
								} else {
									uni.showToast({
										icon: 'none',
										title: res.msg
									});
									return that.getWxOpeninfo();
								}
							})
						})
					}
				});
			},
			getUserInfo() {
				const that = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						that.avatarUrl = infoRes.userInfo.avatarUrl;
						uni.setStorageSync('nickName', infoRes.userInfo.nickName);
						uni.setStorageSync('avatarUrl', infoRes.userInfo.avatarUrl);
					}
				});
			},
			showpsw() {
				this.showPassword = !this.showPassword
				this.inputType = "text";
			},
			hidepsw() {
				this.showPassword = !this.showPassword;
				this.inputType = "password";
			},
			login() {
				login(this.account,this.password,this.openId,this.unionid).then(res => {
					if (res.error != 0) {
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
						return false;
					}
					uni.setStorageSync('logintime', new Date().getTime() + 2592000000);
					uni.setStorageSync('companyid', res.data.companyid);
					uni.redirectTo({
						url: "../keycabinetlist/keycabinetlist"
					});
				})
			}
		}
	}
</script>

<style>
	@import url("login.css");
</style>
