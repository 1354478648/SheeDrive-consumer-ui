import {
	http
} from '@/utils/request'

// 用户地址列表查询
export const dealerGetListService = () => {
	return http({
		method: 'GET',
		url: '/dealer/list?size=50',
	})
}