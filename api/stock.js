import {
	http
} from '@/utils/request'

// 通过车辆名查询库存
export const stockGetByCarIdService = (id) => {
	return http({
		method: 'GET',
		url: `/stock/getByCarId?size=50&id=${id}`,
	})
}