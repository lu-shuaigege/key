<template>
	<view class="login">
		<view class="login-top">
			<image src="../../static/home-bg.png"></image>
		</view>
		<view class="login-con">
			<view class="login-con-top">
				<image :src="avatarUrl"></image>
				<text class="name">{{nickName}}</text>
				<!-- <text class="info">迅帆科技</text> -->
			</view>

			<view class="login-submit">
				<button @click="userLogout()">退出</button>
			</view>
		</view>
		<!-- <view class="keycabinet-bottom">
			<image src="../../static/logo-color.png"></image>
			<text></text>
			<label>迅帆科技</label>
		</view> -->
	</view>

</template>

<script>
	import {
		logOut
	} from "../../api/keycabint.js"
	export default {
		data() {
			return {
				showPassword: false,
				inputType: "password",
				nickName: uni.getStorageSync('nickName'),
				avatarUrl: uni.getStorageSync('avatarUrl'),
			}
		},
		methods: {
			showpsw() {
				this.showPassword = !this.showPassword
				this.inputType = "text";
			},
			hidepsw() {
				this.showPassword = !this.showPassword;
				this.inputType = "password";
			},
			userLogout() {
				logOut().then(res => {
						if (res.error == 0) {
							uni.clearStorageSync();
							uni.navigateTo({
								url: "../login/login"
							});
						}
					})
			}
		}
	}
</script>

<style>
	@import url("homepage.css");
</style>
