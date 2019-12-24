import {getToken} from "../api/gettoken.js"
var baseUrl = 'https://kms.test.xunfan.xyz';

// var baseUrl = 'https://kms.xunfan.xyz';
var $http = function(options) {
	return new Promise((resolve, reject) => {
		var _header = {
			'content-type': 'application/json',
		}
		if (!options.type) {
			_header.AuthToken = getToken() || ''
		}

		uni.request({
			url: baseUrl + options.url,
			method: options.method || "GET",
			header:_header,
			data: options.data || {},
			success: res => {
				if (res.header.AuthToken) {
					uni.setStorageSync('authtoken', res.header.AuthToken);
					uni.setStorageSync('authtokentime', new Date().getTime() + 1000*60*90);
				}
				// if (res.data.error != 0) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: res.data.msg
				// 	});
				// }
				resolve(res.data);
			},
			fail: res => {
				uni.showToast({
					icon: 'none',
					title: '服务器异常'
				});
				reject(res.data);
			}
		})
	})
}

export default $http;
