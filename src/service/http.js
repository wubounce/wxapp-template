import WxRequest from '../plugins/wx-request/lib/index';

class Service extends WxRequest {
	constructor(options) {
		super(options);
		// 在此也可注入拦截器
		this.interceptors.use({
			request (req) {
				const token = wx.getStorageSync('token', token);
				if (token) {
					req.header['Token'] = token;
				}
				return req;
			},
			requestError (err) {
				wx.hideLoading();
				return Promise.reject(err);
			},
			response (res) {
				if (res.statusCode === 200 && res.data.code === 0) {
					return Promise.resolve(res.data.data);
				}
				else {
					wx.showToast({
						title: '请求错误' + res.data.message,
					});
					return Promise.reject(res.data);
				}
				return res;
			},
			responseError (err) {
				if (err.statusCode === 403) {
					wx.showToast({
						title: '登录失效，请先登录',
						icon: 'none',
						duration: 1000,
					});
					setTimeout(() => {
						wx.redirectTo({
							url: '../login/login',
						});
					}, 1000);
				}
				return Promise.reject(err);
			},
		});
	}
}

const http = new Service({
	baseURL: __DEV__ ? 'http://localhost:9000' : 'http://qiekj.com/api:9000',
});

export default http;
