import {
	getUserToken,
	userAutologin
} from "./user.js"

export function getToken() {

	var authtokentime = uni.getStorageSync('authtokentime')
	if (new Date().getTime() > authtokentime) {
		return uni.redirectTo({
			url: "../login/login"
		});
		// uni.login({
		// 	provider: 'weixin',
		// 	success: function(loginRes) {
		// 		getUserToken().then(res => {
		// 			// userAutologin(loginRes.code).then(res => {
		// 			// 	if (res.error == 0) {
		// 			// 		uni.setStorageSync('companyid', res.data.companyid);
		// 			// 		uni.redirectTo({
		// 			// 			url: "../keycabinetlist/keycabinetlist"
		// 			// 		});
		// 			// 	} else {
		// 			// 		// return that.getWxOpeninfo();
		// 			// 	}
		// 			// })
		// 			return uni.getStorageSync('authtoken')
		// 		})
		// 	}
		// });
	} else {
		return uni.getStorageSync('authtoken')
	}
}
