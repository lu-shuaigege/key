<template>
	<view class="keycabinetlist">
		<image class="dot-bg" src="../../static/dot-bg.png"></image>
		<view class="keycabinetlist-top">
			<image :src="avatarUrl" @click="toLogout()"></image>
			<view class="keycabinetlist-top-r">
				<text class="keycabinetlist-top-r-name">{{nickName}}</text>
				<!-- <text class="keycabinetlist-top-r-text">迅帆科技</text> -->
			</view>
		</view>
		<view class="administratornews" v-show="manageNew.status == 1">
			<image src="../../static/keycabinetlist-horn.png"></image>
			<view class="administratornews-con">
				<text class="name">{{manageNew.user}}</text>
				<text class="news">{{manageNew.message}}</text>
			</view>
			<button @click="lookAuthList()">点击查看</button>
		</view>
		<view class="" v-for="(item,index) in keycabinetList" :key='item.cabinetno'>
			<view class="keycabinet-normal" @click="lookDetail(item.cabinetno)" v-if='index<2'>
				<view class="keycabinet-normal-top">
					<label></label>
					<text class="keycabinet-normal-top-name">{{item.cabinetname}} {{item.cabinetno}}</text>
					<view class="keycabinet-normal-top-r">
						<image v-if="item.online.status==1" class="dot-green" src="../../static/dot-green.png"></image>
						<image v-if="item.online.status==0" class="dot-green" src="../../static/dot-grey.png"></image>
						<text v-if="item.online.status==1">网络正常</text>
						<text v-if="item.online.status==0" class="exception-text">网络异常</text>
					</view>
				</view>
				<view class="keycabinet-normal-top2">
					<text class="keycabinet-normal-top-num">NO.{{item.cabinetno}}</text>
					<view class="keycabinet-normal-top-r">
						<image v-if="item.alarm.status==0" src="../../static/light-green.png"></image>
						<image v-if="item.alarm.status==1" src="../../static/light-red.png"></image>
						<text v-if="item.alarm.status==0">{{item.alarm.title}}</text>
						<text v-if="item.alarm.status==1" class="exception-text">{{item.alarm.title}}</text>
					</view>
				</view>
				<view class="keycabinet-normal-con">
					<image src="../../static/default-cabinetlist.png" mode=""></image>
					<view class="keycabinet-normal-con-r">
						<view class="progress">
							<text class="progress-name">钥匙总数</text>
							<view class="progress-box">
								<progress percent="100" activeColor="#2fa4ff" active stroke-width="3" />
							</view>
							<text class="progress-num">{{item.keynum}}</text>
						</view>
						<view class="progress">
							<text class="progress-name">使&ensp;用&ensp;中</text>
							<view class="progress-box">
								<progress :percent="item.usednum/item.keynum*100" activeColor="#999999" active stroke-width="3" />
							</view>
							<text class="progress-num">{{item.usednum}}</text>
						</view>
						<view class="progress">
							<text class="progress-name">错&emsp;&emsp;位</text>
							<view class="progress-box">
								<progress :percent="item.errornum/item.keynum*100" activeColor="#ff3232" active stroke-width="3" />
							</view>
							<text class="progress-num">{{item.errornum}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="keycabinetlist-line">
			<image src="../../static/keycabinetlist-line.png"></image>
		</view>
		<view class="keycabinetlist-con">
			<scroll-view class="keycabinetlist-con-p" scroll-x="true">
				<view class="keycabinetlist-con-s" v-for="(item,index) in keycabinetList" :key='item.cabinetno' v-if='index>1'
				 @click="lookDetail(item.cabinetno)">
					<image src="../../static/default-cabinetlist.png"></image>
					<text>{{item.cabinetname}}</text>
					<text>{{item.cabinetno}}</text>
				</view>
			</scroll-view>
		</view>
		<!-- <view class="keycabinet-bottom">
			<image src="../../static/logo.png"></image>
			<text></text>
			<label>迅帆科技</label>
		</view> -->
	</view>
</template>

<script>
	import {
		getCabinetlist,
		keyOneUsemsg
	} from "../../api/keycabint.js"
	export default {
		data() {
			return {
				keycabinetList: [],
				nickName: uni.getStorageSync('nickName'),
				avatarUrl: uni.getStorageSync('avatarUrl'),
				manageNew:[]
			}
		},
		onShow() {
			getCabinetlist(uni.getStorageSync('companyid'),'').then(
				res => {
					this.keycabinetList = res.data.cabinetlist;
					this.keycabinetList.sort(function(a, b) {
						return a.sortno - b.sortno;
					})
					if (this.keycabinetList.length == 1) {
						uni.navigateTo({
							url: "../keycabinetdetail/keycabinetdetail?cabinetno=" + res.data.cabinetlist[0].cabinetno
						});
					}

				}
			)
				
			keyOneUsemsg().then(res => {
				this.manageNew = res.data
			})

		},
		methods: {
			toLogout() {
				uni.navigateTo({
					url: "../homepage/homepage"
				});
			},
			lookDetail(cno) {
				uni.navigateTo({
					url: "../keycabinetdetail/keycabinetdetail?cabinetno=" + cno
				});
			},
			lookAuthList(){
				uni.navigateTo({
					url: "../auditlist/auditlist"
				});
			}
		}
	}
</script>

<style>
	@import url("keycabinetlist.css");
</style>
