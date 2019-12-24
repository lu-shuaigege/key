import http from "@/plugins/request.js";
import sha1 from "@/plugins/sha1.js";

export function getUserToken() {
	function generateMixed(n) {
		var res = "";
		for (var i = 0; i < n; i++) {
			var id = Math.ceil(Math.random() * 35);
			res += chars[id];
		}
		return res;
	}
	const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
		'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
	];
	const signtoken = "XFAUTHKMS20071901GHTOKEN237K9MVE";
	let noncestr = generateMixed(16);
	let timestamp = new Date().getTime();
	timestamp = Math.round(timestamp / 1000), toString();
	let signature = sha1(noncestr + timestamp + signtoken)
	return http({
		url: "/auth/v1/token",
		data: {
			noncestr: noncestr,
			timestamp: timestamp,
			signature: signature || ''
		},
		type: "getToken"
	})
}
//获取openinfo
export function wxOpeninfo(code) {
	return http({
		url: "/weapp/v1/wx/openinfo",
		data: {
			code: code
		}
	})
}
//登录
export function login(account,password,openId,unionid) {
	return http({
		url: "/weapp/v1/user/login",
		method: "POST",
		data: {
			account: account,
			password: password,
			openid: openId,
			unionid: unionid
		}
	})
}
//自动登录
export function userAutologin(code) {
	return http({
		url: "/weapp/v1/user/autologin",
		method: "POST",
		data: {
			code: code
		}
	})
}
