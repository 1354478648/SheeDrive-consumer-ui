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
export const orderGetByIdInWoDeService = (userId) => {
	return http({
		method: 'GET',
		url: `/order/getByUserId?size=2&userId=${userId}`,
	})
}