let schoolData = require('./data');
// // 引入SDK核心类
var QQMapWX = require('@/plugins/qqmap-wx-jssdk/qqmap-wx-jssdk.min.js');

Page({
	data: {
		// 地图高度
		mapHeight: 0,
		centerLatitude: 0,
		centerLongitude: 0,
		markers: [],
		controls: [],
	},
	onLoad () {
		let systemInfo = wx.getSystemInfoSync();
		this.setData({
			mapHeight: systemInfo.windowHeight,
		});
		this.qqmapsdk = new QQMapWX({
			key: 'QQZBZ-KEK3X-CJ54G-ZMZ42-LGN6Z-AUB5Q',
		});
		this.initmap();
		this.getMapHeight();
	},
	getMapHeight () {
		let { windowWidth } = wx.getSystemInfoSync();
		var query = wx.createSelectorQuery();
		// 获取某个元素的高度宽度
		query.select('.map-wrapper').boundingClientRect();
		query.exec(res => {
			this.setMapHeight(windowWidth, res[0].height);
		});
	},
	setMapHeight (windowWidth, mapHeight) {
		var controlsWidth = 40;
		var controlsHeight = 48;
		// 设置中间部分指针
		this.setData({
			mapHeight: mapHeight + 'px',
			controls: [{
				id: 1,
				iconPath: '../../images/center-location.png',
				position: {
					left: (windowWidth - controlsWidth) / 2,
					top: (mapHeight - controlsHeight) / 2 - 10,
					width: controlsWidth,
					height: controlsHeight,
				},
				clickable: true,
			}],
		});
	},
	initmap () {
		wx.getLocation({
			type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
			success: res => {
				console.log(res);
				let latitude = res.latitude;
				let longitude = res.longitude;
				let marker = this.createMarker(res);
				this.setData({
					centerLatitude: latitude,
					centerLongitude: longitude,
					markers: this.getSchoolMarkers(),
				});
				this.moveToLocation(); // 移动到中心点
			},
		});
	},
	regionchange (e) {
		console.log(e.type);
		// 改变中心点位置
		if (e.type === 'end') {
			this.getCenterLocation();
		}
	},
	markertap (e) {
		console.log(e);
	},
	controltap (e) {
		console.log(e.controlId);
		this.moveToLocation();
	},
	getSchoolMarkers () {
		let markers = [];
		for (let item of schoolData) {
			let marker = this.createMarker(item);
			markers.push(marker);
		}
		return markers;
	},
	moveToLocation () {
		var mapCtx = wx.createMapContext('map');
		mapCtx.moveToLocation();
	},
	createMarker (point) {
		let latitude = point.latitude;
		let longitude = point.longitude;
		let marker = {
			iconPath: '../../images/location.png',
			id: point.id || 0,
			name: point.name || '',
			address: point.address || '',
			latitude: latitude,
			longitude: longitude,
			width: 25,
			height: 48,
		};
		return marker;
	},
	/**
	 * 得到中心点坐标
	 */
	getCenterLocation () {
		// mapId 就是你在 map 标签中定义的 id
		var mapCtx = wx.createMapContext('map');
		mapCtx.getCenterLocation({
			success: res => {
				this.updateCenterLocation(res.latitude, res.longitude);
				this.regeocodingAddress();// 逆地址解析
				// this.queryMarkerInfo(); //获取 marker 信息
			},
		});
	},
	/**
	 * 更新上传坐标点
	 */
	updateCenterLocation (latitude, longitude) {
		this.setData({
			centerLatitude: latitude,
			centerLongitude: longitude,
		});
	},
	regeocodingAddress () {
		// 通过经纬度解析地址,腾讯未申请额度前一天只有10000次
		this.qqmapsdk.reverseGeocoder({
			location: {
				latitude: this.data.centerLatitude,
				longitude: this.data.centerLongitude,
			},
			success: (res) => {
				this.setData({
					centerAddressBean: res.result,
					selectAddress: res.result.formatted_addresses.recommend,
					currentProvince: res.result.address_component.province,
					currentCity: res.result.address_component.city,
					currentDistrict: res.result.address_component.district,
				});
			},
			fail: (res) => {
				console.log(res);
			},
		});
	},
	openOtherMap () {
		wx.getLocation({
			type: 'wgs84',
			success: () => {
				let { latitude, longitude, name, address } = this.data.markers[0];
				wx.openLocation({
					latitude: Number(latitude), // 要去的纬度-地址
					longitude: Number(longitude), // 要去的经度-地址
					name: name,
					address: address,
				});
			},
		});
	},
});

