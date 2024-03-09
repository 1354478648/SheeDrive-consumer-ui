import {
	http
} from '@/utils/request'

// 通过品牌获取汽车信息
export const cardetailGetListService = (brand) => {
	return http({
		method: 'GET',
		url: `/cardetail/list?size=50&brand=${brand}`,
	})
}

// 通过ID获取汽车信息
export const cardetailGetByIdService = (id) => {
	return http({
		method: 'GET',
		url: `//cardetail/detail?id=${id}`,
	})
}