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
		<view class="administratornews" v-show="manageNew.status == 1&&cabinetList.length==1">
			<image src="../../static/keycabinetlist-horn.png"></image>
			<view class="administratornews-con">
				<text class="name">{{manageNew.user}}</text>
				<text class="news">{{manageNew.message}}</text>
			</view>
			<button @click="lookAuthList()">点击查看</button>
		</view>
		<view class="keycabinetdetail">
			<view class="keycabinetdetail-up">
				<view class="keycabinet-normal-top">
					<text class="keycabinet-normal-top-name">{{cabinetDetail.cabinetname}}</text>
					<view class="keycabinet-normal-top-r">
						<image v-if="cabinetDetail.online.status==1" class="dot-green" src="../../static/dot-green.png"></image>
						<image v-if="cabinetDetail.online.status==0" class="dot-green" src="../../static/dot-grey.png"></image>
						<text v-if="cabinetDetail.online.status==1">网络正常</text>
						<text v-if="cabinetDetail.online.status==0" class="exception-text">网络异常</text>
					</view>


				</view>
				<view class="">
					<text class="keycabinet-normal-top-num"><text>NO.</text>{{cabinetDetail.cabinetno}}</text>
					<view class="keycabinet-normal-top-r">
						<image v-if="cabinetDetail.alarm.status==0" src="../../static/light-green.png"></image>
						<image v-if="cabinetDetail.alarm.status==1" src="../../static/light-red.png"></image>
						<text v-if="cabinetDetail.alarm.status==0">{{cabinetDetail.alarm.title}}</text>
						<text v-if="cabinetDetail.alarm.status==1" class="exception-text">{{cabinetDetail.alarm.title}}</text>
					</view>
				</view>
				<view class="keycabinetdetail-top">
					<text class="keycabinetdetail-top-name">钥匙总数：</text>
					<text class="textblue">{{cabinetDetail.keynum.total}}</text>
					<text class="keycabinetdetail-top-name">使用中：</text>
					<text class="textgrey">{{cabinetDetail.keynum.used}}</text>
					<text class="keycabinetdetail-top-name">错位：</text>
					<text class="textred">{{cabinetDetail.keynum.error}}</text>
				</view>
			</view>
			<view class="keycabinetdetail-con">
				<view class="keycabinetdetail-con-top">
					<view class="keycabinetdetail-con-topone">
						<image src="../../static/text-blue.png"></image>
						<text>钥匙在位</text>
					</view>
					<view class="keycabinetdetail-con-topone">
						<image src="../../static/text-grey.png"></image>
						<text>钥匙不在位</text>
					</view>
					<view class="keycabinetdetail-con-topone">
						<image src="../../static/text-red.png"></image>
						<text>钥匙错位</text>
					</view>
					<view class="keycabinetdetail-con-topone">
						<image src="../../static/text-none.png"></image>
						<text>空</text>
					</view>
					<view class="keycabinetdetail-con-topone">
						<image src="../../static/stop.png"></image>
						<text>无权限</text>
					</view>
				</view>

				<view class="keycabinetdetail-con-list" v-for="(items,index) in cabinetDetail.keylist" :key="index">
					<view class="keycabinetdetail-listone" v-for="item in items.keys" :key='item.keyno'>
						<view class="keycabinetdetail-listone-type" @click="showRecord(item.status,item.mispos,item.haskey,item.access,cabinetDetail.cabinetno,item.keyno)"
						 :class="{'grey':item.status==0,'blue':item.status==1,'red':item.mispos==1,'none':item.haskey==0}">
							{{item.keyno}}
						</view>
						<text class="name">{{item.title}}</text>
						<image v-if="item.access==0&&item.haskey==1" src="../../static/key-disabled.png" @click="applyAuth(item.keyno,cabinetDetail.cabinetno)"></image>
						<image v-if="loaddingKeys[item.keyno]" src="../../static/loadinggrey.gif"></image>
					</view>
				</view>
			</view>
		</view>

		<view class="keycabinetlist-line">
			<image src="../../static/keycabinetlist-line.png"></image>
		</view>
		<view class="keycabinetlist-con">
			<scroll-view class="keycabinetlist-con-p" scroll-x="true">
				<view class="keycabinetlist-con-s" v-for="(item,index) in cabinetList" :key='item.cabinetno' @click="lookDetail(item.cabinetno)"
				 v-show="item.cabinetno!=cabinetDetail.cabinetno">
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

		<view class="records" v-show="showRecords">
			<view class="records-bg"></view>
			<view class="records-conbg">
				<view class="records-conbg-top">
					<text>钥匙领还</text>
					<image src="../../static/guanbi.png" @click="hideRecord()"></image>
				</view>
				<view class="records-con">
					<view class="records-con-list" v-for="item in keyrecordlist" :key='item.keyno'>
						<view class="records-con-list-top">
							<image src="../../static/record-photo.png"></image>
							<text>{{item.takeuser}}</text>
						</view>
						<view class="records-con-listone">
							<view class="one">
								<text class="time">{{item.taketime}}</text>
								<text class="detail">领取</text>
							</view>
							<view class="one">
								<text class="time">{{item.returntime}}</text>
								<text class="detail">归还</text>
							</view>
						</view>
						<view class="records-con-line"></view>
					</view>

					<view class="records-con-button">
						<button class="cancel" @click="hideRecord()">取消</button>
						<button class="confirm" v-show="status != 0" @click="getKey()">领取钥匙</button>
						<button class="confirm" v-show="status == 0" @click="returnKey()">归还钥匙</button>
					</view>
				</view>
			</view>
		</view>

		<view class="records" v-show="showApprover">
			<view class="records-bg"></view>
			<view class="records-conbg">
				<view class="records-conbg-top">
					<text>钥匙临时申请</text>
					<image src="../../static/guanbi.png" @click="hideApprover()"></image>
				</view>
				<view class="records-con">
					<view class="selectapprover">
						选择审批人
					</view>
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="item in approverList" :key="item.userid">
							<radio :value="item.userid" color="#2fa4ff" />
							<text>{{item.username}}</text>
						</label>
					</radio-group>
					<view class="selectapprover">
						使用原因
					</view>
					<radio-group @change="radioChange1">
						<label class="uni-list-cell uni-list-cell-pd" v-for="item in getusereasonList" :key="item.sortno">
							<radio :value="item.title" :checked="checked" color="#2fa4ff" />
							<text>{{item.title}}</text>
						</label>
					</radio-group>
					<input v-show="showInput" v-model="inputUsereason" class="usereason" type="text" value="" placeholder="请输入使用原因" />

					<view class="records-con-button">
						<button class="cancel" @click="hideApprover()">取消</button>
						<button class="confirm" @click="keyOneuseNews()">立即申请</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cabinetProfile,
		getCabinetlist,
		keyUselog,
		getKey,
		returnKey,
		keyUseResult,
		keyOneuseNew,
		oneuseGetapproveusers,
		keyOneUseResult,
		keyOneUsemsg,
		getUsereasons
	} from "@/api/keycabint.js"
	export default {
		data() {
			return {
				showRecords: false,
				showApprover: false,
				showInput: false,
				checked: false,
				cabinetDetail: [],
				keyrecordlist: [],
				cabinetList: this.$api.prePage().keycabinetList,
				nickName: uni.getStorageSync('nickName'),
				avatarUrl: uni.getStorageSync('avatarUrl'),
				status: '',
				loadId: '',
				loaddingKeys: [],
				inputUsereason: '',
				cabinetno: 0,
				keyno: '',
				timestop: 0,
				actionstatus: '',
				second: 0,
				intervalList: [],
				approverList: [],
				approveuserid: '',
				getusereasonstitle: '',
				authIntervalList: [],
				manageNew: [],
				getusereasonList: []
			}
		},
		onLoad(option) {
			this.cabinetno = option.cabinetno
			this.getCabinetdetails(this.cabinetno);
			keyOneUsemsg().then(res => {
				this.manageNew = res.data
			})
		},
		onUnload() {
			this.intervalList.forEach(function(items, indexs) {
				clearTimeout(items.timer);
			});
			this.authIntervalList.forEach(function(timer, indexs) {
				clearInterval(timer);
			});
			clearTimeout(this.timestop);
		},
		methods: {
			async getCabinetdetails(cabinetno) {
				var that = this;
				await cabinetProfile(cabinetno).then(res => {
					this.cabinetDetail = res.data;
					this.cabinetDetail.keylist.sort(function(a, b) {
						return a.sortno - b.sortno;
					}).forEach(function(items, indexs) {
						items.keys.sort(function(a, b) {
							return a.keyno - b.keyno;
						})
					});
				}).finally(() => {
					if (that.cabinetno == cabinetno) {
						that.timestop = setTimeout(() => {
							that.getCabinetdetails(cabinetno);
						}, 2000)
					}
				})
			},
			intervalSelectKeyStatus(keyno) {
				var that = this;
				keyUseResult(this.cabinetno, keyno, this.actionstatus).then(res => {
					if (res.data.status == 1) {
						that.loaddingKeys[keyno] = false;
						uni.showToast({
							icon: 'none',
							duration: 2000,
							title: res.data.message
						});
					}
				}).finally(() => {
					var time = that.intervalList[keyno]['time'];
					var now = (new Date()).valueOf();
					let second = parseInt((now - time) / 1000);
					if (second >= 15) {
						that.loaddingKeys[keyno] = false;
						clearTimeout(that.intervalList[keyno]['timer']);
						delete that.intervalList[keyno];
					} else {
						var timer = setTimeout(() => {
							that.intervalSelectKeyStatus(keyno);
						}, 500)
						that.intervalList[keyno]['timer'] = timer;
					}
				})
			},
			getKey() {
				var interval = 0;
				this.actionstatus = 0;
				this.loadId = this.keyno;
				getKey(this.cabinetno, this.keyno).then(
					res => {
						if (res.error != 0) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
						}
						this.showRecords = false;
						this.loaddingKeys[this.keyno] = true;
						if (this.intervalList[this.keyno]) {
							this.intervalList[this.keyno]['time'] = (new Date()).valueOf();
						} else {
							this.intervalList[this.keyno] = {};
							this.intervalList[this.keyno] = {
								time: (new Date()).valueOf(),
								timer: 0,
							};
							this.intervalSelectKeyStatus(this.keyno)
						}
					})
			},
			returnKey() {
				this.actionstatus = 1;
				this.loadId = this.keyno;
				returnKey(this.cabinetno, this.keyno).then(
					res => {
						if (res.error != 0) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
						}
						this.showRecords = false;
						this.loaddingKeys[this.keyno] = true;
						if (this.intervalList[this.keyno]) {
							this.intervalList[this.keyno]['time'] = (new Date()).valueOf();
						} else {
							this.intervalList[this.keyno] = {};
							this.intervalList[this.keyno] = {
								time: (new Date()).valueOf(),
								timer: 0,
							};
							this.intervalSelectKeyStatus(this.keyno)
						}

					})
			},
			showRecord(status, mispos, haskey, access, cabinetno, keyno) {
				this.keyno = keyno;
				const that = this;
				if (access != 1) {
					uni.showToast({
						icon: 'none',
						title: "数据异常！"
					});
					return false;
				}

				if (mispos == 1) {
					uni.showModal({
						content: '该钥匙归还位置错误，您确认要继续领取吗？',
						confirmText: "确认领取",
						confirmColor: "#0067C6",
						success: function(res) {
							if (res.confirm) {
								that.getKey();
							} else if (res.cancel) {

							}
						}
					});
					return
				}
				if (haskey == 1) {
					this.showRecords = true;
					keyUselog(cabinetno, keyno).then(
						res => {
							if (res.error != 0) {
								uni.showToast({
									icon: 'none',
									title: res.msg
								});
							}
							this.keyrecordlist = res.data.log;
						})
				}
				this.status = status;
				this.keyno = keyno;

			},
			hideRecord() {
				this.showRecords = false;
				this.status = '';
			},
			hideApprover() {
				this.showApprover = false;
				this.inputUsereason = '';
				this.approverList = [];
				this.getusereasonList = [];
				this.showInput = false;
				this.approveuserid = '';
				this.getusereasonstitle = '';
			},
			lookAuthList() {
				uni.navigateTo({
					url: "../auditlist/auditlist"
				});
			},
			keyOneuseNews() {
				var that = this;
				var cabinetno = this.cabinetno;
				var keyno = this.keyno;

				if (this.approveuserid == '') {
					uni.showToast({
						icon: 'none',
						title: "请选择审批人"
					});
					return false;
				}
				if (this.getusereasonstitle == '') {
					uni.showToast({
						icon: 'none',
						title: "请选择使用原因"
					});
					return false;
				}
				if (this.getusereasonstitle == '其他' && this.inputUsereason == '') {
					uni.showToast({
						icon: 'none',
						title: "请填写使用原因"
					});
					return false;
				}
				if (this.getusereasonstitle == '其他') {
					this.getusereasonstitle = this.inputUsereason;
				}
				keyOneuseNew(cabinetno, keyno, this.approveuserid, this.getusereasonstitle).then(res => {
					this.showApprover = false;
					uni.showToast({
						icon: 'none',
						title: res.msg
					});
					this.approverList = [];
					this.getusereasonList = [];
					this.showInput = false;
					this.approveuserid = '';
					this.getusereasonstitle = '';

					if (!this.authIntervalList[keyno]) {
						that.authIntervalList[keyno] = setInterval(function() {
							keyOneUseResult(cabinetno, keyno).then(res => {
								if (res.data.status == 1) {
									clearInterval(this.authIntervalList[keyno]);
									uni.showToast({
										icon: 'none',
										title: res.message
									});
								}
							})
						}, 1000);
					}

				})
			},
			radioChange(evt) {
				this.approveuserid = evt.target.value;
			},
			radioChange1(evt) {
				this.getusereasonstitle = evt.target.value;
				if (this.getusereasonstitle == '其他') {
					this.showInput = true;
				} else {
					this.showInput = false;
					this.inputUsereason = '';
				}

			},
			applyAuth(keyno, cabinetno) {
				this.showApprover = true;
				this.keyno = keyno,
					this.cabinetno = cabinetno;
				oneuseGetapproveusers(cabinetno).then(res => {
					this.approverList = res.data.userlist;
				})
				getUsereasons(uni.getStorageSync('companyid')).then(res => {
					this.getusereasonList = res.data.usereasonlist;
				})
			},
			lookDetail(cno) {
				this.intervalList.forEach(function(items, indexs) {
					clearTimeout(items.timer);
				});
				this.authIntervalList.forEach(function(timer, indexs) {
					clearInterval(timer);
				});
				clearTimeout(this.timestop);

				if (this.cabinetno == cno) {
					return false;
				} else {
					this.cabinetno = cno;
				}
				const that = this;
				this.loaddingKeys.forEach(function(item, index) {
					that.loaddingKeys[index] = false;
				});
				this.initData();
				this.cabinetno = cno;
				this.getCabinetdetails(cno);

				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			initData() {
				this.showRecords = false;
				this.showApprover = false;
				this.cabinetDetail = [];
				this.keyrecordlist = [];
				this.status = '';
				this.loadId = '';
				this.loaddingKeys = [];
				this.cabinetno = 0;
				this.keyno = '';
				this.timestop = 0;
				this.actionstatus = '';
				this.second = 0;
				this.intervalList = [];
				this.approverList = [];
				this.approveuserid = '';
				this.authIntervalList = [];
			},
			toLogout() {
				uni.navigateTo({
					url: "../homepage/homepage"
				});
			},
		}
	}
</script>

<style>
	@import url("keycabinetdetail.css");
</style>
