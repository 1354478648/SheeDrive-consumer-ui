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