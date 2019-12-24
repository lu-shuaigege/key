<template>
	<view class="auditlist">
		<image class="dot-bg" src="../../static/dot-bg.png"></image>
		<view class="auditlist-list" v-for="item in applylist" :key='item.logid'>
			<view class="auditlist-list-one">
				<text class="detail">申&ensp;请&ensp;人：</text>
				<text class="applyname">{{item.applyusername}}</text>
				<button v-show="showButton.indexOf(item.logid)==-1" class="refuse" @click="applyRefuse(item.logid)">拒绝</button>
				<button v-show="showButton.indexOf(item.logid)==-1" class="pass" @click="applyPast(item.logid)">通过</button>
			</view>
			<view class="auditlist-list-one">
				<text class="detail">联系电话：</text>
				<text class="name">{{item.phone}}</text>
			</view>
			<view class="auditlist-list-one">
				<text class="detail">钥&ensp;匙&ensp;柜：</text>
				<text class="name">{{item.cabinetname}}</text>
			</view>
			<view class="auditlist-list-one">
				<text class="detail">钥&emsp;&emsp;匙：</text>
				<text class="name">{{item.keyshowname}}</text>
			</view>
			<view class="auditlist-list-one">
				<text class="detail">申请时间：</text>
				<text class="name">{{item.applytime}}</text>
			</view>
			<view class="auditlist-list-one">
				<text class="detail">申请原因：</text>
				<text class="name">{{item.usereason}}</text>
			</view>
		</view>
		<view class="loading">{{loadingText}}</view>
		<!-- <view class="keycabinet-bottom">
			<image src="../../static/logo.png"></image>
			<text></text>
			<label>迅帆科技</label>
		</view> -->
	</view>
</template>

<script>
	import {
		keyOneuseList,
		keyOneUseApprove
	} from "../../api/keycabint.js"

	var timer = null;
	export default {
		data() {
			return {
				applylist: [],
				showButton: [],
				buttonId: '',
				loadingText: '加载中...',
				start: 0,
				isFnished: false
			}
		},
		onLoad() {
			this.auditList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.start = 0;
			this.applylist = [];
			this.auditList();
			uni.stopPullDownRefresh();
		},
		onReachBottom: function() {
			const that = this;
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				(!that.isFnished) && that.auditList();
			}, 1000);
		},
		methods: {
			auditList() {
				var that = this;
				this.loadingText = '加载中...';
				
				keyOneuseList(this.start,10).then(res => {
					this.loadingText = '';
					console.log(res.data.applylist)

					this.start = this.start + 10;
					uni.hideNavigationBarLoading();
					this.applylist = this.applylist.concat(res.data.applylist);
					if (this.applylist == '') {
						uni.hideNavigationBarLoading();
						this.loadingText = '暂无数据';
						return false;
					}
					if (this.applylist.length < 10) {
						that.isFnished = true;
					}
				})
			},
			applyRefuse(logid) {
				const that = this;
				uni.showModal({
					content: '是否确认拒绝？',
					confirmText: "确认",
					confirmColor: "#0067C6",
					success: function(res) {
						if (res.error != 0) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
						}
						if (res.confirm) {
							keyOneUseApprove(logid,0).then(res => {
								that.showButton.push(logid);
								uni.showToast({
									icon: 'none',
									title: res.msg
								});
							})
						} else if (res.cancel) {

						}
					}
				});

			},
			applyPast(logid) {
				const that = this;
				uni.showModal({
					content: '是否确认通过？',
					confirmText: "确认",
					confirmColor: "#0067C6",
					success: function(res) {
						if (res.error != 0) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
						}
						if (res.confirm) {
							keyOneUseApprove(logid,1).then(res => {
								that.showButton.push(logid);
								uni.showToast({
									icon: 'none',
									title: res.msg
								});
							})
						} else if (res.cancel) {

						}
					}
				});
			}
		}
	}
</script>

<style>
	@import url("auditlist.css");
</style>
