import http from "@/plugins/request.js";

//获取钥匙柜列表
export function getCabinetlist(companyid, keyword) {
	return http({
		url: "/weapp/v1/cabinet/cabinetlist",
		data: {
			companyid: companyid,
			keyword: keyword,
		}
	})
}
//获取钥匙柜详情 getCabinetDetail
export function cabinetProfile(cabinetno) {
	return http({
		url: "/weapp/v1/cabinet/profile",
		data: {
			cabinetno: cabinetno
		}
	})
}
//获取钥匙领取纪录 getKeyRecord
export function keyUselog(cabinetno, keyno) {
	return http({
		url: "/weapp/v1/key/uselog",
		data: {
			cabinetno: cabinetno,
			keyno: keyno,
		}
	})
}
//领取钥匙
export function getKey(cabinetno, keyno) {
	return http({
		url: "/weapp/v1/key/take",
		method: 'POST',
		data: {
			cabinetno: cabinetno,
			keyno: keyno
		}
	})
}
//归还钥匙
export function returnKey(cabinetno, keyno) {
	return http({
		url: "/weapp/v1/key/return",
		method: 'POST',
		data: {
			cabinetno: cabinetno,
			keyno: keyno
		}
	})
}

//查询
export function keyUseResult(cabinetno, keyno, actionstatus) {
	return http({
		url: "/weapp/v1/key/use/result",
		method: 'GET',
		data: {
			cabinetno: cabinetno,
			keyno: keyno,
			action: actionstatus
		}
	})
}
//退出 
export function logOut(data) {
	return http({
		url: "/weapp/v1/user/logout",
		method: 'POST',
		data: data
	})
}
//申请钥匙临时权限
export function keyOneuseNew(cabinetno, keyno, approveuserid,usereason) {
	return http({
		url: "/weapp/v1/key/oneuse/new",
		method: 'POST',
		data: {
			cabinetno: cabinetno,
			keyno: keyno,
			approveuserid: Number(approveuserid),
			usereason:usereason
		}
	})
}
//申请钥匙临时权限列表
export function keyOneuseList(start, length) {
	return http({
		url: "/weapp/v1/key/oneuse/list",
		method: 'GET',
		data: {
			start: start,
			length: length
		}
	})
}

//获取审批人-列表
export function oneuseGetapproveusers(cabinetno) {
	return http({
		url: "/weapp/v1/key/oneuse/getapproveusers",
		method: 'GET',
		data: {
			cabinetno: cabinetno
		}
	})
}

//临时权限申请-提示消息
export function keyOneUsemsg(data) {
	return http({
		url: "/weapp/v1/key/oneuse/msg",
		method: 'GET',
		data: data
	})
}

//临时权限申请-审批
export function keyOneUseApprove(logid,status) {
	return http({
		url: "/weapp/v1/key/oneuse/approve",
		method: 'POST',
		data: {
			logid: logid,
			status: status
		}
	})
}

//查询临时权限审批结果
export function keyOneUseResult(cabinetno, keyno) {
	return http({
		url: "/weapp/v1/key/oneuse/result",
		method: 'GET',
		data: {
			cabinetno: cabinetno,
			keyno: keyno
		}
	})
}
//获取使用原因-列表
export function getUsereasons(companyid) {
	return http({
		url: "/weapp/v1/key/oneuse/getusereasons",
		method: 'GET',
		data: {
			companyid:companyid
		}
	})
}
