import {
	http
} from '@/utils/request'

// 经销商列表查询
export const dealerGetListService = () => {
	return http({
		method: 'GET',
		url: '/dealer/list?size=50',
	})
}

// 经销商获取详情
export const dealerGetDetailService = (dealerId) => {
	return http({
		method: 'GET',
		url: `/dealer/detail?id=${dealerId}`,
	})
}