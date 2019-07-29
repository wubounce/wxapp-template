// 引入SDK核心类
var QQMapWX = require('@/plugins/qqmap-wx-jssdk/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
	key: 'QQZBZ-KEK3X-CJ54G-ZMZ42-LGN6Z-AUB5Q', // 必填
});


Page({
	data: {
		title: 'router',
	},

	onLoad (params) {
		console.log(params);
	},
	formSubmit (e) {
		var _this = this;
		// 调用距离计算接口
		qqmapsdk.direction({
			mode: 'driving', // 可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
			// from参数不填默认当前地址
			from: e.detail.value.start,
			to: e.detail.value.dest,
			success: function (res) {
				console.log(res);
				var ret = res;
				var coors = ret.result.routes[0].polyline, pl = [];
				// 坐标解压（返回的点串坐标，通过前向差分进行压缩）
				var kr = 1000000;
				for (var i = 2; i < coors.length; i++) {
					coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
				}
				// 将解压后的坐标放入点串数组pl中
				for (var i = 0; i < coors.length; i += 2) {
					pl.push({ latitude: coors[i], longitude: coors[i + 1] });
				}
				console.log(pl);
				// 设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
				_this.setData({
					latitude: pl[0].latitude,
					longitude: pl[0].longitude,
					polyline: [{
						points: pl,
						color: '#FF0000DD',
						width: 4,
					}],
				});
			},
			fail: function (error) {
				console.error(error);
			},
			complete: function (res) {
				console.log(res);
			},
		});
	},
});
