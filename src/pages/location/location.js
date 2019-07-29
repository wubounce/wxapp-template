let schoolData = require("./data");
Page({
	data: {
		//地图高度
		mapHeight: 0,
		centerLatitude: 0,
		centerLongitude: 0,
		markers: [],
		controls: [
			{
				id: 1,
				iconPath: "../../images/location-control.png",
				position: {
					left: 0,
					top: 10,
					width: 40,
					height: 40
				},
				clickable: true
			}
		]
	},
	onReady(e) {
		console.log(schoolData);
		// 使用 wx.createMapContext 获取 map 上下文
		// this.mapCtx = wx.createMapContext("map");
	},
	onLoad() {
		let systemInfo = wx.getSystemInfoSync();
		this.setData({
			mapHeight: systemInfo.windowHeight,
		});
		this.initmap();
	},
	initmap() {
		wx.getLocation({
			type: "gcj02", //返回可以用于wx.openLocation的经纬度
			success: res => {
				console.log(res);
				let latitude = res.latitude;
				let longitude = res.longitude;
				let marker = this.createMarker(res);
				this.setData({
					centerLatitude: longitude,
					centerLongitude: latitude,
					markers: this.getSchoolMarkers()
				});
				this.moveToLocation(); //移动到中心点
			}
		});
	},
	regionchange(e) {
		console.log(e.type);
		// 改变中心点位置
		if (e.type === "end") {
			this.getCenterLocation();
		}
	},
	markertap(e) {
		console.log(e);
	},
	controltap(e) {
		console.log(e.controlId);
		this.moveToLocation();
	},
	getSchoolMarkers() {
		let markers = [];
		for (let item of schoolData) {
			let marker = this.createMarker(item);
			markers.push(marker);
		}
		return markers;
	},
	moveToLocation() {
		var mapCtx = wx.createMapContext("map");
		mapCtx.moveToLocation();
	},
	createMarker(point) {
		let latitude = point.latitude;
		let longitude = point.longitude;
		let marker = {
			iconPath: "../../images/location.png",
			id: point.id || 0,
			name: point.name || "",
			latitude: latitude,
			longitude: longitude,
			width: 25,
			height: 48
		};
		return marker;
	},
	/**
	 * 得到中心点坐标
	 */
	getCenterLocation() {
		//mapId 就是你在 map 标签中定义的 id
		var mapCtx = wx.createMapContext("map");
		mapCtx.getCenterLocation({
			success: res => {
				console.log("getCenterLocation----------------------->");
				console.log(res);
				this.updateCenterLocation(res.latitude, res.longitude);
				// this.regeocodingAddress();//逆地址解析
				// this.queryMarkerInfo(); //获取 marker 信息
			}
		});
	},
	/**
	 * 更新上传坐标点
	 */
	updateCenterLocation(latitude, longitude) {
		this.setData({
			centerLatitude: latitude,
			centerLongitude: longitude
		});
	}
});
