import {
	http
} from '@/utils/request'

// 订单添加
export const orderAddService = (data) => {
	return http({
		method: 'POST',
		url: '/order/add',
		data
	})
}

// 订单通过用户ID查询（我的界面）
export const orderGetByUserIdInWoDeService = (userId) => {
	return http({
		method: 'GET',
		url: `/order/getByUserId?size=2&userId=${userId}`,
	})
}

// 订单通过用户ID查询（列表界面）
export const orderGetByUserIdService = (userId) => {
	return http({
		method: 'GET',
		url: `/order/getByUserId?size=50&userId=${userId}`,
	})
}

// 订单通过ID查询
export const orderGetByIdService = (carId) => {
	return http({
		method: 'GET',
		url: `/order/detail?id=${carId}`,
	})
}

// 订单列表查询(通过经销商名查找)
export const orderGetListByDealerNameService = (dealerName) => {
	return http({
		method: 'GET',
		url: `/order/list?dealer_name=${dealerName}`,
	})
}