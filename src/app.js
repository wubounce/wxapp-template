import { checkoutAuth } from './service/user.js';

App({
	onLaunch: function () {
		this.getToken();
	},
	globalData: {
		userInfo: null,
	},
	getToken () {
		// 登录
		wx.login({
			success: async (res) => {
				console.log(res);
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				if (res.code) {
					let payload = { code: res.code };
					let authRes = await checkoutAuth(payload);
					wx.setStorageSync('token', authRes.token || '');
				}
			},
		});
	},
});
