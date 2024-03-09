const formatPrice = (price) => {
	// 将价格转换为字符串，并且保留两位小数
	const formattedPrice = parseFloat(price).toFixed(2);

	// 使用正则表达式添加千位分隔符
	const regex = /\B(?=(\d{3})+(?!\d))/g;
	const priceWithCommas = formattedPrice.replace(regex, ',');

	// 返回添加货币符号后的格式化价格
	return '￥' + priceWithCommas;
}

// 函数用于将度数转换为弧度
const degreesToRadians = (degrees) => {
	return degrees * Math.PI / 180;
}

// 函数用于计算两个坐标点之间的距离
const calculateDistance = (userLongitude, userLatitude, targetLongitude, targetLatitude) => {
	const earthRadiusKm = 6371; // 地球半径，单位：千米

	const userLongitudeRad = degreesToRadians(userLongitude);
	const userLatitudeRad = degreesToRadians(userLatitude);
	const targetLongitudeRad = degreesToRadians(targetLongitude);
	const targetLatitudeRad = degreesToRadians(targetLatitude);

	const deltaLongitude = targetLongitudeRad - userLongitudeRad;
	const deltaLatitude = targetLatitudeRad - userLatitudeRad;

	const a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
		Math.cos(userLatitudeRad) * Math.cos(targetLatitudeRad) *
		Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const distance = earthRadiusKm * c; // 距离，单位：千米
	return distance;
}

export {
	formatPrice,
	calculateDistance
};