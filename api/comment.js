import {
	http
} from '@/utils/request'

// 添加评论
export const commentAddService = (data) => {
	return http({
		method: 'POST',
		url: '/comment/add',
		data
	})
}

// 评论通过ID查询
export const commentGetByIdService = (commentId) => {
	return http({
		method: 'GET',
		url: `/comment/detail?id=${commentId}`,
	})
}

// 评论通过订单ID查询
export const commentGetByOrderIdService = (orderId) => {
	return http({
		method: 'GET',
		url: `/comment/detailByOrderId?orderId=${orderId}`,
	})
}