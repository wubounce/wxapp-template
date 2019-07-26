import { getUser } from '@/service/user.js';
import moment from 'moment';

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		imgUrls: [
			'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
			'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
			'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
		],
		indicatorDots: true,
		autoplay: false,
		interval: 5000,
		duration: 1000,
		userList: [],
		total: 0,
	},
	// 事件处理函数
	bindViewTap () {
		wx.navigateTo({
			url: '../logs/logs',
		});
	},
	async onLoad () {
		console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
		this.getUserList();
	},
	async getUserList () {
		let res = await getUser();
		console.log(res);
		this.setData({
			userList: res.items,
			total: res.total,
		});
	},
});
