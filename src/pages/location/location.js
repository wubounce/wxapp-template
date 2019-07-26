
Page({
	data: {
		markers: [{
			iconPath: 'https://static.qiekj.com/h5/miniApp/home/shop.png',
			'name': '千珏店铺7号',
			'address': '联合大厦AB座停车场(府苑新村)联合大厦1005联营',
			'longitude': 120.097252,
			'latitude': 30.266409,
			'id': '427427362548744875',
		},
		{
			iconPath: 'https://static.qiekj.com/h5/miniApp/home/shop.png',
			'name': '千珏店铺7号',
			'address': '联合大厦AB座停车场(府苑新村)联合大厦1005联营',
			'longitude': 120.0974884033203,
			'latitude': 30.26712989807129,
			'id': '427427362548744875',
		},
		{
			iconPath: 'https://static.qiekj.com/h5/miniApp/home/shop.png',
			'name': '千珏店铺7号',
			'address': '联合大厦AB座停车场(府苑新村)联合大厦1005联营',
			'longitude': 120.097817,
			'latitude': 30.266069,
			'id': '427427362548744875',
		},
		{
			iconPath: 'https://static.qiekj.com/h5/miniApp/home/shop.png',
			'name': '千珏店铺7号',
			'address': '联合大厦AB座停车场(府苑新村)联合大厦1005联营',
			'longitude': 120.104475,
			'latitude': 30.277817,
			'id': '427427362548744875',
		}],
		polyline: [{
			points: [{
				longitude: 113.3245211,
				latitude: 23.10229,
			}, {
				longitude: 113.324520,
				latitude: 23.21229,
			}],
			color: '#FF0000DD',
			width: 2,
			dottedLine: true,
		}],
		controls: [{
			id: 1,
			iconPath: '/resources/location.png',
			position: {
				left: 0,
				top: 300 - 50,
				width: 50,
				height: 50,
			},
			clickable: true,
		}],
	},
	onLoad () {
		wx.getLocation({
			type: 'gcj02', // 返回可以用于openLocation的经纬度
			success: function (res) {
				console.log(res);

				var latitude = res.latitude;
				var longitude = res.longitude;
				var speed = res.speed;
				var accuracy = res.accuracy;
				wx.openLocation({
					longitude: Number(res.longitude),
					latitude: Number(res.latitude),
				});
			},
		});
	},
	regionchange (e) {
		console.log(e.type);
	},
	markertap (e) {
		console.log(e.markerId);
	},
	controltap (e) {
		console.log(e.controlId);
	},
});
